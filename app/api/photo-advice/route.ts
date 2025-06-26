import { uploadPhoto } from "@/app/services/uploadPhoto";
import { openaiChat } from "@/app/services/openai";
import { parsePetInfo } from "@/app/services/parsePetInfo";
import { parsePlan } from "@/app/services/parsePlan";
import { getCurrentUserId } from "@/app/api/auth/[...nextauth]/route";
import {
  PET_INFO_PROMPT,
  PLAN_PROMPT,
  SYSTEM_PROMPT,
} from "@/app/constants/AI_PROMPTS";
import { prisma } from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    console.log("photo-advice: userId", userId);
    if (!userId) {
      console.log("photo-advice: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("photo");
    if (!file || !(file instanceof Blob)) {
      console.log("photo-advice: No photo uploaded");
      return NextResponse.json({ error: "No photo uploaded" }, { status: 400 });
    }

    const imageUrl = await uploadPhoto(file);

    const petInfoRes = await openaiChat([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: PET_INFO_PROMPT },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      },
    ]);
    const petInfo = parsePetInfo(
      petInfoRes.choices?.[0]?.message?.content || ""
    );
    console.log("photo-advice: final petInfo", petInfo);
    if (petInfo.notAnimal) {
      return NextResponse.json({
        message: "done",
        notAnimal: true,
        info: petInfo,
      });
    }

    const planRes = await openaiChat(
      [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: PLAN_PROMPT },
            { type: "text", text: JSON.stringify(petInfo) },
          ],
        },
      ],
      "gpt-4o"
    );
    const plan = parsePlan(planRes.choices?.[0]?.message?.content || "");

    const savedPlan = await prisma.treatmentPlan.create({
      data: {
        petType: petInfo.petType,
        color: petInfo.color,
        species: petInfo.species,
        age: petInfo.age,
        plan: JSON.stringify(plan),
        photoUrl: imageUrl,
        userId,
      },
    });
    console.log("photo-advice: savedPlan", savedPlan);

    return NextResponse.json({ message: "done", plan, ...petInfo, savedPlan });
  } catch (e) {
    console.error("photo-advice error:", e);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(e) },
      { status: 500 }
    );
  }
}

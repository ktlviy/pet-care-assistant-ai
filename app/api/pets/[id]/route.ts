import { prisma } from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing pet ID" }, { status: 400 });
  }
  const pet = await prisma.treatmentPlan.findFirst({
    where: { id },
  });
  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...pet,
    plan: typeof pet.plan === "string" ? JSON.parse(pet.plan) : pet.plan,
  });
}

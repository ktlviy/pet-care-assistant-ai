import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";
import { getCurrentUserId } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const pets = await prisma.treatmentPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pets);
  } catch (e) {
    console.error("pets GET error:", e);
    return NextResponse.json(
      { error: "Failed to fetch pets", details: String(e) },
      { status: 500 }
    );
  }
}

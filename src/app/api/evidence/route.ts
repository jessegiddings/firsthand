import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const milestoneId = formData.get("milestoneId") as string;
    const description = formData.get("description") as string;
    const gpsLat = formData.get("gpsLat") as string;
    const gpsLng = formData.get("gpsLng") as string;
    const gpsAccuracy = formData.get("gpsAccuracy") as string;

    // TODO: Upload photos to Supabase Storage bucket "evidence-photos"
    // const photos = formData.getAll("photos") as File[];
    // const photoUrls = await Promise.all(photos.map(uploadToStorage));

    // TODO: Upload voice recording to Supabase Storage bucket "voice-recordings"
    // const voice = formData.get("communityVoice") as File;
    // const voiceUrl = voice ? await uploadToStorage(voice) : null;

    const evidence = await prisma.evidence.create({
      data: {
        milestoneId,
        submittedBy: "placeholder-user-id", // TODO: Get from session
        description,
        photoUrls: [], // TODO: Replace with actual uploaded URLs
        gpsLat: gpsLat ? parseFloat(gpsLat) : null,
        gpsLng: gpsLng ? parseFloat(gpsLng) : null,
        gpsAccuracy: gpsAccuracy ? parseFloat(gpsAccuracy) : null,
        // communityVoiceUrl: voiceUrl,
      },
    });

    // Update milestone status
    await prisma.milestone.update({
      where: { id: milestoneId },
      data: { status: "EVIDENCE_SUBMITTED" },
    });

    // TODO: Phase 2 — Trigger AI verification pipeline via Anthropic Claude API
    // await triggerAIVerification(evidence.id);

    return NextResponse.json({ id: evidence.id }, { status: 201 });
  } catch (error) {
    console.error("Evidence submission error:", error);
    return NextResponse.json({ error: "Failed to submit evidence" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const evidence = await prisma.evidence.findMany({
      include: {
        milestone: {
          include: { project: true },
        },
      },
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json(evidence);
  } catch {
    return NextResponse.json({ error: "Failed to fetch evidence" }, { status: 500 });
  }
}

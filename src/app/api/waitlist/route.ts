import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  type: z.enum(["DONOR", "PARTNER", "CORPORATE"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = waitlistSchema.parse(body);

    // Check for existing entry
    const existing = await prisma.waitlist.findFirst({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json({ message: "Already on the waitlist" }, { status: 200 });
    }

    await prisma.waitlist.create({
      data: {
        email: data.email,
        name: data.name,
        type: data.type,
      },
    });

    return NextResponse.json({ message: "Added to waitlist" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

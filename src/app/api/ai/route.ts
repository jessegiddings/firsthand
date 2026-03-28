import { NextResponse } from "next/server";

// TODO: Phase 2 — Anthropic Claude API integration
// - Module 1: Partner application screening (Gate 1 scoring)
// - Module 2: Milestone evidence verification pipeline
// - Module 3: Narrative intelligence (story generation + translation)

export async function POST() {
  return NextResponse.json(
    { error: "AI integration is Phase 2" },
    { status: 501 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a philanthropic advisor for Firsthand Foundation. Based on a donor's answers, recommend 2-3 specific projects from the available projects list and write a warm, personalised 2-sentence explanation of why each project matches their values. Be specific — reference their actual answers. Tone: warm, direct, human. Not salesy. Return ONLY valid JSON: { "recommendations": [{ "project_id": string, "project_title": string, "reason": string }], "intro": string (one sentence personalised intro) }`;

// Fallback projects for when no active projects exist in the database
const SAMPLE_PROJECTS = [
  {
    id: "sample-1",
    title: "Classroom Roof Repair — Eldoret Primary School",
    category: "Education",
    country: "Kenya",
    description: "Repair leaking roof on Block B classroom serving 47 students in Eldoret. Three milestones: materials procurement, construction, and completion verification.",
    goalAmount: 8400,
  },
  {
    id: "sample-2",
    title: "Borehole Installation — Kitui Village",
    category: "Clean Water & Health",
    country: "Kenya",
    description: "Install a community borehole providing clean water to 200+ households in Kitui County. Includes geological survey, drilling, pump installation, and community training.",
    goalAmount: 15000,
  },
  {
    id: "sample-3",
    title: "Women's Tailoring Cooperative — Mathare",
    category: "Economic Empowerment",
    country: "Kenya",
    description: "Equip 15 women with industrial sewing machines and 6-month business training program. Goal: each participant earning independent income within 9 months.",
    goalAmount: 6200,
  },
  {
    id: "sample-4",
    title: "School Lunch Program — Rajasthan Rural Schools",
    category: "Food Security",
    country: "India",
    description: "Provide daily nutritious meals for 120 students across 3 rural schools in Rajasthan for one academic year. Locally sourced ingredients, community-run kitchen.",
    goalAmount: 4800,
  },
  {
    id: "sample-5",
    title: "Girls' Scholarship Fund — Nakuru Secondary",
    category: "Education",
    country: "Kenya",
    description: "Fund full-year secondary school fees for 8 girls at risk of dropping out in Nakuru County. Includes tuition, books, uniform, and mentorship pairing.",
    goalAmount: 3200,
  },
  {
    id: "sample-6",
    title: "Community Workshop & Tool Library — Thunder Bay",
    category: "Economic Empowerment",
    country: "Canada",
    description: "Build a shared workshop space with power tools, woodworking equipment, and training programs for Indigenous youth in Thunder Bay, Ontario.",
    goalAmount: 22000,
  },
];

export async function POST(req: NextRequest) {
  try {
    const { answers, email } = await req.json();

    if (!answers) {
      return NextResponse.json({ error: "answers are required" }, { status: 400 });
    }

    // Try to fetch active projects from DB
    let projects;
    try {
      const dbProjects = await prisma.project.findMany({
        where: { status: { in: ["ACTIVE", "FUNDED", "IN_PROGRESS"] } },
        select: { id: true, title: true, category: true, country: true, description: true, goalAmount: true },
      });
      projects = dbProjects.length > 0
        ? dbProjects.map((p) => ({ ...p, goalAmount: parseFloat(String(p.goalAmount)) }))
        : SAMPLE_PROJECTS;
    } catch {
      projects = SAMPLE_PROJECTS;
    }

    const userPrompt = `Donor answers:
${JSON.stringify(answers, null, 2)}

Available projects:
${JSON.stringify(projects, null, 2)}`;

    const anthropic = new Anthropic();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    const recommendations = JSON.parse(textBlock.text);

    // Store donor preferences if email provided
    if (email) {
      await prisma.donorPreference.create({
        data: {
          email,
          answers,
          recommendations,
        },
      });
    }

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Donor matching error:", error);
    return NextResponse.json(
      { error: "Unable to generate recommendations. Please try again." },
      { status: 500 }
    );
  }
}

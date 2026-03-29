import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a nonprofit vetting analyst for Firsthand Foundation, a verified impact giving platform. Evaluate this partner application on a 0-100 scale across exactly 5 dimensions worth 20 points each:
1. Organisational Legitimacy (0-20): Is the org registered, how long operating, any red flags?
2. Project Specificity (0-20): Is the need concrete and bounded, or vague and programmatic?
3. Budget Realism (0-20): Does the budget make sense for the scope, region, and milestone structure?
4. Impact Measurability (0-20): Can completion actually be independently verified with photos/GPS?
5. Geographic Feasibility (0-20): Do we have payment infrastructure in this region (M-Pesa for Kenya, Stripe for North America)?

Return ONLY valid JSON in exactly this structure, no other text:
{
  "total": number (0-100),
  "dimensions": {
    "legitimacy": number,
    "specificity": number,
    "budget": number,
    "measurability": number,
    "feasibility": number
  },
  "flag": "APPROVE" | "REVIEW" | "DECLINE",
  "flags": string[] (array of specific concerns or positive signals),
  "questions": string[] (2-3 follow-up questions to ask the applicant),
  "summary": string (2-sentence summary for the admin reviewer)
}`;

export async function POST(req: NextRequest) {
  try {
    const { applicationId } = await req.json();

    if (!applicationId) {
      return NextResponse.json({ error: "applicationId is required" }, { status: 400 });
    }

    const application = await prisma.partnerApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Build the user prompt from application data
    const userPrompt = `Please evaluate this partner application:

Organisation: ${application.orgName}
Country: ${application.orgCountry}
Registration Number: ${application.orgRegistrationNumber || "Not provided"}
Contact: ${application.contactName} (${application.contactEmail})
Mission: ${application.missionStatement}

Project Description: ${application.projectDescription}
Budget: $${application.budgetEstimate} USD
Supporting Documents: ${application.supportingDocUrls.length > 0 ? application.supportingDocUrls.join(", ") : "None uploaded"}

Status: ${application.status}`;

    const anthropic = new Anthropic();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Extract text content from the response
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    const aiScore = JSON.parse(textBlock.text);

    // Update the application with the AI score
    await prisma.partnerApplication.update({
      where: { id: applicationId },
      data: {
        aiScore,
        status: "AI_SCREENED",
      },
    });

    return NextResponse.json({ aiScore });
  } catch (error) {
    console.error("AI screening error:", error);
    return NextResponse.json(
      { error: "AI screening failed. Application queued for manual review." },
      { status: 500 }
    );
  }
}

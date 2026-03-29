import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const orgName = formData.get("orgName") as string;
    const orgCountry = formData.get("orgCountry") as string;
    const orgRegistrationNumber = formData.get("orgRegistrationNumber") as string;
    const contactName = formData.get("contactName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const missionStatement = formData.get("missionStatement") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const budget = formData.get("budget") as string;

    // Capture additional fields for richer AI screening context
    const projectTitle = (formData.get("projectTitle") as string) || "";
    const category = (formData.get("category") as string) || "";
    const projectCountry = (formData.get("projectCountry") as string) || "";
    const location = (formData.get("location") as string) || "";
    const gpsCoordinates = (formData.get("gpsCoordinates") as string) || "";
    const impactCount = (formData.get("impactCount") as string) || "";
    const timeline = (formData.get("timeline") as string) || "";
    const evidencePlan = (formData.get("evidencePlan") as string) || "";
    const paymentMethod = (formData.get("paymentMethod") as string) || "";
    const yearFounded = (formData.get("yearFounded") as string) || "";
    const staffCount = (formData.get("staffCount") as string) || "";
    const milestones = (formData.get("milestones") as string) || "[]";

    // Build enriched project description for AI screening
    const enrichedDescription = [
      projectTitle && `Project Title: ${projectTitle}`,
      category && `Category: ${category}`,
      projectCountry && `Project Country: ${projectCountry}`,
      location && `Location: ${location}`,
      gpsCoordinates && `GPS: ${gpsCoordinates}`,
      `Description: ${projectDescription}`,
      impactCount && `Beneficiaries: ${impactCount}`,
      timeline && `Timeline: ${timeline}`,
      evidencePlan && `Evidence Plan: ${evidencePlan}`,
      paymentMethod && `Payment Method: ${paymentMethod}`,
      yearFounded && `Year Founded: ${yearFounded}`,
      staffCount && `Staff Count: ${staffCount}`,
      milestones !== "[]" && `Milestones: ${milestones}`,
    ].filter(Boolean).join("\n");

    // TODO: Upload files to Supabase Storage bucket "partner-docs"

    const application = await prisma.partnerApplication.create({
      data: {
        orgName,
        orgCountry,
        orgRegistrationNumber,
        contactName,
        contactEmail,
        missionStatement,
        projectDescription: enrichedDescription,
        budgetEstimate: parseFloat(budget) || 0,
        supportingDocUrls: [],
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        refNumber: `FH-${new Date().getFullYear()}-${application.id.slice(-4).toUpperCase()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await prisma.partnerApplication.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

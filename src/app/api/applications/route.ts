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

    // TODO: Upload files to Supabase Storage bucket "partner-docs"
    // const registrationFile = formData.get("registration") as File;
    // const sitePhotoFile = formData.get("sitePhoto") as File;
    // const endorsementFile = formData.get("endorsement") as File;
    // const financialFile = formData.get("financial") as File;

    const application = await prisma.partnerApplication.create({
      data: {
        orgName,
        orgCountry,
        orgRegistrationNumber,
        contactName,
        contactEmail,
        missionStatement,
        projectDescription,
        budgetEstimate: parseFloat(budget) || 0,
        supportingDocUrls: [],
        // TODO: Phase 2 — trigger AI screening via Anthropic Claude API
        // aiScore will be populated by the AI screening pipeline
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

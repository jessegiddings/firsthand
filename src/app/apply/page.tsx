"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";

const applicationSchema = z.object({
  orgName: z.string().min(1, "Required"),
  orgCountry: z.string().min(1, "Required"),
  orgRegistrationNumber: z.string().min(1, "Required"),
  yearFounded: z.string().min(1, "Required"),
  website: z.string().optional(),
  staffCount: z.string().min(1, "Required"),
  missionStatement: z.string().min(10, "Required"),
  contactName: z.string().min(1, "Required"),
  contactTitle: z.string().optional(),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().optional(),
  projectTitle: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  projectCountry: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  gpsCoordinates: z.string().optional(),
  projectDescription: z.string().min(20, "Required"),
  impactCount: z.string().min(1, "Required"),
  timeline: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  evidencePlan: z.string().min(10, "Required"),
  verificationContact: z.string().optional(),
  paymentMethod: z.string().min(1, "Required"),
  paymentDetail: z.string().optional(),
});

type ApplicationData = z.infer<typeof applicationSchema>;

interface Milestone {
  description: string;
  amount: string;
}

const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "India", "Bangladesh", "Nepal", "Canada", "United States", "United Kingdom", "Australia", "Other"];
const categories = ["Education — Infrastructure", "Education — Scholarships", "Clean Water & Sanitation", "Healthcare & Medical", "Food Security & Agriculture", "Economic Empowerment", "Housing & Shelter", "Environmental", "Youth Development", "Other"];
const timelines = ["1–3 months", "3–6 months", "6–12 months", "12+ months"];
const staffOptions = ["1–5", "6–20", "21–50", "51–200", "200+"];
const paymentMethods = ["M-Pesa (Kenya/East Africa)", "Bank Transfer (USD/CAD/GBP)", "Stripe (International)", "Other mobile money"];

export default function ApplyPage() {
  const [stage, setStage] = useState(0);
  const [eligAnswers, setEligAnswers] = useState<Record<string, string>>({});
  const [milestones, setMilestones] = useState<Milestone[]>([
    { description: "", amount: "" },
    { description: "", amount: "" },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
  });

  const stages = ["Eligibility", "Organisation", "Project", "Evidence", "Review"];

  const selectElig = (key: string, value: string) => {
    setEligAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const eligAllYes = Object.keys(eligAnswers).length === 4 && !Object.values(eligAnswers).includes("no");
  const eligHasFail = Object.values(eligAnswers).includes("no");

  const goToStage = async (n: number) => {
    // Validate current stage before advancing
    if (n > stage) {
      if (stage === 1) {
        const valid = await trigger(["orgName", "orgCountry", "orgRegistrationNumber", "yearFounded", "staffCount", "missionStatement", "contactName", "contactEmail"]);
        if (!valid) return;
      }
      if (stage === 2) {
        const valid = await trigger(["projectTitle", "category", "projectCountry", "location", "projectDescription", "impactCount", "timeline", "budget", "evidencePlan"]);
        if (!valid) return;
      }
      if (stage === 3) {
        const valid = await trigger(["paymentMethod"]);
        if (!valid) return;
      }
    }
    setStage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addMilestone = () => {
    setMilestones((prev) => [...prev, { description: "", amount: "" }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    setMilestones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const handleFileUpload = (key: string, files: FileList | null) => {
    if (!files) return;
    setUploadedFiles((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), ...Array.from(files)],
    }));
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const values = getValues();
      const formData = new FormData();

      // Add form fields
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Add milestones as JSON
      formData.append("milestones", JSON.stringify(milestones));

      // Add files
      Object.entries(uploadedFiles).forEach(([key, files]) => {
        files.forEach((file) => formData.append(key, file));
      });

      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setRefNumber(data.refNumber || "FH-2025-" + Math.random().toString().slice(2, 6));
        setSubmitted(true);
        setStage(5);
      }
    } catch {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <div className="flex gap-1">
          <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">
            Apply as Partner
          </span>
        </div>
      </nav>

      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        {stage < 5 && (
          <>
            <div className="mb-10">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-terra mb-3 flex items-center gap-2">
                <span className="block w-5 h-px bg-terra" />
                Community Partner Application
              </div>
              <h1 className="font-display text-[clamp(28px,4vw,40px)] font-black leading-[1.1] tracking-[-0.02em] mb-4">
                Apply to list your<br />project on Firsthand
              </h1>
              <p className="text-sm text-gray leading-[1.7] max-w-[560px]">
                We connect verified community needs directly to aligned donors. Applications are reviewed by our AI screening system and a human team. Most decisions within 5 business days.
              </p>
            </div>

            {/* Stage Indicator */}
            <div className="flex items-center gap-0 mb-10 overflow-x-auto">
              {stages.map((label, i) => (
                <div key={label} className="flex items-center">
                  <div className={cn("flex items-center gap-2 px-1", i <= stage ? "opacity-100" : "opacity-40")}>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                        i < stage
                          ? "bg-sage text-white"
                          : i === stage
                          ? "bg-terra text-white"
                          : "bg-dust text-gray"
                      )}
                    >
                      {i < stage ? "\u2713" : i + 1}
                    </div>
                    <span className="text-[11px] font-medium text-ink whitespace-nowrap hidden sm:inline">
                      {label}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className={cn("w-8 h-px mx-1", i < stage ? "bg-sage" : "bg-dust")} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Stage 0: Eligibility */}
        {stage === 0 && (
          <div className="space-y-6">
            {[
              {
                key: "e1",
                q: "1. Is your organisation registered with a government authority?",
                opts: [
                  { label: "Yes, registered nonprofit / NGO", val: "yes" },
                  { label: "Yes, community cooperative", val: "yes" },
                  { label: "No, we are informal", val: "no" },
                ],
              },
              {
                key: "e2",
                q: "2. Does your project have a specific, measurable outcome?",
                opts: [
                  { label: "Yes \u2014 a specific thing will be built or delivered", val: "yes" },
                  { label: "No \u2014 it is an ongoing program or operating cost", val: "no" },
                ],
              },
              {
                key: "e3",
                q: "3. Is the total project budget between $500 and $50,000 USD?",
                opts: [
                  { label: "Yes", val: "yes" },
                  { label: "No, it is larger", val: "no" },
                  { label: "No, it is smaller", val: "no" },
                ],
              },
              {
                key: "e4",
                q: "4. Can completion be evidenced with photos, GPS, and community testimony?",
                opts: [
                  { label: "Yes \u2014 physical, verifiable outcome", val: "yes" },
                  { label: "No \u2014 primarily behavioural or attitudinal change", val: "no" },
                ],
              },
            ].map((item) => (
              <div key={item.key} className="bg-white border border-rule rounded-lg p-6">
                <div className="text-sm font-semibold text-ink mb-4">{item.q}</div>
                <div className="flex flex-wrap gap-2">
                  {item.opts.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => selectElig(item.key, opt.val)}
                      className={cn(
                        "px-4 py-2.5 rounded-md text-xs font-medium border transition-all cursor-pointer",
                        eligAnswers[item.key] === opt.val && opt.val === "yes"
                          ? "bg-sage text-white border-sage"
                          : eligAnswers[item.key] === opt.val && opt.val === "no"
                          ? "bg-red-bg text-red border-red/30"
                          : "bg-white text-ink-soft border-rule hover:border-terra"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {eligHasFail && (
              <div className="bg-red-bg border border-red/20 rounded-lg p-6">
                <h4 className="text-sm font-semibold text-red mb-2">This project may not be a fit right now</h4>
                <p className="text-xs text-gray leading-[1.7]">
                  Firsthand currently supports specific, bounded, verifiable projects between $500&ndash;$50,000 USD with registered organisations.
                  Contact us at <a href="mailto:hello@firsthand-foundation.com" className="text-terra">hello@firsthand-foundation.com</a> if you think there&apos;s still a fit.
                </p>
              </div>
            )}

            {eligAllYes && (
              <div className="flex justify-end">
                <button
                  onClick={() => goToStage(1)}
                  className="px-7 py-3.5 bg-terra text-white rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light"
                >
                  Continue to Application &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 1: Organisation */}
        {stage === 1 && (
          <div className="space-y-8">
            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Organisation Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Organisation Name <span className="text-terra">*</span></label>
                  <input {...register("orgName")} placeholder="e.g. Lwala Community Alliance" className="form-input" />
                  {errors.orgName && <span className="text-xs text-red">{errors.orgName.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Country of Registration <span className="text-terra">*</span></label>
                  <select {...register("orgCountry")} className="form-input">
                    <option value="">Select country...</option>
                    {countries.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errors.orgCountry && <span className="text-xs text-red">{errors.orgCountry.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Registration / Charity Number <span className="text-terra">*</span></label>
                  <input {...register("orgRegistrationNumber")} placeholder="e.g. NGO/1234/2018" className="form-input" />
                  <span className="text-[11px] text-lgray">Cross-referenced against public charity registries.</span>
                  {errors.orgRegistrationNumber && <span className="text-xs text-red">{errors.orgRegistrationNumber.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Year Founded <span className="text-terra">*</span></label>
                  <input {...register("yearFounded")} type="number" placeholder="e.g. 2015" min={1900} max={2026} className="form-input" />
                  {errors.yearFounded && <span className="text-xs text-red">{errors.yearFounded.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Organisation Website</label>
                  <input {...register("website")} type="url" placeholder="https://yourorg.org" className="form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Full-time Staff Count <span className="text-terra">*</span></label>
                  <select {...register("staffCount")} className="form-input">
                    <option value="">Select...</option>
                    {staffOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  {errors.staffCount && <span className="text-xs text-red">{errors.staffCount.message}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Mission Statement <span className="text-terra">*</span></label>
                <textarea {...register("missionStatement")} placeholder="In 2\u20133 sentences, describe what your organisation does and who it serves." className="form-input resize-y min-h-[80px]" />
                {errors.missionStatement && <span className="text-xs text-red">{errors.missionStatement.message}</span>}
              </div>
            </div>

            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Primary Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Contact Name <span className="text-terra">*</span></label>
                  <input {...register("contactName")} placeholder="Full name" className="form-input" />
                  {errors.contactName && <span className="text-xs text-red">{errors.contactName.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Title / Role</label>
                  <input {...register("contactTitle")} placeholder="e.g. Executive Director" className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Email Address <span className="text-terra">*</span></label>
                  <input {...register("contactEmail")} type="email" placeholder="you@yourorg.org" className="form-input" />
                  {errors.contactEmail && <span className="text-xs text-red">{errors.contactEmail.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input {...register("contactPhone")} type="tel" placeholder="+254 700 000000" className="form-input" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => goToStage(0)} className="px-6 py-3 bg-white text-ink border border-rule rounded-md text-sm font-semibold cursor-pointer hover:border-ink transition-colors">&larr; Back</button>
              <button onClick={() => goToStage(2)} className="px-7 py-3.5 bg-terra text-white rounded-md text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light">Continue &rarr;</button>
            </div>
          </div>
        )}

        {/* Stage 2: Project */}
        {stage === 2 && (
          <div className="space-y-8">
            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Project Details</h3>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Project Title <span className="text-terra">*</span></label>
                <input {...register("projectTitle")} placeholder="e.g. Classroom Roof Repair \u2014 Eldoret Primary School" className="form-input" />
                {errors.projectTitle && <span className="text-xs text-red">{errors.projectTitle.message}</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Category <span className="text-terra">*</span></label>
                  <select {...register("category")} className="form-input">
                    <option value="">Select...</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errors.category && <span className="text-xs text-red">{errors.category.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Project Country <span className="text-terra">*</span></label>
                  <select {...register("projectCountry")} className="form-input">
                    <option value="">Select...</option>
                    {countries.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errors.projectCountry && <span className="text-xs text-red">{errors.projectCountry.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Village / Town / Region <span className="text-terra">*</span></label>
                  <input {...register("location")} placeholder="e.g. Eldoret, Uasin Gishu County" className="form-input" />
                  {errors.location && <span className="text-xs text-red">{errors.location.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">GPS Coordinates (if known)</label>
                  <input {...register("gpsCoordinates")} placeholder="e.g. 0.5143\u00b0 N, 35.2698\u00b0 E" className="form-input" />
                  <span className="text-[11px] text-lgray">Or describe how to find the site.</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Project Description <span className="text-terra">*</span></label>
                <textarea {...register("projectDescription")} placeholder="Describe the specific need, who will benefit, and what will be different when this project is complete." className="form-input resize-y min-h-[120px]" />
                {errors.projectDescription && <span className="text-xs text-red">{errors.projectDescription.message}</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Community Members Directly Impacted <span className="text-terra">*</span></label>
                  <input {...register("impactCount")} type="number" placeholder="e.g. 180" className="form-input" />
                  {errors.impactCount && <span className="text-xs text-red">{errors.impactCount.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Expected Completion Timeline <span className="text-terra">*</span></label>
                  <select {...register("timeline")} className="form-input">
                    <option value="">Select...</option>
                    {timelines.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {errors.timeline && <span className="text-xs text-red">{errors.timeline.message}</span>}
                </div>
              </div>
            </div>

            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Budget & Milestones</h3>
              <div className="flex flex-col gap-1.5 max-w-[260px]">
                <label className="form-label">Total Project Budget (USD) <span className="text-terra">*</span></label>
                <input {...register("budget")} type="number" placeholder="e.g. 8500" min={500} max={50000} className="form-input" />
                {errors.budget && <span className="text-xs text-red">{errors.budget.message}</span>}
              </div>
              <p className="text-[11px] text-lgray leading-[1.6]">Break your project into 2\u20134 milestones. Funds release only when each milestone is independently verified.</p>

              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <div key={i} className="bg-paper border border-rule rounded-lg p-4">
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-terra mb-3">
                      Milestone {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          value={m.description}
                          onChange={(e) => updateMilestone(i, "description", e.target.value)}
                          placeholder="e.g. Materials purchased and delivered to site"
                          className="form-input text-sm"
                        />
                      </div>
                      <div className="w-[120px]">
                        <input
                          value={m.amount}
                          onChange={(e) => updateMilestone(i, "amount", e.target.value)}
                          type="number"
                          placeholder="USD"
                          className="form-input text-sm"
                        />
                      </div>
                      {milestones.length > 2 && (
                        <button onClick={() => removeMilestone(i)} className="w-8 h-8 rounded-full bg-red-bg text-red flex items-center justify-center text-lg cursor-pointer border-none hover:bg-red/10" title="Remove">
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {milestones.length < 5 && (
                <button onClick={addMilestone} className="text-xs font-semibold text-terra cursor-pointer bg-transparent border-none hover:underline">
                  + Add another milestone
                </button>
              )}
            </div>

            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Verification Plan</h3>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">How will completion be evidenced? <span className="text-terra">*</span></label>
                <textarea {...register("evidencePlan")} placeholder="Describe exactly what photos, documents, or testimony you will submit as evidence of completion." className="form-input resize-y min-h-[90px]" />
                {errors.evidencePlan && <span className="text-xs text-red">{errors.evidencePlan.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Local Verification Contact</label>
                <input {...register("verificationContact")} placeholder="Name and role of the person who will submit field evidence" className="form-input" />
                <span className="text-[11px] text-lgray">This person will be Firsthand&apos;s point of contact for milestone verification.</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => goToStage(1)} className="px-6 py-3 bg-white text-ink border border-rule rounded-md text-sm font-semibold cursor-pointer hover:border-ink transition-colors">&larr; Back</button>
              <button onClick={() => goToStage(3)} className="px-7 py-3.5 bg-terra text-white rounded-md text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light">Continue &rarr;</button>
            </div>
          </div>
        )}

        {/* Stage 3: Evidence / Documents */}
        {stage === 3 && (
          <div className="space-y-8">
            <div className="bg-white border border-rule rounded-lg p-6 space-y-6">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Supporting Documents</h3>
              <p className="text-[13px] text-gray leading-[1.6]">Upload supporting documents. All files are stored securely and only accessed by Firsthand&apos;s review team and AI screening system.</p>

              {[
                { key: "registration", label: "Registration Certificate", icon: "\ud83d\udcc4", desc: "Upload registration document", hint: "PDF, JPG, PNG \u00b7 Max 10MB", required: true },
                { key: "sitePhoto", label: "Site / Community Photo", icon: "\ud83d\udcf7", desc: "Upload a photo of the project site or community", hint: "JPG, PNG \u00b7 Max 10MB", required: true },
                { key: "endorsement", label: "Community Endorsement Letter", icon: "\u2709\ufe0f", desc: "Upload a letter from community leadership", hint: "PDF \u00b7 Max 10MB", required: true },
                { key: "financial", label: "Financial Statement (optional)", icon: "\ud83d\udcca", desc: "Upload most recent financial report or budget", hint: "PDF \u00b7 Max 10MB", required: false },
              ].map((doc) => (
                <div key={doc.key}>
                  <div className="form-label mb-1.5">
                    {doc.label} {doc.required && <span className="text-terra">*</span>}
                  </div>
                  <label className="border-2 border-dashed border-dust rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-terra transition-colors bg-paper">
                    <div className="text-2xl">{doc.icon}</div>
                    <h4 className="text-sm font-semibold text-ink">{doc.desc}</h4>
                    <p className="text-xs text-lgray">{doc.hint}</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files)}
                    />
                  </label>
                  {uploadedFiles[doc.key]?.map((f, i) => (
                    <div key={i} className="mt-2 flex items-center gap-2 text-xs text-sage bg-sage-light px-3 py-1.5 rounded">
                      \u2713 {f.name} ({(f.size / 1024).toFixed(0)} KB)
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold border-b border-rule pb-3">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Preferred Payment Method <span className="text-terra">*</span></label>
                  <select {...register("paymentMethod")} className="form-input">
                    <option value="">Select...</option>
                    {paymentMethods.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  {errors.paymentMethod && <span className="text-xs text-red">{errors.paymentMethod.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="form-label">Payment Phone / Account Number</label>
                  <input {...register("paymentDetail")} placeholder="e.g. +254 700 000000" className="form-input" />
                  <span className="text-[11px] text-lgray">Used for milestone fund disbursements only.</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => goToStage(2)} className="px-6 py-3 bg-white text-ink border border-rule rounded-md text-sm font-semibold cursor-pointer hover:border-ink transition-colors">&larr; Back</button>
              <button onClick={() => goToStage(4)} className="px-7 py-3.5 bg-terra text-white rounded-md text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light">Review Application &rarr;</button>
            </div>
          </div>
        )}

        {/* Stage 4: Review */}
        {stage === 4 && (
          <div className="space-y-6">
            <div>
              <div className="text-[15px] font-semibold mb-1.5">Review your application</div>
              <div className="text-[13px] text-gray leading-[1.6]">Check everything below before submitting. Once submitted, your application enters AI screening immediately.</div>
            </div>

            {/* Organisation Review */}
            <div className="bg-white border border-rule rounded-lg p-6">
              <div className="flex items-center justify-between border-b border-rule pb-3 mb-4">
                <h4 className="font-display text-base font-bold">Organisation</h4>
                <button onClick={() => goToStage(1)} className="text-xs text-terra font-semibold cursor-pointer bg-transparent border-none hover:underline">Edit</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ["Name", getValues("orgName")],
                  ["Country", getValues("orgCountry")],
                  ["Reg. Number", getValues("orgRegistrationNumber")],
                  ["Founded", getValues("yearFounded")],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-lgray mb-0.5">{label}</div>
                    <div className="text-sm text-ink">{value || "\u2014"}</div>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-lgray mb-0.5">Mission</div>
                  <div className="text-sm text-ink">{getValues("missionStatement") || "\u2014"}</div>
                </div>
              </div>
            </div>

            {/* Project Review */}
            <div className="bg-white border border-rule rounded-lg p-6">
              <div className="flex items-center justify-between border-b border-rule pb-3 mb-4">
                <h4 className="font-display text-base font-bold">Project</h4>
                <button onClick={() => goToStage(2)} className="text-xs text-terra font-semibold cursor-pointer bg-transparent border-none hover:underline">Edit</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-lgray mb-0.5">Title</div>
                  <div className="text-sm text-ink">{getValues("projectTitle") || "\u2014"}</div>
                </div>
                {[
                  ["Category", getValues("category")],
                  ["Location", getValues("location")],
                  ["Budget", getValues("budget") ? `$${Number(getValues("budget")).toLocaleString()} USD` : "\u2014"],
                  ["Timeline", getValues("timeline")],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-lgray mb-0.5">{label}</div>
                    <div className="text-sm text-ink">{value || "\u2014"}</div>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-lgray mb-0.5">Description</div>
                  <div className="text-sm text-ink">{getValues("projectDescription") || "\u2014"}</div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-[#fff3ee] border border-[#e8c0a8] rounded-lg p-4">
              <div className="text-xs font-semibold text-terra mb-1.5">What happens after you submit</div>
              <div className="text-xs text-gray leading-[1.7]">
                1. Our AI screening system reviews your application immediately &mdash; typically within minutes.<br />
                2. A Firsthand team member reviews the AI score and makes a final decision within 5 business days.<br />
                3. You&apos;ll receive an email with the outcome and, if approved, next steps to go live on the platform.
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => goToStage(3)} className="px-6 py-3 bg-white text-ink border border-rule rounded-md text-sm font-semibold cursor-pointer hover:border-ink transition-colors">&larr; Back</button>
              <button
                onClick={onSubmit}
                disabled={submitting}
                className="px-7 py-3.5 bg-terra text-white rounded-md text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Application \u2192"}
              </button>
            </div>
          </div>
        )}

        {/* Stage 5: Confirmation */}
        {stage === 5 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-sage text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">\u2713</div>
            <h2 className="font-display text-[28px] font-bold mb-3">Application submitted.</h2>
            <p className="text-sm text-gray leading-[1.7] max-w-[400px] mx-auto mb-6">
              Your application is now in AI screening. A member of the Firsthand team will review the results and be in touch within 5 business days.
            </p>
            <div className="font-mono text-xs tracking-[0.15em] text-terra bg-terra-pale px-4 py-2 rounded inline-block mb-6">
              REF: {refNumber}
            </div>
            <p className="text-[13px] text-lgray">
              Save your reference number. Questions?{" "}
              <a href="mailto:hello@firsthand-foundation.com" className="text-terra">hello@firsthand-foundation.com</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const evidenceSchema = z.object({
  description: z.string().min(20, "Please describe the evidence in at least 20 characters"),
});

type EvidenceFormData = z.infer<typeof evidenceSchema>;

export default function SubmitEvidencePage({ params }: { params: { id: string } }) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<EvidenceFormData>({
    resolver: zodResolver(evidenceSchema),
  });

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch {
      alert("Could not access microphone");
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  const onSubmit = async (data: EvidenceFormData) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("milestoneId", params.id);
      formData.append("description", data.description);
      photos.forEach((photo) => formData.append("photos", photo));
      if (audioBlob) formData.append("communityVoice", audioBlob, "voice-recording.webm");

      // Get GPS if available
      if (navigator.geolocation) {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
        ).catch(() => null);
        if (pos) {
          formData.append("gpsLat", pos.coords.latitude.toString());
          formData.append("gpsLng", pos.coords.longitude.toString());
          formData.append("gpsAccuracy", pos.coords.accuracy.toString());
        }
      }

      const res = await fetch("/api/evidence", { method: "POST", body: formData });
      if (res.ok) setSubmitted(true);
    } catch {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper">
        <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
            First<em className="text-white not-italic font-display italic">hand</em>
          </Link>
        </nav>
        <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-sage text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">✓</div>
          <h2 className="font-display text-[28px] font-bold mb-3">Evidence submitted.</h2>
          <p className="text-sm text-gray leading-[1.7] mb-8">
            Your evidence is now being reviewed by Firsthand&apos;s AI verification system. You&apos;ll receive a notification when verification is complete.
          </p>
          <Link href="/partner/dashboard" className="px-7 py-3.5 bg-terra text-white rounded-md text-sm font-semibold no-underline hover:bg-terra-light transition-colors inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
      </nav>

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-10">
        <Link href="/partner/dashboard" className="text-sm text-terra no-underline hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="font-mono text-[10px] tracking-[0.2em] text-terra uppercase mb-2 flex items-center gap-2">
            <span className="block w-5 h-px bg-terra" />
            Milestone Evidence
          </div>
          <h1 className="font-display text-[28px] font-black tracking-[-0.02em] mb-2">Submit Evidence</h1>
          <p className="text-sm text-gray leading-[1.7]">
            Upload photos, record community voice, and describe the milestone completion. GPS data will be captured automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Photos */}
          <div className="bg-white border border-rule rounded-lg p-6">
            <h3 className="font-display text-lg font-bold border-b border-rule pb-3 mb-5">Photo Evidence</h3>
            <label className="border-2 border-dashed border-dust rounded-lg p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-terra transition-colors bg-paper">
              <div className="text-3xl">📷</div>
              <h4 className="text-sm font-semibold text-ink">Upload milestone photos</h4>
              <p className="text-xs text-lgray">JPG, PNG · Max 10MB each · GPS metadata preferred</p>
              <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handlePhotoUpload(e.target.files)} />
            </label>
            {photos.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {photos.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-sage bg-sage-light px-3 py-1.5 rounded">
                    ✓ {f.name} ({(f.size / 1024).toFixed(0)} KB)
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Community Voice */}
          <div className="bg-white border border-rule rounded-lg p-6">
            <h3 className="font-display text-lg font-bold border-b border-rule pb-3 mb-5">Community Voice</h3>
            <p className="text-xs text-gray mb-4 leading-[1.6]">
              Record a short message from the community in any language. This will be transcribed and translated automatically.
            </p>
            <div className="flex items-center gap-3">
              {!recording ? (
                <button type="button" onClick={startRecording} className="px-5 py-2.5 bg-terra text-white rounded-md text-xs font-semibold cursor-pointer border-none hover:bg-terra-light transition-colors">
                  🎙 Start Recording
                </button>
              ) : (
                <button type="button" onClick={stopRecording} className="px-5 py-2.5 bg-red text-white rounded-md text-xs font-semibold cursor-pointer border-none animate-pulse">
                  ⏹ Stop Recording
                </button>
              )}
              {audioBlob && <span className="text-xs text-sage">✓ Recording captured</span>}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-rule rounded-lg p-6">
            <h3 className="font-display text-lg font-bold border-b border-rule pb-3 mb-5">Description</h3>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Describe what was accomplished <span className="text-terra">*</span></label>
              <textarea
                {...register("description")}
                placeholder="Describe what was completed, who was involved, and any relevant details for verification..."
                className="form-input resize-y min-h-[120px]"
              />
              {errors.description && <span className="text-xs text-red">{errors.description.message}</span>}
            </div>
          </div>

          {/* GPS Notice */}
          <div className="bg-[#f0f4f1] border border-sage/20 rounded-lg p-4 flex gap-3 items-start">
            <span className="text-lg">📍</span>
            <div>
              <div className="text-xs font-semibold text-sage mb-0.5">GPS Location</div>
              <p className="text-xs text-gray leading-[1.6]">Your GPS coordinates will be captured automatically when you submit. This helps verify that evidence was submitted from the project location.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || photos.length === 0}
            className="w-full px-7 py-4 bg-terra text-white rounded-md text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light disabled:opacity-50"
          >
            {submitting ? "Submitting Evidence..." : "Submit Evidence for Verification →"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export function DonorWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  async function onSubmit(data: WaitlistFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "DONOR" }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Handle error silently for now
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-[480px] mx-auto text-center py-6">
        <div className="text-[32px] mb-3">✓</div>
        <h3 className="font-display text-[22px] font-bold text-white mb-2">
          You&apos;re on the list.
        </h3>
        <p className="text-white/60 text-sm">
          We&apos;ll be in touch when Firsthand opens its doors.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("name")}
          placeholder="Your name"
          className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none transition-colors duration-150 bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60"
        />
        {errors.name && (
          <span className="text-xs text-red-bg text-left">{errors.name.message}</span>
        )}
        <input
          {...register("email")}
          type="email"
          placeholder="Your email address"
          className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none transition-colors duration-150 bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60"
        />
        {errors.email && (
          <span className="text-xs text-red-bg text-left">{errors.email.message}</span>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-7 py-3.5 bg-terra text-white rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-colors duration-150 hover:bg-terra-light disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Waitlist →"}
        </button>
      </form>
      <p className="text-xs text-white/40 mt-3 text-center">
        No spam. We&apos;ll reach out when Firsthand launches.
      </p>
    </div>
  );
}

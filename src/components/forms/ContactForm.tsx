"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  type: z.string().min(1),
  message: z.string().min(10, "Please enter at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "Donor / Individual" },
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h3 className="font-display text-[28px] font-bold mb-3 text-sage">
          Message received.
        </h3>
        <p className="text-ink-soft text-[15px] leading-[1.7]">
          Thank you for reaching out. We&apos;ll be in touch within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-[28px] font-bold mb-8">Send us a message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-[440px]">
        <div className="flex flex-col gap-2">
          <label className="form-label">Your Name</label>
          <input {...register("name")} placeholder="Full name" className="form-input" />
          {errors.name && <span className="text-xs text-red">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="form-label">Email</label>
          <input {...register("email")} type="email" placeholder="you@example.com" className="form-input" />
          {errors.email && <span className="text-xs text-red">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="form-label">I Am A</label>
          <select {...register("type")} className="form-input">
            <option>Donor / Individual</option>
            <option>Corporate / CSR Partner</option>
            <option>Community Organization</option>
            <option>Investor / Advisor</option>
            <option>Press / Media</option>
            <option>Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="form-label">Message</label>
          <textarea
            {...register("message")}
            placeholder="Tell us a bit about yourself and what brought you here..."
            className="form-input resize-y min-h-[120px] leading-relaxed"
          />
          {errors.message && <span className="text-xs text-red">{errors.message.message}</span>}
        </div>
        <Button type="submit" variant="primary" className="self-start" disabled={loading}>
          {loading ? "Sending..." : "Send Message →"}
        </Button>
      </form>
    </div>
  );
}

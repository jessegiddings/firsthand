"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Recommendation {
  project_id: string;
  project_title: string;
  reason: string;
}

interface MatchResult {
  recommendations: Recommendation[];
  intro: string;
}

const questions = [
  {
    id: "region",
    question: "Where do you want your giving to have impact?",
    options: ["Kenya", "India", "Canada & USA", "Anywhere"],
  },
  {
    id: "cause",
    question: "Which cause matters most to you?",
    options: ["Education", "Clean Water & Health", "Economic Empowerment", "Food Security", "Any cause"],
  },
  {
    id: "style",
    question: "How do you prefer to give?",
    options: ["One specific project at a time", "A portfolio of projects", "Monthly recurring", "I'm not sure yet"],
  },
  {
    id: "budget",
    question: "What giving range feels right to start?",
    options: ["Under $100", "$100–$500", "$500–$2,500", "$2,500+"],
  },
  {
    id: "story",
    question: "Which of these moves you most?",
    options: [
      "A classroom that stays dry in the rain",
      "A woman who grew her business",
      "A girl who stayed in school",
      "A community that built something together",
    ],
  },
];

export default function ForDonorsPage() {
  const [phase, setPhase] = useState<"intro" | "questions" | "loading" | "results" | "waitlist" | "done">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const selectAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Animate transition
    setFadeIn(false);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // All questions answered — get recommendations
        setPhase("loading");
        fetchRecommendations(newAnswers);
      }
      setFadeIn(true);
    }, 300);
  };

  const fetchRecommendations = async (donorAnswers: Record<string, string>) => {
    try {
      const res = await fetch("/api/donor-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: donorAnswers }),
      });
      if (res.ok) {
        const data = await res.json();
        setMatchResult(data);
        setPhase("results");
      } else {
        setPhase("waitlist");
      }
    } catch {
      setPhase("waitlist");
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      // Save to donor preferences with recommendations
      if (matchResult) {
        await fetch("/api/donor-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, email }),
        });
      }
      // Also add to waitlist
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: "DONOR" }),
      });
      setPhase("done");
    } catch {
      // Still show success
      setPhase("done");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage to-[#2a3d30]">
      {/* Nav */}
      <nav className="px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-white/10 text-white/70">
          For Donors
        </span>
      </nav>

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center">

        {/* Intro */}
        {phase === "intro" && (
          <div className="text-center animate-fade-up">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-6">
              <span className="inline-block w-6 h-px bg-white/30 align-middle mr-3" />
              For Donors
            </div>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] font-black leading-[0.95] tracking-[-0.025em] text-white mb-6">
              Give with certainty.<br />For the first time.
            </h1>
            <p className="text-lg text-white/65 max-w-[480px] mx-auto mb-10 leading-[1.75]">
              Answer five quick questions and we&apos;ll match you with verified projects that align with your values.
            </p>
            <button
              onClick={() => { setPhase("questions"); setFadeIn(true); }}
              className="px-8 py-4 bg-terra text-white rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light"
            >
              Find My Projects &rarr;
            </button>
            <p className="text-xs text-white/30 mt-4">Takes about 30 seconds. No account needed.</p>
          </div>
        )}

        {/* Questions */}
        {phase === "questions" && (
          <div className={cn("transition-all duration-300", fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            {/* Progress */}
            <div className="flex gap-1.5 mb-12 justify-center">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i <= currentQ ? "bg-terra w-8" : "bg-white/20 w-4"
                  )}
                />
              ))}
            </div>

            <div className="text-center mb-10">
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
                Question {currentQ + 1} of {questions.length}
              </div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black leading-[1.1] tracking-[-0.02em] text-white">
                {questions[currentQ].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[520px] mx-auto">
              {questions[currentQ].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => selectAnswer(questions[currentQ].id, opt)}
                  className={cn(
                    "px-5 py-4 rounded-lg text-left text-sm font-medium transition-all duration-200 cursor-pointer border",
                    answers[questions[currentQ].id] === opt
                      ? "bg-terra text-white border-terra"
                      : "bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:border-white/30"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>

            {currentQ > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => { setFadeIn(false); setTimeout(() => { setCurrentQ(currentQ - 1); setFadeIn(true); }, 300); }}
                  className="text-xs text-white/40 hover:text-white/70 cursor-pointer bg-transparent border-none transition-colors"
                >
                  &larr; Back
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {phase === "loading" && (
          <div className="text-center animate-fade-up">
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-terra animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-terra animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-terra animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Finding your perfect projects...</h2>
            <p className="text-sm text-white/50">Matching your values with verified community needs.</p>
          </div>
        )}

        {/* Results */}
        {phase === "results" && matchResult && (
          <div className="animate-fade-up">
            <div className="text-center mb-10">
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">Your Matches</div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black leading-[1.1] tracking-[-0.02em] text-white mb-4">
                We found your projects.
              </h2>
              <p className="text-sm text-white/65 leading-[1.7] max-w-[420px] mx-auto">
                {matchResult.intro}
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {matchResult.recommendations.map((rec, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border-l-4 border-terra">
                  <h3 className="font-display text-lg font-bold text-ink mb-2">{rec.project_title}</h3>
                  <p className="text-sm text-gray leading-[1.7] mb-4">{rec.reason}</p>
                  <button className="px-5 py-2.5 bg-terra text-white rounded-md text-xs font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light">
                    Fund This Project &rarr;
                  </button>
                </div>
              ))}
            </div>

            {/* Waitlist form */}
            <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm border border-white/10">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-bold text-white mb-2">Join the waitlist</h3>
                <p className="text-sm text-white/60">We&apos;ll notify you when these projects go live on the platform.</p>
              </div>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3 max-w-[400px] mx-auto">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60 transition-colors"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email address"
                  required
                  className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-7 py-3.5 bg-terra text-white rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light disabled:opacity-50"
                >
                  {submitting ? "Joining..." : "Join Waitlist \u2192"}
                </button>
                <p className="text-[10px] text-white/35 italic leading-[1.6] mt-2 text-center">
                  Firsthand Foundation is a Wyoming nonprofit corporation. 501(c)(3) tax-exempt status is pending IRS determination. Donations may not be tax-deductible until the determination letter is received.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Waitlist fallback (when AI fails) */}
        {phase === "waitlist" && (
          <div className="animate-fade-up">
            <div className="text-center mb-8">
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black leading-[1.1] tracking-[-0.02em] text-white mb-4">
                Thanks for telling us what matters to you.
              </h2>
              <p className="text-sm text-white/65 leading-[1.7] max-w-[420px] mx-auto">
                We&apos;re curating projects that match your preferences. Join the waitlist and we&apos;ll send your personalised recommendations when we launch.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm border border-white/10">
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3 max-w-[400px] mx-auto">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60 transition-colors"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email address"
                  required
                  className="w-full px-5 py-3.5 font-body text-sm rounded-md outline-none bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:border-white/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-7 py-3.5 bg-terra text-white rounded-md font-body text-sm font-semibold cursor-pointer border-none transition-colors hover:bg-terra-light disabled:opacity-50"
                >
                  {submitting ? "Joining..." : "Join Waitlist \u2192"}
                </button>
                <p className="text-[10px] text-white/35 italic leading-[1.6] mt-2 text-center">
                  Firsthand Foundation is a Wyoming nonprofit corporation. 501(c)(3) tax-exempt status is pending IRS determination. Donations may not be tax-deductible until the determination letter is received.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Done */}
        {phase === "done" && (
          <div className="text-center animate-fade-up">
            <div className="text-[40px] mb-4">✓</div>
            <h2 className="font-display text-[28px] font-bold text-white mb-3">You&apos;re on the list.</h2>
            <p className="text-sm text-white/60 mb-8">We&apos;ll be in touch when Firsthand opens its doors.</p>
            <Link
              href="/"
              className="text-xs text-terra hover:text-terra-light transition-colors no-underline"
            >
              &larr; Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

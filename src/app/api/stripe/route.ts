import { NextResponse } from "next/server";

// TODO: Phase 2 — Stripe payment integration
// - Create PaymentIntent for donations
// - Handle Stripe Connect payouts to partners
// - Process webhook events for payment status updates
// - Manage escrow hold and milestone-gated release

export async function POST() {
  return NextResponse.json(
    { error: "Stripe integration is Phase 2" },
    { status: 501 }
  );
}

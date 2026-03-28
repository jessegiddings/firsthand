import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getResend } from "@/lib/resend";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      from: "Firsthand <hello@firsthand-foundation.com>",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await getResend().emails.send({
          from: "Firsthand <hello@firsthand-foundation.com>",
          to: email,
          subject: "Sign in to Firsthand",
          html: `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
              <h1 style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #111009; margin-bottom: 8px;">
                First<span style="color: #c4683a;">hand</span>
              </h1>
              <p style="color: #6b6560; font-size: 14px; margin-bottom: 32px;">Verified Impact Platform</p>
              <p style="color: #111009; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Click the button below to sign in to your Firsthand account. This link expires in 24 hours.
              </p>
              <a href="${url}" style="display: inline-block; background: #c4683a; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Sign in to Firsthand &rarr;
              </a>
              <p style="color: #b0a898; font-size: 12px; margin-top: 32px; line-height: 1.6;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          `,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
};

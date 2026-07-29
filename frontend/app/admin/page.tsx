import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdminSection from "@/components/admin/AdminSection";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

// This route checks auth on the server (below), so it can't be statically
// prerendered — it has to run per-request.
export const dynamic = "force-dynamic";

// Server-only URL the Next.js server itself uses to reach the backend
// (e.g. the Docker Compose service name), as opposed to NEXT_PUBLIC_API_URL,
// which the *browser* uses and must be a publicly reachable address.
const INTERNAL_API_URL = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function isAuthenticated(): Promise<boolean> {
  const cookieHeader = cookies().toString();
  if (!cookieHeader) return false;

  try {
    const res = await fetch(`${INTERNAL_API_URL}/api/auth/status`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { authenticated?: boolean };
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

export default async function AdminPage() {
  // Real gate: if there's no valid Owl-OS session, this route doesn't just
  // redirect — it renders an actual 404, exactly like any other page that
  // doesn't exist. Nothing about /admin's existence leaks to a signed-out
  // visitor.
  const authed = await isAuthenticated();
  if (!authed) {
    notFound();
  }

  return <AdminSection />;
}

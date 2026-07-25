import type { AdminStatusResponse, OwlAuthResponse, OwlStatusResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function loginOwl(password: string): Promise<OwlAuthResponse> {
  try {
    const res = await fetch(`${API_URL}/api/auth/owl`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json()) as OwlAuthResponse;
    return data;
  } catch {
    return { success: false, message: "cannot reach owl-os backend." };
  }
}

export async function getAuthStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/status`, {
      credentials: "include",
    });
    const data = (await res.json()) as OwlStatusResponse;
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

export async function logoutOwl(): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // best-effort; session cookie will still expire naturally
  }
}

export async function getAdminStatus(): Promise<AdminStatusResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/admin/status`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    return (await res.json()) as AdminStatusResponse;
  } catch {
    return null;
  }
}

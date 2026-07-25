export type Tab = "home" | "about" | "projects" | "contact" | "terminal" | "admin";

export interface OwlAuthResponse {
  success: boolean;
  message: string;
}

export interface OwlStatusResponse {
  authenticated: boolean;
}

export interface AdminStatusResponse {
  uptimeSeconds: number;
  serverTime: string;
  environment: string;
  nodeVersion: string;
  sessionCookieName: string;
}

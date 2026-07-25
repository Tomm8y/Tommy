import "dotenv/config";

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and fill it in.`
    );
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  sessionSecret: requireEnv("SESSION_SECRET", "dev-only-insecure-secret"),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  adminPasswordHash: requireEnv("ADMIN_PASSWORD_HASH"),
};

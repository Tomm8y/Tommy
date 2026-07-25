import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "<TOMMY/> — Backend Developer",
  description: "TommyOS — a terminal-driven cyberpunk portfolio with a live Owl-OS shell.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded at runtime via <link> tags rather than next/font/google.
          next/font/google needs network access at BUILD time, which fails inside
          the Docker build step on this project's CI/deploy setup.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink font-mono antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}

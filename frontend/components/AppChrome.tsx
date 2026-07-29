"use client";

import { useState } from "react";
import BootSequence from "./BootSequence";
import ScreenEffects from "./ScreenEffects";
import Nav from "./Nav";
import { AuthProvider } from "./AuthContext";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <AuthProvider>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <ScreenEffects />
      <Nav />
      <main>{children}</main>
      <footer className="text-center px-[5vw] py-9 text-ink-dim text-sm font-ui border-t border-steel/20 mt-10">
        <span className="text-purple">&lt;TOMMY/&gt;</span> — TOMMY.OS v1.0 — all systems nominal
      </footer>
    </AuthProvider>
  );
}

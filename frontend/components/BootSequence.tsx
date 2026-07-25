"use client";

import { useEffect, useState } from "react";

const BOOT_LINES: { text: string; ok?: boolean }[] = [
  { text: "INITIALIZING TOMMY.OS..." },
  { text: "LOADING KERNEL MODULES...", ok: true },
  { text: "MOUNTING /portfolio...", ok: true },
  { text: "ESTABLISHING SECURE CHANNEL (TLS)...", ok: true },
  { text: "AUTHENTICATING GUEST SESSION...", ok: true },
  { text: "WELCOME, USER" },
];

interface BootSequenceProps {
  onDone: () => void;
}

export default function BootSequence({ onDone }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      const t = setTimeout(dismiss, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 260);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLines]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function dismiss() {
    setHidden(true);
    setTimeout(onDone, 600);
  }

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#020203] flex flex-col items-center justify-center font-mono text-cyan tracking-wide transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-[min(560px,86vw)] text-sm leading-loose">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            {line.text}
            {line.ok && <span className="text-magenta"> OK</span>}
            {i === visibleLines - 1 && i === BOOT_LINES.length - 1 && (
              <span className="boot-cursor ml-1" />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={dismiss}
        className="mt-7 text-xs text-ink-dim border border-cyan-dim px-4 py-1.5 hover:text-cyan hover:border-cyan transition-colors"
      >
        SKIP [ENTER]
      </button>
    </div>
  );
}

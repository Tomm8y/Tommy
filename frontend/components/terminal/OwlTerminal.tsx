"use client";

import { useEffect, useRef, useState } from "react";
import { getAuthStatus, loginOwl } from "@/lib/api";

type Mode = "guest" | "password" | "root";

interface Line {
  text: string;
  cls?: "sys" | "err" | "ok";
}

interface OwlTerminalProps {
  onAuthChange: (isAdmin: boolean) => void;
  onOpenAdmin: () => void;
}

const AUTH_COMMAND = "sudo owl";

export default function OwlTerminal({ onAuthChange, onOpenAdmin }: OwlTerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { text: "OWL-OS [restricted shell] — type 'help' for a list of commands", cls: "sys" },
  ]);
  const [mode, setMode] = useState<Mode>("guest");
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [checking, setChecking] = useState(true);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAuthStatus().then((authenticated) => {
      if (authenticated) {
        setMode("root");
        onAuthChange(true);
        print("session restored — already authenticated as root.", "sys");
      }
      setChecking(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function print(text: string, cls?: Line["cls"]) {
    setLines((prev) => [...prev, { text, cls }]);
  }

  function handleGuestCommand(raw: string) {
    const cmd = raw.trim();
    print((mode === "root" ? "root@owl-os:~# " : "guest@owl-os:~$ ") + cmd);
    if (cmd === "") return;

    if (cmd === "help") {
      print(`available commands: help, whoami, clear, ${AUTH_COMMAND}`, "sys");
    } else if (cmd === "whoami") {
      print(mode === "root" ? "root" : "guest", "sys");
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd === AUTH_COMMAND) {
      if (mode === "root") {
        print("already authenticated as root.", "sys");
      } else {
        print("[sudo] password required for owl-os", "sys");
        setMode("password");
      }
    } else if (mode === "root") {
      print(`command not found: ${cmd}`, "err");
    } else {
      print(`permission denied: '${cmd}' requires authentication`, "err");
    }
  }

  async function handlePassword(password: string) {
    print("password: " + "•".repeat(password.length));
    const result = await loginOwl(password);

    if (result.success) {
      print(result.message.toLowerCase(), "ok");
      setMode("root");
      setAttempts(0);
      onAuthChange(true);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      print(result.message.toLowerCase(), "err");
      if (next >= 5) print("too many attempts — session throttled.", "err");
      setMode("guest");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const current = value;
    setValue("");
    if (mode === "password") {
      void handlePassword(current);
    } else {
      void handleGuestCommand(current);
    }
  }

  const promptLabel = mode === "password" ? "password:" : mode === "root" ? "root@owl-os:~#" : "guest@owl-os:~$";

  return (
    <section className="max-w-[1180px] mx-auto px-[5vw] pt-32 pb-24 min-h-screen flex flex-col justify-center">
      <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 05_SHELL</div>
      <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
        Owl<span className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]">-OS</span>
      </h2>
      <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />
      <p className="text-ink-dim max-w-[640px] mt-5 leading-relaxed text-sm">
        A live, restricted shell. Guest access only — authenticate to reach anything
        further.
      </p>

      <div
        className="max-w-[820px] w-full mx-auto mt-11 border border-steel/25 bg-[#08080a] shadow-[0_0_40px_rgba(139,92,246,0.10)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-steel/20 font-ui text-sm text-ink-dim">
          <span className="w-2.5 h-2.5 rounded-full bg-steel-dim" />
          <span className="w-2.5 h-2.5 rounded-full bg-steel-dim" />
          <span className="w-2.5 h-2.5 rounded-full bg-steel-dim" />
          <span className="ml-2 tracking-wide">guest@owl-os — restricted shell</span>
        </div>

        <div ref={bodyRef} className="term-body px-6 py-5 h-[420px] overflow-y-auto font-mono text-sm leading-relaxed">
          {checking && <div className="text-ink-dim">checking session…</div>}
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap break-words ${
                line.cls === "sys"
                  ? "text-ink-dim"
                  : line.cls === "err"
                  ? "text-purple"
                  : line.cls === "ok"
                  ? "text-ink [text-shadow:0_0_6px_rgba(154,154,166,0.4)]"
                  : "text-ink"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-6 pb-5">
          <span className="text-purple flex-none">{promptLabel}</span>
          <input
            ref={inputRef}
            type={mode === "password" ? "password" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-ink font-mono text-sm"
          />
        </div>
      </div>

      <div className="text-center mt-4 text-ink-dim font-ui text-xs tracking-wide">
        this shell is a restricted guest session — most commands require authentication
      </div>

      {mode === "root" && (
        <div className="max-w-[820px] w-full mx-auto mt-6 flex flex-wrap items-center justify-between gap-4 p-5 border border-purple/50 bg-purple/5">
          <p className="text-sm text-ink">root session active — full controls live in the Admin tab.</p>
          <button
            onClick={onOpenAdmin}
            className="btn-clip flex-none font-ui font-bold text-xs px-5 py-2 bg-purple text-bg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition"
          >
            Open Admin →
          </button>
        </div>
      )}
    </section>
  );
}

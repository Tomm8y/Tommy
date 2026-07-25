"use client";

import { useEffect, useRef, useState } from "react";
import { getAdminStatus, logoutOwl } from "@/lib/api";
import type { AdminStatusResponse } from "@/types";

interface AdminSectionProps {
  onLoggedOut: () => void;
}

interface Line {
  text: string;
  cls?: "sys" | "err";
}

function formatUptime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (h || m) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

export default function AdminSection({ onLoggedOut }: AdminSectionProps) {
  const [status, setStatus] = useState<AdminStatusResponse | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { text: "root shell — type 'help' for a list of commands", cls: "sys" },
  ]);
  const [value, setValue] = useState("");

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    getAdminStatus().then((res) => {
      if (cancelled) return;
      if (!res) {
        setLoadError(true);
        onLoggedOut();
        return;
      }
      setStatus(res);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function print(text: string, cls?: Line["cls"]) {
    setLines((prev) => [...prev, { text, cls }]);
  }

  function handleCommand(raw: string) {
    const cmd = raw.trim();
    print("root@owl-os:~# " + cmd);
    if (cmd === "") return;

    if (cmd === "help") {
      print("available commands: help, whoami, clear, sudo owl", "sys");
    } else if (cmd === "whoami") {
      print("root", "sys");
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "sudo owl") {
      print("already authenticated as root.", "sys");
    } else {
      print(`command not found: ${cmd}`, "err");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const current = value;
    setValue("");
    handleCommand(current);
  }

  async function handleLogout() {
    await logoutOwl();
    onLoggedOut();
  }

  return (
    <section className="max-w-[1180px] mx-auto px-[5vw] pt-32 pb-24">
      <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 06_ROOT</div>
      <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
        Admin<span className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]">_Panel</span>
      </h2>
      <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />
      <p className="text-ink-dim max-w-[640px] mt-5 leading-relaxed text-sm">
        Root-only. This tab only exists in your navigation because you authenticated
        through Owl-OS — it disappears again on logout.
      </p>

      <div className="panel-corners bg-panel border border-purple/40 p-7 mt-10 max-w-[820px]">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="font-ui text-purple text-base">SITE_STATUS</h3>
          <span className="font-ui text-[13px] tracking-[2px] text-purple border border-purple/50 px-2 py-0.5">
            CLASSIFIED
          </span>
        </div>
        {status ? (
          <>
            <Row label="Server time" value={new Date(status.serverTime).toLocaleString()} />
            <Row label="Backend uptime" value={formatUptime(status.uptimeSeconds)} />
            <Row label="Environment" value={status.environment} />
            <Row label="Node.js version" value={status.nodeVersion} />
            <Row label="Session cookie" value={`${status.sessionCookieName} (HttpOnly)`} last />
          </>
        ) : (
          <div className="text-ink-dim text-sm">{loadError ? "failed to load status." : "loading status…"}</div>
        )}
      </div>

      <div
        className="max-w-[820px] mt-6 border border-steel/25 bg-[#08080a]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-steel/20 font-ui text-sm text-ink-dim">
          <span className="w-2.5 h-2.5 rounded-full bg-purple/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple/60" />
          <span className="ml-2 tracking-wide">root@owl-os — authenticated shell</span>
        </div>
        <div ref={bodyRef} className="term-body px-6 py-5 h-[260px] overflow-y-auto font-mono text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap break-words ${
                line.cls === "sys" ? "text-ink-dim" : line.cls === "err" ? "text-purple" : "text-ink"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-6 pb-5">
          <span className="text-purple flex-none">root@owl-os:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-ink font-mono text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="btn-clip mt-8 font-ui font-bold text-xs px-6 py-2.5 border border-purple text-purple hover:bg-purple/10 transition"
      >
        Logout
      </button>
    </section>
  );
}

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between py-2 text-sm ${last ? "" : "border-b border-dashed border-ink-dim/25"}`}>
      <span className="text-ink-dim">{label}</span>
      <span className="text-purple">{value}</span>
    </div>
  );
}

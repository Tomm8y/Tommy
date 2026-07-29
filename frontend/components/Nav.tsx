"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

const BASE_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/terminal", label: "Terminal" },
];

export default function Nav() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const links = isAdmin ? [...BASE_LINKS, { href: "/admin", label: "Admin" }] : BASE_LINKS;

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-[5vw] py-3.5 bg-bg/80 backdrop-blur-md border-b border-steel/15">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-purple shadow-[0_0_10px_rgba(139,92,246,0.5)]">
          <Image src="/owl-logo.jpg" alt="Owl-OS logo" width={36} height={36} className="w-full h-full object-cover" priority />
        </div>
        <div className="font-display font-bold text-lg text-purple [text-shadow:0_0_8px_rgba(139,92,246,0.5)]">
          &lt;TOMMY/&gt;
          <span
            className="inline-block w-[7px] h-4 bg-steel ml-1 align-[-2px]"
            style={{ animation: "blink 1.1s steps(1) infinite" }}
          />
        </div>
      </Link>

      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden border border-steel-dim text-steel px-2.5 py-1 font-mono text-sm"
      >
        MENU
      </button>

      <nav>
        <ul
          className={`flex flex-col md:flex-row font-ui font-semibold text-sm gap-6 md:gap-8 md:static md:bg-transparent md:p-0 md:border-0 fixed top-16 right-0 bg-bg-alt border-l border-b border-steel/15 p-6 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isTerminal = link.href === "/terminal";
            const isAdminTab = link.href === "/admin";

            let className: string;
            let prefix = "";

            if (isAdminTab) {
              className = isActive
                ? "px-3 py-1 border border-purple bg-purple/15 text-purple [text-shadow:0_0_8px_rgba(139,92,246,0.6)]"
                : "px-3 py-1 border border-purple/60 text-purple hover:bg-purple/10 transition-colors";
              prefix = "# ";
            } else if (isTerminal) {
              className = isActive
                ? "px-3 py-1 border border-steel text-ink [text-shadow:0_0_6px_rgba(154,154,166,0.5)]"
                : "px-3 py-1 border border-steel-dim text-steel hover:border-steel transition-colors";
              prefix = ">_ ";
            } else {
              className = isActive
                ? "text-ink [text-shadow:0_0_6px_rgba(154,154,166,0.4)]"
                : "text-ink-dim hover:text-ink transition-colors";
              prefix = isActive ? "> " : "";
            }

            return (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className={className}>
                  {prefix}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

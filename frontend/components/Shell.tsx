"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import BootSequence from "./BootSequence";
import ScreenEffects from "./ScreenEffects";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import OwlTerminal from "./terminal/OwlTerminal";
import AdminSection from "./admin/AdminSection";
import { getAuthStatus } from "@/lib/api";
import type { Tab } from "@/types";

export default function Shell() {
  const [active, setActive] = useState<Tab>("home");
  const [booted, setBooted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check once on load so the Admin tab appears immediately if the session
  // cookie is still valid (e.g. after a page refresh), without requiring a
  // visit to the Terminal tab first.
  useEffect(() => {
    getAuthStatus().then(setIsAdmin);
  }, []);

  // If the session ever becomes unauthenticated while the Admin tab is open
  // (logout, expired cookie), bounce back to Home.
  useEffect(() => {
    if (!isAdmin && active === "admin") {
      setActive("home");
    }
  }, [isAdmin, active]);

  function handleLoggedOut() {
    setIsAdmin(false);
    setActive("home");
  }

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <ScreenEffects />
      <Nav active={active} onSelect={setActive} showAdmin={isAdmin} />
      <main>
        {active === "home" && <Home onNavigate={setActive} />}
        {active === "about" && <About onNavigate={setActive} />}
        {active === "projects" && <Projects onNavigate={setActive} />}
        {active === "contact" && <Contact />}
        {active === "terminal" && (
          <OwlTerminal onAuthChange={setIsAdmin} onOpenAdmin={() => setActive("admin")} />
        )}
        {active === "admin" && isAdmin && <AdminSection onLoggedOut={handleLoggedOut} />}
      </main>
      <footer className="text-center px-[5vw] py-9 text-ink-dim text-sm font-ui border-t border-steel/20 mt-10">
        <span className="text-purple">&lt;TOMMY/&gt;</span> — TOMMY.OS v1.0 — all systems nominal
      </footer>
    </>
  );
}

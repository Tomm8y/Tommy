"use client";

import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
}

export default function GlitchText({ text, className = "", as = "span" }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function schedule() {
      const delay = 4000 + Math.random() * 5000;
      timeout = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 350);
        schedule();
      }, delay);
    }

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const Tag = as;

  return (
    <Tag className={`glitch ${glitching ? "glitching" : ""} ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}

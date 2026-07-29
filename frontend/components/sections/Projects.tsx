import Link from "next/link";
import GlitchText from "@/components/GlitchText";

interface Project {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  href: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Terminal-Chat",
    description:
      "A zero-dependency, terminal-based encrypted chat application. Every connection runs over TLS, with message payloads additionally secured using AES-256-GCM — built from the ground up with no external libraries.",
    features: ["Zero external dependencies", "TLS-secured connections", "AES-256-GCM message encryption"],
    tech: ["Node.js", "TLS", "AES-256-GCM"],
    href: "https://github.com/Tomm8y",
  },
  {
    title: "Versatile Telegram Bot",
    description:
      "A fully customizable Telegram bot framework — built to be reshaped for whatever use case you need, from file handling to interactive callback-driven menus.",
    features: ["File upload support across formats", "Interactive callback buttons"],
    tech: ["Python", "pyTelegramBotAPI"],
    href: "https://github.com/Tomm8y",
  },
  {
    title: "TOMMY/OS — This Site",
    description:
      "A terminal-driven operating-system-styled personal portfolio. Boot sequence on load, tab-based navigation, and a hidden terminal command that unlocks an authenticated admin panel — served from a self-hosted Docker stack.",
    features: [
      "Boot sequence animation on load",
      "Owl-OS terminal → authenticated admin panel",
      "Self-hosted via Docker Compose",
    ],
    tech: ["Next.js", "TypeScript", "Express.js", "Docker"],
    href: "https://github.com/Tomm8y",
    featured: true,
  },
];

export default function Projects() {
  return (
    <section className="max-w-[1180px] mx-auto px-[5vw] pt-32 pb-24">
      <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 03_ARCHIVE</div>
      <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
        My <GlitchText text="Projects" className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]" />
      </h2>
      <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />
      <p className="text-ink-dim max-w-[640px] mt-5 leading-relaxed text-sm">
        A record of systems I&rsquo;ve built — real code, solving real problems, with an
        emphasis on security and clean architecture.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className={`bg-panel border border-steel/20 p-7 flex flex-col hover:border-purple hover:shadow-[0_0_26px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition ${
              project.featured ? "md:col-span-2" : ""
            }`}
          >
            <h3 className="font-ui text-xl text-steel mb-3">{project.title}</h3>
            <p className="text-ink-dim text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="font-ui text-xs tracking-[2px] text-purple uppercase mb-2.5">Key Features</div>
            <ul className="mb-5 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="text-sm text-ink-dim pl-4 relative">
                  <span className="absolute left-0 top-[7px] w-1.5 h-1.5 bg-steel shadow-[0_0_6px_#9a9aa6]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="font-ui text-xs tracking-[2px] text-purple uppercase mb-2.5">Technologies</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="font-ui text-xs font-semibold px-3 py-1 border border-steel-dim text-steel bg-steel/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="btn-clip mt-auto self-start font-ui font-bold tracking-wide text-xs px-6 py-2.5 border border-steel text-steel hover:bg-steel/10 hover:shadow-[0_0_20px_rgba(154,154,166,0.35)] transition"
            >
              View Code
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          href="/contact"
          className="btn-clip font-ui font-bold tracking-wide text-sm px-8 py-3.5 bg-purple text-bg shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition"
        >
          Get In Touch →
        </Link>
      </div>
    </section>
  );
}

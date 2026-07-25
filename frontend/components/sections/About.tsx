import GlitchText from "@/components/GlitchText";
import type { Tab } from "@/types";

interface AboutProps {
  onNavigate: (tab: Tab) => void;
}

const SKILL_GROUPS: { title: string; skills: { name: string; level: number }[] }[] = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "TypeScript", level: 75 },
    ],
  },
  {
    title: "FRAMEWORKS",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "Next.js", level: 70 },
    ],
  },
  {
    title: "DATABASES",
    skills: [{ name: "MySQL", level: 80 }],
  },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <section className="max-w-[1180px] mx-auto px-[5vw] pt-32 pb-24">
      <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 01_PROFILE</div>
      <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
        About <GlitchText text="Me" className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]" />
      </h2>
      <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 mt-12">
        <div className="text-ink-dim leading-loose text-sm space-y-4">
          <p>
            I&rsquo;m a backend developer with 3+ years spent building scalable, secure,
            server-side systems. My interest in this field started with a simple question:
            what actually happens behind the request?
          </p>
          <p>
            I specialize in designing robust APIs, structuring databases for the way data
            really gets used, and implementing authentication and encryption that hold up
            under scrutiny — not just under a demo.
          </p>
          <p>
            Outside of client work, I build things for the sake of understanding them
            better: encrypted chat protocols, automation bots, and this site — each one a
            small proof that the system works.
          </p>
        </div>

        <div className="panel-corners bg-panel border border-steel/20 p-7">
          <h3 className="font-ui text-purple text-base mb-5">QUICK_FACTS</h3>
          <FactRow label="Experience" value="3+ Years" />
          <FactRow label="Projects Shipped" value="3+" />
          <FactRow label="Focus" value="Backend" />
          <FactRow label="Status" value="Open to work" last />
        </div>
      </div>

      <div className="mt-20">
        <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 02_STACK</div>
        <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
          Technical <span className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]">Skills</span>
        </h2>
        <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />

        <div className="grid md:grid-cols-3 gap-6 mt-9">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="panel-corners bg-panel border border-steel/20 p-7">
              <h3 className="font-ui text-purple text-base mb-5">{group.title}</h3>
              {group.skills.map((skill) => (
                <div key={skill.name} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{skill.name}</span>
                    <span className="text-ink-dim">{skill.level}%</span>
                  </div>
                  <div className="h-[5px] bg-white/5 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple to-steel shadow-[0_0_8px_rgba(154,154,166,0.5)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <button
          onClick={() => onNavigate("projects")}
          className="btn-clip font-ui font-bold tracking-wide text-sm px-8 py-3.5 bg-purple text-bg shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition"
        >
          View My Projects →
        </button>
      </div>
    </section>
  );
}

function FactRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between py-2.5 text-sm ${last ? "" : "border-b border-dashed border-ink-dim/25"}`}>
      <span className="text-ink-dim">{label}</span>
      <span className="text-steel font-bold">{value}</span>
    </div>
  );
}

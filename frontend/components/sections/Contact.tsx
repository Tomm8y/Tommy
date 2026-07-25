import GlitchText from "@/components/GlitchText";

const SERVICES = [
  "Backend API Development",
  "Database Design & Optimization",
  "System Architecture Consulting",
  "Performance Optimization",
  "Code Review & Mentoring",
];

const CONNECT = [
  { label: "Email", icon: "@", href: "mailto:tomm8yy@gmail.com" },
  { label: "Telegram", icon: "Tg", href: "#" },
  { label: "GitHub", icon: "Gh", href: "https://github.com/Tomm8y" },
  { label: "Twitter", icon: "X", href: "#" },
];

export default function Contact() {
  return (
    <section className="max-w-[1180px] mx-auto px-[5vw] pt-32 pb-24">
      <div className="font-ui text-steel text-sm tracking-[3px] mb-2">// 04_UPLINK</div>
      <h2 className="font-display font-bold text-[clamp(2.34rem,5.2vw,3.38rem)]">
        Get In <GlitchText text="Touch" className="text-purple [text-shadow:0_0_12px_rgba(139,92,246,0.45)]" />
      </h2>
      <div className="w-[70px] h-0.5 mt-4 bg-gradient-to-r from-purple to-steel" />
      <p className="text-ink-dim max-w-[640px] mt-5 leading-relaxed text-sm">
        Have a backend problem worth solving? Open a channel — I read everything that
        comes through.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="space-y-6">
          <div className="panel-corners bg-panel border border-steel/20 p-7">
            <h3 className="font-ui text-purple text-base mb-5">CONTACT_INFO</h3>
            <div className="flex gap-4 items-start mb-5">
              <div className="w-9 h-9 flex-none border border-purple flex items-center justify-center font-display text-sm text-purple">
                @
              </div>
              <div>
                <h4 className="font-ui text-steel text-sm mb-1">Email</h4>
                <div className="text-sm text-ink-dim">tomm8yy@gmail.com</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 flex-none border border-purple flex items-center justify-center font-display text-sm text-purple">
                ::
              </div>
              <div>
                <h4 className="font-ui text-steel text-sm mb-1">Availability</h4>
                <div className="text-sm text-ink-dim">Open to new opportunities</div>
              </div>
            </div>
          </div>

          <div className="panel-corners bg-panel border border-steel/20 p-7">
            <h3 className="font-ui text-purple text-base mb-5">SERVICES</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-ink-dim pl-5 relative">
                  <span className="absolute left-0 top-[7px] w-1.5 h-1.5 bg-purple shadow-[0_0_6px_#8b5cf6]" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-corners bg-panel border border-steel/20 p-7">
            <h3 className="font-ui text-purple text-base mb-5">CONNECT_WITH_ME</h3>
            <div className="grid grid-cols-2 gap-3.5">
              {CONNECT.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="border border-steel/20 py-5 px-3 text-center font-ui font-semibold text-sm hover:border-steel hover:bg-steel/5 transition"
                >
                  <span className="font-display text-xl text-steel block mb-2.5">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="panel-corners bg-panel border border-steel/20 p-7">
            <h3 className="font-ui text-purple text-base mb-5">LET&rsquo;S COLLABORATE</h3>
            <p className="text-ink-dim text-sm leading-relaxed mb-6">
              Always up for a challenging backend problem or a system worth architecting
              properly. If that&rsquo;s what you&rsquo;ve got, let&rsquo;s talk.
            </p>
            <a
              href="mailto:tomm8yy@gmail.com"
              className="btn-clip block text-center font-ui font-bold text-sm px-6 py-3 bg-purple text-bg shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition mb-3"
            >
              Send Email
            </a>
            <a
              href="#"
              className="btn-clip block text-center font-ui font-bold text-sm px-6 py-3 border border-steel text-steel hover:bg-steel/10 transition"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";

export default function Home() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5vw] pt-32 bg-[radial-gradient(ellipse_at_50%_20%,rgba(139,92,246,0.10),transparent_60%)]">
      <div className="grid-floor" />

      <div className="font-ui text-steel tracking-[4px] text-sm mb-5 uppercase">
        // SYSTEM: TOMMY.OS — ONLINE
      </div>

      <div className="w-24 h-24 rounded-full overflow-hidden border border-purple flex items-center justify-center shadow-[0_0_22px_rgba(139,92,246,0.35),inset_0_0_18px_rgba(154,154,166,0.15)] mb-9">
        <Image src="/owl-logo.jpg" alt="Owl-OS" width={96} height={96} className="w-full h-full object-cover" priority />
      </div>

      <h1 className="font-display font-black tracking-wide text-[clamp(2.6rem,8vw,5.6rem)]">
        <span className="text-purple [text-shadow:0_0_18px_rgba(139,92,246,0.55)]">&lt;</span>
        <GlitchText text="TOMMY" as="span" />
        <span className="text-purple [text-shadow:0_0_18px_rgba(139,92,246,0.55)]">/&gt;</span>
      </h1>

      <div className="font-ui font-semibold text-2xl text-ink mt-4 [text-shadow:0_0_10px_rgba(154,154,166,0.35)]">
        BACKEND DEVELOPER
      </div>

      <p className="max-w-[520px] mx-auto mt-5 text-ink-dim text-sm leading-relaxed">
        Building secure, scalable server-side systems — APIs, encrypted protocols, and
        infrastructure that runs quietly and holds up under pressure.
      </p>

      <div className="mt-10 flex gap-4 flex-wrap justify-center">
        <Link
          href="/about"
          className="btn-clip font-ui font-bold tracking-wide text-sm px-8 py-3.5 bg-purple text-bg shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition"
        >
          Enter Portfolio
        </Link>
        <Link
          href="/contact"
          className="btn-clip font-ui font-bold tracking-wide text-sm px-8 py-3.5 border border-steel-dim text-steel hover:bg-steel/10 hover:border-steel transition"
        >
          Get In Touch
        </Link>
      </div>

      <div className="mt-14 flex gap-6 font-ui text-sm">
        <Link href="/about" className="text-ink-dim hover:text-purple transition-colors">
          about
        </Link>
        <Link href="/projects" className="text-ink-dim hover:text-purple transition-colors">
          projects
        </Link>
        <Link href="/contact" className="text-ink-dim hover:text-purple transition-colors">
          contact
        </Link>
      </div>
    </section>
  );
}

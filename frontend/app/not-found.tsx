import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-[5vw] pt-24">
      <div className="font-ui text-steel tracking-[4px] text-sm mb-5 uppercase">
        // ERROR: ROUTE_NOT_FOUND
      </div>
      <h1 className="font-display font-black text-[clamp(3rem,10vw,6rem)] text-purple [text-shadow:0_0_18px_rgba(139,92,246,0.55)]">
        404
      </h1>
      <p className="max-w-[440px] mx-auto mt-5 text-ink-dim text-sm leading-relaxed">
        This path doesn&rsquo;t exist — or you don&rsquo;t currently have access to it.
      </p>
      <Link
        href="/"
        className="btn-clip mt-10 font-ui font-bold tracking-wide text-sm px-8 py-3.5 bg-purple text-bg shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition"
      >
        Back to Home
      </Link>
    </section>
  );
}

"use client";

import Image from "next/image";

const brands = [
  "Lewkin", "Vacunery", "VT Cosmetics", "Bolde", "Just4Kira",
  "Embol", "Hapa Kristin", "FlexiSpot", "YesStyle", "Toco Brand",
  "BetterHelp", "DropChats", "Alpine View",
];

const services = [
  {
    title: "Video Editing",
    desc: "Short-form & long-form content editing — YouTube, Reels, TikTok. Transitions, color grading, captions, and sound design.",
  },
  {
    title: "Brand Integration",
    desc: "Seamless sponsored content that feels native to your audience. Script-to-screen execution with full creative direction.",
  },
  {
    title: "Fashion & Fit Checks",
    desc: "Outfit content creation, styling, and aesthetic curation tailored to your brand's visual identity.",
  },
  {
    title: "Content Strategy",
    desc: "Platform growth strategy, content calendars, and trend-driven ideas for fashion and lifestyle brands.",
  },
];

const analytics = [
  { label: "Avg. Views", value: "1.5M+" },
  { label: "Followers", value: "700K+" },
  { label: "Engagements", value: "200K+" },
  { label: "Collaborations", value: "13+" },
];

const youtubeIntegrations = [
  "BypassGPT", "BetterHelp", "Aelfric Eden",
  "Teddy Blake", "Lewkin", "Just4Kira",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 flex justify-center py-5 px-6">
        <nav className="flex gap-8 md:gap-12">
          {[
            { label: "About", href: "#about" },
            { label: "Work", href: "#work" },
            { label: "Brands", href: "#brands" },
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="section-content relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,0,0,0.22) 0%, transparent 70%)" }}
        />

        <div className="relative">
          <p
            className="font-cormorant italic text-text-muted text-base md:text-xl mb-1 tracking-widest"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            welcome to my
          </p>

          <h1
            className="font-cormorant italic leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4.5rem, 16vw, 11rem)",
              fontWeight: 300,
              color: "#f5f0f0",
            }}
          >
            <span style={{ fontWeight: 300 }}>C</span>
            <span style={{ fontWeight: 600 }}>al</span>
            <span style={{ fontWeight: 300 }}>1</span>
            <span style={{ fontWeight: 600 }}>St</span>
            <span style={{ fontWeight: 300 }}>ar</span>
          </h1>

          <p className="font-inter text-text-primary text-xs md:text-sm mt-5 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Calista Suherman
          </p>
          <p className="font-inter text-text-muted text-[11px] md:text-xs mt-2 tracking-[0.15em]" style={{ fontFamily: "var(--font-inter)" }}>
            Content Creator · Video Editor · Fashion & Lifestyle
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <a
              href="#work"
              className="inline-block px-8 py-3 rounded-full border border-text-muted text-text-muted font-inter text-[10px] uppercase tracking-[0.2em] hover:border-text-primary hover:text-text-primary transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              explore my work
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full font-inter text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)", background: "rgba(201,169,169,0.85)" }}
            >
              work with me
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10 bg-text-muted animate-pulse" />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────── */}
      <section id="about" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
        <Divider />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Portrait */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="lace-frame" style={{ padding: "40px" }}>
              <div className="lace-dots" />
              <div className="lace-inner">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(200px, 28vw, 300px)",
                    height: "clamp(250px, 35vw, 380px)",
                    borderRadius: "50% 48% 52% 46% / 46% 52% 48% 54%",
                    border: "1px solid rgba(201,169,169,0.2)",
                    background: "rgba(61,0,0,0.4)",
                  }}
                >
                  <Image
                    src="/portrait.jpg"
                    alt="Calista Suherman"
                    fill
                    className="object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,0,0,0.5) 100%)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="font-cormorant italic text-text-muted text-lg mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
              who's that
            </p>
            <h2
              className="font-cormorant italic leading-none mb-10"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                color: "#f5f0f0",
              }}
            >
              star?
            </h2>

            <div className="space-y-5 font-inter text-text-muted text-sm md:text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <p>
                CAL1STAR is a fashion & lifestyle content creator and video editor based in San Francisco, CA.
              </p>
              <p>
                With more than 4 years of experience, she aims to relate emotionally to her audience through memorable content.
              </p>
              <p>
                Her work spans YouTube brand integrations, short-form fashion content, and full video production — from concept to final cut.
              </p>
              <p>
                She leans towards clean, cinematic aesthetics that feel personal, not polished to the point of being cold.
              </p>
            </div>

            {/* Mini analytics */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {analytics.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg"
                  style={{ border: "1px solid rgba(139,0,0,0.3)", background: "rgba(26,0,0,0.4)" }}
                >
                  <p
                    className="font-cormorant italic text-2xl md:text-3xl text-text-primary"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-inter text-[10px] uppercase tracking-widest text-text-muted mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────── */}
      <section id="work" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
        <Divider />
        <div className="max-w-6xl mx-auto">

          <SectionHeading sub="what I bring to the table">Work</SectionHeading>

          {/* YouTube Integrations */}
          <div className="mb-20">
            <h3
              className="font-cormorant italic text-text-muted mb-8 text-center"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300 }}
            >
              YouTube Integrations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {youtubeIntegrations.map((brand) => (
                <WorkCard key={brand} label={brand} tag="YouTube" />
              ))}
            </div>
          </div>

          {/* Fashion & Fit Checks */}
          <div className="mb-20">
            <h3
              className="font-cormorant italic text-text-muted mb-8 text-center"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300 }}
            >
              Fashion &amp; Fit Checks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <WorkCard key={i} label={`Look ${i + 1}`} tag="Fashion" aspect="3/4" />
              ))}
            </div>
          </div>

          {/* Video Editing */}
          <div>
            <h3
              className="font-cormorant italic text-text-muted mb-8 text-center"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300 }}
            >
              Video Editing
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <WorkCard key={i} label="" tag="Edit" aspect="16/9" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brands ──────────────────────────────────────────── */}
      <section id="brands" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
        <Divider />
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeading sub="brands I've worked with">Collaborations</SectionHeading>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4">
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-inter text-[11px] uppercase tracking-[0.2em] text-text-muted px-5 py-2.5 rounded-full transition-all duration-300 hover:text-text-primary"
                style={{
                  fontFamily: "var(--font-inter)",
                  border: "1px solid rgba(139,0,0,0.35)",
                  background: "rgba(26,0,0,0.3)",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────── */}
      <section id="services" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
        <Divider />
        <div className="max-w-5xl mx-auto">
          <SectionHeading sub="what I offer">Services</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-7 rounded-xl group hover:border-red-accent transition-all duration-300"
                style={{ border: "1px solid rgba(139,0,0,0.25)", background: "rgba(26,0,0,0.35)" }}
              >
                <h4
                  className="font-cormorant italic text-text-primary text-xl md:text-2xl mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {s.title}
                </h4>
                <p className="font-inter text-text-muted text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section id="contact" className="section-content relative py-24 md:py-40 px-6 text-center">
        <Divider />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(139,0,0,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-xl mx-auto">
          <p className="font-cormorant italic text-text-muted text-lg mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
            and, that's
          </p>
          <h2
            className="font-cormorant italic leading-none mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontWeight: 300,
              color: "#f5f0f0",
            }}
          >
            a wrap.
          </h2>

          <p className="font-inter text-text-muted text-sm mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Piqued your interest? Let's work together.
          </p>

          <a
            href="mailto:cal1starcollab@gmail.com"
            className="inline-block px-10 py-4 rounded-full border border-text-muted text-text-muted font-inter text-[11px] uppercase tracking-[0.25em] hover:border-text-primary hover:text-text-primary transition-all duration-300 mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            cal1starcollab@gmail.com
          </a>

          <div className="flex justify-center gap-8 mt-8">
            <a
              href="https://instagram.com/cal1star"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[10px] uppercase tracking-[0.25em] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-muted pb-0.5 transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@cal1star"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[10px] uppercase tracking-[0.25em] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-muted pb-0.5 transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-40" style={{ fontFamily: "var(--font-inter)" }}>
          © 2025 CAL1STAR — Calista Suherman
        </p>
      </footer>

    </main>
  );
}

/* ── Shared components ───────────────────────────────────── */

function Divider() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 right-0 h-px"
      style={{ background: "linear-gradient(to right, transparent, rgba(139,0,0,0.45), transparent)" }}
    />
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-14">
      {sub && (
        <p className="font-cormorant italic text-text-muted text-base mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
          {sub}
        </p>
      )}
      <h2
        className="font-cormorant italic"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 300,
          color: "#f5f0f0",
          lineHeight: 1,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function WorkCard({ label, tag, aspect = "4/3" }: { label: string; tag: string; aspect?: string }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        aspectRatio: aspect,
        background: "linear-gradient(135deg, rgba(61,0,0,0.55) 0%, rgba(13,0,0,0.85) 100%)",
        border: "1px solid rgba(139,0,0,0.2)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,0,0,0.25) 0%, transparent 70%)" }}
      />
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3">
          <span
            className="font-cormorant italic text-text-primary text-center"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}
          >
            {label}
          </span>
          <span
            className="font-inter text-[9px] uppercase tracking-widest text-text-muted"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {tag}
          </span>
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(139,0,0,0.8)" }}
      />
    </div>
  );
}

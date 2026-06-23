"use client";

import Image from "next/image";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Socials", href: "#socials" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 flex justify-center py-5 px-6">
        <nav className="flex gap-8 md:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em]
                text-text-muted hover:text-text-primary transition-colors duration-300
              "
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        id="hero"
        className="section-content relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16"
      >
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,0,0,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <p
            className="font-cormorant italic text-text-muted text-lg md:text-2xl mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            welcome to my
          </p>

          <h1
            className="font-cormorant italic leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4rem, 14vw, 10rem)",
              fontWeight: 300,
              color: "#f5f0f0",
            }}
          >
            <span style={{ fontWeight: 300 }}>P</span>
            <span style={{ fontWeight: 600 }}>o</span>
            <span style={{ fontWeight: 300 }}>rt</span>
            <span style={{ fontWeight: 600 }}>f</span>
            <span style={{ fontWeight: 300 }}>o</span>
            <span style={{ fontWeight: 600 }}>li</span>
            <span style={{ fontWeight: 300 }}>o</span>
          </h1>

          <p
            className="font-inter text-text-primary text-sm md:text-base mt-4 tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Calista Suherman
          </p>
          <p
            className="font-inter text-text-muted text-xs md:text-sm mt-1 tracking-[0.15em]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            AI Visuals · Graphic Design · Creative Direction
          </p>

          <a
            href="#work"
            className="
              inline-block mt-10 px-8 py-3 rounded-full
              border border-text-muted text-text-muted
              font-inter text-[11px] uppercase tracking-[0.2em]
              hover:border-text-primary hover:text-text-primary
              transition-all duration-300
            "
            style={{ fontFamily: "var(--font-inter)" }}
          >
            explore my work
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-text-muted animate-pulse" />
        </div>
      </section>

      {/* ── About Me ────────────────────────────────────────── */}
      <section
        id="about"
        className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32"
      >
        {/* Subtle divider glow */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(139,0,0,0.5), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left — text */}
          <div>
            <h2
              className="font-cormorant italic leading-none mb-10"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                color: "#f5f0f0",
              }}
            >
              About&nbsp;Me
            </h2>

            <div
              className="space-y-5 font-inter text-text-muted text-sm md:text-[15px] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>
                I'm Calista — a creative designer focused in graphic design,
                social media visuals, and AI-assisted content.
              </p>
              <p>
                I help brands turn their ideas into clear, aesthetic, and
                attention-grabbing visuals — from concept to final design.
              </p>
              <p>
                My work adapts to different brand needs, while naturally leaning
                towards clean and modern aesthetics.
              </p>
              <p>
                I focus on creating visuals that don't just look good, but
                communicate, attract, and convert.
              </p>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="flex justify-center md:justify-end">
            <div className="lace-frame" style={{ padding: "40px" }}>
              <div className="lace-dots" />
              <div className="lace-inner">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(200px, 30vw, 320px)",
                    height: "clamp(240px, 38vw, 400px)",
                    borderRadius: "50% 48% 52% 46% / 46% 52% 48% 54%",
                    border: "1px solid rgba(201,169,169,0.2)",
                    background: "rgba(61,0,0,0.4)",
                  }}
                >
                  {/* Replace /portrait.jpg with your actual image in /public */}
                  <Image
                    src="/portrait.jpg"
                    alt="Calista Suherman"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Placeholder shown when no image */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
                    style={{ color: "rgba(201,169,169,0.3)" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <span
                      className="text-[10px] tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      portrait
                    </span>
                  </div>

                  {/* Inner vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(13,0,0,0.5) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────── */}
      <section
        id="work"
        className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32"
      >
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(139,0,0,0.5), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <h2
            className="font-cormorant italic text-center mb-16"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
            }}
          >
            Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brand Identity", tag: "Graphic Design" },
              { title: "Social Visuals", tag: "AI · Design" },
              { title: "Creative Direction", tag: "Direction" },
              { title: "Editorial Layout", tag: "Print · Digital" },
              { title: "Motion Graphics", tag: "AI Visuals" },
              { title: "Campaign Art", tag: "Creative" },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                style={{
                  aspectRatio: "4/3",
                  background:
                    "linear-gradient(135deg, rgba(61,0,0,0.6) 0%, rgba(26,0,0,0.8) 100%)",
                  border: "1px solid rgba(139,0,0,0.25)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(139,0,0,0.3) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span
                    className="font-cormorant italic text-xl text-text-primary"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="font-inter text-[10px] uppercase tracking-widest text-text-muted"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(139,0,0,0.8)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Socials ─────────────────────────────────────────── */}
      <section
        id="socials"
        className="section-content relative py-24 md:py-36 px-6 text-center"
      >
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(139,0,0,0.5), transparent)",
          }}
        />

        <h2
          className="font-cormorant italic mb-12"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
          }}
        >
          Socials
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { label: "Instagram", href: "#" },
            { label: "Behance", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Pinterest", href: "#" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="
                font-inter text-[11px] uppercase tracking-[0.25em]
                text-text-muted hover:text-text-primary
                border-b border-transparent hover:border-text-muted
                pb-0.5 transition-all duration-300
              "
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section
        id="contact"
        className="section-content relative py-24 md:py-36 px-6 text-center"
      >
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(139,0,0,0.5), transparent)",
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]"
          style={{
            background:
              "radial-gradient(ellipse at bottom, rgba(139,0,0,0.15) 0%, transparent 70%)",
          }}
        />

        <h2
          className="font-cormorant italic mb-4"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
          }}
        >
          Let's work together
        </h2>

        <p
          className="font-inter text-text-muted text-sm mb-10 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Have a project in mind? I'd love to hear about it.
        </p>

        <a
          href="mailto:calistarsuherman@gmail.com"
          className="
            inline-block px-10 py-4 rounded-full
            border border-text-muted text-text-muted
            font-inter text-[11px] uppercase tracking-[0.25em]
            hover:border-text-primary hover:text-text-primary
            transition-all duration-300
          "
          style={{ fontFamily: "var(--font-inter)" }}
        >
          calistarsuherman@gmail.com
        </a>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        className="section-content py-8 text-center"
        style={{
          borderTop: "1px solid rgba(139,0,0,0.2)",
        }}
      >
        <p
          className="font-inter text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          © 2025 Calista Suherman
        </p>
      </footer>

    </main>
  );
}

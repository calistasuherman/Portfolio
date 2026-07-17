"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./components/Reveal";

/* ── Data ── */
const FEATURED = [
  { src: "/cinema/cinema2.mp4", tag: "Cinematography" },
  { src: "/cinema/cinema6.mp4", tag: "Visual Storytelling" },
  { src: "/cinema/cinema9.mp4", tag: "Brand Content" },
];

const SERVICES = [
  {
    index: "01",
    title: "Videography",
    desc: "From concept to final cut — cinematic storytelling, color grading, and direction tailored to your brand.",
  },
  {
    index: "02",
    title: "Motion Editing",
    desc: "Dynamic short-form edits, VFX, SFX, transitions, and motion graphics built to stop the scroll.",
  },
  {
    index: "03",
    title: "Collaborations",
    desc: "Brand integrations and sponsored content that feel native. Platform growth, trend strategy, and aesthetic curation.",
  },
];

const LOGOS = Array.from({ length: 14 }, (_, i) => `/logos/portfolio${i + 1}.png`);

const TOOLS = [
  { src: "/apps/dr.png",     label: "DaVinci Resolve" },
  { src: "/apps/fcp.png",    label: "Final Cut Pro"   },
  { src: "/apps/vs.png",     label: "Video Star"      },
  { src: "/apps/cc.png",     label: "CapCut"          },
  { src: "/apps/c.png",      label: "Canva"           },
  { src: "/apps/claude.png", label: "Claude"          },
];

const LABELS = [
  "Content Creator", "World Traveler",
  "Industrial Engineer", "Coffee Connoisseur",
  "Gen Z (21 Y/O)", "Fashion Lover",
];

const STACK_PHOTOS = ["/c1.png","/c2.png","/c3.png","/c4.png","/c5.png","/c6.png","/c7.png"];
const PHOTO_OFFSETS = [
  { rotate: 0, tx: 0, ty: 0 }, { rotate: -3, tx: -8, ty: 0 },
  { rotate: 5, tx: 10, ty: 0 }, { rotate: -6, tx: -14, ty: 0 },
  { rotate: 3, tx: 6, ty: 0 }, { rotate: -4, tx: -10, ty: 0 },
  { rotate: 7, tx: 12, ty: 0 },
];

/* ── Components ── */

function FeaturedCard({ src, tag }: { src: string; tag: string }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);

  return (
    <a
      href="/work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden", borderRadius: "4px", textDecoration: "none" }}
    >
      <video
        ref={videoRef} src={src} muted loop playsInline preload="metadata"
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(5,0,0,0.15)" : "rgba(5,0,0,0.42)",
        transition: "background 0.5s ease",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1rem" }}>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.58rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(245,240,240,0.7)",
        }}>{tag}</p>
      </div>
    </a>
  );
}

function FlipPhoto() {
  const [order, setOrder] = useState(STACK_PHOTOS.map((_, i) => i));

  return (
    <div style={{ position: "relative", width: "clamp(210px, 24vw, 320px)", height: "clamp(270px, 31vw, 420px)" }}>
      {order.map((photoIdx, stackPos) => {
        const off = PHOTO_OFFSETS[stackPos] ?? PHOTO_OFFSETS[PHOTO_OFFSETS.length - 1];
        const isTop = stackPos === 0;
        return (
          <div
            key={photoIdx}
            onClick={isTop ? () => setOrder(prev => { const n = [...prev]; n.push(n.shift()!); return n; }) : undefined}
            style={{
              position: "absolute", inset: 0,
              transform: `translate(${off.tx}px,${off.ty}px) rotate(${off.rotate}deg)`,
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              zIndex: order.length - stackPos,
              cursor: isTop ? "pointer" : "default",
              borderRadius: "10px", overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
            }}
          >
            <img
              src={STACK_PHOTOS[photoIdx]}
              alt="" draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", userSelect: "none", pointerEvents: "none" }}
            />
          </div>
        );
      })}
    </div>
  );
}

function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content", gap: "2rem", alignItems: "center" }}>
        {row.map((src, i) => (
          <img
            key={i} src={src} alt="" draggable={false}
            style={{ height: "28px", width: "auto", opacity: 0.55, filter: "brightness(0) invert(1)", transition: "opacity 0.3s", userSelect: "none" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative overflow-x-clip">

      {/* ── Hero ── */}
      <section style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#050003" }}>
        <video
          src="/cinema/cinema1.mp4"
          autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(5,0,3,0.4) 0%, rgba(5,0,3,0.55) 60%, rgba(5,0,3,0.92) 100%)" }} />

        {/* Center text */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 1.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "0.58rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(245,240,240,0.4)", marginBottom: "1.8rem",
            opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(8px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
          }}>
            Cinematographer &nbsp;&middot;&nbsp; Content Creator &nbsp;&middot;&nbsp; San Francisco
          </p>

          <h1 style={{
            fontFamily: "BillaMount, cursive",
            fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
            color: "#f5f0f0", lineHeight: 0.88, letterSpacing: "0.02em",
            opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(16px)",
            transition: "opacity 1.2s ease 0.35s, transform 1.2s ease 0.35s",
          }}>
            Calista<br />Suherman
          </h1>

          {/* Thin vertical line */}
          <div style={{
            width: "1px", height: "52px", marginTop: "3rem",
            background: "linear-gradient(to bottom, rgba(245,240,240,0.55), transparent)",
            opacity: heroReady ? 1 : 0,
            transition: "opacity 1s ease 0.9s",
          }} />
        </div>

        {/* Scroll hint */}
        <p style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(245,240,240,0.28)", zIndex: 2,
          opacity: heroReady ? 1 : 0, transition: "opacity 1s ease 1.2s",
        }}>scroll</p>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ padding: "7rem clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "flex", alignItems: "baseline", justifyContent: "space-between",
              borderBottom: "1px solid rgba(245,240,240,0.1)", paddingBottom: "1.2rem", marginBottom: "2.5rem",
            }}>
              <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.04em" }}>
                Selected Work
              </span>
              <a href="/work" style={{
                fontFamily: "var(--font-inter)", fontSize: "0.58rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(245,240,240,0.4)", textDecoration: "none",
                transition: "color 0.3s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,240,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.4)")}
              >View all →</a>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {FEATURED.map((item, i) => (
              <Reveal key={item.src} delay={i * 110}>
                <FeaturedCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: "4rem clamp(1.5rem, 6vw, 5rem) 6rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ marginBottom: "2.5rem" }}>
              <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "normal", color: "#f5f0f0" }}>S</span>
              <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)", fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.06em" }}>ignature Services</span>
            </h2>
            <div style={{ borderBottom: "1px solid rgba(245,240,240,0.12)" }} />
          </Reveal>

          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={i * 100}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 3fr", gap: "2rem",
                padding: "1.8rem 0", borderBottom: "1px solid rgba(245,240,240,0.08)",
                alignItems: "start",
              }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "rgba(245,240,240,0.3)", letterSpacing: "0.1em", paddingTop: "3px" }}>{s.index}</span>
                <p style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.4rem)", color: "#f5f0f0", letterSpacing: "0.06em", fontWeight: "normal", lineHeight: 1.1 }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(245,240,240,0.55)", lineHeight: 1.85 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ padding: "5rem clamp(1.5rem, 6vw, 5rem) 7rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center",
        }}>
          <Reveal direction="left">
            <div>
              <h2 style={{ marginBottom: "1.5rem", lineHeight: 1 }}>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: "normal", color: "#f5f0f0" }}>A</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.8rem, 3.8vw, 3.5rem)", fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.05em" }}>bout me</span>
              </h2>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(245,240,240,0.38)", marginBottom: "1.2rem", textTransform: "uppercase" }}>
                @cal1star &nbsp;·&nbsp; 4K+ Instagram &nbsp;·&nbsp; 4K+ YouTube &nbsp;·&nbsp; San Francisco, CA
              </p>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(245,240,240,0.65)", lineHeight: 1.9, marginBottom: "2rem" }}>
                Hi! I'm Calista, your friendly neighborhood videographer and video editor. USC Industrial Engineering grad with a lens pointed at life — documenting the moments, the transitions, the everyday that becomes extraordinary on screen.
              </p>

              <div style={{ display: "flex", gap: "2.5rem" }}>
                {[0, 1].map(col => (
                  <div key={col} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {LABELS.filter((_, i) => i % 2 === col).map(label => (
                      <p key={label} style={{
                        fontFamily: "var(--font-inter)", fontSize: "0.62rem",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        color: "rgba(245,240,240,0.55)", fontWeight: 400,
                      }}>{label}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FlipPhoto />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Brands ── */}
      <section style={{ padding: "3rem 0 4rem", borderTop: "1px solid rgba(245,240,240,0.06)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,240,0.25)", textAlign: "center", marginBottom: "2rem" }}>
          Trusted by
        </p>
        <LogoMarquee />
      </section>

      {/* ── Toolkit ── */}
      <section style={{ padding: "5rem clamp(1.5rem, 6vw, 5rem) 6rem", borderTop: "1px solid rgba(245,240,240,0.06)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,240,240,0.3)", marginBottom: "0.8rem" }}>
              Tools & Software
            </p>
            <h2 style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.06em", marginBottom: "3.5rem" }}>
              My Toolkit
            </h2>
          </Reveal>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(1.5rem, 4vw, 4rem)", flexWrap: "wrap" }}>
            {TOOLS.map(({ src, label }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div style={{ textAlign: "center", width: "clamp(58px, 8vw, 88px)" }}>
                  <img src={src} alt={label} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(245,240,240,0.4)", marginTop: "0.5rem", letterSpacing: "0.04em" }}>{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem clamp(1.5rem, 6vw, 5rem) 7rem", textAlign: "center", borderTop: "1px solid rgba(245,240,240,0.06)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: "normal", color: "#f5f0f0", lineHeight: 0.9, marginBottom: "2.5rem", letterSpacing: "0.02em" }}>
            Let&apos;s create<br />something.
          </h2>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter)", fontSize: "0.62rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#f5f0f0", textDecoration: "none",
              padding: "0.9rem 2.5rem",
              border: "1px solid rgba(245,240,240,0.3)",
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,240,240,0.8)"; e.currentTarget.style.background = "rgba(245,240,240,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,240,0.3)"; e.currentTarget.style.background = "transparent"; }}
          >
            Get in touch
          </a>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: "2rem", borderTop: "1px solid rgba(139,0,0,0.15)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,240,240,0.25)" }}>
          @2026 CALISTA SUHERMAN &nbsp;&nbsp;·&nbsp;&nbsp; PSALM 46:5
        </p>
      </footer>

    </main>
  );
}

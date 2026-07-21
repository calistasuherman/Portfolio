"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./components/Reveal";

/* ── Data ── */
const LABELS = ["Content Creator", "World Traveler", "Industrial Engineer", "Coffee Connoisseur", "Gen Z (21 Y/O)", "Fashion Lover"];

const FEATURED = [
  { src: "/cinema/cinema3.mp4", tag: "Videography" },
  { src: "/ve/ve1.mp4",         tag: "Motion Editing" },
  { src: "/yt/betterhelp.mp4",  tag: "Partnerships" },
];

const SERVICES = [
  {
    index: "01",
    title: "Videography",
    desc: "From concept to final cut, I film, direct, and edit short-form and long-form content tailored to your brand. Specializing in cinematic storytelling, color grading, transitions, and sound design.",
  },
  {
    index: "02",
    title: "Motion Editing",
    desc: "From clean, precise cuts to flashy motion edits, VFX, SFX, dynamic transitions, color grading, and effects that make every frame hit. The kind of edits you see in the Video Editing section, polished, high-energy, and built to stop the scroll.",
  },
  {
    index: "03",
    title: "Partnerships",
    desc: "Sponsored content and YouTube integrations that feel native, not forced. Brand partnerships, outfit content creation, styling, aesthetic curation, platform growth strategy, and trend-driven content calendars for fashion and lifestyle brands.",
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
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.7)" }}>{tag}</p>
      </div>
    </a>
  );
}

function FlipPhoto() {
  const [order, setOrder] = useState(STACK_PHOTOS.map((_, i) => i));
  return (
    <div style={{ position: "relative", width: "clamp(270px, 30vw, 420px)", height: "clamp(340px, 38vw, 540px)" }}>
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
              borderRadius: "12px", overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
            }}
          >
            <img
              src={STACK_PHOTOS[photoIdx]} alt="" draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", userSelect: "none", pointerEvents: "none" }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden" style={{ background: "#0a0000" }}>
        <video autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src="/background/pg1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16" style={{ zIndex: 3 }}>
          {/* Name block */}
          <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.2s", position: "relative", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.55rem, 1vw, 0.75rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,240,0.5)", marginBottom: "1rem", marginTop: "-4rem" }}>est. 2026</p>
            <div style={{ position: "relative" }} suppressHydrationWarning>
              <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#000000", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.18, transform: "translate(3px, 3px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
              <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#000000", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.12, transform: "translate(6px, 6px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
              <div style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#960018", lineHeight: 1.15, position: "relative", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>Calista Suherman</div>
            </div>
          </div>

          {/* Tagline */}
          <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.55s", marginTop: "1.75rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(245,240,240,0.6)", fontSize: "clamp(0.55rem, 0.85vw, 0.72rem)", letterSpacing: "0.18em", whiteSpace: "pre" }}>{"Video editing & videography is my love language."}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.8s", position: "absolute", bottom: "clamp(2.5rem, 6vh, 5rem)", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "1rem", zIndex: 3 }}>
          <a href="/work" className="inline-block px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "rgba(232,228,224,0.92)", fontFamily: "var(--font-inter)" }}>
            explore my work
          </a>
          <a href="/contact" className="inline-block px-8 py-3 rounded-none border border-text-muted text-text-muted text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-text-primary hover:text-text-primary active:scale-95" style={{ fontFamily: "var(--font-inter)" }}>
            work with me
          </a>
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ padding: "7rem clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid rgba(245,240,240,0.1)", paddingBottom: "1.2rem", marginBottom: "2.5rem" }}>
              <span>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f5f0f0", fontWeight: "normal" }}>S</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.04em" }}>elected Work</span>
              </span>
              <a href="/work" style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.4)", textDecoration: "none", transition: "color 0.3s ease" }}
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

      {/* ── About ── */}
      <section id="about" className="section-content relative pb-10 md:pb-14 px-6 md:px-16 lg:px-32" style={{ paddingTop: "1.5rem", backgroundImage: "url('/background/pg2.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          <Reveal className="order-1" direction="left">
            <div className="leading-none whitespace-nowrap" style={{ position: "relative", marginTop: "2rem", marginBottom: "1.2rem" }} suppressHydrationWarning>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, opacity: 0.18, transform: "translate(3px, 3px)", pointerEvents: "none", letterSpacing: "0.05em", color: "#000000" }}>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: "normal" }}>A</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)", fontWeight: "normal" }}>bout me</span>
              </div>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, opacity: 0.12, transform: "translate(6px, 6px)", pointerEvents: "none", letterSpacing: "0.05em", color: "#000000" }}>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: "normal" }}>A</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)", fontWeight: "normal" }}>bout me</span>
              </div>
              <h2 style={{ fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.05em", position: "relative" }}>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}>A</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)" }}>bout me</span>
              </h2>
            </div>
            <p className="font-inter" style={{ fontSize: "clamp(0.6rem, 0.95vw, 0.78rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", color: "rgba(245,240,240,0.5)", letterSpacing: "0.05em" }}>
              @cal1star &nbsp;|&nbsp; 4K+ Instagram, 4K+ YouTube &nbsp;|&nbsp; San Francisco, CA
            </p>
            <p className="font-inter text-text-muted" style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.88rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", lineHeight: 1.85, textShadow: "0 2px 12px rgba(0,0,0,0.55)", fontWeight: 400 }}>
              Hi! I&apos;m Calista, your friendly neighborhood videographer/video editor, and I&apos;m thrilled you&apos;ve found your way to my corner of the internet.
            </p>
            <div className="font-inter" style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.72rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", display: "flex", gap: "2rem", color: "#e8e4e0" }}>
              {[0, 1].map(col => (
                <div key={col} style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {LABELS.filter((_, i) => i % 2 === col).map(label => (
                    <p key={label} style={{ letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 400, whiteSpace: "nowrap" }}>{label}</p>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="order-2 flex justify-center" style={{ marginTop: "1rem" }}>
            <Reveal direction="right" delay={200}>
              <FlipPhoto />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="section-content relative py-6 overflow-hidden">
        <p className="text-center font-inter uppercase tracking-[0.25em] text-text-muted opacity-60" style={{ fontSize: "13px", marginTop: "0.5rem" }}>Trusted by</p>
      </section>

      {/* ── Portfolio Strip ── */}
      <section className="section-content relative py-1 overflow-hidden" style={{ marginTop: "-1.5rem" }}>
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div style={{ display: "flex", animation: "marquee 36s linear infinite", whiteSpace: "nowrap", width: "max-content", alignItems: "center", gap: "2rem" }}>
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: "36px", width: "auto", borderRadius: "4px", objectFit: "cover", opacity: 0.75, transition: "opacity 0.3s", display: "block", userSelect: "none" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Services ── */}
      <section id="trusted" className="relative px-6 md:px-16 lg:px-32" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="max-w-5xl mx-auto" style={{ width: "100%" }}>
          <Reveal>
            <h2 style={{ lineHeight: 1.1, marginBottom: "2rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>S</span>
              <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ignature</span>
              {" "}
              <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>S</span>
              <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ervices</span>
            </h2>
            <div style={{ borderBottom: "1px solid rgba(245,240,240,0.2)", marginBottom: "0" }} />
          </Reveal>
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={i * 120} direction="right">
              <div style={{ display: "grid", gridTemplateColumns: "40px 180px 1fr", gap: "2rem", padding: "1.75rem 0", borderBottom: "1px solid rgba(245,240,240,0.15)", alignItems: "start" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "rgba(245,240,240,0.3)", letterSpacing: "0.1em", paddingTop: "3px" }}>{s.index}</span>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f5f0f0" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(245,240,240,0.65)", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Editing Toolkit ── */}
      <section className="relative" style={{ paddingTop: "1.5rem", paddingBottom: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: "900px", width: "100%", padding: "0 2rem", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(2rem, 3.8vw, 3.8rem)", color: "#f5f0f0", lineHeight: 1, marginBottom: "4.5rem" }}>
              My Toolkit
            </div>
          </Reveal>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(1.2rem, 4vw, 3.5rem)" }}>
            {TOOLS.map(({ src, label }, i) => (
              <Reveal key={label} direction="left" delay={i * 90}>
                <div style={{ textAlign: "center", width: "clamp(64px, 9vw, 100px)" }}>
                  <img src={src} alt={label} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.52rem, 0.75vw, 0.68rem)", color: "rgba(245,240,240,0.55)", letterSpacing: "0.05em", marginTop: "0.4rem" }}>{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>

    </main>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal, useReveal } from "./components/Reveal";

const LABELS = ["Content Creator", "Gen Z (21 Y/O)", "Coffee Connoisseur", "Fashion Lover", "Frequent Traveler", "SF Based"];

function TypewriterLabels() {
  const [typed, setTyped] = useState<string[]>(Array(LABELS.length).fill(""));
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      let labelIdx = 0;
      let charIdx = 0;

      const tick = () => {
        if (labelIdx >= LABELS.length) { setActiveIdx(-1); return; }
        const label = LABELS[labelIdx];
        charIdx++;
        setActiveIdx(labelIdx);
        setTyped(prev => {
          const next = [...prev];
          next[labelIdx] = label.slice(0, charIdx);
          return next;
        });
        if (charIdx < label.length) {
          setTimeout(tick, 55);
        } else {
          labelIdx++;
          charIdx = 0;
          setTimeout(tick, 200);
        }
      };
      setTimeout(tick, 300);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="font-inter text-text-muted" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", marginTop: "1.5rem", paddingLeft: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem 2rem" }}>
      {LABELS.map((label, i) => (
        <p key={label} style={{ letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 400, minHeight: "1.2em", whiteSpace: "nowrap" }}>
          {typed[i]}{activeIdx === i ? <span style={{ opacity: 0.6 }}>|</span> : null}
        </p>
      ))}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────── */

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
  { label: "Avg. Views", value: "1.5M+", num: 1.5, suffix: "M+" },
  { label: "Followers", value: "700K+", num: 700, suffix: "K+" },
  { label: "Engagements", value: "200K+", num: 200, suffix: "K+" },
  { label: "Collaborations", value: "13+", num: 13, suffix: "+" },
];


/* ── Hooks ─────────────────────────────────────────────────── */

function useCountUp(num: number, suffix: string, visible: boolean, duration = 1600) {
  const [display, setDisplay] = useState(`0${suffix}`);
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      if (frame >= totalFrames) {
        setDisplay(`${num}${suffix}`);
        clearInterval(id);
      } else {
        const current = Math.round(eased * num * 10) / 10;
        setDisplay(`${current}${suffix}`);
      }
    }, 16);
    return () => clearInterval(id);
  }, [visible, num, suffix, duration]);
  return display;
}


/* ── Page ──────────────────────────────────────────────────── */

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <main className="relative min-h-screen overflow-x-clip">

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex flex-col items-center justify-center pt-16" style={{ zIndex: 3 }}>

            {/* est.2026 + Name block */}
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
            <a href="/work" className="inline-block px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95" style={{ background: "rgba(232,228,224,0.92)", fontFamily: "var(--font-inter)" }}>
              explore my work
            </a>
            <a href="/contact" className="inline-block px-8 py-3 rounded-none border border-text-muted text-text-muted text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-text-primary hover:text-text-primary active:scale-95" style={{ fontFamily: "var(--font-inter)" }}>
              work with me
            </a>
          </div>

        </section>

        {/* ── About ── */}
        <section id="about" className="section-content relative pt-2 md:pt-4 pb-10 md:pb-14 px-6 md:px-16 lg:px-32" style={{ backgroundImage: "url('/about-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }}>
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            <Reveal className="order-1" direction="left">
              <div className="leading-none mb-10 whitespace-nowrap" style={{ position: "relative", marginTop: "2rem" }} suppressHydrationWarning>
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
              <p className="font-inter text-text-muted" style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.88rem)", marginTop: "3.5rem", paddingLeft: "1.5rem", lineHeight: 1.85, textShadow: "0 2px 12px rgba(0,0,0,0.55)", fontWeight: 400 }}>
                Hi! I&apos;m Calista, your friendly neighborhood videographer/video editor, and I&apos;m thrilled you&apos;ve found your way to my corner of the internet.
              </p>
              <TypewriterLabels />
              <img src="/metrics.png" alt="Metrics" style={{ width: "100%", borderRadius: "8px", opacity: 0.9, marginTop: "1.5rem", paddingLeft: "1.5rem" }} />
            </Reveal>

            <div className="order-2 flex justify-center" style={{ marginTop: "2rem" }}>
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
          <div className="relative">
            <div style={{ display: "flex", animation: "marquee 36s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array.from({length: 14}, (_, i) => i + 1), ...Array.from({length: 14}, (_, i) => i + 1)].map((n, i) => (
                <div key={i} style={{ display: "inline-block", margin: "0 18px", flexShrink: 0 }}>
                  <img
                    src={`/portfolio${n}.png`}
                    alt={`Portfolio ${n}`}
                    style={{ height: "36px", width: "auto", borderRadius: "4px", objectFit: "cover", opacity: 0.75, transition: "opacity 0.3s", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Signature Services ── */}
        <section id="trusted" className="relative px-6 md:px-16 lg:px-32" style={{ display: "flex", alignItems: "center", paddingTop: "6rem", paddingBottom: "4rem", scrollMarginTop: "0" }}>
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
            {[
              { label: "VIDEOGRAPHY & EDITING", desc: "From concept to final cut, I film, direct, and edit short-form and long-form content tailored to your brand. Specializing in cinematic storytelling, color grading, transitions, and sound design across YouTube, Reels, and TikTok." },
              { label: "YOUTUBE INTEGRATIONS", desc: "Seamless sponsored segments woven naturally into my YouTube content. Full creative direction from script to screen, with an audience that trusts my recommendations." },
              { label: "COLLABORATIONS", desc: "Open to long-term brand partnerships, gifting collabs, and co-created campaigns. Whether you're a small business or an established brand, I bring the same level of creativity, authenticity, and care to every partnership." },
            ].map((row, i) => (
              <Reveal key={i} delay={i * 120} direction="right">
                <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "2rem", padding: "1.75rem 0", borderBottom: "1px solid rgba(245,240,240,0.15)" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f5f0f0" }}>{row.label}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(245,240,240,0.65)", lineHeight: 1.8 }}>{row.desc}</p>
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
              {[
                { key: "dr",     src: "/dr.png",     alt: "DaVinci Resolve", label: "DaVinci Resolve" },
                { key: "fcp",    src: "/fcp.png",    alt: "Final Cut Pro",   label: "Final Cut Pro"   },
                { key: "vs",     src: "/vs.png",     alt: "Video Star",      label: "Video Star"      },
                { key: "cc",     src: "/cc.png",     alt: "CapCut",          label: "CapCut"          },
                { key: "c",      src: "/c.png",      alt: "Canva",           label: "Canva"           },
                { key: "claude", src: "/claude.png", alt: "Claude",          label: "Claude"          },
              ].map(({ key, src, alt, label }, i) => (
                <Reveal key={key} direction="left" delay={i * 90}>
                  <div style={{ textAlign: "center", width: "clamp(64px, 9vw, 100px)" }}>
                    <img src={src} alt={alt} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
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
    </>
  );
}

/* ── Page-specific Components ──────────────────────────────── */

function TypingText({ lines, style }: { lines: string[]; style: React.CSSProperties }) {
  const full = lines.join("\n");
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= full.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 150);
    return () => clearTimeout(t);
  }, [count, full.length]);
  const typed = full.slice(0, count);
  const parts = typed.split("\n");
  return (
    <>
      {lines.map((_, i) => (
        <div key={i} style={style} suppressHydrationWarning>{parts[i] ?? ""}</div>
      ))}
    </>
  );
}

function AnalyticsGrid() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 mt-10">
      {analytics.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} visible={visible} delay={i * 130} />
      ))}
    </div>
  );
}

function StatCard({ stat, visible, delay }: { stat: (typeof analytics)[number]; visible: boolean; delay: number }) {
  const display = useCountUp(stat.num, stat.suffix, visible);
  return (
    <div className="p-4 rounded-lg stat-card" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <p className="text-2xl md:text-3xl text-text-primary" style={{ fontFamily: "var(--font-melodrama)", fontWeight: 400 }}>{display}</p>
      <p className="font-inter text-[10px] uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
    </div>
  );
}

function FlipPhoto() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setShow(s => !s), 500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ width: "clamp(260px, 32vw, 420px)", height: "clamp(340px, 42vw, 560px)", border: "none" }}>
      <Image src={show ? "/about-photo2.png" : "/about-photo1.png"} alt="Calista Suherman" fill className="object-cover object-top" />
    </div>
  );
}

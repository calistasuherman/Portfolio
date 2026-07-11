"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const youtubeIntegrations = [
  { label: "BetterHelp", src: "https://drive.google.com/file/d/1AEuTM3ICaPefspXBHq_6MdZjuvBVhnk8/preview" },
  { label: "Just4Kira", src: "https://drive.google.com/file/d/17dFdcpQd2scdLZF7_Yh82S7NmQdgn3ri/preview" },
  { label: "BypassGPT", src: "https://drive.google.com/file/d/1EdR1dsZgxdVDp0pNCxWRjRB9cdgx6Xa6/preview" },
  { label: "Lewkin", src: "https://drive.google.com/file/d/1RSgNWatSlFoJqI1QcV6WaT1YTGalYssI/preview" },
  { label: "Teddy Blake", src: "https://drive.google.com/file/d/1CrJ2MoB-A7tW41qDQosg2ZXmgRJ8elvX/preview" },
  { label: "Aelfric Eden", src: "/timeline6.mp4" },
];


/* ── Hooks ─────────────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

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
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button");
    const on = () => setCursorHover(true);
    const off = () => setCursorHover(false);
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        className="cursor-dot"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${cursorHover ? 2.8 : 1})`,
        }}
      />

      <main className="relative min-h-screen overflow-x-hidden">

        {/* ── Nav ── */}
        <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
          {/* CS monogram — absolutely positioned top-left, independent of nav */}
          <img src="/cs-monogram.png" alt="CS" style={{ position: "absolute", top: "0.5rem", left: "0.5rem", width: "clamp(58px, 7vw, 90px)", opacity: 0.9 }} />
          {/* Nav — top right */}
          <nav className="flex justify-end gap-8 md:gap-12">
            {[
              { label: "About", href: "#about" },
              { label: "My Work", href: "#work" },
              { label: "Services", href: "#services" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:tracking-[0.28em] transition-all duration-300"
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

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
                <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#960018", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.08, transform: "translate(6px, 6px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
                <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#960018", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.05, transform: "translate(12px, 12px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
                <div style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#960018", lineHeight: 1.15, position: "relative", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>Calista Suherman</div>
              </div>
            </div>

            {/* Tagline — slightly below name */}
            <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.55s", marginTop: "1.75rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-inter)", color: "rgba(245,240,240,0.7)", fontSize: "clamp(0.55rem, 0.85vw, 0.75rem)", letterSpacing: "0.08em", whiteSpace: "pre" }}>{"Video   editing    is  my    language.     Videography     is    my      storytelling."}</p>
            </div>
          </div>

          {/* Buttons — pinned to bottom of hero */}
          <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.8s", position: "absolute", bottom: "clamp(2.5rem, 6vh, 5rem)", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "1rem", zIndex: 3 }}>
            <a href="#work" className="inline-block px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95" style={{ background: "rgba(232,228,224,0.92)", fontFamily: "var(--font-inter)" }}>
              explore my work
            </a>
            <a href="#contact" className="inline-block px-8 py-3 rounded-full border border-text-muted text-text-muted text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-text-primary hover:text-text-primary active:scale-95" style={{ fontFamily: "var(--font-inter)" }}>
              work with me
            </a>
          </div>

        </section>

        {/* ── About ── */}
        <section id="about" className="section-content relative pt-6 md:pt-12 pb-10 md:pb-14 px-6 md:px-16 lg:px-32" style={{ backgroundImage: "url('/about-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }}>
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            <Reveal className="order-1" direction="left">
              <h2
                className="leading-none mb-10 whitespace-nowrap"
                style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.05em", marginLeft: "-1.5rem" }}
              >
                Who&apos;s that star?
              </h2>
              <div className="space-y-3 font-inter text-text-muted" style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)", marginTop: "1.5rem", paddingLeft: "1.5rem" }}>
                {["Content Creator", "Video Editor", "Videographer", "Coffee Connoisseur", "Frequent Traveler", "Gen Z (21 Y/O)", "Fashion Lover", "SF Based"].map((item) => (
                  <p key={item} style={{ letterSpacing: "0.04em", textTransform: "uppercase" }}>{item}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="flex justify-center order-2" direction="right" delay={200}>
              <FlipPhoto />
            </Reveal>
          </div>
        </section>

        {/* ── Trusted By ── */}
        <section className="section-content relative py-6 overflow-hidden">
          <p className="text-center font-inter uppercase tracking-[0.25em] text-text-muted opacity-60" style={{ fontSize: "13px", marginTop: "0.5rem" }}>Trusted by</p>
        </section>

        {/* ── Portfolio Strip ── */}
        <section className="section-content relative py-1 overflow-hidden" style={{ marginTop: "-1rem" }}>
          <div className="relative">
            <div style={{ display: "flex", animation: "marquee 36s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array.from({length: 14}, (_, i) => i + 1), ...Array.from({length: 14}, (_, i) => i + 1)].map((n, i) => (
                <div key={i} style={{ display: "inline-block", margin: "0 18px", flexShrink: 0 }}>
                  <img
                    src={`/portfolio${n}.png`}
                    alt={`Portfolio ${n}`}
                    style={{
                      height: "36px",
                      width: "auto",
                      borderRadius: "4px",
                      objectFit: "cover",
                      opacity: 0.75,
                      transition: "opacity 0.3s",
                      display: "block",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="section-content relative pt-4 pb-12 px-6 md:px-16 lg:px-32">
          <div className="max-w-6xl mx-auto">

            <Reveal>
              <TrayNav />
            </Reveal>

            <div style={{ height: "80px" }} />

            <Reveal delay={80}>
              <WorkSubsection id="youtube-integrations" title={<DualHeading serif="YouTube" script="Integrations" size="large" />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {youtubeIntegrations.map((item, i) => (
                    <VideoCard key={item.label} label={item.label} src={item.src} staggerDelay={i * 60} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="video-editing" title={<DualHeading serif="Video" script="Editing" size="large" />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <VideoCard key={i} label="" src={`/edit${i + 1}.mp4`} staggerDelay={i * 40} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="fashion-checks" title={<DualHeading serif="Fashion &" script="Fit Checks" size="sub" noOverlap />}>
                <div style={{ columns: "4 140px", gap: "10px" }}>
                  {[
                    "/fashion1.jpg","/fashion2.jpg","/fashion3.jpg","/fashion4.jpg",
                    "/fashion5.jpg","/fashion6.jpg","/fashion7.jpg","/fashion8.jpg",
                    "/fashion9.jpg","/fashion10.jpg","/fashion11.jpg","/fashion12.jpg",
                    "/fashion13.jpg","/fashion14.jpg","/fashion15.jpg","/fashion16.jpg",
                  ].map((src, i) => (
                    <div key={i} style={{ breakInside: "avoid", marginBottom: "10px" }}>
                      <img
                        src={src}
                        alt={`Look ${i + 1}`}
                        className="fashion-photo"
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          display: "block",
                          transform: src === "/fashion16.jpg" ? "rotate(90deg)" : src === "/DSCN9257.jpg" ? "scaleX(-1)" : undefined,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

          </div>
        </section>


        {/* ── Services ── */}
        <section id="services" className="section-content relative pt-0 pb-24 md:pb-36 px-0 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-32">
            <Reveal>
              <div className="mb-14 overflow-hidden">
                <div style={{ lineHeight: 0.85 }}>
                  <div style={{ fontFamily: "var(--font-pinyon)", fontSize: "clamp(3rem, 8vw, 8.25rem)", fontWeight: "normal", color: "#f5f0f0" }}>Signature Services</div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="service-card p-7 rounded-xl h-full">
                    <h4 className="text-text-primary text-xl md:text-2xl mb-3" style={{ fontFamily: "var(--font-melodrama)", fontWeight: 400 }}>
                      {s.title}
                    </h4>
                    <p className="font-inter text-text-muted text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section-content relative py-24 md:py-40 px-6 text-center">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at bottom, rgba(139,0,0,0.12) 0%, transparent 70%)" }}
          />
          <EnvelopeContact />
        </section>

        {/* ── Footer ── */}
        <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
          <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-40">
            © 2026 CAL1STAR — Calista Suherman
          </p>
        </footer>

      </main>
    </>
  );
}

/* ── Shared Components ──────────────────────────────────────── */

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

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  const translateMap = {
    up: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : translateMap[direction],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
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

function StatCard({
  stat,
  visible,
  delay,
}: {
  stat: (typeof analytics)[number];
  visible: boolean;
  delay: number;
}) {
  const display = useCountUp(stat.num, stat.suffix, visible);
  return (
    <div
      className="p-4 rounded-lg stat-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <p className="text-2xl md:text-3xl text-text-primary" style={{ fontFamily: "var(--font-melodrama)", fontWeight: 400 }}>
        {display}
      </p>
      <p className="font-inter text-[10px] uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
    </div>
  );
}

function DualHeading({ serif, script, size = "section", noOverlap = false }: { serif: string; script: string; size?: "section" | "sub" | "large"; noOverlap?: boolean }) {
  const serifSize = size === "section" ? "clamp(2.8rem, 6vw, 5.2rem)" : size === "large" ? "clamp(2.7rem, 5.85vw, 5.04rem)" : "clamp(2.7rem, 5.85vw, 5.04rem)";
  const scriptSize = size === "section" ? "clamp(3rem, 6.5vw, 5.6rem)" : size === "large" ? "clamp(3rem, 7vw, 7.3rem)" : "clamp(3rem, 7vw, 7.3rem)";
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", lineHeight: 1 }}>
      <span
        style={{
          fontFamily: "var(--font-melodrama)",
          fontSize: serifSize,
          fontWeight: 400,
          color: "#f5f0f0",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          position: "relative",
          zIndex: 1,
          paddingBottom: "0.04em",
        }}
      >
        {serif}
      </span>
      <span
        style={{
          fontFamily: "var(--font-luxurious)",
          fontSize: scriptSize,
          fontWeight: "normal",
          color: "#f5f0f0",
          lineHeight: 1,
          marginLeft: noOverlap ? "0.15em" : "-0.12em",
          position: "relative",
          zIndex: 2,
        }}
      >
        {script}
      </span>
    </div>
  );
}

function TrayItem({
  href,
  src,
  alt,
  label,
  style,
  imgWidth,
  rotate = 0,
  labelTop = "45%",
  labelLeft = "50%",
  decorative = false,
}: {
  href?: string;
  src: string;
  alt: string;
  label?: string;
  style: React.CSSProperties;
  imgWidth?: string;
  rotate?: number;
  labelTop?: string;
  labelLeft?: string;
  decorative?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const inner = (
    <div
      style={{ position: "relative", display: "inline-block", cursor: decorative ? "default" : "pointer", pointerEvents: "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          objectFit: "contain",
          display: "block",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease",
          transform: hovered ? `rotate(${rotate}deg) translateY(-10px) scale(1.08)` : `rotate(${rotate}deg)`,
          filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.35))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
        }}
      />
      {label && (
        <span
          style={{
            position: "absolute",
            top: labelTop ?? "45%",
            left: labelLeft ?? "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-inter)",
            fontSize: "6px",
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            whiteSpace: "nowrap",
            opacity: hovered ? 1 : 0.85,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div style={{ ...style, pointerEvents: "none" }}>
      {href ? <a href={href} style={{ pointerEvents: "auto", display: "inline-block" }}>{inner}</a> : inner}
    </div>
  );
}

function EnvelopeContact() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          setTimeout(() => setIsOpen(true), 600);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
      <style>{`
        .env-scene { width: 320px; height: 280px; position: relative; display: grid; place-items: center; cursor: pointer; user-select: none; }
        .env-wrap { position: relative; width: 260px; height: 180px; filter: drop-shadow(0 18px 28px rgba(0,0,0,0.28)); }
        .env-card {
          position: absolute; left: 50%; bottom: 28px; width: 210px; height: 150px;
          transform: translateX(-50%) translateY(38px);
          background: linear-gradient(180deg,#ffffff 0%,#fffdf8 100%);
          border-radius: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          padding: 18px; text-align: center; color: #3b2f2a;
          transition: transform 900ms cubic-bezier(.2,.9,.2,1), opacity 500ms ease;
          opacity: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .env-envelope { position: absolute; inset: auto 0 0 0; width: 260px; height: 150px; margin: auto; bottom: 0; z-index: 2; }
        .env-base { position: absolute; inset: 0; background: linear-gradient(180deg,#d8a66c 0%,#c88d4c 100%); clip-path: polygon(0 100%,50% 50%,100% 100%,100% 0,0 0); border-radius: 10px; }
        .env-front { position: absolute; inset: 0; background: linear-gradient(180deg,#e3b37b 0%,#d59a58 100%); clip-path: polygon(0 100%,50% 58%,100% 100%,100% 0,0 0); z-index: 3; }
        .env-flap { position: absolute; inset: 0; background: linear-gradient(180deg,#e8bb84 0%,#cf9550 100%); clip-path: polygon(0 0,50% 52%,100% 0); transform-origin: top center; transform: rotateX(0deg); transition: transform 800ms cubic-bezier(.2,.9,.2,1); z-index: 4; backface-visibility: hidden; }
        .env-seal { position: absolute; left: 50%; top: 74px; width: 24px; height: 24px; transform: translateX(-50%); background: #960018; border-radius: 50%; box-shadow: inset 0 -4px 0 rgba(0,0,0,0.08); z-index: 5; transition: transform 500ms ease, opacity 400ms ease; }
        .env-open .env-flap { transform: rotateX(180deg); }
        .env-open .env-card { transform: translateX(-50%) translateY(-120px); opacity: 1; }
        .env-open .env-seal { transform: translateX(-50%) scale(0.8); opacity: 0.2; }
      `}</style>

      <div
        className={`env-scene${isOpen ? " env-open" : ""}`}
        onClick={() => setIsOpen(o => !o)}
        role="button"
        aria-label="Envelope animation"
        tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsOpen(o => !o); } }}
      >
        <div className="env-wrap">
          <div className="env-card">
            <p style={{ fontFamily: "var(--font-melodrama)", fontSize: "0.75rem", opacity: 0.7, marginBottom: "4px" }}>and, that&apos;s</p>
            <h2 style={{ fontFamily: "AstonScript, cursive", fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontWeight: "normal", color: "#960018", lineHeight: 1, margin: "0 0 8px" }}>a wrap.</h2>
            <p style={{ fontFamily: "var(--font-melodrama)", fontSize: "0.55rem", opacity: 0.85, margin: "0 0 10px", letterSpacing: "0.04em" }}>Piqued your interest? Let&apos;s work together.</p>
            <a href="mailto:cal1starcollab@gmail.com" style={{ fontFamily: "var(--font-melodrama)", fontSize: "0.45rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a2020", display: "block", marginBottom: "8px" }}>cal1starcollab@gmail.com</a>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              {[["Instagram","https://instagram.com/cal1star"],["YouTube","https://www.youtube.com/@cal1stvr"],["TikTok","https://www.tiktok.com/@cal1star"]].map(([label,href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-melodrama)", fontSize: "0.4rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a2020" }}>{label}</a>
              ))}
            </div>
          </div>
          <div className="env-envelope">
            <div className="env-base" />
            <div className="env-front" />
            <div className="env-flap" />
            <div className="env-seal" />
          </div>
        </div>
      </div>
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

function TrayNav() {
  return (
    <div style={{ width: "100%" }}>
      <div className="relative">
          <img src="/tray-bg.png" alt="Tray" style={{ width: "100%", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }} />

          {/* Title overlay — top left */}
          <div style={{ position: "absolute", left: "3%", top: "8%", zIndex: 4 }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.4rem, 2.8vw, 3.2rem)", color: "#f5f0f0", lineHeight: 1.15, fontWeight: 400, fontStyle: "italic" }}>
              What I Bring To The
            </p>
            <p style={{ fontFamily: "var(--font-pinyon)", fontSize: "clamp(2.2rem, 4.5vw, 5rem)", color: "#f5f0f0", lineHeight: 1, marginTop: "-0.1em" }}>
              Table
            </p>
          </div>

          {/* Croissant — left third */}
          <TrayItem
            href="#youtube-integrations"
            src="/tray-croissant.png"
            alt="YouTube Integrations"
            label="youtube integrations"
            rotate={-10}
            style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }}
          />

          {/* Figs — center */}
          <TrayItem
            href="#fashion-checks"
            src="/tray-figs.png"
            alt="Fashion & Fit Checks"
            label="fashion / fit checks"
            style={{ position: "absolute", left: "55%", top: "62%", transform: "translate(-50%, -50%)", zIndex: 3, width: "40%" }}
          />

          {/* Coffee — right third */}
          <TrayItem
            href="#video-editing"
            src="/tray-coffee.png"
            alt="Video Editing"
            label="video editing"
            labelTop="40%"
            style={{ position: "absolute", left: "59%", top: "34%", transform: "translate(-50%, -50%)", zIndex: 2, width: "40%" }}
          />
      </div>
    </div>
  );
}

function WorkSubsection({ id, title, children }: { id?: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div id={id} className={id === "video-editing" ? "mb-0" : "mb-20"} style={{ scrollMarginTop: "80px" }}>
      <div className="mb-8 text-center">
        {title}
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 right-0 h-px"
      style={{ background: "linear-gradient(to right, transparent, rgba(139,0,0,0.45), transparent)" }}
    />
  );
}

function VideoCard({
  label,
  src,
  staggerDelay = 0,
}: {
  label: string;
  src: string;
  staggerDelay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEmbed = src.includes("youtube.com/embed") || src.includes("drive.google.com");

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <div
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        aspectRatio: "16/9",
        border: "1px solid rgba(139,0,0,0.2)",
        transitionDelay: `${staggerDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEmbed ? (
        <iframe
          src={src}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
        style={{ background: "linear-gradient(to top, rgba(13,0,0,0.85), transparent)" }}
      >
        {label && <span className="font-inter text-[10px] uppercase tracking-widest text-text-primary">{label}</span>}
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: "rgba(139,0,0,0.12)" }}
      />
    </div>
  );
}

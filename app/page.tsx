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
  { label: "BetterHelp", src: "https://fakm96vai58f7jtz.public.blob.vercel-storage.com/Timeline%201.mov" },
  { label: "Just4Kira", src: "https://fakm96vai58f7jtz.public.blob.vercel-storage.com/Timeline%202.mov" },
  { label: "BypassGPT", src: "https://fakm96vai58f7jtz.public.blob.vercel-storage.com/Timeline%203.mov" },
  { label: "Lewkin", src: "https://fakm96vai58f7jtz.public.blob.vercel-storage.com/Timeline%204.mov" },
  { label: "Teddy Blake", src: "https://fakm96vai58f7jtz.public.blob.vercel-storage.com/Timeline%205.mov" },
  { label: "Aelfric Eden", src: "" },
];

/* ── Hooks ─────────────────────────────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
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
        <header className="section-content fixed top-0 left-0 right-0 z-50 flex justify-center py-5 px-6">
          <nav className="nav-pill flex gap-8 md:gap-12">
            {[
              { label: "About", href: "#about" },
              { label: "My Work", href: "#work" },
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

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
          {/* Video background */}
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
          {/* Subtle overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.18)", zIndex: 1 }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-16" style={{ zIndex: 3 }}>
            {/* Staggered name */}
            <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <div
                style={{
                  fontFamily: "AstonScript, cursive",
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  fontWeight: "normal",
                  color: "#7f1d1d",
                  lineHeight: 0.95,
                  display: "block",
                }}
              >
                Calista
              </div>
              <div
                style={{
                  fontFamily: "AstonScript, cursive",
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  fontWeight: "normal",
                  color: "#7f1d1d",
                  lineHeight: 0.95,
                  display: "block",
                }}
              >
                Suherman
              </div>
            </div>

            {/* Subtitle + CTA */}
            <p
              className={`font-inter text-text-muted text-[11px] md:text-xs mt-8 tracking-[0.15em] hero-item${heroVisible ? " hero-visible" : ""}`}
              style={{ transitionDelay: "0.55s" }}
            >
              Fashion &amp; Lifestyle Content Creator · Video Editor
            </p>

            <div
              className={`flex items-center gap-4 mt-8 hero-item${heroVisible ? " hero-visible" : ""}`}
              style={{ transitionDelay: "0.75s" }}
            >
              <a
                href="#work"
                className="inline-block px-8 py-3 rounded-full border border-text-muted text-text-muted font-inter text-[10px] uppercase tracking-[0.2em] hover:border-text-primary hover:text-text-primary transition-all duration-300"
              >
                explore my work
              </a>
              <a
                href="#contact"
                className="inline-block px-8 py-3 rounded-full font-inter text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:opacity-80"
                style={{ background: "rgba(232,228,224,0.85)" }}
              >
                work with me
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style={{ zIndex: 3 }}>
            <div className="w-px h-10 bg-text-muted animate-pulse" />
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
          <Divider />
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            <Reveal className="order-1" direction="left">
              <h2
                className="leading-none mb-10"
                style={{ fontFamily: "var(--font-pinyon)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, color: "#f5f0f0" }}
              >
                About Me
              </h2>
              <div className="space-y-5 font-inter text-text-muted text-sm md:text-[15px] leading-relaxed">
                <p>The name&apos;s Calista — content creator, video editor, chronic over-thinker about frame rates.</p>
                <p>I&apos;ve been making fashion and lifestyle content for four years, based out of San Francisco with a weakness for New York. The goal has always been simple: make something that doesn&apos;t feel like an ad, even when it is.</p>
                <p>Seven hundred thousand followers later, I&apos;ve worked with brands like BetterHelp, Aelfric Eden, Teddy Blake, and Lewkin on YouTube integrations that actually sound like me — not a script someone emailed at 11pm.</p>
                <p>The editing is where it all comes together. That part&apos;s never going to get old.</p>
              </div>
              <AnalyticsGrid />
            </Reveal>

            <Reveal className="flex justify-center order-2" direction="right" delay={200}>
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  width: "clamp(260px, 32vw, 420px)",
                  height: "clamp(340px, 42vw, 560px)",
                  border: "1px solid rgba(139,0,0,0.25)",
                }}
              >
                <Image src="/about.jpg" alt="Calista Suherman" fill className="object-cover object-center" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(13,0,0,0.35) 0%, transparent 50%)" }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
          <Divider />
          <div className="max-w-6xl mx-auto">

            <Reveal>
              <TrayNav />
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="youtube-integrations" title={<DualHeading serif="YouTube" script="Integrations" size="sub" />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {youtubeIntegrations.map((item, i) => (
                    <VideoCard key={item.label} label={item.label} src={item.src} staggerDelay={i * 60} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="fashion-checks" title={<DualHeading serif="Fashion &" script="Fit Checks" size="sub" />}>
                <div style={{ columns: "3 180px", gap: "12px" }}>
                  {[
                    "/fashion1.jpg","/fashion2.jpg","/fashion3.jpg","/fashion4.jpg",
                    "/fashion5.jpg","/fashion6.jpg","/fashion7.jpg","/fashion8.jpg",
                    "/fashion9.jpg","/fashion10.jpg","/fashion11.jpg","/fashion12.jpg",
                    "/fashion13.jpg","/fashion14.jpg","/fashion15.jpg","/fashion16.jpg",
                  ].map((src, i) => (
                    <div key={i} style={{ breakInside: "avoid", marginBottom: "12px" }}>
                      <img
                        src={src}
                        alt={`Look ${i + 1}`}
                        className="fashion-photo"
                        style={{
                          width: "100%",
                          borderRadius: "12px",
                          display: "block",
                          transform: src === "/fashion16.jpg" ? "rotate(90deg)" : undefined,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="video-editing" title={<DualHeading serif="Video" script="Editing" size="sub" />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <VideoCard key={i} label="" src={`/edit${i + 1}.mp4`} staggerDelay={i * 40} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

          </div>
        </section>


        {/* ── Services ── */}
        <section id="services" className="section-content relative py-24 md:py-36 px-6 md:px-16 lg:px-32">
          <Divider />
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-14">
                <p className="text-text-muted text-base mb-2" style={{ fontFamily: "var(--font-melodrama)" }}>what I offer</p>
                <DualHeading serif="My" script="Services" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="service-card p-7 rounded-xl h-full">
                    <h4 className="font-cormorant italic text-text-primary text-xl md:text-2xl mb-3" style={{ fontWeight: 400 }}>
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
          <Divider />
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at bottom, rgba(139,0,0,0.12) 0%, transparent 70%)" }}
          />
          <Reveal className="relative max-w-xl mx-auto">
            <p className="text-text-muted text-lg mb-2" style={{ fontFamily: "var(--font-melodrama)" }}>and, that&apos;s</p>
            <h2
              className="leading-none mb-6"
              style={{ fontFamily: "AstonScript, cursive", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: "normal", color: "#f5f0f0" }}
            >
              a wrap.
            </h2>
            <p className="font-inter text-text-muted text-sm mb-10 leading-relaxed">
              Piqued your interest? Let&apos;s work together.
            </p>
            <a
              href="mailto:cal1starcollab@gmail.com"
              className="inline-block px-10 py-4 rounded-full border border-text-muted text-text-muted font-inter text-[11px] uppercase tracking-[0.25em] hover:border-text-primary hover:text-text-primary transition-all duration-300 mb-10"
            >
              cal1starcollab@gmail.com
            </a>
            <div className="flex justify-center gap-8 mt-8">
              <a
                href="https://instagram.com/cal1star"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[10px] uppercase tracking-[0.25em] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-muted pb-0.5 transition-all duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@cal1stvr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[10px] uppercase tracking-[0.25em] text-text-muted hover:text-text-primary border-b border-transparent hover:border-text-muted pb-0.5 transition-all duration-300"
              >
                YouTube
              </a>
            </div>
          </Reveal>
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
      <p className="font-cormorant italic text-2xl md:text-3xl text-text-primary" style={{ fontWeight: 300 }}>
        {display}
      </p>
      <p className="font-inter text-[10px] uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
    </div>
  );
}

function DualHeading({ serif, script, size = "section" }: { serif: string; script: string; size?: "section" | "sub" }) {
  const serifSize = size === "section" ? "clamp(2.5rem, 6vw, 5rem)" : "clamp(2.4rem, 5vw, 4rem)";
  const scriptSize = size === "section" ? "clamp(2.8rem, 7vw, 5.6rem)" : "clamp(2.7rem, 5.5vw, 4.5rem)";
  return (
    <div className="flex items-baseline justify-center flex-wrap">
      <span
        className="font-cormorant"
        style={{ fontSize: serifSize, fontWeight: 700, color: "#f5f0f0", lineHeight: 1, letterSpacing: "-0.01em" }}
      >
        {serif}
      </span>
      <span
        style={{
          fontFamily: "var(--font-pinyon)",
          fontSize: scriptSize,
          fontWeight: "normal",
          color: "#f5f0f0",
          lineHeight: 1,
          marginLeft: "-0.1em",
          position: "relative",
          top: "0.08em",
        }}
      >
        {script}
      </span>
    </div>
  );
}

function TrayNav() {
  return (
    <div className="relative mx-auto mb-4" style={{ maxWidth: "680px", width: "100%" }}>
      {/* Curved title over tray */}
      <svg viewBox="0 0 680 200" width="100%" style={{ position: "absolute", top: 0, left: 0, zIndex: 3, pointerEvents: "none" }}>
        <defs>
          <path id="trayArc" d="M 40,195 A 300,250 0 0,1 640,195" />
        </defs>
        <text fill="#f5f0f0" style={{ fontFamily: "var(--font-melodrama)", fontSize: "36px" }}>
          <textPath href="#trayArc" startOffset="50%" textAnchor="middle">
            what I bring to the table
          </textPath>
        </text>
      </svg>

      {/* Tray */}
      <div className="relative mx-auto" style={{
        width: "100%",
        paddingBottom: "58%",
        marginTop: "110px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 38% 32%, #ece6e0 0%, #c8bab0 45%, #9a8878 100%)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -3px 8px rgba(0,0,0,0.25)",
        border: "2px solid rgba(210,198,188,0.6)",
      }}>
        {/* click us! */}
        <span className="absolute" style={{
          left: "6%", top: "44%",
          fontFamily: "var(--font-melodrama)",
          color: "#7f1d1d", fontSize: "clamp(0.9rem,2vw,1.1rem)",
          transform: "rotate(-12deg)", whiteSpace: "nowrap",
        }}>
          click us!
        </span>

        {/* Croissant → YouTube Integrations */}
        <a href="#youtube-integrations" className="tray-item absolute flex flex-col items-center" style={{ left: "16%", top: "32%" }}>
          <span style={{ fontSize: "clamp(2.5rem,6vw,4rem)", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))" }}>🥐</span>
          <span className="font-inter text-center" style={{ fontSize: "clamp(8px,1.2vw,11px)", color: "#3d1a0a", letterSpacing: "0.04em", marginTop: "4px" }}>youtube integrations</span>
        </a>

        {/* Ice cream → Fashion & Fit Checks */}
        <a href="#fashion-checks" className="tray-item absolute flex flex-col items-center" style={{ left: "50%", top: "46%", transform: "translateX(-50%)" }}>
          <span style={{ fontSize: "clamp(2.2rem,5.5vw,3.5rem)", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))" }}>🍨</span>
          <span className="font-inter text-center" style={{ fontSize: "clamp(8px,1.2vw,11px)", color: "#3d1a0a", letterSpacing: "0.04em", marginTop: "4px" }}>fashion/fit checks</span>
        </a>

        {/* Coffee → Video Editing */}
        <a href="#video-editing" className="tray-item absolute flex flex-col items-center" style={{ right: "14%", top: "24%" }}>
          <span style={{ fontSize: "clamp(2.5rem,6vw,4rem)", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))" }}>☕</span>
          <span className="font-inter text-center" style={{ fontSize: "clamp(8px,1.2vw,11px)", color: "#3d1a0a", letterSpacing: "0.04em", marginTop: "4px" }}>video editing</span>
        </a>
      </div>
    </div>
  );
}

function WorkSubsection({ id, title, children }: { id?: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-20" style={{ scrollMarginTop: "80px" }}>
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

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-14">
      {sub && (
        <p className="font-cormorant italic text-text-muted text-base mb-1">{sub}</p>
      )}
      <h2
        className="font-cormorant italic"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#f5f0f0", lineHeight: 1 }}
      >
        {children}
      </h2>
    </div>
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
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  };

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
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Label overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
        style={{ background: "linear-gradient(to top, rgba(13,0,0,0.85), transparent)" }}
      >
        {label && <span className="font-inter text-[10px] uppercase tracking-widest text-text-primary">{label}</span>}
      </div>
      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-opacity duration-300"
        style={{ background: "rgba(13,0,0,0.6)", opacity: hovered ? 1 : 0, border: "1px solid rgba(232,228,224,0.3)" }}
      >
        {muted ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(232,228,224,0.9)" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(232,228,224,0.9)" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: "rgba(139,0,0,0.12)" }}
      />
    </div>
  );
}

function WorkCard({
  label,
  tag,
  aspect = "4/3",
  staggerDelay = 0,
}: {
  label: string;
  tag: string;
  aspect?: string;
  staggerDelay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        aspectRatio: aspect,
        background: "linear-gradient(135deg, rgba(61,0,0,0.55) 0%, rgba(13,0,0,0.85) 100%)",
        border: "1px solid rgba(139,0,0,0.2)",
        transitionDelay: `${staggerDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0, background: "radial-gradient(ellipse at center, rgba(139,0,0,0.3) 0%, transparent 70%)" }}
      />
      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-400"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.8)" }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(232,228,224,0.55)", background: "rgba(13,0,0,0.55)", backdropFilter: "blur(6px)" }}
        >
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
            <path d="M1 1l9 5.5L1 12V1z" fill="rgba(232,228,224,0.9)" />
          </svg>
        </div>
      </div>
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3">
          <span className="font-cormorant italic text-text-primary text-center" style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}>
            {label}
          </span>
          <span className="font-inter text-[9px] uppercase tracking-widest text-text-muted">{tag}</span>
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ background: "rgba(139,0,0,0.8)", opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

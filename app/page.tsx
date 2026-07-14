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
  { label: "Aelfric Eden", src: "/aelfriceden.mp4" },
  { label: "BetterHelp", src: "/betterhelp.mp4" },
  { label: "Just4Kira", src: "/just4kira.mp4" },
  { label: "Lewkin", src: "/lewkin.mp4" },
  { label: "Teddy Blake", src: "/teddyblake.mp4" },
  { label: "BypassGPT", src: "/bypassgpt.mp4" },
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
  const [spotifyOpen, setSpotifyOpen] = useState(false);


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

      <main className="relative min-h-screen overflow-x-clip">

        {/* ── Nav ── */}
        <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
          {/* CS monogram — absolutely positioned top-left, independent of nav */}
          <img src="/cs-monogram.png" alt="CS" style={{ position: "absolute", top: "0.5rem", left: "-1rem", width: "clamp(58px, 7vw, 90px)", opacity: 0.9 }} />
          {/* Nav — top right */}
          <nav className="flex justify-end gap-8 md:gap-12">
            {[
              { label: "About", href: "#about" },
              { label: "Services", href: "#trusted" },
              { label: "My Work", href: "#work" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:tracking-[0.28em] transition-all duration-300"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: link.href === "#trusted" ? top : top - 80, behavior: "smooth" });
                  }
                }}
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
                <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#000000", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.18, transform: "translate(3px, 3px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
                <div aria-hidden="true" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: "normal", color: "#000000", lineHeight: 1.15, position: "absolute", top: 0, left: 0, opacity: 0.12, transform: "translate(6px, 6px)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.05em" }}>Calista Suherman</div>
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
            <a href="#work" className="inline-block px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95" style={{ background: "rgba(232,228,224,0.92)", fontFamily: "var(--font-inter)" }}>
              explore my work
            </a>
            <a href="#contact" className="inline-block px-8 py-3 rounded-none border border-text-muted text-text-muted text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-text-primary hover:text-text-primary active:scale-95" style={{ fontFamily: "var(--font-inter)" }}>
              work with me
            </a>
          </div>

        </section>

        {/* ── About ── */}
        <section id="about" className="section-content relative pt-6 md:pt-12 pb-10 md:pb-14 px-6 md:px-16 lg:px-32" style={{ backgroundImage: "url('/about-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }}>
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            <Reveal className="order-1" direction="left">
              <div className="leading-none mb-10 whitespace-nowrap" style={{ position: "relative", marginTop: "3.5rem" }} suppressHydrationWarning>
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, opacity: 0.18, transform: "translate(3px, 3px)", pointerEvents: "none", letterSpacing: "0.05em", color: "#000000" }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: "normal" }}>W</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)", fontWeight: "normal" }}>ho&apos;s that star?</span>
                </div>
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, opacity: 0.12, transform: "translate(6px, 6px)", pointerEvents: "none", letterSpacing: "0.05em", color: "#000000" }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)", fontWeight: "normal" }}>W</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)", fontWeight: "normal" }}>ho&apos;s that star?</span>
                </div>
                <h2 style={{ fontWeight: "normal", color: "#f5f0f0", letterSpacing: "0.05em", position: "relative" }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}>W</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)" }}>ho&apos;s that star?</span>
                </h2>
              </div>
              <div className="space-y-3 font-inter text-text-muted" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", marginTop: "3.5rem", paddingLeft: "1.5rem" }}>
                {[
                  { label: "Content Creator", bold: false },
                  { label: "Video Editor", bold: true },
                  { label: "Videographer", bold: false },
                  { label: "Coffee Connoisseur", bold: true },
                  { label: "Frequent Traveler", bold: false },
                  { label: "Gen Z (21 Y/O)", bold: true },
                  { label: "Fashion Lover", bold: false },
                  { label: "SF Based", bold: true },
                ].map(({ label, bold }) => (
                  <p key={label} style={{ letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: bold ? 700 : 400 }}>{label}</p>
                ))}
                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.04em", fontWeight: 400 }}>4K+ FOLLOWERS</p>
                  <a href="https://instagram.com/cal1star" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "#f5f0f0", textDecoration: "none", lineHeight: 1.1 }}>Instagram</a>
                </div>
                <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.04em", fontWeight: 400 }}>4K+ SUBSCRIBERS</p>
                  <a href="https://www.youtube.com/@cal1stvr" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "#f5f0f0", textDecoration: "none", lineHeight: 1.1 }}>YouTube</a>
                </div>
              </div>
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

        {/* ── Signature Services ── */}
        <section id="trusted" className="relative px-6 md:px-16 lg:px-32" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "7rem", paddingBottom: "6rem", scrollMarginTop: "0" }}>
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
        <section className="relative" style={{ paddingTop: "1.5rem", paddingBottom: "4rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>

            {/* Title */}
            <Reveal>
              <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(2rem, 3.8vw, 3.8rem)", color: "#f5f0f0", lineHeight: 1, marginBottom: "4.5rem" }}>
                My Toolkit
              </div>
            </Reveal>

            {/* Apps row — equal spacing, slide up with stagger */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(1.2rem, 4vw, 3.5rem)" }}>
              {[
                { key: "dr",     src: "/dr.png",     alt: "DaVinci Resolve", label: "DaVinci Resolve" },
                { key: "fcp",    src: "/fcp.png",    alt: "Final Cut Pro",   label: "Final Cut Pro"   },
                { key: "vs",     src: "/vs.png",     alt: "Video Star",      label: "Video Star"      },
                { key: "cc",     src: "/cc.png",     alt: "CapCut",          label: "CapCut"          },
                { key: "c",      src: "/c.png",      alt: "Canva",           label: "Canva"           },
                { key: "claude", src: "/claude.png", alt: "Claude",          label: "Claude"          },
              ].map(({ key, src, alt, label }, i) => (
                <Reveal key={key} direction="up" delay={i * 90}>
                  <div style={{ textAlign: "center", width: "clamp(64px, 9vw, 100px)" }}>
                    <img src={src} alt={alt} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.52rem, 0.75vw, 0.68rem)", color: "rgba(245,240,240,0.55)", letterSpacing: "0.05em", marginTop: "0.4rem" }}>{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className="section-content relative pt-4 pb-12 px-6 md:px-16 lg:px-32" style={{ scrollMarginTop: "20px" }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <TrayNav />
            </Reveal>
            <div style={{ height: "80px" }} />

            <Reveal delay={80}>
              <WorkSubsection id="cinematography" title={
                <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>C</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>inematography</span>
                </div>
              }>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <VideoCard key={1} label="" src="/edit1.mp4" staggerDelay={0} square={false} />
                  <VideoCard key={11} label="" src="/edit11.mp4" staggerDelay={40} square={false} />
                  <VideoCard key="sd" label="" src="/sd.mp4" staggerDelay={80} square={false} />
                  <VideoCard key="iced" label="" src="/icedbananalatte.mp4" staggerDelay={160} square={false} />
                  <VideoCard key="temple" label="" src="/temple.mov" staggerDelay={200} square={false} />
                  <VideoCard key="walking" label="" src="/walking.mp4" staggerDelay={240} square={false} />
                  <VideoCard key="running" label="" src="/running.mp4" staggerDelay={280} square={false} />
                  <VideoCard key="colorgrading" label="" src="/colorgrading.mp4" staggerDelay={320} square={false} />
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="video-editing" title={
                <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>V</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ideo</span>
                  {" "}
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>E</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>diting</span>
                </div>
              }>
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                  <VideoCard key="ny" label="" src="/NY.MOV" staggerDelay={0} square={false} />
                  {[
                    { n: 2,  square: true  },
                    { n: 3,  square: true  },
                    { n: 4,  square: true  },
                    { n: 5,  square: true  },
                    { n: 6,  square: true  },
                    { n: 7,  square: true  },
                    { n: 8,  square: true  },
                    { n: 9,  square: true  },
                    { n: 10, square: true  },
                    { n: 12, square: true  },
                  ].map(({ n, square }, i) => (
                    <VideoCard key={n} label="" src={`/edit${n}.mp4`} staggerDelay={i * 40} square={square} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>

            <Reveal delay={80}>
              <WorkSubsection id="youtube-integrations" title={
                <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>Y</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ouTube</span>
                  {" "}
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>I</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ntegrations</span>
                </div>
              }>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {youtubeIntegrations.map((item, i) => (
                    <VideoCard key={item.label} label={item.label} src={item.src} staggerDelay={i * 60} />
                  ))}
                </div>
              </WorkSubsection>
            </Reveal>


          </div>
        </section>


        {/* ── Contact ── */}
        <section id="contact" className="section-content relative" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem clamp(2rem, 6vw, 6rem)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(3rem, 8vw, 8rem)", width: "100%", maxWidth: "1100px", margin: "0 auto" }}>

            {/* Left — typography + contact */}
            <div style={{ flex: "0 0 auto", textAlign: "left" }}>
              {/* "and that's a" stacked directly above "Wrap." */}
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "-0.05em" }}>and that&apos;s a</div>
                <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(5rem, 10vw, 10rem)", color: "#f5f0f0", lineHeight: 0.88 }}>Wrap.</div>
              </div>

              {/* Contact info */}
              <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <a href="mailto:cal1starcollab@gmail.com" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.72rem, 1.1vw, 0.92rem)", color: "rgba(245,240,240,0.65)", letterSpacing: "0.06em", textDecoration: "none" }}>cal1starcollab@gmail.com</a>
                <div style={{ display: "flex", gap: "2rem", marginTop: "0.3rem" }}>
                  {[["Instagram","https://instagram.com/cal1star"],["YouTube","https://www.youtube.com/@cal1stvr"],["TikTok","https://www.tiktok.com/@cal1star"]].map(([label,href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(0.75rem, 1.1vw, 0.95rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,240,0.45)", textDecoration: "none" }}>{label}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — car photo, contained */}
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/car.jpg"
                alt=""
                style={{ display: "block", height: "clamp(320px, 55vh, 580px)", width: "auto", objectFit: "contain", borderRadius: "2px" }}
              />
            </div>

          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
          <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-text-muted opacity-40">
            © 2026 CAL1STAR — Calista Suherman
          </p>
        </footer>

        {/* ── Spotify vinyl widget ── */}
        <div style={{ position: "fixed", bottom: "1.8rem", left: "1.8rem", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>

          {/* Compact player — slides up behind vinyl */}
          <div style={{
            overflow: "hidden",
            borderRadius: "14px",
            width: "280px",
            maxHeight: spotifyOpen ? "80px" : "0",
            opacity: spotifyOpen ? 1 : 0,
            transform: spotifyOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
            transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.65)",
          }}>
            <iframe
              src="https://open.spotify.com/embed/artist/0du5cEVh5yTK9QJze8zA0C?utm_source=generator&theme=0"
              width="280"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block", borderRadius: "14px" }}
            />
          </div>

          {/* Vinyl record */}
          <button
            onClick={() => setSpotifyOpen(o => !o)}
            aria-label="Toggle Spotify player"
            style={{
              width: "72px", height: "72px", borderRadius: "50%", border: "none", padding: 0,
              cursor: "none", position: "relative", flexShrink: 0,
              animation: `vinylSpin ${spotifyOpen ? "3s" : "18s"} linear infinite`,
              boxShadow: spotifyOpen
                ? "0 0 0 3px rgba(29,185,84,0.5), 0 8px 32px rgba(0,0,0,0.7)"
                : "0 4px 20px rgba(0,0,0,0.6)",
              transition: "box-shadow 0.4s ease",
              background: [
                "radial-gradient(circle, #111 0%, #111 8%,",          // hole
                "#c0392b 8%, #a93226 34%,",                            // red label
                "#1a1a1a 34%, #1a1a1a 36%,",                          // groove gap
                "#222 36%, #1c1c1c 40%,",
                "#1a1a1a 40%, #222 46%,",
                "#1c1c1c 46%, #1a1a1a 52%,",
                "#222 52%, #1c1c1c 58%,",
                "#1a1a1a 58%, #222 64%,",
                "#1c1c1c 64%, #1a1a1a 72%,",
                "#222 72%, #1c1c1c 80%,",
                "#1a1a1a 80%, #1a1a1a 100%)",
              ].join(" "),
            }}
          >
            {/* Shine highlight */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.12) 0%, transparent 55%)",
            }} />
          </button>

        </div>

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
  const [cardUp, setCardUp] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setCardUp(true), 400); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#fdf8f4", overflow: "hidden" }}>
      <style>{`
        .contact-card {
          position: absolute;
          left: 50%; bottom: 34%;
          transform: translateX(-50%) translateY(0);
          width: clamp(180px, 28vw, 320px);
          background: #fff;
          border: 1px solid #e8ddd6;
          border-radius: 4px;
          padding: clamp(16px, 2.5vw, 28px) clamp(20px, 3vw, 36px);
          text-align: center;
          z-index: 3;
          transition: transform 1.1s cubic-bezier(.2,.9,.2,1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
        }
        .contact-card.up {
          transform: translateX(-50%) translateY(-42%);
        }
      `}</style>

      {/* "and," — top right */}
      <span style={{
        position: "absolute", top: "8%", right: "6%",
        fontFamily: "BillaMount, cursive", fontWeight: "normal",
        fontSize: "clamp(3rem, 8vw, 7rem)", color: "#8b0000",
        lineHeight: 1, zIndex: 5, pointerEvents: "none",
      }}>and,</span>

      {/* "that's" — right, below "and," */}
      <span style={{
        position: "absolute", top: "22%", right: "4%",
        fontFamily: "BillaMount, cursive", fontWeight: "normal",
        fontSize: "clamp(3rem, 8vw, 7rem)", color: "#8b0000",
        lineHeight: 1, zIndex: 5, pointerEvents: "none",
      }}>that&apos;s</span>

      {/* "a wrap." — bottom left */}
      <span style={{
        position: "absolute", bottom: "10%", left: "4%",
        fontFamily: "BillaMount, cursive", fontWeight: "normal",
        fontSize: "clamp(3rem, 8vw, 7rem)", color: "#8b0000",
        lineHeight: 1, zIndex: 5, pointerEvents: "none",
      }}>a wrap.</span>

      {/* Card sliding out */}
      <div className={`contact-card${cardUp ? " up" : ""}`}>
        <p style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(0.75rem, 1.4vw, 1rem)", color: "#3b2020", lineHeight: 1.5, marginBottom: "0.6em" }}>
          Thank you for taking the time to look through<br />my portfolio! Piqued your interest?<br />Let&apos;s work together!
        </p>
        <a href="mailto:cal1starcollab@gmail.com" style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", color: "#8b0000", fontWeight: "bold", letterSpacing: "0.02em" }}>
          cal1starcollab@gmail.com
        </a>
      </div>

      {/* Envelope photo — open, centered, fills bottom portion */}
      <img
        src="/envelope-open.jpg"
        alt="Envelope"
        style={{
          position: "absolute",
          bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(320px, 55vw, 700px)",
          zIndex: 4,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
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
            <p style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.2rem, 2.4vw, 2.6rem)", color: "#f5f0f0", lineHeight: 1.15, fontWeight: "normal", letterSpacing: "0.15em" }}>
              WHAT&nbsp;&nbsp;&nbsp;I
            </p>
            <p style={{ lineHeight: 1.05, marginTop: "0.05em" }}>
              <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.8rem, 3.6vw, 4rem)", color: "#f5f0f0", fontWeight: "normal" }}>Bring </span>
              <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.2rem, 2.4vw, 2.6rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.1em" }}>to the</span>
            </p>
            <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2rem, 4vw, 4.4rem)", color: "#f5f0f0", lineHeight: 1, fontWeight: "normal", marginTop: "0.3em" }}>
              Table
            </p>
          </div>

          {/* Croissant — left third */}
          <TrayItem
            href="#cinematography"
            src="/tray-croissant.png"
            alt="Cinematography"
            label="cinematography"
            rotate={-10}
            style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }}
          />

          {/* Figs — center */}
          <TrayItem
            href="#youtube-integrations"
            src="/tray-figs.png"
            alt="YouTube Integrations"
            label="youtube integrations"
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

function VideoCard({
  label,
  src,
  staggerDelay = 0,
  square = false,
}: {
  label: string;
  src: string;
  staggerDelay?: number;
  square?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEmbed = src.includes("youtube.com/embed") || src.includes("drive.google.com");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        aspectRatio: square ? "1/1" : "16/9",
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
          muted
          preload="none"
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

"use client";
import { useEffect, useRef, useState } from "react";
import { MEDIA_BASE } from "./lib/media";

/* ── Re-triggering reveal (home page only) ──
   Unlike the shared Reveal component, this toggles visibility every time
   the element enters/leaves the viewport, so sections fade in scrolling
   down and fade back out scrolling away, instead of revealing once. */
function useRevealToggle(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealToggle({
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
  const { ref, visible } = useRevealToggle();
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

/* ── Data ── */
const LABELS = ["Content Creator", "World Traveler", "Woman of God", "Coffee Connoisseur", "Gen Z (21 Y/O)", "Fashion Lover"];

const FEATURED = [
  { src: `${MEDIA_BASE}/ve/ve1.mp4`,         tag: "Video Editing" },
  { src: `${MEDIA_BASE}/cinema/cinema3.mp4`, tag: "Videography" },
  { src: `${MEDIA_BASE}/yt/invideocollab.mp4`, tag: "Partnerships" },
];

const LOGO_SCALE: Record<number, number> = { 15: 0.6, 17: 2, 18: 0.45 };
const LOGO_IDS = [15, 16, 17, 18];
const LOGOS = LOGO_IDS.map(id => ({
  src: `/logos/portfolio${id}.png`,
  scale: LOGO_SCALE[id] ?? 1,
}));

const TOOLS = [
  { src: "/apps/dr.png",     label: "DaVinci Resolve" },
  { src: "/apps/fcp.png",    label: "Final Cut Pro"   },
  { src: "/apps/vs.png",     label: "Video Star"      },
  { src: "/apps/cc.png",     label: "CapCut"          },
  { src: "/apps/c.png",      label: "Canva"           },
  { src: "/apps/claude.png", label: "Claude"          },
];

/* ── Components ── */

function FeaturedCard({ src, tag }: { src: string; tag: string }) {
  const [hovered, setHovered] = useState(false);
  /* only start downloading the video once the card is near the screen */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); obs.disconnect(); } }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href="/work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden", borderRadius: "4px", textDecoration: "none" }}
    >
      <video
        ref={videoRef}
        src={near ? src : undefined} autoPlay muted loop playsInline preload={near ? "auto" : "none"}
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
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2), transparent 65%)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1rem" }}>
        <p style={{
          fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.7)",
          display: "flex", alignItems: "center", gap: "0.6rem",
          transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {tag}
          <span style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)", transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>→</span>
        </p>
      </div>
    </a>
  );
}

const HERO_LOGO_COLOR = "#f5f0f0";

function TiltPhoto() {
  const card = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const st = useRef({ tx: 0, ty: 0, x: 0, y: 0, sc: 1, hover: false, raf: 0, reduce: false });

  useEffect(() => {
    st.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(st.current.raf);
  }, []);

  // Eases toward the pointer every frame (transform only), so motion stays smooth
  // and the loop stops by itself once the card has settled.
  const tick = () => {
    const s = st.current, el = card.current;
    if (!el) return;
    s.x += (s.tx - s.x) * 0.1;
    s.y += (s.ty - s.y) * 0.1;
    s.sc += ((s.hover ? 1.03 : 1) - s.sc) * 0.1;
    el.style.transform = `perspective(1100px) rotateY(${s.x * 13}deg) rotateX(${-s.y * 6}deg) scale(${s.sc})`;
    if (glare.current) {
      glare.current.style.transform = `translate3d(${s.x * 45}%, 0, 0)`;
      glare.current.style.opacity = String(s.hover ? 1 : Math.max(0, (s.sc - 1) / 0.03));
    }
    const settled = !s.hover && Math.abs(s.x) < 0.001 && Math.abs(s.y) < 0.001 && Math.abs(s.sc - 1) < 0.0005;
    if (settled) { el.style.transform = ""; s.raf = 0; return; }
    s.raf = requestAnimationFrame(tick);
  };
  const start = () => { if (!st.current.raf) st.current.raf = requestAnimationFrame(tick); };

  // listeners live on the static wrapper (not the rotating card) so the pointer math never feeds back
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (s.reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    s.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    s.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    s.hover = true;
    start();
  };
  const onLeave = () => {
    const s = st.current;
    s.hover = false; s.tx = 0; s.ty = 0;
    start();
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      style={{ width: "clamp(215px, 23vw, 320px)", aspectRatio: "1000 / 1500", touchAction: "pan-y" }}
    >
      <div
        ref={card}
        style={{
          position: "relative", width: "100%", height: "100%",
          overflow: "hidden", borderRadius: 0,
          boxShadow: "0 16px 38px rgba(0,0,0,0.45)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <img src="/about-capcut.jpg" alt="Calista at CapCut World LA" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none", pointerEvents: "none" }} />
        <div ref={glare} aria-hidden="true"
          style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)", willChange: "transform, opacity" }} />
      </div>
    </div>
  );
}

function ToolkitSection() {
  return (
    <section className="relative" style={{ paddingTop: "7rem", paddingBottom: "6rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ maxWidth: "900px", width: "100%", padding: "0 2rem", textAlign: "center" }}>
        <RevealToggle>
          <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(2rem, 3.8vw, 3.8rem)", color: "#f5f0f0", lineHeight: 1, marginBottom: "4.5rem" }}>
            My Toolkit
          </div>
        </RevealToggle>
        <div className="toolkit-row" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(1.2rem, 4vw, 3.5rem)" }}>
          {TOOLS.map(({ src, label }, i) => (
            <RevealToggle key={label} direction="left" delay={i * 90}>
              <div style={{ textAlign: "center", width: "clamp(64px, 9vw, 100px)" }}>
                <img src={src} alt={label} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
                <p style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "clamp(0.52rem, 0.75vw, 0.68rem)", color: "rgba(245,240,240,0.55)", letterSpacing: "0.05em", marginTop: "0.4rem" }}>{label}</p>
              </div>
            </RevealToggle>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Parallax ──
   [data-pscroll="s"]  : translateY = scrollY * s   (hero layers, which start at the top)
   [data-prel="s"]     : drifts against scroll relative to the viewport center (lower sections)
   Transforms only (GPU-composited); skipped for prefers-reduced-motion. */
function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-pscroll]").forEach(el => {
        el.style.transform = `translate3d(0, ${y * parseFloat(el.dataset.pscroll!)}px, 0)`;
      });
      document.querySelectorAll<HTMLElement>("[data-prel]").forEach(el => {
        const cur = parseFloat(el.dataset.pcur || "0");
        const rect = el.getBoundingClientRect();
        const center = rect.top - cur + rect.height / 2;
        const next = -(center - vh / 2) * parseFloat(el.dataset.prel!);
        el.dataset.pcur = String(next);
        el.style.transform = `translate3d(0, ${next}px, 0)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* ── Marquee: speeds up with scroll velocity, eases back to normal ── */
function useMarqueeVelocity() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.querySelector<HTMLElement>("[data-marquee]");
    if (!el) return;
    let last = window.scrollY, boost = 0, raf = 0;
    const tick = () => {
      const anim = el.getAnimations()[0];
      boost *= 0.94;
      if (anim) anim.playbackRate = 1 + boost;
      if (boost > 0.02) raf = requestAnimationFrame(tick);
      else { boost = 0; if (anim) anim.playbackRate = 1; raf = 0; }
    };
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(3.5, Math.max(boost, Math.abs(y - last) * 0.05));
      last = y;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
}

/* ── Hero collage: muted looping clips in columns that scroll at different speeds ── */
const HERO_CLIPS = Array.from({ length: 12 }, (_, i) => `${MEDIA_BASE}/hero/h${i + 1}.mp4`);

type CollageLayout = { gap: number; tileH: number; cols: { speed: number; offset: number; rows: number }[] };

function HeroCollage() {
  const [layout, setLayout] = useState<CollageLayout | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const phone = vw < 768;
      const gap = phone ? 6 : 10;
      const speeds = phone ? [0.14, 0.32] : [0.12, 0.3, 0.2];
      const nCols = speeds.length;
      const tileW = (vw - gap * (nCols - 1)) / nCols;
      const tileH = phone ? (tileW * 4) / 3 : (tileW * 9) / 16;
      const stagger = phone ? [0, tileH * 0.5] : [0, tileH * 0.45, tileH * 0.2];
      setLayout({
        gap, tileH,
        cols: speeds.map((speed, c) => ({
          speed,
          offset: speed * vh + stagger[c],
          rows: Math.ceil((vh * (1 + speed) + stagger[c]) / (tileH + gap)) + 1,
        })),
      });
    };
    calc();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(calc, 200); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, []);

  // pause the clips once the hero has scrolled out of view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !layout) return;
    const obs = new IntersectionObserver(([entry]) => {
      el.querySelectorAll("video").forEach(v => { if (entry.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [layout]);

  useEffect(() => { if (layout) window.dispatchEvent(new Event("scroll")); }, [layout]);

  // the whole collage drifts gently against the pointer (separate layer from the scroll parallax)
  const driftRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!layout) return;
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = driftRef.current;
    if (!el) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = -(e.clientX / window.innerWidth - 0.5) * 36;
      ty = -(e.clientY / window.innerHeight - 0.5) * 22;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [layout]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0" style={{ zIndex: 0, overflow: "hidden" }}>
      {layout && (
        <div ref={driftRef} style={{ display: "flex", gap: layout.gap, width: "100%", height: "100%", transform: "scale(1.06)", willChange: "transform" }}>
          {layout.cols.map((col, c) => (
            <div key={c} data-pscroll={col.speed} style={{ flex: 1, minWidth: 0, marginTop: -col.offset, display: "flex", flexDirection: "column", gap: layout.gap, willChange: "transform" }}>
              {Array.from({ length: col.rows }, (_, r) => (
                <div key={r} style={{ height: layout.tileH, flexShrink: 0, overflow: "hidden", borderRadius: "4px", background: "#140404" }}>
                  <video src={HERO_CLIPS[(c * 4 + r * 3) % HERO_CLIPS.length]} autoPlay muted loop playsInline preload="auto" disablePictureInPicture
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.7) saturate(1.05)" }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(10,0,0,0.9) 0%, rgba(10,0,0,0.68) 55%, rgba(10,0,0,0.82) 100%)" }} />
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useParallax();
  useMarqueeVelocity();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden" style={{ background: "#0a0000" }}>
        <HeroCollage />

        <div data-pscroll="0.4" className="absolute inset-0 flex flex-col items-center justify-center pt-16" style={{ zIndex: 3, willChange: "transform" }}>
          {/* Name block */}
          <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.2s", position: "relative", textAlign: "center" }}>
            <p style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "clamp(0.55rem, 1vw, 0.75rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,240,0.8)", marginBottom: "1rem", marginTop: "-4rem", position: "relative", zIndex: 2 }}>est. 2026</p>
            <div style={{ position: "relative" }} suppressHydrationWarning>
              <div
                role="img"
                aria-label="cal1star editing"
                style={{
                  width: "clamp(250px, 42vw, 640px)",
                  aspectRatio: "1753 / 722",
                  backgroundColor: HERO_LOGO_COLOR,
                  WebkitMaskImage: "url(/cal1star-editing-logo.webp)",
                  maskImage: "url(/cal1star-editing-logo.webp)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.45))",
                }}
              />
            </div>
          </div>

          {/* Tagline */}
          <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.55s", marginTop: "-0.6rem", textAlign: "center", position: "relative", zIndex: 2 }}>
            <p style={{ fontFamily: "'HelvLight', var(--font-inter)", color: "rgba(245,240,240,0.9)", fontSize: "clamp(0.55rem, 0.85vw, 0.72rem)", letterSpacing: "0.18em" }}>{"Video editing made easy"}</p>
          </div>
          {/* Buttons */}
          <div className={`hero-item hero-buttons${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.8s", position: "absolute", bottom: "clamp(2.5rem, 6vh, 5rem)", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "1rem", zIndex: 3 }}>
            <a data-magnetic href="/work" className="inline-block px-8 py-3 rounded-none border border-text-muted text-text-muted text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-text-primary hover:text-text-primary active:scale-95" style={{ fontFamily: "'HelvLight', var(--font-inter)" }}>
              explore my work
            </a>
            <a data-magnetic href="/contact" className="inline-block px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "rgba(232,228,224,0.92)", fontFamily: "'HelvLight', var(--font-inter)" }}>
              work with me
            </a>
          </div>
        </div>

      </section>

      {/* ── About ── */}
      <section id="about" className="section-content relative pb-10 md:pb-14 px-6 md:px-16 lg:px-32" style={{ paddingTop: "1.5rem", background: "linear-gradient(180deg, #ffffff 0%, #f3f3f3 32%, #d6d6d6 72%, #b4b4b4 100%)" }}>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          <RevealToggle className="order-1" direction="left">
            <div className="leading-none" style={{ position: "relative", marginTop: "2rem", marginBottom: "1.2rem" }} suppressHydrationWarning>
              <h2 style={{ fontWeight: "normal", color: "#0a0a0a", letterSpacing: "0.05em", position: "relative" }}>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}>A</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(2rem, 4.5vw, 4.2rem)" }}>bout me</span>
              </h2>
            </div>
            <p className="font-inter" style={{ fontSize: "clamp(0.6rem, 0.95vw, 0.78rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", color: "#0a0a0a", letterSpacing: "0.05em" }}>
              @cal1star &nbsp;|&nbsp; 30K+ Instagram, 4K+ YouTube &nbsp;|&nbsp; San Francisco, CA
            </p>
            <p className="font-inter text-text-muted" style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.88rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", lineHeight: 1.85, color: "#0a0a0a", fontWeight: 400 }}>
              Hi! I&apos;m Calista, your friendly neighborhood video editor/videographer, and I&apos;m thrilled you&apos;ve found your way to my corner of the internet.
            </p>
            <div className="font-inter" style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.72rem)", marginTop: "1.2rem", paddingLeft: "1.5rem", display: "flex", gap: "2rem", color: "#0a0a0a" }}>
              {[0, 1].map(col => (
                <div key={col} style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {LABELS.filter((_, i) => i % 2 === col).map(label => (
                    <p key={label} style={{ letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 400, whiteSpace: "nowrap" }}>{label}</p>
                  ))}
                </div>
              ))}
            </div>
          </RevealToggle>

          <div className="order-2 flex justify-center" style={{ marginTop: "1rem" }}>
            <RevealToggle direction="right" delay={200}>
              <TiltPhoto />
            </RevealToggle>
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
          <div data-marquee style={{ display: "flex", animation: "marquee 36s linear infinite", whiteSpace: "nowrap", width: "max-content", alignItems: "center" }}>
            {Array.from({ length: 12 }, () => LOGOS).flat().map(({ src, scale }, i) => (
              <img key={i} src={src} alt="" style={{ height: `${36 * scale}px`, width: "auto", borderRadius: "4px", objectFit: "cover", opacity: 0.75, transition: "opacity 0.3s", display: "block", userSelect: "none", marginRight: "4rem" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Course teaser ── */}
      <section style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5.5rem clamp(1.5rem, 6vw, 5rem)", textAlign: "center" }}>
        <RevealToggle>
          <div data-prel="0.08" style={{ position: "relative", top: "-1.5rem", willChange: "transform", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1.75rem, 4.5vh, 2.75rem)" }}>
          <p style={{ margin: 0, fontFamily: "'HelvLight', var(--font-inter)", fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,240,0.55)" }}>New · A beginner course by @cal1star</p>
          <h2 style={{ fontWeight: "normal", color: "#f5f0f0", margin: 0, lineHeight: 1, padding: 0 }}>
            <img src="/course/editing-101.svg" alt="Editing 101: made easy" style={{ display: "block", width: "min(21rem, 72vw)", height: "auto", margin: "0 auto" }} />
          </h2>
          <p style={{ margin: 0, fontFamily: "'HelvLight', var(--font-inter)", fontWeight: 300, fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: "rgba(245,240,240,0.78)", maxWidth: "34rem", lineHeight: 1.75 }}>
            Never edited before? I&apos;ll take you from CapCut to DaVinci Resolve to the effects and transitions you see in my videos.
          </p>
          <a data-magnetic href="/course" className="inline-block rounded-none uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "#960018", fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.72rem", letterSpacing: "0.2em", padding: "0.95rem 2.2rem" }}>
            Join the waitlist →
          </a>
          <div style={{ marginTop: "-0.5rem" }}>
            <a href="https://cal1starediting.gumroad.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,240,0.55)", textDecoration: "none", borderBottom: "1px solid rgba(245,240,240,0.25)", paddingBottom: "0.2rem", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,240,0.95)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.55)")}
            >
              Or browse my Gumroad store →
            </a>
          </div>
          </div>
        </RevealToggle>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ position: "relative", padding: "7rem clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <RevealToggle>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid rgba(245,240,240,0.1)", paddingBottom: "1.2rem", marginBottom: "2.5rem" }}>
              <span>
                <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f5f0f0", fontWeight: "normal" }}>S</span>
                <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.04em" }}>elected Work</span>
              </span>
              <a href="/work" style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.4)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,240,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.4)")}
              >View all →</a>
            </div>
          </RevealToggle>
          <p style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,240,0.35)", marginBottom: "1rem", textAlign: "center" }}>
            hover a frame to preview · click to watch
          </p>
          <div className="mobile-1col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {FEATURED.map((item, i) => (
              <RevealToggle key={item.src} delay={i * 110}>
                <FeaturedCard {...item} />
              </RevealToggle>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editing Toolkit ── */}
      <ToolkitSection />

      {/* ── Footer ── */}
      <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CAL1STAR EDITING.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>

    </main>
  );
}

"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Reveal } from "../components/Reveal";
import { lenisScrollTo } from "../components/GlobalUI";

/* ── Data ── */
const CINEMA_VIDEOS = [
  "/cinema/cinema1.mp4", "/cinema/cinema2.mp4", "/cinema/cinema3.mp4",
  "/cinema/cinema4.mp4", "/cinema/cinema5.mp4", "/cinema/cinema6.mp4",
  "/cinema/cinema7.mp4", "/cinema/cinema8.mp4", "/cinema/cinema9.mp4",
  "/cinema/cinema10.mp4", "/cinema/cinema11.mp4", "/cinema/cinema12.MP4",
  "/cinema/cinema13.MOV", "/cinema/cinema14.mp4",
].map(src => ({ src }));

const VE_VIDEOS = [
  "ve1.mp4","ve2.mp4","ve3.mp4","ve4.mp4","ve5.mp4",
  "ve6.mp4","ve7.mp4","ve8.mp4","ve9.mp4","ve10.mp4",
  "ve11.mp4",
].map(f => ({ src: `/ve/${f}` }));

const COLLAB_VIDEOS = [
  { src: "/yt/aelfriceden.mp4",  label: "Aelfric Eden", category: "Fashion"  },
  { src: "/yt/betterhelp.mp4",   label: "BetterHelp",   category: "Wellness" },
  { src: "/yt/just4kira.mp4",    label: "Just4Kira",    category: "Beauty"   },
  { src: "/yt/lewkin.mp4",       label: "Lewkin",        category: "Fashion"  },
  { src: "/yt/teddyblake.mp4",   label: "Teddy Blake",  category: "Luxury"   },
  { src: "/yt/bypassgpt.mp4",    label: "BypassGPT",    category: "Tech"     },
];

/* ── Reel data ── */
const REEL_GROUPS = [
  { label: "Videography",   href: "videography",   color: "#960018",               frames: CINEMA_VIDEOS.map(v => ({ src: v.src })) },
  { label: "Motion Editing", href: "motion-editing", color: "rgba(245,240,240,0.5)", frames: VE_VIDEOS.map(v => ({ src: v.src })) },
  { label: "Partnerships",  href: "partnerships",  color: "rgba(245,240,240,0.5)", frames: COLLAB_VIDEOS.map(v => ({ src: v.src, label: v.label })) },
];

interface ReelFrame { src: string; label?: string; group: string; groupHref: string; groupColor: string; isFirst: boolean; }

const ALL_FRAMES: ReelFrame[] = REEL_GROUPS.flatMap(g =>
  g.frames.map((f, fi) => ({ ...f, group: g.label, groupHref: g.href, groupColor: g.color, isFirst: fi === 0 }))
);

const FW = 172;
const FH = 116;
const FGAP = 7;
const FSTEP = FW + FGAP;

/* ── Sprockets ── */
function Sprockets({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "2px 14px", background: "#040000", height: "20px", overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: "10px", height: "13px", borderRadius: "2px", background: "#080000", border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }} />
      ))}
    </div>
  );
}

/* ── FilmFrame — fully imperative, driven by custom 'reelActive' event ── */
function FilmFrame({ frame, frameIdx }: { frame: ReelFrame; frameIdx: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loaded = false;
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      const v = videoRef.current;
      const el = wrapRef.current;
      if (!el) return;
      const isActive = idx === frameIdx;
      const isNear = Math.abs(idx - frameIdx) <= 3;
      el.style.transform = isActive ? "scaleY(1.1) translateZ(32px)" : "scaleY(1) translateZ(0px)";
      el.style.border = isActive ? "2px solid rgba(150,0,24,0.75)" : "1px solid rgba(255,255,255,0.07)";
      el.style.boxShadow = isActive ? "0 0 40px rgba(150,0,24,0.3), 0 16px 48px rgba(0,0,0,0.8)" : "0 2px 8px rgba(0,0,0,0.6)";
      if (!v) return;
      if (isNear && !loaded) { v.src = frame.src; v.load(); loaded = true; }
      if (isActive) v.play().catch(() => {});
      else { v.pause(); if (!isNear) { v.currentTime = 0; } }
      v.style.opacity = isActive ? "1" : isNear ? "0.45" : "0.25";
    };
    window.addEventListener("reelActive", handler);
    return () => window.removeEventListener("reelActive", handler);
  }, [frameIdx, frame.src]);

  return (
    <div ref={wrapRef} style={{
      width: FW, height: FH, flexShrink: 0, borderRadius: "3px", overflow: "hidden", position: "relative",
      border: "1px solid rgba(255,255,255,0.07)",
      transform: "scaleY(1) translateZ(0px)", transformOrigin: "center",
      transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.4s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
    }}>
      <video ref={videoRef} muted loop playsInline preload="none" disablePictureInPicture
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.25, transition: "opacity 0.35s ease" }} />
      {frame.label && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 6px 4px", background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)", fontFamily: "var(--font-inter)", fontSize: "5.5px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", pointerEvents: "none" }}>
          {frame.label}
        </div>
      )}
    </div>
  );
}

/* ── FilmReel ── */
function FilmReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const spoolRef = useRef<SVGSVGElement>(null);
  const posX = useRef(0);
  const targetX = useRef(0);
  const rafRef = useRef<number>();
  const activeIdxRef = useRef(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const groupLabelRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // touch fallback
  const touchStartX = useRef(0);
  const touchPosX = useRef(0);
  const isTouching = useRef(false);

  function maxNeg() {
    const cw = containerRef.current?.offsetWidth ?? 900;
    return -(ALL_FRAMES.length * FSTEP - cw / 2 - FW / 2);
  }

  function applyTransform() {
    const cw = containerRef.current?.offsetWidth ?? 900;
    posX.current = Math.max(maxNeg(), Math.min(cw / 2 - FW / 2, posX.current));
    if (stripRef.current) stripRef.current.style.transform = `translateX(${posX.current}px)`;
    // Spool rotates: each pixel of strip travel = arc length on 26px-radius hub
    const rotDeg = -posX.current * (180 / (Math.PI * 26));
    if (spoolRef.current) spoolRef.current.style.transform = `rotate(${rotDeg}deg)`;
    const centerOffset = cw / 2 - posX.current;
    const idx = Math.max(0, Math.min(ALL_FRAMES.length - 1, Math.round((centerOffset - FW / 2) / FSTEP)));
    if (idx !== activeIdxRef.current) {
      activeIdxRef.current = idx;
      window.dispatchEvent(new CustomEvent("reelActive", { detail: idx }));
      const frame = ALL_FRAMES[idx];
      if (counterRef.current) counterRef.current.textContent = `${idx + 1} / ${ALL_FRAMES.length}`;
      if (groupLabelRef.current) groupLabelRef.current.textContent = frame.group;
      Object.entries(tabRefs.current).forEach(([href, el]) => {
        if (el) el.style.color = href === frame.groupHref ? "#f5f0f0" : "rgba(245,240,240,0.28)";
      });
    }
  }

  function snapTarget(idx: number) {
    const cw = containerRef.current?.offsetWidth ?? 900;
    targetX.current = Math.max(maxNeg(), Math.min(cw / 2 - FW / 2, cw / 2 - idx * FSTEP - FW / 2));
  }

  function jumpToGroup(href: string) {
    const fi = ALL_FRAMES.findIndex(f => f.groupHref === href);
    if (fi >= 0) snapTarget(fi);
  }

  useEffect(() => {
    const cw = containerRef.current?.offsetWidth ?? 900;
    posX.current = cw / 2 - FW / 2 - 14;
    targetX.current = posX.current;
    applyTransform();

    const onMouse = (e: MouseEvent) => {
      if (isTouching.current) return;
      const pct = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      const cw = containerRef.current?.offsetWidth ?? 900;
      const hi = cw / 2 - FW / 2;
      const lo = maxNeg();
      // cursor left → frame 0 (hi), cursor right → last frame (lo)
      targetX.current = hi - pct * (hi - lo);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const onResize = () => {
      const cw = containerRef.current?.offsetWidth ?? 900;
      posX.current = cw / 2 - FW / 2 - 14;
      targetX.current = posX.current;
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      posX.current += (targetX.current - posX.current) * 0.08;
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    isTouching.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchPosX.current = posX.current;
  }
  function onTouchMove(e: React.TouchEvent) {
    const dx = e.touches[0].clientX - touchStartX.current;
    const cw = containerRef.current?.offsetWidth ?? 900;
    targetX.current = Math.max(maxNeg(), Math.min(cw / 2 - FW / 2, touchPosX.current + dx));
  }
  function onTouchEnd() {
    isTouching.current = false;
    const cw = containerRef.current?.offsetWidth ?? 900;
    const centerOffset = cw / 2 - targetX.current;
    const idx = Math.max(0, Math.min(ALL_FRAMES.length - 1, Math.round((centerOffset - FW / 2) / FSTEP)));
    snapTarget(idx);
  }

  function onClickStrip() {
    const frame = ALL_FRAMES[activeIdxRef.current];
    if (frame) {
      const el = document.getElementById(frame.groupHref);
      if (el) lenisScrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    }
  }

  // Spool geometry
  const SR = 36; // spool SVG radius (viewBox 80x80, center 40,40)
  const HUB = 13;
  const spokes = [0, 1, 2].map(i => {
    const a = (i / 3) * Math.PI * 2;
    return { x2: 40 + Math.cos(a) * (SR - 4), y2: 40 + Math.sin(a) * (SR - 4) };
  });
  const holes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return { cx: 40 + Math.cos(a) * (SR - 7), cy: 40 + Math.sin(a) * (SR - 7) };
  });

  return (
    <div style={{ paddingTop: "calc(80px + 2.5rem)" }}>
      {/* Group tabs */}
      <div style={{ display: "flex", gap: "2.5rem", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", marginBottom: "1.8rem", alignItems: "center" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(245,240,240,0.2)", textTransform: "uppercase", marginRight: "0.5rem" }}>
          What I Bring to the Table
        </p>
        {REEL_GROUPS.map(g => (
          <button key={g.href} ref={el => { tabRefs.current[g.href] = el; }} onClick={() => jumpToGroup(g.href)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase",
            color: g.href === REEL_GROUPS[0].href ? "#f5f0f0" : "rgba(245,240,240,0.28)",
            transition: "color 0.25s ease",
          }}>
            {g.label}
          </button>
        ))}
      </div>

      {/* Strip + spool */}
      <div
        ref={containerRef}
        onClick={onClickStrip}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        style={{ width: "100%", overflow: "hidden", position: "relative", cursor: "pointer" }}
      >
        {/* Film spool — fixed to left, rotates with posX */}
        <div style={{ position: "absolute", left: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)", zIndex: 20, pointerEvents: "none" }}>
          {/* Outer ring (static) */}
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute", top: 0, left: 0 }}>
            <circle cx="40" cy="40" r={SR} fill="#050000" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
            {holes.map((h, i) => (
              <circle key={i} cx={h.cx} cy={h.cy} r="2.8" fill="#020000" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            ))}
          </svg>
          {/* Inner reel (rotates) */}
          <svg ref={spoolRef} width="80" height="80" viewBox="0 0 80 80" style={{ display: "block", transformOrigin: "40px 40px" }}>
            {spokes.map((s, i) => (
              <line key={i} x1="40" y1="40" x2={s.x2} y2={s.y2} stroke="rgba(255,255,255,0.16)" strokeWidth="2.5" strokeLinecap="round"/>
            ))}
            <circle cx="40" cy="40" r={HUB} fill="#100000" stroke="rgba(150,0,24,0.5)" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="4.5" fill="#000"/>
          </svg>
        </div>

        {/* 3D perspective stage */}
        <div style={{ perspective: "900px", perspectiveOrigin: "50% 60%" }}>
          <div style={{ transform: "rotateX(-18deg)", transformStyle: "preserve-3d" }}>
            <Sprockets count={80} />

            <div style={{ background: "#020000", padding: "10px 0", position: "relative" }}>
              {/* Center projector window */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: FW + 20, pointerEvents: "none", borderLeft: "1.5px solid rgba(150,0,24,0.35)", borderRight: "1.5px solid rgba(150,0,24,0.35)", zIndex: 10 }} />

              <div ref={stripRef} style={{ display: "flex", gap: `${FGAP}px`, width: "max-content", willChange: "transform", transformStyle: "preserve-3d" }}>
                <div style={{ width: "clamp(1.5rem, 5vw, 4rem)", flexShrink: 0 }} />
                {ALL_FRAMES.map((frame, i) => (
                  <div key={i} style={{ position: "relative", flexShrink: 0, transformStyle: "preserve-3d" }}>
                    {frame.isFirst && i > 0 && (
                      <div style={{ position: "absolute", top: "50%", left: -FGAP - 8, transform: "translateY(-50%)", width: "1px", height: "60%", background: "rgba(255,255,255,0.1)" }} />
                    )}
                    {frame.isFirst && (
                      <div style={{ position: "absolute", top: -16, left: 0, fontFamily: "var(--font-inter)", fontSize: "6.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: frame.groupColor, whiteSpace: "nowrap", pointerEvents: "none" }}>
                        {frame.group}
                      </div>
                    )}
                    <FilmFrame frame={frame} frameIdx={i} />
                  </div>
                ))}
                <div style={{ width: "clamp(1.5rem, 5vw, 4rem)", flexShrink: 0 }} />
              </div>
            </div>

            <Sprockets count={80} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ paddingLeft: "clamp(1.5rem, 5vw, 4rem)", marginTop: "1rem", display: "flex", alignItems: "center", gap: "1.4rem" }}>
        <span ref={groupLabelRef} style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,240,0.28)" }}>
          {REEL_GROUPS[0].label}
        </span>
        <span ref={counterRef} style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", color: "rgba(245,240,240,0.15)", letterSpacing: "0.1em" }}>
          1 / {ALL_FRAMES.length}
        </span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", color: "rgba(245,240,240,0.15)", letterSpacing: "0.1em", marginLeft: "auto", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}>
          move cursor · click to jump
        </span>
      </div>
    </div>
  );
}

/* ── OrbitTitle ── */
function OrbitTitle({ parts }: { parts: { text: string; script?: boolean }[] }) {
  return (
    <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
      {parts.map(({ text, script }, i) => (
        <span key={i} style={{ fontFamily: script ? "BillaMount, cursive" : "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>{text}</span>
      ))}
    </div>
  );
}

/* ── OrbitCarousel ── (Videography only) */
function OrbitCarousel({ id, videos, cardW, cardH, radius, scrollHeight = "300vh", title, desc, index: sectionIndex }: {
  id: string; videos: { src: string }[]; cardW: number; cardH: number; radius: number; scrollHeight?: string; title: React.ReactNode; desc?: string; index?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRotY = useRef(0);
  const mouseRotY = useRef(0);
  const mouseRotX = useRef(8);
  const dispRotY = useRef(0);
  const dispRotX = useRef(8);
  const rafRef = useRef<number>();
  const innerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<{ src: string; dx: number; dy: number; scale: number } | null>(null);
  const [open, setOpen] = useState(false);

  function openCard(src: string, e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const targetW = Math.min(window.innerWidth * 0.85, 900);
    setOpen(false);
    setExpanded({ src, dx: (rect.left + rect.width / 2) - window.innerWidth / 2, dy: (rect.top + rect.height / 2) - window.innerHeight / 2, scale: rect.width / targetW });
  }
  useEffect(() => { if (!expanded) return; const t = setTimeout(() => setOpen(true), 16); return () => clearTimeout(t); }, [expanded?.src]);
  function closeCard() { setOpen(false); setTimeout(() => { setExpanded(null); setOpen(false); }, 520); }
  useEffect(() => { if (!expanded) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCard(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [expanded]);

  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current; if (!s) return;
      const rect = s.getBoundingClientRect();
      scrollRotY.current = Math.max(0, Math.min(1, -rect.top / (s.offsetHeight - window.innerHeight))) * 360;
    };
    const onMouse = (e: MouseEvent) => {
      const s = sectionRef.current; if (!s) return;
      const rect = s.getBoundingClientRect(); if (rect.top > window.innerHeight || rect.bottom < 0) return;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      mouseRotY.current = ((e.clientX - cx) / cx) * 8;
      const d = (e.clientY - cy) / cy;
      mouseRotX.current = 8 + (d > 0 ? d * 0.8 : d * 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    const animate = () => {
      dispRotY.current += (scrollRotY.current + mouseRotY.current - dispRotY.current) * 0.05;
      dispRotX.current += (mouseRotX.current - dispRotX.current) * 0.05;
      if (innerRef.current) innerRef.current.style.transform = `rotateX(${dispRotX.current}deg) rotateY(${dispRotY.current}deg)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const n = videos.length;
  return (
    <div ref={sectionRef} id={id} style={{ height: scrollHeight, position: "relative", scrollMarginTop: "80px" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "14vh", left: "clamp(1.5rem, 5vw, 4rem)", right: "clamp(1.5rem, 5vw, 4rem)", zIndex: 20, pointerEvents: "none" }}>
          <div style={{ borderTop: "1px solid rgba(245,240,240,0.1)", paddingTop: "1.8rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.75rem" }}>
              {sectionIndex && <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(245,240,240,0.28)", letterSpacing: "0.12em", flexShrink: 0 }}>{sectionIndex}</span>}
              {title}
            </div>
            {desc && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(245,240,240,0.42)", lineHeight: 1.75, paddingLeft: sectionIndex ? "calc(0.58rem + 1.2rem + 4px)" : 0, maxWidth: "480px" }}>{desc}</p>}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "48vh" }}>
          <div style={{ perspective: "3200px" }}>
            <div ref={innerRef} style={{ position: "relative", width: `${cardW}px`, height: `${cardH}px`, transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(0deg)" }}>
              {videos.map(({ src }, i) => (
                <div key={src} onClick={(e) => openCard(src, e)} style={{ position: "absolute", width: `${cardW}px`, height: `${cardH}px`, transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`, borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(139,0,0,0.3)", boxShadow: "0 16px 48px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.6)", cursor: "pointer" }}>
                  <video src={src} autoPlay muted loop playsInline preload="auto" disablePictureInPicture style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <>
          <div onClick={closeCard} style={{ position: "fixed", inset: 0, zIndex: 998, background: "rgba(0,0,0,0.88)", opacity: open ? 1 : 0, transition: "opacity 0.45s ease" }} />
          <div style={{ position: "fixed", zIndex: 999, left: "50%", top: "50%", width: "min(85vw, 900px)", transform: open ? "translate(-50%,-50%) scale(1)" : `translate(calc(-50% + ${expanded.dx}px),calc(-50% + ${expanded.dy}px)) scale(${expanded.scale})`, transition: "transform 0.48s cubic-bezier(0.16,1,0.3,1)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.9)" }}>
            <video key={expanded.src} src={expanded.src} autoPlay controls playsInline style={{ width: "100%", display: "block" }} />
          </div>
        </>
      )}
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOpen(true), 16); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 998, background: "rgba(0,0,0,0.88)", opacity: open ? 1 : 0, transition: "opacity 0.35s ease" }} />
      <div style={{ position: "fixed", zIndex: 999, left: "50%", top: "50%", width: "min(90vw, 820px)", transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.92)", opacity: open ? 1 : 0, transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease", borderRadius: "10px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.9)" }}>
        <video key={src} src={src} autoPlay controls playsInline style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ index, title, desc }: { index: string; title: React.ReactNode; desc: string }) {
  return (
    <div style={{ borderTop: "1px solid rgba(245,240,240,0.1)", paddingTop: "1.8rem", marginBottom: "3rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(245,240,240,0.28)", letterSpacing: "0.12em", flexShrink: 0 }}>{index}</span>
        {title}
      </div>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(245,240,240,0.42)", lineHeight: 1.75, paddingLeft: "calc(0.58rem + 1.2rem + 4px)", maxWidth: "480px" }}>{desc}</p>
    </div>
  );
}

/* ── MotionCard ── */
function MotionCard({ src, onClick }: { src: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    if (hovered) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}
      style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", borderRadius: "4px", cursor: "pointer", border: "1px solid rgba(245,240,240,0.06)" }}>
      <video ref={videoRef} src={src} muted loop playsInline preload="metadata" disablePictureInPicture
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.28)", transition: "background 0.35s ease" }} />
      {hovered && (
        <div style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#f5f0f0"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      )}
    </div>
  );
}

function MotionGrid() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
        {VE_VIDEOS.map(({ src }) => (
          <MotionCard key={src} src={src} onClick={() => setLightbox(src)} />
        ))}
      </div>
      {lightbox && <Lightbox src={lightbox} onClose={close} />}
    </>
  );
}

/* ── PartnerCard ── */
function PartnerCard({ src, label, category }: { src: string; label: string; category: string }) {
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const close = useCallback(() => setLightbox(false), []);
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    if (hovered) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);
  return (
    <>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setLightbox(true)}
        style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", borderRadius: "6px", cursor: "pointer", border: "1px solid rgba(245,240,240,0.08)" }}>
        <video ref={videoRef} src={src} muted loop playsInline preload="metadata" disablePictureInPicture
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%)", transition: "background 0.4s ease" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "1.4rem 1.6rem" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.5)", marginBottom: "0.3rem" }}>{category}</p>
          <p style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.2rem, 2vw, 1.8rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.05em", lineHeight: 1 }}>{label}</p>
        </div>
        {hovered && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(245,240,240,0.2)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5f0f0"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        )}
      </div>
      {lightbox && <Lightbox src={src} onClose={close} />}
    </>
  );
}

/* ── Page ── */
export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">

      {/* ── Film Reel entry ── */}
      <section className="relative" style={{ paddingBottom: "4rem" }}>
        <FilmReel />
      </section>

      {/* ── 01 Videography ── */}
      <OrbitCarousel
        id="videography"
        videos={CINEMA_VIDEOS}
        cardW={248} cardH={140} radius={560}
        scrollHeight="300vh"
        index="01"
        desc="Cinematic short-form and long-form content — filmed, directed, and edited from concept to final cut."
        title={<OrbitTitle parts={[{ text: "V", script: true }, { text: "ideography" }]} />}
      />

      {/* ── 02 Motion Editing ── */}
      <section id="motion-editing" style={{ padding: "8rem clamp(1.5rem, 5vw, 4rem) 6rem", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel
              index="02"
              title={<OrbitTitle parts={[{ text: "M", script: true }, { text: "otion " }, { text: "E", script: true }, { text: "diting" }]} />}
              desc="Short-form edits, motion graphics, VFX, and dynamic transitions — built to stop the scroll."
            />
          </Reveal>
          <Reveal delay={80}><MotionGrid /></Reveal>
        </div>
      </section>

      {/* ── 03 Partnerships ── */}
      <section id="partnerships" style={{ padding: "8rem clamp(1.5rem, 5vw, 4rem) 6rem", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel
              index="03"
              title={<OrbitTitle parts={[{ text: "P", script: true }, { text: "artnerships" }]} />}
              desc="Brand integrations and sponsored content that feel native — from fashion to wellness to tech."
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {COLLAB_VIDEOS.map((item, i) => (
              <Reveal key={item.src} delay={i * 80}>
                <PartnerCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

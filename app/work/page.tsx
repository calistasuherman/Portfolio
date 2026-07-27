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
  "VideoStar1.mp4","VideoStar2.mp4","VideoStar3.mp4","VideoStar4.mp4","VideoStar5.mp4",
].map(f => ({ src: `/ve/${f}` }));

const COLLAB_VIDEOS = [
  { src: "/yt/aelfricedenn.mp4", label: "Aelfric Eden", category: "Fashion"  },
  { src: "/yt/betterhelpp.mp4",  label: "BetterHelp",   category: "Wellness" },
  { src: "/yt/just4kiraa.mp4",   label: "Just4Kira",    category: "Beauty"   },
  { src: "/yt/lewkinn.mp4",      label: "Lewkin",        category: "Fashion"  },
  { src: "/yt/teddyblakee.mp4",  label: "Teddy Blake",  category: "Luxury"   },
  { src: "/yt/bypassgptt.mp4",   label: "BypassGPT",    category: "Tech"     },
];

/* ── Vinyl data ── */
const VINYL_DATA = [
  { label: "Videography",    href: "videography",   idx: "01", sleeve: "#0e0000", accent: "#960018", labelBg: "#5c0010" },
  { label: "Motion Editing", href: "motion-editing", idx: "02", sleeve: "#0a0a0a", accent: "#d4cfc8", labelBg: "#4a4540" },
  { label: "Partnerships",   href: "partnerships",  idx: "03", sleeve: "#0b0800", accent: "#c8a84b", labelBg: "#6b5a18" },
];

/* ── VinylUnit ── */
const SLEEVE = 322;
const DISC = 292;

function VinylUnit({ v, defaultX, defaultY, floatDelay }: { v: typeof VINYL_DATA[0]; defaultX: number; defaultY: number; floatDelay: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: defaultX, y: defaultY });
  const [hovered, setHovered] = useState(false);
  const discRef = useRef<SVGSVGElement>(null);
  const drag = useRef({ on: false, mx: 0, my: 0, px: defaultX, py: defaultY, moved: false });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.mx;
      const dy = e.clientY - drag.current.my;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
      const nx = drag.current.px + dx;
      const ny = drag.current.py + dy;
      posRef.current = { x: nx, y: ny };
      if (wrapRef.current) { wrapRef.current.style.left = nx + "px"; wrapRef.current.style.top = ny + "px"; }
    };
    const onUp = () => {
      if (!drag.current.on) return;
      drag.current.px = posRef.current.x;
      drag.current.py = posRef.current.y;
      drag.current.on = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "absolute", left: defaultX, top: defaultY, width: SLEEVE + 60, height: SLEEVE, zIndex: hovered ? 10 : 1 }}
      onMouseEnter={() => { setHovered(true);  if (discRef.current) discRef.current.style.animationDuration = "1.4s"; }}
      onMouseLeave={() => { setHovered(false); if (discRef.current) discRef.current.style.animationDuration = "6s";  }}
      onMouseDown={e => {
        drag.current = { on: true, mx: e.clientX, my: e.clientY, px: posRef.current.x, py: posRef.current.y, moved: false };
        document.body.style.cursor = "grabbing";
        e.preventDefault();
      }}
      onClick={() => {
        if (drag.current.moved) return;
        const el = document.getElementById(v.href);
        if (el) lenisScrollTo(el, { offset: -80, duration: 1.0, easing: (t: number) => Math.sin((t * Math.PI) / 2) });
      }}
      title={`Go to ${v.label}`}
    >
      {/* Float animation wrapper */}
      <div style={{ position: "absolute", inset: 0, animation: `vinylFloat 3.5s ease-in-out ${floatDelay}s infinite` }}>
        {/* Vinyl disc — slides right on hover */}
        <div style={{
          position: "absolute", left: (SLEEVE - DISC) / 2, top: (SLEEVE - DISC) / 2,
          transform: hovered ? "translateX(55px)" : "translateX(28px)",
          transition: "transform 0.55s cubic-bezier(0.34,1.08,0.64,1)",
          zIndex: 1,
        }}>
          <svg ref={discRef} width={DISC} height={DISC} viewBox={`0 0 ${DISC} ${DISC}`}
            style={{ display: "block", animation: "vinylSpin 6s linear infinite", willChange: "transform" }}>
            {(() => { const r = DISC / 2; const grooves = Array.from({ length: 24 }, (_, i) => r * 0.3 + (r * 0.62) * (i / 24)); return (<>
              <circle cx={r} cy={r} r={r} fill="#090909"/>
              {grooves.map((gr, i) => <circle key={i} cx={r} cy={r} r={gr} fill="none" stroke={i % 5 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.022)"} strokeWidth="0.55"/>)}
              <circle cx={r} cy={r} r={r * 0.29} fill="#960018"/>
              <circle cx={r} cy={r} r={r * 0.25} fill="#960018" opacity="0.85"/>
              {([-r*0.09, r*0.02, r*0.12] as number[]).map((dy, i) => <line key={i} x1={r - r*0.18} y1={r+dy} x2={r + r*0.18} y2={r+dy} stroke="rgba(255,255,255,0.28)" strokeWidth={i===0?0.9:0.6}/>)}
              <circle cx={r} cy={r} r={r * 0.045} fill="#000"/>
            </>); })()}
          </svg>
        </div>

        {/* Sleeve — slides left at an angle on hover */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: SLEEVE, height: SLEEVE, zIndex: 2,
          borderRadius: 6, overflow: "hidden",
          boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.6)` : `0 10px 36px rgba(0,0,0,0.7)`,
          transform: hovered ? "translateX(-52px) rotate(-10deg)" : "translateX(0) rotate(0deg)",
          transition: "transform 0.5s cubic-bezier(0.34,1.08,0.64,1), box-shadow 0.4s ease",
          cursor: hovered ? "pointer" : "grab",
          willChange: "transform",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vinyl-sleeve.png" alt="" draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none", pointerEvents: "none" }}
          />
          {/* Text: idx top, label center, explore bottom */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center", padding: "1rem" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", letterSpacing: "0.18em", color: "#960018", fontWeight: 700 }}>
              {v.idx}
            </span>
            <p style={{ fontFamily: "BillaMount, cursive", fontSize: "2rem", color: "#960018", lineHeight: 1.0, fontWeight: 700, whiteSpace: "nowrap" }}>
              {v.label}
            </p>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.44rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#960018", fontWeight: 600 }}>
              click to explore ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── VinylSection ── */
function VinylSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const getPositions = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return [
      { x: Math.round(w * 0.18 - SLEEVE / 2), y: 20 },
      { x: Math.round(w * 0.50 - SLEEVE / 2), y: 20 },
      { x: Math.round(w * 0.82 - SLEEVE / 2), y: 20 },
    ];
  };
  const positions = mounted ? getPositions() : [];

  return (
    <div style={{ paddingTop: "calc(80px + 2.5rem)", paddingBottom: "2rem" }}>
      <div className="vinyl-section-outer" style={{ position: "relative", height: SLEEVE + 60, overflow: "visible" }}>
        <div className="vinyl-mobile-scale">
          {mounted && VINYL_DATA.map((v, i) => (
            <VinylUnit key={v.href} v={v} defaultX={positions[i].x} defaultY={positions[i].y} floatDelay={i * 0.8} />
          ))}
        </div>
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
  const videosRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
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
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      const vids = videosRef.current?.querySelectorAll("video") ?? [];
      if (entry.isIntersecting) {
        vids.forEach(v => { v.play().catch(() => {}); });
        if (!rafRef.current) tick();
      } else {
        vids.forEach(v => { v.pause(); });
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = undefined; }
      }
    }, { threshold: 0 });

    if (sectionRef.current) io.observe(sectionRef.current);

    const onScroll = () => {
      const s = sectionRef.current; if (!s || !visibleRef.current) return;
      const rect = s.getBoundingClientRect();
      scrollRotY.current = Math.max(0, Math.min(1, -rect.top / (s.offsetHeight - window.innerHeight))) * 360;
    };
    const onMouse = (e: MouseEvent) => {
      if (!visibleRef.current) return;
      const s = sectionRef.current; if (!s) return;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      mouseRotY.current = ((e.clientX - cx) / cx) * 8;
      const d = (e.clientY - cy) / cy;
      mouseRotX.current = 8 + (d > 0 ? d * 0.8 : d * 2);
    };

    function tick() {
      dispRotY.current += (scrollRotY.current + mouseRotY.current - dispRotY.current) * 0.05;
      dispRotX.current += (mouseRotX.current - dispRotX.current) * 0.05;
      if (innerRef.current) innerRef.current.style.transform = `rotateX(${dispRotX.current}deg) rotateY(${dispRotY.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const n = videos.length;
  return (
    <div ref={sectionRef} id={id} className="orbit-section" style={{ height: scrollHeight, position: "relative", scrollMarginTop: "80px" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "1vh", left: "clamp(1.5rem, 5vw, 4rem)", right: "clamp(1.5rem, 5vw, 4rem)", zIndex: 20, pointerEvents: "none" }}>
          <div style={{ paddingTop: "1.8rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.75rem" }}>
              {sectionIndex && <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(245,240,240,0.28)", letterSpacing: "0.12em", flexShrink: 0 }}>{sectionIndex}</span>}
              {title}
            </div>
            {desc && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(245,240,240,0.42)", lineHeight: 1.75, paddingLeft: sectionIndex ? "calc(0.58rem + 1.2rem + 4px)" : 0, maxWidth: "480px" }}>{desc}</p>}
          </div>
        </div>
        <div ref={videosRef} className="orbit-videos-wrap" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "30vh", willChange: "transform" }}>
          <div style={{ perspective: "3200px", willChange: "transform" }}>
            <div ref={innerRef} style={{ position: "relative", width: `${cardW}px`, height: `${cardH}px`, transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(0deg)", willChange: "transform" }}>
              {videos.map(({ src }, i) => (
                <div key={src} onClick={(e) => openCard(src, e)} style={{ position: "absolute", width: `${cardW}px`, height: `${cardH}px`, transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`, borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(139,0,0,0.3)", boxShadow: "0 16px 48px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.6)", cursor: "pointer" }}>
                  <video src={src} autoPlay muted loop playsInline preload="none" disablePictureInPicture style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
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
function Lightbox({ src, onClose, compact = false }: { src: string; onClose: () => void; compact?: boolean }) {
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
      <div style={{ position: "fixed", zIndex: 999, left: "50%", top: "50%", width: compact ? "min(70vw, 540px)" : "min(90vw, 820px)", transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.92)", opacity: open ? 1 : 0, transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease", borderRadius: "10px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.9)" }}>
        <video key={src} src={src} autoPlay controls playsInline style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ index, title, desc }: { index: string; title: React.ReactNode; desc: string }) {
  return (
    <div style={{ paddingTop: "1.8rem", marginBottom: "3rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(245,240,240,0.28)", letterSpacing: "0.12em", flexShrink: 0 }}>{index}</span>
        {title}
      </div>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(245,240,240,0.42)", lineHeight: 1.75, paddingLeft: "calc(0.58rem + 1.2rem + 4px)", maxWidth: "480px" }}>{desc}</p>
    </div>
  );
}

/* ── AccordionCard ── */
function AccordionCard({ src, idx, onClick, compact, seekTo = 1 }: { src: string; idx: number; onClick: () => void; compact: boolean; seekTo?: number }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = hovered || tapped;
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    if (active) v.play().catch(() => {});
    else { v.pause(); v.currentTime = seekTo; }
  }, [active, seekTo]);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={e => { e.preventDefault(); if (tapped) { onClick(); setTapped(false); } else setTapped(true); }}
      onClick={e => { if (!(e as any).changedTouches) onClick(); }}
      style={{
        flexGrow: active ? 5 : 1,
        flexShrink: 1,
        flexBasis: 0,
        transition: "flex-grow 0.55s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
        cursor: "pointer",
        minWidth: 0,
      }}
    >
      <video ref={videoRef} src={src} muted loop playsInline preload="metadata" disablePictureInPicture
        onLoadedMetadata={() => { if (videoRef.current && !hovered) videoRef.current.currentTime = seekTo; }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

      {/* Dark overlay — lighter when expanded */}
      <div style={{
        position: "absolute", inset: 0,
        background: active ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.38)",
        transition: "background 0.4s ease",
      }} />

      {/* Index number — visible when collapsed, fades on expand */}
      <span style={{
        position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-inter)", fontSize: "0.44rem", letterSpacing: "0.16em",
        color: "rgba(245,240,240,0.5)",
        opacity: active ? 0 : 1,
        transition: "opacity 0.25s ease",
        whiteSpace: "nowrap",
      }}>
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Play button — appears when expanded */}
      <div style={{
        position: "absolute", bottom: "14px", right: "14px",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
        borderRadius: "50%", width: "34px", height: "34px",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#f5f0f0"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
    </div>
  );
}

function MotionGrid() {
  const [lightbox, setLightbox] = useState<{ src: string; compact: boolean } | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  const rowStyle: React.CSSProperties = { display: "flex", gap: "5px", width: "100%" };
  return (
    <Reveal direction="up">
      <div style={{ ...rowStyle, height: "260px", marginBottom: "5px" }}>
        {VE_VIDEOS.slice(0, 5).map(({ src }, i) => (
          <AccordionCard key={src} src={src} idx={i} compact={false} onClick={() => setLightbox({ src, compact: false })} />
        ))}
      </div>
      <div style={{ ...rowStyle, height: "220px" }}>
        {VE_VIDEOS.slice(5).map(({ src }, i) => (
          <AccordionCard key={src} src={src} idx={i + 5} compact={true} onClick={() => setLightbox({ src, compact: true })}
            seekTo={i === 1 ? 2 : i === 4 ? 0.5 : 1} />
        ))}
      </div>
      {lightbox && <Lightbox src={lightbox.src} compact={lightbox.compact} onClose={close} />}
    </Reveal>
  );
}

/* ── PartnerCard ── */
function PartnerCard({ src, label, category, onClick }: { src: string; label: string; category: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    if (hovered) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}
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
  );
}

function PartnerGrid() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  return (
    <>
      <div className="mobile-2col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {COLLAB_VIDEOS.map((item, i) => (
          <Reveal key={item.src} delay={i * 80}>
            <PartnerCard {...item} onClick={() => setLightbox(item.src)} />
          </Reveal>
        ))}
      </div>
      {lightbox && <Lightbox src={lightbox} onClose={close} />}
    </>
  );
}

/* ── Page ── */
export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">

      {/* ── Scan line ── */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0,
          height: "40vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,252,248,0.028) 40%, rgba(255,252,248,0.042) 50%, rgba(255,252,248,0.028) 60%, transparent 100%)",
          animation: "scanDrift 14s linear infinite",
          willChange: "transform",
        }} />
      </div>

      {/* ── Film Reel entry ── */}
      <section className="relative" style={{ paddingBottom: "4rem" }}>
        <VinylSection />
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
      <section id="motion-editing" className="motion-editing-section" style={{ padding: "5rem clamp(1.5rem, 5vw, 4rem) 6rem", scrollMarginTop: "80px" }}>
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
      <section id="partnerships" style={{ padding: "3rem clamp(1.5rem, 5vw, 4rem) 6rem", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel
              index="03"
              title={<OrbitTitle parts={[{ text: "P", script: true }, { text: "artnerships" }]} />}
              desc="Brand integrations and sponsored content that feel native — from fashion to wellness to tech."
            />
          </Reveal>
          <PartnerGrid />
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

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
  "/cinema/cinema13.mp4", "/cinema/cinema14.mp4",
].map(src => ({ src }));

const VE_VIDEOS = [
  "ve1.mp4","ve2.mp4","ve3.mp4","ve4.mp4","ve5.mp4",
  "ve6.mp4","ve7.mp4","ve8.mp4","ve9.mp4","ve10.mp4",
  "ve11.mp4",
].map(f => ({ src: `/ve/${f}` }));

const COLLAB_VIDEOS = [
  { src: "/yt/aelfriceden.mp4",  label: "Aelfric Eden", category: "Fashion" },
  { src: "/yt/betterhelp.mp4",   label: "BetterHelp",   category: "Wellness" },
  { src: "/yt/just4kira.mp4",    label: "Just4Kira",    category: "Lifestyle" },
  { src: "/yt/lewkin.mp4",       label: "Lewkin",        category: "Fashion" },
  { src: "/yt/teddyblake.mp4",   label: "Teddy Blake",  category: "Luxury" },
  { src: "/yt/bypassgpt.mp4",    label: "BypassGPT",    category: "Tech" },
];

/* ── TrayItem ── */
function TrayItem({
  src, alt, label, style, rotate = 0, labelTop = "45%", labelLeft = "50%", href, onShowDragCursor,
}: {
  src: string; alt: string; label?: string; style: React.CSSProperties;
  rotate?: number; labelTop?: string; labelLeft?: string; href?: string;
  onShowDragCursor?: (show: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [freed, setFreed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [freedW, setFreedW] = useState(0);
  const [dragging, setDragging] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const mouseDownPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX - offsetRef.current.x, y: e.clientY - offsetRef.current.y });
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, [dragging]);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    const el = anchorRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (!freed) { offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; setFreedW(rect.width); setPos({ x: rect.left, y: rect.top }); setFreed(true); }
      else { offsetRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }; }
    }
    setDragging(true);
  }

  function onMouseUp(e: React.MouseEvent) {
    const dx = Math.abs(e.clientX - mouseDownPos.current.x);
    const dy = Math.abs(e.clientY - mouseDownPos.current.y);
    if (dx < 5 && dy < 5 && href) {
      const el = document.getElementById(href);
      if (el) lenisScrollTo(el, { offset: 160, duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    }
  }

  const content = (
    <div
      onMouseEnter={() => { setHovered(true); onShowDragCursor?.(true); }}
      onMouseLeave={() => { setHovered(false); onShowDragCursor?.(false); }}
      onMouseDown={onMouseDown} onMouseUp={onMouseUp}
      style={{ position: "relative", display: "inline-block", cursor: dragging ? "grabbing" : "grab", userSelect: "none", pointerEvents: "auto", width: "100%" }}
    >
      <img src={src} alt={alt} draggable={false} style={{
        width: "100%", objectFit: "contain", display: "block",
        transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease",
        transform: hovered && !dragging ? `rotate(${rotate}deg) translateY(-10px) scale(1.08)` : `rotate(${rotate}deg)`,
        filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.35))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
      }} />
      {label && (
        <span style={{ position: "absolute", top: labelTop, left: labelLeft, transform: "translate(-50%, -50%)", fontFamily: "var(--font-inter)", fontSize: "6px", fontWeight: 400, color: "#ffffff", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", whiteSpace: "nowrap", opacity: hovered ? 1 : 0.85, transition: "opacity 0.3s ease", pointerEvents: "none" }}>{label}</span>
      )}
    </div>
  );

  if (freed) return (
    <>
      <div ref={anchorRef} style={{ ...style, opacity: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", left: pos.x, top: pos.y, width: freedW, zIndex: 500, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>{content}</div>
      </div>
    </>
  );
  return <div ref={anchorRef} style={{ ...style, pointerEvents: "none" }}><div style={{ pointerEvents: "auto" }}>{content}</div></div>;
}

/* ── TrayNav ── */
function TrayNav() {
  const [dragCursorPos, setDragCursorPos] = useState({ x: -200, y: -200 });
  const [showDragCursor, setShowDragCursor] = useState(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => setDragCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div style={{ width: "100%", position: "relative", overflow: "visible" }}>
      {showDragCursor && (
        <div style={{ position: "fixed", left: dragCursorPos.x, top: dragCursorPos.y, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 9999, background: "rgba(245,240,240,0.92)", borderRadius: "9999px", padding: "5px 12px", fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a0000", whiteSpace: "nowrap" }}>drag me</div>
      )}
      <div className="relative" style={{ marginTop: "-1.5rem" }}>
        <img src="/tray-bg.png" alt="Tray" style={{ width: "100%", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }} />
        <div style={{ position: "absolute", left: "3%", top: "8%", zIndex: 4, pointerEvents: "none" }}>
          <p style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.2rem, 2.4vw, 2.6rem)", color: "#f5f0f0", lineHeight: 1.15, fontWeight: "normal", letterSpacing: "0.15em" }}>WHAT&nbsp;&nbsp;&nbsp;I</p>
          <p style={{ lineHeight: 1.05, marginTop: "0.05em" }}>
            <span style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.8rem, 3.6vw, 4rem)", color: "#f5f0f0", fontWeight: "normal" }}>Bring </span>
            <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(1.2rem, 2.4vw, 2.6rem)", color: "#f5f0f0", fontWeight: "normal", letterSpacing: "0.1em" }}>to the</span>
          </p>
          <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2rem, 4vw, 4.4rem)", color: "#f5f0f0", lineHeight: 1, fontWeight: "normal", marginTop: "0.3em" }}>Table</p>
        </div>
        <TrayItem src="/tray-croissant.png" alt="Videography" label="videography" rotate={-10} href="videography" onShowDragCursor={setShowDragCursor}
          style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }} />
        <TrayItem src="/tray-figs.png" alt="Partnerships" label="partnerships" href="partnerships" onShowDragCursor={setShowDragCursor}
          style={{ position: "absolute", left: "55%", top: "62%", transform: "translate(-50%, -50%)", zIndex: 3, width: "40%" }} />
        <TrayItem src="/tray-coffee.png" alt="Motion Editing" label="motion editing" labelTop="40%" href="motion-editing" onShowDragCursor={setShowDragCursor}
          style={{ position: "absolute", left: "59%", top: "34%", transform: "translate(-50%, -50%)", zIndex: 2, width: "40%" }} />
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

/* ── Lightbox ── shared */
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

/* ── MotionGrid ── */
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

      {/* TrayNav */}
      <section className="section-content relative px-6 md:px-16 lg:px-32" style={{ paddingTop: "60px", paddingBottom: "1rem" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><TrayNav /></Reveal>
        </div>
      </section>

      {/* ── 01 Videography ── scroll-driven 3D carousel */}
      <OrbitCarousel
        id="videography"
        videos={CINEMA_VIDEOS}
        cardW={248} cardH={140} radius={560}
        scrollHeight="300vh"
        index="01"
        desc="Cinematic short-form and long-form content — filmed, directed, and edited from concept to final cut."
        title={<OrbitTitle parts={[{ text: "V", script: true }, { text: "ideography" }]} />}
      />

      {/* ── 02 Motion Editing ── hover grid */}
      <section id="motion-editing" style={{ padding: "8rem clamp(1.5rem, 5vw, 4rem) 6rem", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel
              index="02"
              title={<OrbitTitle parts={[{ text: "M", script: true }, { text: "otion " }, { text: "E", script: true }, { text: "diting" }]} />}
              desc="Short-form edits, motion graphics, VFX, and dynamic transitions — built to stop the scroll."
            />
          </Reveal>
          <Reveal delay={80}>
            <MotionGrid />
          </Reveal>
        </div>
      </section>

      {/* ── 03 Partnerships ── branded cards */}
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

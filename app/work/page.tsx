"use client";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "../components/Reveal";

const youtubeIntegrations = [
  { label: "Aelfric Eden", src: "/aelfriceden.mp4" },
  { label: "BetterHelp",   src: "/betterhelp.mp4"  },
  { label: "Just4Kira",   src: "/just4kira.mp4"   },
  { label: "Lewkin",       src: "/lewkin.mp4"       },
  { label: "Teddy Blake",  src: "/teddyblake.mp4"  },
  { label: "BypassGPT",   src: "/bypassgpt.mp4"   },
];

/* ── Draggable TrayItem ─────────────────────────────────────── */
function TrayItem({
  src, alt, label, style, rotate = 0, labelTop = "45%", labelLeft = "50%", href,
}: {
  src: string; alt: string; label?: string;
  style: React.CSSProperties; rotate?: number;
  labelTop?: string; labelLeft?: string; href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [freed, setFreed]     = useState(false);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [freedW, setFreedW]   = useState(0);
  const [dragging, setDragging] = useState(false);
  const anchorRef   = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef({ x: 0, y: 0 });
  const mouseDownPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - offsetRef.current.x, y: e.clientY - offsetRef.current.y });
    };
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",  onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",  onUp);
    };
  }, [dragging]);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    if (!freed) {
      const el = anchorRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setFreedW(rect.width);
        setPos({ x: rect.left, y: rect.top });
        setFreed(true);
      }
    } else {
      offsetRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    }
    setDragging(true);
  }

  function onMouseUp(e: React.MouseEvent) {
    const dx = Math.abs(e.clientX - mouseDownPos.current.x);
    const dy = Math.abs(e.clientY - mouseDownPos.current.y);
    if (dx < 5 && dy < 5 && href) {
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        position: "relative", display: "inline-block",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none", pointerEvents: "auto",
        width: "100%",
      }}
    >
      <img
        src={src} alt={alt} draggable={false}
        style={{
          width: "100%", objectFit: "contain", display: "block",
          transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease",
          transform: hovered && !dragging
            ? `rotate(${rotate}deg) translateY(-10px) scale(1.08)`
            : `rotate(${rotate}deg)`,
          filter: hovered
            ? "drop-shadow(0 8px 16px rgba(0,0,0,0.35))"
            : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
        }}
      />
      {label && (
        <span style={{
          position: "absolute", top: labelTop, left: labelLeft,
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-inter)", fontSize: "6px", fontWeight: 400,
          color: "#ffffff", letterSpacing: "0.2em", textTransform: "uppercase",
          textAlign: "center", whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0.85,
          transition: "opacity 0.3s ease", pointerEvents: "none",
        }}>
          {label}
        </span>
      )}
    </div>
  );

  if (freed) {
    return (
      <>
        {/* invisible ghost keeps tray layout intact */}
        <div ref={anchorRef} style={{ ...style, opacity: 0, pointerEvents: "none" }} />
        {/* floating element at viewport coords */}
        <div style={{
          position: "fixed", left: pos.x, top: pos.y,
          width: freedW, zIndex: 500, pointerEvents: "none",
        }}>
          <div style={{ pointerEvents: "auto" }}>{content}</div>
        </div>
      </>
    );
  }

  return (
    <div ref={anchorRef} style={{ ...style, pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto" }}>{content}</div>
    </div>
  );
}

/* ── TrayNav ── */
function TrayNav() {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="relative" style={{ marginTop: "-1.5rem" }}>
        <img src="/tray-bg.png" alt="Tray" style={{ width: "100%", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }} />

        {/* Title */}
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

        {/* Food elements — draggable */}
        <TrayItem src="/tray-croissant.png" alt="Cinematography" label="cinematography" rotate={-10} href="cinematography"
          style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }} />
        <TrayItem src="/tray-figs.png" alt="YouTube Integrations" label="youtube integrations" href="youtube-integrations"
          style={{ position: "absolute", left: "55%", top: "62%", transform: "translate(-50%, -50%)", zIndex: 3, width: "40%" }} />
        <TrayItem src="/tray-coffee.png" alt="Video Editing" label="video editing" labelTop="40%" href="video-editing"
          style={{ position: "absolute", left: "59%", top: "34%", transform: "translate(-50%, -50%)", zIndex: 2, width: "40%" }} />

        {/* "move or click me" hint — under the title */}
        <p style={{
          position: "absolute", left: "3%", top: "38%",
          fontFamily: "var(--font-inter)", fontSize: "clamp(0.42rem, 0.7vw, 0.58rem)",
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(245,240,240,0.38)", whiteSpace: "nowrap",
          zIndex: 10, pointerEvents: "none",
        }}>
          (move or click me)
        </p>
      </div>
    </div>
  );
}

/* ── WorkSubsection ── */
function WorkSubsection({ id, title, children, noBottomMargin }: { id?: string; title: React.ReactNode; children: React.ReactNode; noBottomMargin?: boolean }) {
  return (
    <div id={id} className={noBottomMargin ? "mb-4" : "mb-20"} style={{ scrollMarginTop: "80px" }}>
      <div className="mb-8 text-center">{title}</div>
      {children}
    </div>
  );
}

/* ── VideoCard ── */
function VideoCard({ label, src, staggerDelay = 0, square = false, fill = false, autoplay = false }: {
  label: string; src: string; staggerDelay?: number; square?: boolean; fill?: boolean; autoplay?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEmbed = src.includes("youtube.com/embed") || src.includes("drive.google.com");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (autoplay) {
      v.play().catch(() => {});
      return;
    }
    const onMeta = () => { v.currentTime = 0.001; };
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [autoplay]);

  useEffect(() => {
    if (autoplay) return;
    const v = videoRef.current;
    if (!v) return;
    if (hovered) { v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0.001; }
  }, [hovered, autoplay]);

  return (
    <div
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{ ...(fill ? { width: "100%", height: "100%" } : { aspectRatio: square ? "1/1" : "16/9" }), border: "1px solid rgba(139,0,0,0.2)", transitionDelay: `${staggerDelay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEmbed ? (
        <iframe src={src} title={label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
      ) : (
        <video ref={videoRef} src={src} loop playsInline muted preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
        style={{ background: "linear-gradient(to top, rgba(13,0,0,0.85), transparent)" }}>
        {label && <span className="font-inter text-[10px] uppercase tracking-widest text-text-primary">{label}</span>}
      </div>
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0, background: "rgba(139,0,0,0.12)" }} />
    </div>
  );
}

/* ── CinemaVideoCard — plays only when visible ── */
function CinemaVideoCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { v.play().catch(() => {}); }
      else { v.pause(); }
    }, { threshold: 0.1 });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <video
        ref={ref} src={src} loop muted playsInline preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ── CinemaRow — seamless rightward drift via RAF ── */
function CinemaRow() {
  const clips = ["/edit1.mp4", "/edit11.mp4", "/sd.mp4", "/icedbananalatte.mp4", "/temple.mp4", "/cine1.mp4", "/cine2.mp4", "/walking.mp4", "/running.mp4", "/colorgrading.mp4"];
  const GAP = 14;
  const rowRef = useRef<HTMLDivElement>(null);
  const txRef  = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // wait one frame so scrollWidth is measured after layout
    rafRef.current = requestAnimationFrame(() => {
      const half = row.scrollWidth / 2;
      txRef.current = -half; // start showing second set (identical to first)

      const tick = () => {
        txRef.current += 0.5; // rightward: strip moves right
        if (txRef.current >= 0) txRef.current -= half; // seamless reset
        row.style.transform = `translateX(${txRef.current}px)`;
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    });

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div style={{ overflow: "hidden", marginLeft: "-2rem", marginRight: "-2rem" }}>
      <div ref={rowRef} style={{ display: "flex", flexWrap: "nowrap", willChange: "transform" }}>
        {[...clips, ...clips].map((src, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "clamp(280px, 30vw, 480px)",
              aspectRatio: "16/9",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(139,0,0,0.2)",
              marginRight: GAP,
              boxShadow: "0 6px 8px -2px rgba(0,0,0,0.75)",
            }}
          >
            <CinemaVideoCard src={src} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <section className="section-content relative px-6 md:px-16 lg:px-32" style={{ paddingTop: "60px", paddingBottom: "1rem" }}>
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
              <CinemaRow />
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
                <VideoCard label="" src="/NY.MOV" staggerDelay={0} square={false} autoplay />
                {[
                  { n: 2,  square: true },
                  { n: 3,  square: true },
                  { n: 4,  square: true },
                  { n: 5,  square: true },
                  { n: 6,  square: true },
                  { n: 7,  square: true },
                  { n: 8,  square: true },
                  { n: 9,  square: true },
                  { n: 10, square: true },
                  { n: 12, square: true },
                ].map(({ n, square }, i) => (
                  <VideoCard key={n} label="" src={`/edit${n}.mp4`} staggerDelay={i * 40} square={square} autoplay />
                ))}
              </div>
            </WorkSubsection>
          </Reveal>

          <Reveal delay={80}>
            <WorkSubsection id="youtube-integrations" noBottomMargin title={
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
                  <VideoCard key={item.label} label={item.label} src={item.src} staggerDelay={i * 60} autoplay />
                ))}
              </div>
            </WorkSubsection>
          </Reveal>
        </div>
      </section>

      <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          MADE WITH LOVE - @CAL1STAR 2026
        </p>
      </footer>
    </main>
  );
}

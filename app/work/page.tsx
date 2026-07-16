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

/* ── TrayItem — hover animation + click to scroll ── */
function TrayItem({
  src, alt, label, style, rotate = 0, labelTop = "45%", labelLeft = "50%", href,
}: {
  src: string; alt: string; label?: string;
  style: React.CSSProperties; rotate?: number;
  labelTop?: string; labelLeft?: string; href?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...style, pointerEvents: "auto", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => href && document.getElementById(href)?.scrollIntoView({ behavior: "smooth" })}
    >
      <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <img
          src={src} alt={alt} draggable={false}
          style={{
            width: "100%", objectFit: "contain", display: "block",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease",
            transform: hovered ? `rotate(${rotate}deg) translateY(-10px) scale(1.08)` : `rotate(${rotate}deg)`,
            filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.35))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
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
    </div>
  );
}

/* ── TrayNav ── */
function TrayNav() {
  return (
    <div style={{ width: "100%", position: "relative", overflow: "visible" }}>
      <div className="relative" style={{ marginTop: "-1.5rem" }}>
        <img src="/tray-bg.png" alt="Tray" style={{ width: "100%", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }} />

        {/* Title */}
        <div style={{ position: "absolute", left: "3%", top: "8%", zIndex: 4, pointerEvents: "none" }}>
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

        {/* Food elements — click to navigate */}
        <TrayItem src="/tray-croissant.png" alt="Videography" label="videography" rotate={-10} href="videography"
          style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }} />
        <TrayItem src="/tray-figs.png" alt="YouTube Integrations" label="youtube integrations" href="youtube-integrations"
          style={{ position: "absolute", left: "55%", top: "62%", transform: "translate(-50%, -50%)", zIndex: 3, width: "40%" }} />
        <TrayItem src="/tray-coffee.png" alt="Video Editing" label="video editing" labelTop="40%" href="video-editing"
          style={{ position: "absolute", left: "59%", top: "34%", transform: "translate(-50%, -50%)", zIndex: 2, width: "40%" }} />
      </div>
    </div>
  );
}

/* ── VideographyCarousel — scroll-driven 3D circle ── */
const CINEMA_VIDEOS = [
  "/cinema/cinema1.mp4","/cinema/cinema2.mp4","/cinema/cinema3.mp4",
  "/cinema/cinema4.mp4","/cinema/cinema5.mp4","/cinema/cinema6.mp4",
  "/cinema/cinema7.mp4","/cinema/cinema8.mp4","/cinema/cinema9.mp4",
  "/cinema/cinema10.mp4","/cinema/cinema11.mp4","/cinema/cinema12.MP4",
];

function VideographyCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRotY = useRef(0);
  const mouseRotY = useRef(0);
  const mouseRotX = useRef(8);
  const dispRotY = useRef(0);
  const dispRotX = useRef(8);
  const rafRef = useRef<number>();
  const innerRef = useRef<HTMLDivElement>(null);

  const n = CINEMA_VIDEOS.length;
  const RADIUS = 520;
  const CARD_W = 220;
  const CARD_H = 124;

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionH));
      scrollRotY.current = progress * 360;
    };

    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRotY.current = ((e.clientX - cx) / cx) * 8;
      mouseRotX.current = 8 + ((e.clientY - cy) / cy) * 5;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    const animate = () => {
      const targetY = scrollRotY.current + mouseRotY.current;
      dispRotY.current += (targetY - dispRotY.current) * 0.05;
      dispRotX.current += (mouseRotX.current - dispRotX.current) * 0.05;
      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${dispRotX.current}deg) rotateY(${dispRotY.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "300vh", position: "relative", scrollMarginTop: "20px" }}>
      <div id="videography" style={{ position: "absolute", top: "120vh" }} />
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Title — above carousel */}
        <div style={{ position: "absolute", top: "8vh", left: 0, right: 0, textAlign: "center", zIndex: 20, pointerEvents: "none", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
          <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>V</span>
          <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>ideography</span>
        </div>

        {/* Carousel — centered in viewport */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}>
            <div
              ref={innerRef}
              style={{
                position: "relative",
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                transformStyle: "preserve-3d",
                transform: "rotateX(8deg) rotateY(0deg)",
              }}
            >
              {CINEMA_VIDEOS.map((src, i) => {
                const angle = (360 / n) * i;
                return (
                  <div
                    key={src}
                    style={{
                      position: "absolute",
                      width: `${CARD_W}px`,
                      height: `${CARD_H}px`,
                      transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid rgba(139,0,0,0.3)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── WorkSubsection ── */
function WorkSubsection({ id, title, children, noBottomMargin }: { id?: string; title: React.ReactNode; children: React.ReactNode; noBottomMargin?: boolean }) {
  return (
    <div id={id} className={noBottomMargin ? "mb-4" : "mb-20"} style={{ scrollMarginTop: "20px" }}>
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
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEmbed = src.includes("youtube.com/embed") || src.includes("drive.google.com");

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      ref={cardRef}
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        ...(fill ? { width: "100%", height: "100%" } : { aspectRatio: square ? "1/1" : "16/9" }),
        border: "1px solid rgba(139,0,0,0.2)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${staggerDelay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${staggerDelay}ms`,
      }}
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
        </div>
      </section>

      <VideographyCarousel />

      <section className="section-content relative px-6 md:px-16 lg:px-32" style={{ paddingBottom: "1rem" }}>
        <div className="max-w-6xl mx-auto">
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
                {["ve1.mp4","ve2.mp4","ve3.mp4","ve4.mp4","ve5.mp4","ve6.mp4","ve7.mp4","ve8.mp4","ve9.mp4","ve10.mp4","ve11.mp4","ve12.mp4","ve13.mp4","ve14.mp4","ve15.mp4"].map((f, i) => (
                  <VideoCard key={f} label="" src={`/ve/${f}`} staggerDelay={i * 40} square={i >= 5} autoplay />
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
          @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

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

/* ── TrayItem ── */
function TrayItem({
  href, src, alt, label, style, rotate = 0, labelTop = "45%", labelLeft = "50%", decorative = false,
}: {
  href?: string; src: string; alt: string; label?: string;
  style: React.CSSProperties; rotate?: number;
  labelTop?: string; labelLeft?: string; decorative?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const inner = (
    <div
      style={{ position: "relative", display: "inline-block", cursor: decorative ? "default" : "pointer", pointerEvents: "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src} alt={alt}
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
  );
  return (
    <div style={{ ...style, pointerEvents: "none" }}>
      {href ? <a href={href} style={{ pointerEvents: "auto", display: "inline-block" }}>{inner}</a> : inner}
    </div>
  );
}

/* ── TrayNav ── */
function TrayNav() {
  return (
    <div style={{ width: "100%" }}>
      <div className="relative">
        <img src="/tray-bg.png" alt="Tray" style={{ width: "100%", display: "block", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }} />
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
        <TrayItem href="#cinematography" src="/tray-croissant.png" alt="Cinematography" label="cinematography" rotate={-10}
          style={{ position: "absolute", left: "40%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "50%" }} />
        <TrayItem href="#youtube-integrations" src="/tray-figs.png" alt="YouTube Integrations" label="youtube integrations"
          style={{ position: "absolute", left: "55%", top: "62%", transform: "translate(-50%, -50%)", zIndex: 3, width: "40%" }} />
        <TrayItem href="#video-editing" src="/tray-coffee.png" alt="Video Editing" label="video editing" labelTop="40%"
          style={{ position: "absolute", left: "59%", top: "34%", transform: "translate(-50%, -50%)", zIndex: 2, width: "40%" }} />
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
function VideoCard({ label, src, staggerDelay = 0, square = false }: {
  label: string; src: string; staggerDelay?: number; square?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEmbed = src.includes("youtube.com/embed") || src.includes("drive.google.com");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (hovered) { v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered]);

  return (
    <div
      className="work-card group relative overflow-hidden rounded-lg cursor-pointer"
      style={{ aspectRatio: square ? "1/1" : "16/9", border: "1px solid rgba(139,0,0,0.2)", transitionDelay: `${staggerDelay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEmbed ? (
        <iframe src={src} title={label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
      ) : (
        <video ref={videoRef} src={src} loop playsInline muted preload="none" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
        style={{ background: "linear-gradient(to top, rgba(13,0,0,0.85), transparent)" }}>
        {label && <span className="font-inter text-[10px] uppercase tracking-widest text-text-primary">{label}</span>}
      </div>
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0, background: "rgba(139,0,0,0.12)" }} />
    </div>
  );
}

/* ── Page ── */
export default function WorkPage() {
  return (
    <>
      <main className="relative min-h-screen overflow-x-clip">
        <section className="section-content relative px-6 md:px-16 lg:px-32" style={{ paddingTop: "72px", paddingBottom: "1rem" }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <TrayNav />
            </Reveal>
            <div style={{ height: "32px" }} />

            <Reveal delay={80}>
              <WorkSubsection id="cinematography" title={
                <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                  <span style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", color: "#f5f0f0" }}>C</span>
                  <span style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", color: "#f5f0f0" }}>inematography</span>
                </div>
              }>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <VideoCard label="" src="/edit1.mp4"             staggerDelay={0}   square={false} />
                  <VideoCard label="" src="/edit11.mp4"            staggerDelay={40}  square={false} />
                  <VideoCard label="" src="/sd.mp4"                staggerDelay={80}  square={false} />
                  <VideoCard label="" src="/icedbananalatte.mp4"   staggerDelay={160} square={false} />
                  <VideoCard label="" src="/temple.mov"            staggerDelay={200} square={false} />
                  <VideoCard label="" src="/walking.mp4"           staggerDelay={240} square={false} />
                  <VideoCard label="" src="/running.mp4"           staggerDelay={280} square={false} />
                  <VideoCard label="" src="/colorgrading.mp4"      staggerDelay={320} square={false} />
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
                  <VideoCard label="" src="/NY.MOV" staggerDelay={0} square={false} />
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
                    <VideoCard key={n} label="" src={`/edit${n}.mp4`} staggerDelay={i * 40} square={square} />
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
                    <VideoCard key={item.label} label={item.label} src={item.src} staggerDelay={i * 60} />
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
    </>
  );
}

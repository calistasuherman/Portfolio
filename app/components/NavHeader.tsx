"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MEDIA_BASE } from "../lib/media";

export default function NavHeader() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    return () => { audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("loadedmetadata", onLoad); };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
      setPlayerOpen(true);
    }
  }

  function handleVinylClick() {
    setPlayerOpen(o => !o);
    if (!playing) {
      const audio = audioRef.current;
      if (audio) { audio.play().catch(() => {}); setPlaying(true); }
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const navLinks = [
    { label: "Home",    href: "/" },
    { label: "My Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={`${MEDIA_BASE}/mj-loving-you.mp4`} loop preload="none" />

      {/* Custom cursor */}
      <div
        className="cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) scale(${cursorHover ? 2.8 : 1})` }}
      />

      {/* Fixed header */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
        <img src="/cs-monogram.png" alt="CS" style={{ position: "absolute", top: "0.5rem", left: "-1rem", width: "clamp(58px, 7vw, 90px)", opacity: 0.9 }} />
        <nav className="flex justify-end gap-8 md:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:tracking-[0.28em] transition-all duration-300"
              style={{ textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Music player */}
      <div style={{ position: "fixed", bottom: "1.5rem", left: "1.5rem", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>

        {/* Expanded player card */}
        <div style={{
          overflow: "hidden",
          maxHeight: playerOpen ? "110px" : "0",
          opacity: playerOpen ? 1 : 0,
          transform: playerOpen ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, transform 0.35s ease",
        }}>
          <div style={{
            background: "rgba(10,0,0,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "12px 16px",
            width: "230px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}>
            {/* Track info */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <img src="/vinyl.png" alt="" style={{ width: "34px", height: "34px", borderRadius: "50%", animation: "vinylSpin 3s linear infinite", flexShrink: 0 }} />
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, color: "#f5f0f0", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Loving You</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(245,240,240,0.45)", letterSpacing: "0.04em" }}>Michael Jackson</p>
              </div>
              {/* Play/pause */}
              <button onClick={togglePlay} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "none", padding: "4px", color: "#f5f0f0", flexShrink: 0 }}>
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                )}
              </button>
            </div>

            {/* Progress bar */}
            <div onClick={seek} style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", cursor: "none", position: "relative" }}>
              <div style={{ height: "100%", background: "rgba(245,240,240,0.7)", borderRadius: "2px", width: duration ? `${(progress / duration) * 100}%` : "0%", transition: "width 0.5s linear" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", color: "rgba(245,240,240,0.35)" }}>{fmt(progress)}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", color: "rgba(245,240,240,0.35)" }}>{duration ? fmt(duration) : "--:--"}</span>
            </div>
          </div>
        </div>

        {/* Vinyl button */}
        <button
          onClick={handleVinylClick}
          aria-label="Toggle music player"
          style={{
            width: "64px", height: "64px", borderRadius: "50%",
            border: "none",
            background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "none", padding: 0,
            transition: "transform 0.2s ease",
            transform: playerOpen ? "scale(1.08)" : "scale(1)",
            filter: playing ? "drop-shadow(0 0 10px rgba(139,0,0,0.5))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
          }}
        >
          <img
            src="/vinyl.png"
            alt="Vinyl"
            style={{ width: "64px", height: "64px", borderRadius: "50%", animation: "vinylSpin 3s linear infinite" }}
          />
        </button>
      </div>
    </>
  );
}

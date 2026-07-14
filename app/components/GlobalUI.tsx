"use client";
import { useState, useEffect } from "react";

/* ── Playlist ─────────────────────────────────────────────────── */
const SONGS = [
  { title: "The Girl Is Mine", artist: "Michael Jackson", src: "/mj-girl-is-mine.mp4" },
  { title: "Song 5",           artist: "♪",               src: "/song5.mp4"           },
  { title: "Song 6",           artist: "♪",               src: "/song6.mp4"           },
  { title: "Song 7",           artist: "♪",               src: "/song7.mp4"           },
  { title: "Song 8",           artist: "♪",               src: "/song8.mp4"           },
  { title: "Song 9",           artist: "♪",               src: "/song9.mp4"           },
];

/* ── Module-level audio singleton ────────────────────────────────
   Lives outside React — never destroyed on navigation/re-render.
─────────────────────────────────────────────────────────────────── */
let _audio: HTMLAudioElement | null = null;
let _trackIndex = 0;

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!_audio) {
    _audio = new Audio(SONGS[0].src);
    _audio.loop = false;
  }
  return _audio;
}

export default function GlobalUI() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  /* cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const on = () => setCursorHover(true);
    const off = () => setCursorHover(false);
    const attach = () => {
      document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* audio event listeners */
  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => skipTo(_trackIndex + 1);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    setPlaying(!audio.paused);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function skipTo(idx: number) {
    const audio = getAudio();
    if (!audio) return;
    const next = ((idx % SONGS.length) + SONGS.length) % SONGS.length;
    _trackIndex = next;
    setTrackIndex(next);
    setProgress(0);
    setDuration(0);
    audio.src = SONGS[next].src;
    audio.load();
    audio.play().catch(() => {});
    setPlaying(true);
    setPlayerOpen(true);
  }

  function togglePlay() {
    const audio = getAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
      setPlayerOpen(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function handleVinylClick() {
    const audio = getAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
      setPlayerOpen(true);
    } else {
      setPlayerOpen(o => !o);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = getAudio();
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const navLinks = [
    { label: "Home",    href: "/" },
    { label: "My Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ];

  const song = SONGS[trackIndex];

  /* icon style reused for prev/next/play buttons */
  const ctrlBtn: React.CSSProperties = {
    background: "none", border: "none", cursor: "none",
    padding: "4px", color: "#f5f0f0", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  };

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

      {/* Fixed header */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
        <img
          src="/cs-monogram.png"
          alt="CS"
          style={{ position: "absolute", top: "0.5rem", left: "-1rem", width: "clamp(58px, 7vw, 90px)", opacity: 0.9 }}
        />
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
      <div style={{ position: "fixed", bottom: "1.5rem", left: "1.5rem", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.6rem" }}>

        {/* Expanded player card */}
        <div style={{
          overflow: "hidden",
          maxHeight: playerOpen ? "140px" : "0",
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
            width: "256px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}>
            {/* Track info row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <img
                src="/vinyl.png"
                alt=""
                style={{ width: "36px", height: "36px", objectFit: "contain", animation: "vinylSpin 3s linear infinite", flexShrink: 0 }}
              />
              <div style={{ overflow: "hidden", flex: 1 }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, color: "#f5f0f0", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{song.title}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(245,240,240,0.45)", letterSpacing: "0.04em" }}>{song.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "10px" }}>
              {/* Prev */}
              <button onClick={() => skipTo(trackIndex - 1)} style={ctrlBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,5 9,12 19,19"/><rect x="5" y="5" width="2" height="14"/></svg>
              </button>
              {/* Play/Pause */}
              <button onClick={togglePlay} style={{ ...ctrlBtn, width: "28px", height: "28px", borderRadius: "50%", background: "rgba(245,240,240,0.12)" }}>
                {playing ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                )}
              </button>
              {/* Next */}
              <button onClick={() => skipTo(trackIndex + 1)} style={ctrlBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,5 15,12 5,19"/><rect x="17" y="5" width="2" height="14"/></svg>
              </button>
            </div>

            {/* Progress bar */}
            <div onClick={seek} style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", cursor: "none" }}>
              <div style={{ height: "100%", background: "rgba(245,240,240,0.7)", borderRadius: "2px", width: duration ? `${(progress / duration) * 100}%` : "0%", transition: "width 0.5s linear" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", color: "rgba(245,240,240,0.35)" }}>{fmt(progress)}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.48rem", color: "rgba(245,240,240,0.35)" }}>{duration ? fmt(duration) : "--:--"}</span>
            </div>
          </div>
        </div>

        {/* Spinning star / vinyl button — 2× size = 128px */}
        <button
          onClick={handleVinylClick}
          aria-label="Toggle music player"
          style={{
            width: "128px", height: "128px",
            border: "none", background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "none", padding: 0,
            transition: "transform 0.2s ease",
            transform: playerOpen ? "scale(1.05)" : "scale(1)",
            filter: playing
              ? "drop-shadow(0 0 14px rgba(139,0,0,0.65))"
              : "drop-shadow(0 4px 16px rgba(0,0,0,0.65))",
          }}
        >
          <img
            src="/vinyl.png"
            alt="Music player"
            style={{ width: "128px", height: "128px", objectFit: "contain", animation: "vinylSpin 3s linear infinite" }}
          />
        </button>
      </div>
    </>
  );
}

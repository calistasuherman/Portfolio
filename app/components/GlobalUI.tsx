"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { MEDIA_BASE } from "../lib/media";

/* ── Playlist ─────────────────────────────────────────────────── */
export const SONGS = [
  { title: "The Lady in My Life",          artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/lady in my life.mp4`              },
  { title: "(I Like) The Way You Love Me", artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/I like the way you love me.mp4`   },
  { title: "All I Do Is Think Of You",     artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/all i do is think of you.mp4`     },
  { title: "The Girl Is Mine ft. Paul McCartney", artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/the girl is mine.mp4` },
  { title: "You Rock My World",            artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/rock my world.mp4`                },
  { title: "Loving You",                   artist: "Michael Jackson", src: `${MEDIA_BASE}/songs/loving you.mp4`                   },
];

/* ── Module-level audio singleton ────────────────────────────────
   Lives outside React — never destroyed on navigation/re-render.
─────────────────────────────────────────────────────────────────── */
let _audio: HTMLAudioElement | null = null;
let _lenis: any = null;
export function lenisScrollTo(target: HTMLElement | string | number, options?: any) {
  if (_lenis) _lenis.scrollTo(target, options);
}
let _trackIndex = 0;

export function currentTrack() { return _trackIndex; }

/* Play a song by index from anywhere (e.g. the course page vinyl) */
export function playSong(idx: number) {
  const audio = getAudio();
  if (!audio) return;
  const next = ((idx % SONGS.length) + SONGS.length) % SONGS.length;
  _trackIndex = next;
  audio.src = SONGS[next].src;
  audio.load();
  audio.play().catch(() => {});
  window.dispatchEvent(new Event("cal1star:track"));
}

export function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!_audio) {
    _audio = new Audio(SONGS[0].src);
    _audio.loop = false;
  }
  return _audio;
}

export default function GlobalUI() {
  const pathname = usePathname();
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  /* cursor: exact dot + eased trailing ring, driven by rAF (no React re-renders) */
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = -100, my = -100, rx = -100, ry = -100, hover = false, shown = false, raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${hover ? 0.5 : 1})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; rx = mx; ry = my; dot.style.opacity = "1"; ring.style.opacity = "1"; }
    };
    const over = (e: MouseEvent) => { hover = !!(e.target as Element).closest?.("a, button, [data-cursor]"); };
    const leave = () => { shown = false; dot.style.opacity = "0"; ring.style.opacity = "0"; };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* magnetic buttons: [data-magnetic] leans toward the pointer */
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reset = (el: HTMLElement) => { el.style.setProperty("--tw-translate-x", "0px"); el.style.setProperty("--tw-translate-y", "0px"); };
    let cur: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.("[data-magnetic]") as HTMLElement | null;
      if (cur && cur !== el) reset(cur);
      cur = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tw-translate-x", `${(e.clientX - (r.left + r.width / 2)) * 0.22}px`);
      el.style.setProperty("--tw-translate-y", `${(e.clientY - (r.top + r.height / 2)) * 0.32}px`);
    };
    const out = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.("[data-magnetic]") as HTMLElement | null;
      if (el && !el.contains(e.relatedTarget as Node)) reset(el);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerout", out);
    return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", out); };
  }, []);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    _lenis = lenis;
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${-lenis.scroll * 0.3}px, 0)`;
      }
      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${lenis.limit > 0 ? Math.min(1, Math.max(0, lenis.scroll / lenis.limit)) : 0})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { lenis.destroy(); cancelAnimationFrame(raf); };
  }, []);

  /* page-fade on link clicks — client-side nav so audio/scroll state survives */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) return;
      e.preventDefault();
      document.body.classList.add("page-fade-out");
      setTimeout(() => { router.push(href); }, 300);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router]);

  /* fade the new page back in once the route has actually changed */
  useEffect(() => {
    document.body.classList.remove("page-fade-out");
  }, [pathname]);

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
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTrack = () => { setTrackIndex(_trackIndex); setProgress(0); setDuration(0); };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    window.addEventListener("cal1star:track", onTrack);
    setPlaying(!audio.paused);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("cal1star:track", onTrack);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function skipTo(idx: number) {
    playSong(idx);
    setPlaying(true);
  }

  function togglePlay() {
    const audio = getAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
      } else {
      audio.pause();
      setPlaying(false);
    }
  }

  const navLinks = [
    { label: "Home",    href: "/" },
    { label: "My Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ];

  const song = SONGS[trackIndex];

  const glassBtn: React.CSSProperties = {
    width: "36px", height: "36px", borderRadius: "50%", border: "none", cursor: "none",
    background: "transparent", color: "#fff", flexShrink: 0, padding: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "transform 0.2s ease, background 0.2s ease",
  };

  return (
    <>
      {/* Backdrop color behind the film strip */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -2, background: "#2a0509", pointerEvents: "none" }} />

      {/* Parallax background */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: "-150vh",
          height: "800vh",
          zIndex: -1,
          backgroundImage: "url('/bg-film.webp')",
          backgroundSize: "clamp(300px, 36vw, 560px) auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Scroll progress */}
      <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 60, pointerEvents: "none" }}>
        <div ref={progRef} style={{ height: "100%", background: "linear-gradient(90deg, #960018, #e8a0a8)", transformOrigin: "left center", transform: "scaleX(0)", willChange: "transform" }} />
      </div>

      {/* Custom cursor */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Fixed header */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
        <a href="/" style={{ position: "absolute", top: "1rem", left: "1.25rem" }}>
          <img
            src="/cal1star-mark.webp"
            alt="cal1star editing"
            style={{ width: "clamp(34px, 4vw, 50px)", aspectRatio: "600 / 379", display: "block", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.45))" }}
          />
        </a>
        <nav className="flex justify-end gap-8 md:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:tracking-[0.28em] transition-all duration-300"
              style={{ textDecoration: "none", fontWeight: pathname === link.href ? 700 : 400 }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Music player — liquid-glass pill */}
      <div
        className="music-player"
        style={{
          position: "fixed", bottom: "1.1rem", left: "1.1rem", zIndex: 200,
          display: pathname === "/course" ? "none" : "flex", alignItems: "center", gap: "0.15rem",
          maxWidth: "calc(100vw - 2.2rem)",
          padding: "0.4rem 1rem 0.4rem 0.4rem",
          borderRadius: "999px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.07) 55%, rgba(255,255,255,0.14) 100%)",
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 10px 34px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)",
          color: "#fff",
        }}
      >
        <button className="glass-btn" aria-label="Previous song" onClick={() => skipTo(trackIndex - 1)} style={glassBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,5 9,12 19,19"/><rect x="5" y="5" width="2.4" height="14" rx="1"/></svg>
        </button>
        <button className="glass-btn" aria-label={playing ? "Pause" : "Play"} onClick={togglePlay} style={{ ...glassBtn, width: "42px", height: "42px", background: "linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.12))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 10px rgba(0,0,0,0.25)" }}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}><polygon points="6,3 20,12 6,21"/></svg>
          )}
        </button>
        <button className="glass-btn" aria-label="Next song" onClick={() => skipTo(trackIndex + 1)} style={glassBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,5 15,12 5,19"/><rect x="16.6" y="5" width="2.4" height="14" rx="1"/></svg>
        </button>

        <div style={{ marginLeft: "0.55rem", minWidth: 0, width: "clamp(96px, 34vw, 170px)" }}>
          <p style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: "0 1px 6px rgba(0,0,0,0.35)" }}>{song.title}</p>
          <p style={{ fontFamily: "'HelvLight', var(--font-inter)", fontSize: "0.6rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{song.artist}</p>
          <div style={{ height: "2px", marginTop: "0.3rem", borderRadius: "2px", background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "rgba(255,255,255,0.85)", width: duration ? `${(progress / duration) * 100}%` : "0%", transition: "width 0.5s linear" }} />
          </div>
        </div>
      </div>
    </>
  );
}

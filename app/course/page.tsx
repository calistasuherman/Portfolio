"use client";
import { useState, useEffect, useRef } from "react";
import { SONGS, playSong, getAudio, currentTrack } from "../components/GlobalUI";

const label: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.58rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(245,240,240,0.35)",
};

function WaitlistForm({ center = false }: { center?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Posts to our own /api/waitlist function, which saves the email on the
  // site itself (see functions/api/waitlist.js).
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setConfirm(!!data.confirm); setSent(true); }
      else setError(data.error || "Signup didn't go through. Please try again.");
    } catch {
      setError("Signup didn't go through. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "clamp(0.78rem, 0.95vw, 0.85rem)", lineHeight: 1.7, color: "#f5f0f0", textAlign: center ? "center" : "left" }}>
        {confirm ? "You're in! Check your inbox to confirm your spot." : "You're in! I'll email you as soon as Editing 101 opens."}
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
        rowGap: "clamp(1.75rem, 4.5vh, 2.75rem)",
        maxWidth: "30rem",
        margin: center ? "0 auto" : undefined,
        justifyContent: center ? "center" : undefined,
      }}
    >
      <input
        type="email"
        name="email_address"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email address"
        style={{
          flex: "1 1 15rem",
          padding: "0.85rem 1.1rem",
          background: "rgba(8,2,5,0.55)",
          border: "1px solid rgba(245,240,240,0.2)",
          borderRadius: "2px",
          color: "#f5f0f0",
          fontFamily: "var(--font-inter)",
          fontWeight: 300,
          fontSize: "0.95rem",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={busy}
        style={{
          padding: "0.85rem 1.4rem",
          background: "#960018",
          border: "1px solid #960018",
          borderRadius: "2px",
          color: "#fff",
          fontFamily: "var(--font-inter)",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          transition: "background 0.25s, border-color 0.25s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#b3001d"; e.currentTarget.style.borderColor = "#b3001d"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#960018"; e.currentTarget.style.borderColor = "#960018"; }}
      >
        {busy ? "Joining…" : "Join the waitlist →"}
      </button>
      {error && (
        <p role="alert" style={{ flexBasis: "100%", margin: 0, fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "0.8rem", color: "#ff8a8a", textAlign: center ? "center" : "left" }}>
          {error}
        </p>
      )}
    </form>
  );
}

/* Big spinning vinyl: hover (or tap) to pick a Michael Jackson song */
function SongVinyl() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const pointerType = useRef("mouse");

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    const sync = () => { setPlaying(!audio.paused); setTrack(currentTrack()); };
    sync();
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    window.addEventListener("cal1star:track", sync);
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      window.removeEventListener("cal1star:track", sync);
    };
  }, []);

  function pick(i: number) {
    const audio = getAudio();
    if (!audio) return;
    if (i === track) {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    } else {
      playSong(i);
    }
  }

  return (
    <div
      className="course-vinyl"
      onPointerEnter={e => { if (e.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={e => { if (e.pointerType === "mouse") setOpen(false); }}
      onPointerDown={e => { pointerType.current = e.pointerType; }}
      onClick={() => { if (pointerType.current !== "mouse") setOpen(o => !o); }}
      
    >
      {/* Same disc as the work page */}
      <svg
        viewBox="0 0 292 292"
        style={{
          width: "100%", height: "100%", display: "block",
          animation: "vinylSpin 6s linear infinite",
          filter: playing ? "drop-shadow(0 0 60px rgba(139,0,0,0.55))" : "drop-shadow(0 20px 60px rgba(0,0,0,0.7))",
          transition: "filter 0.4s ease",
          willChange: "transform",
        }}
      >
        {(() => { const r = 146; const grooves = Array.from({ length: 24 }, (_, i) => r * 0.3 + (r * 0.62) * (i / 24)); return (<>
          <circle cx={r} cy={r} r={r} fill="#090909"/>
          {grooves.map((gr, i) => <circle key={i} cx={r} cy={r} r={gr} fill="none" stroke={i % 5 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.022)"} strokeWidth="0.55"/>)}
          {/* light catching a few grooves, so the spin reads at the edge */}
          {[0.55, 0.68, 0.8, 0.9].map((k, i) => (
            <circle key={`hl${i}`} cx={r} cy={r} r={r * k} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1"
              strokeDasharray={`${r * k * 0.5} ${r * k * 5.8}`} strokeDashoffset={r * k * i * 1.3} strokeLinecap="round"/>
          ))}
          <circle cx={r} cy={r} r={r * 0.29} fill="#960018"/>
          <circle cx={r} cy={r} r={r * 0.25} fill="#960018" opacity="0.85"/>
          {([-r*0.09, r*0.02, r*0.12] as number[]).map((dy, i) => <line key={i} x1={r - r*0.18} y1={r+dy} x2={r + r*0.18} y2={r+dy} stroke="rgba(255,255,255,0.28)" strokeWidth={i===0?0.9:0.6}/>)}
          <circle cx={r} cy={r} r={r * 0.045} fill="#000"/>
        </>); })()}
      </svg>

      {/* Song picker */}
      <div
        className="course-picker"
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute", left: "72%", top: "72%",
          width: "17rem",
          transformOrigin: "top left",
          transform: open ? "scale(1)" : "translateY(-0.5rem) scale(0.96)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          background: "rgba(10,0,0,0.88)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: "0.9rem 0.6rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <p style={{ ...label, textAlign: "center", marginBottom: "0.5rem" }}>Pick a song</p>
        {SONGS.map((s, i) => {
          const active = i === track && playing;
          return (
            <button
              key={s.title}
              onClick={() => pick(i)}
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                width: "100%", textAlign: "left",
                padding: "0.45rem 0.6rem",
                background: active ? "rgba(150,0,24,0.35)" : "transparent",
                border: "none", borderRadius: "8px",
                color: "#f5f0f0", cursor: "none",
                fontFamily: "var(--font-inter)", fontSize: "0.72rem", letterSpacing: "0.03em",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(245,240,240,0.08)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ width: "0.8rem", fontSize: "0.6rem", opacity: 0.7 }}>{active ? "❚❚" : "▶"}</span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</span>
            </button>
          );
        })}
        <p style={{ ...label, textAlign: "center", marginTop: "0.5rem", fontSize: "0.5rem" }}>Michael Jackson</p>
      </div>
    </div>
  );
}

export default function CoursePage() {
  const pad = "clamp(1.8rem, 5vw, 5rem)";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: "#080205" }}>

      {/* Background photo */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "url('/bg-red.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(8,2,5,0.6) 0%, rgba(8,2,5,0.85) 45%, rgba(8,2,5,0.95) 100%)",
      }} />

      <section
        className="section-content course-hero"
        style={{
          position: "relative", zIndex: 2,
          minHeight: "100vh",
          padding: `calc(80px + 3rem) ${pad} 5rem`,
        }}
      >
        <SongVinyl />

        <div style={{ flex: 1, minWidth: 0, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1.75rem, 4.5vh, 2.75rem)" }}>
          <p style={{ ...label, margin: 0 }}>A beginner course by @cal1star</p>
          <h1 style={{
            fontWeight: "normal", color: "#f5f0f0", margin: 0,
            lineHeight: 1,
            padding: 0,
          }}>
            {/* Lettering is fixed artwork (EDITING wordmark from the CAL1STAR logo + Helvetica Bold/Light; the Helvetica files is licensed, so it is outlined, not served as a webfont), not a webfont: the Coolvetica license doesn't allow web embedding. */}
            <img src="/course/editing-101.svg" alt="Editing 101: made easy" style={{ display: "block", width: "min(21rem, 72vw)", height: "auto", margin: "0 auto" }} />
          </h1>
          {/* Intro text is outlined Helvetica Light artwork (licensed font, not served as a webfont); alt carries the text. */}
          <picture style={{ display: "block", margin: "0 auto" }}>
            <source media="(min-width: 700px)" srcSet="/course/intro-desktop.svg" />
            <img
              src="/course/intro-phone.svg"
              alt="Editing changed my life, and I want to make it feel easy for you. I'll walk you through CapCut first, then DaVinci Resolve, then the fun stuff: the effects and transitions you see in my videos. No experience needed, just come as you are."
              className="course-intro"
              style={{ display: "block", height: "auto", margin: "0 auto" }}
            />
          </picture>
          <h2 style={{
            fontFamily: "RelationshipMelodrame, serif",
            fontSize: "clamp(2.3rem, 4vw, 3.3rem)",
            fontWeight: "normal", color: "#f5f0f0",
            lineHeight: 1,
            margin: 0,
            padding: 0,
          }}>
            <img src="/course/be-first-in-line.png" alt="be first in line!" style={{ display: "block", height: "clamp(1.5rem, 2.6vw, 2.2rem)", width: "auto", margin: "0 auto" }} />
          </h2>
          <WaitlistForm center />
        </div>
      </section>

      <footer
        className="section-content relative py-8 text-center"
        style={{ zIndex: 2, borderTop: "1px solid rgba(139,0,0,0.15)" }}
      >
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CAL1STAR EDITING.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

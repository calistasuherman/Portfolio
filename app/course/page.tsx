"use client";
import { useState, useEffect, useRef } from "react";
import { SONGS, playSong, getAudio, currentTrack } from "../components/GlobalUI";

const label: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "0.58rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(245,240,240,0.35)",
};

/* The waitlist form. Behavior is unchanged: it posts to /api/waitlist exactly as before.
   tone="dark" is the original look on the deep hero panel. tone="light" is the same form
   restyled for the calm background near the bottom of the page. */
function WaitlistForm({ center = false, tone = "dark" }: { center?: boolean; tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const light = tone === "light";

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
      <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "clamp(0.78rem, 0.95vw, 0.85rem)", lineHeight: 1.7, color: light ? "#161616" : "#f5f0f0", textAlign: center ? "center" : "left" }}>
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
      <div style={{ position: "relative", flex: "1 1 100%", display: "flex" }}>
      <input
        type="email"
        name="email_address"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
                aria-label="Email address"
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "0.85rem 1.1rem",
          background: light ? "#fffdf9" : "rgba(12,12,12,0.55)",
          border: light ? "1px solid rgba(22,22,22,0.35)" : "1px solid rgba(245,240,240,0.2)",
          borderRadius: "2px",
          color: light ? "#161616" : "#f5f0f0",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: "0.95rem",
          outline: "none",
        }}
      />
        {!email && !light && (
          <img src="/course/ph-email.svg" alt="" aria-hidden="true" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", height: "0.95rem", width: "auto", pointerEvents: "none" }} />
        )}
      </div>
      <button
        type="submit"
        disabled={busy}
        style={{
          padding: "0.85rem 1.4rem",
          background: "#161616",
          border: "1px solid #161616",
          borderRadius: "2px",
          color: "#fff",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          transition: "background 0.25s, border-color 0.25s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#333333"; e.currentTarget.style.borderColor = "#333333"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#161616"; e.currentTarget.style.borderColor = "#161616"; }}
      >
        <img src={busy ? "/course/btn-joining.svg" : "/course/btn-join.svg"} alt={busy ? "Joining…" : "Join the waitlist"} style={{ display: "block", height: "0.8rem", width: "auto" }} />
      </button>
      {error && (
        <p role="alert" style={{ flexBasis: "100%", margin: 0, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: light ? "#9c7410" : "#e9cf87", textAlign: center ? "center" : "left" }}>
          {error}
        </p>
      )}
    </form>
  );
}

/* Big spinning vinyl: hover (or tap) to pick a Michael Jackson song.
   Unchanged from before, now living in the music section below the course content. */
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
          filter: playing ? "drop-shadow(0 0 60px rgba(201,151,28,0.55))" : "drop-shadow(0 20px 60px rgba(0,0,0,0.35))",
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
          <circle cx={r} cy={r} r={r * 0.29} fill="#c9971c"/>
          <circle cx={r} cy={r} r={r * 0.25} fill="#c9971c" opacity="0.85"/>
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
                background: active ? "rgba(201,151,28,0.35)" : "transparent",
                border: "none", borderRadius: "8px",
                color: "#f5f0f0", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.72rem", letterSpacing: "0.03em",
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

/* ── Course content pieces ── */
const INK = "#161616";
const MUTED = "rgba(22,22,22,0.62)";
const FAINT = "rgba(22,22,22,0.45)";
const H_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", color: INK, letterSpacing: "0.03em", margin: 0, lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

function Body({ children, max = "38rem" }: { children: React.ReactNode; max?: string }) {
  return (
    <p style={{ fontFamily: H_FONT, fontWeight: 300, fontSize: "0.95rem", color: MUTED, lineHeight: 1.85, marginTop: "1rem", maxWidth: max }}>
      {children}
    </p>
  );
}

const LEARN_ITEMS = [
  { h: "CapCut, from the start", p: "Every button that matters, then a full first edit together, step by step." },
  { h: "DaVinci Resolve, without the overwhelm", p: "The same edit again in Resolve, so the bigger software stops feeling scary." },
  { h: "My transitions and effects", p: "The exact moves you see in my videos, broken down so you can rebuild them yourself." },
  { h: "Export settings that keep the quality", p: "My settings for every platform, so your videos look as good posted as they did on your screen." },
  { h: "Getting faster", p: "The habits and shortcuts that took my edits from hours to minutes." },
];

const STATS = [
  { n: "60K+",  t: "Instagram followers" },
  { n: "5.1M",  t: "Reel views" },
  { n: "400K",  t: "Interactions" },
  { n: "62K",   t: "Profile visits" },
];

const QUESTIONS = [
  { q: "When does it start?", a: "Editing 101 opens in early January 2027. Join the waitlist and you will be the first to know the exact day." },
  { q: "What do I need?", a: "A phone or a computer and a free copy of CapCut to start. DaVinci Resolve is free too, and I will show you where to get it." },
  { q: "What will it cost?", a: "The waitlist hears the price first, with an early bird offer that will not come back once the course opens." },
  { q: "How long do I get access?", a: "There is no deadline on the lessons. Learn at your own pace and come back to any lesson whenever you need it." },
];

export default function CoursePage() {
  const pad = "clamp(1.8rem, 5vw, 5rem)";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: "#f6eeda", color: INK }}>

      {/* ── Hero: her artwork and the waitlist form at the very top, held in one deep panel
           so the light lettering artwork keeps the dark setting it was made for ── */}
      <section style={{ padding: "calc(80px + 2rem) 1rem 0" }}>
        <div
          style={{
            maxWidth: "1120px", margin: "0 auto",
            background: "linear-gradient(160deg, #101010 0%, #1b1b1b 58%, #262626 100%)",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(22,22,22,0.3)",
          }}
        >
          <div style={{ background: "none", padding: "clamp(2.5rem, 6vh, 4.5rem) clamp(1.2rem, 5vw, 4rem)" }}>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1.75rem, 4.5vh, 2.75rem)" }}>
              <p style={{ ...label, margin: 0, lineHeight: 0 }}><img src="/course/label-course.svg" alt="A beginner course by @cal1star" style={{ display: "block", height: "0.58rem", width: "auto" }} /></p>
              <h1 style={{ fontWeight: "normal", color: "#f5f0f0", margin: 0, lineHeight: 1, padding: 0 }}>
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
              <p style={{ fontFamily: H_FONT, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,240,0.5)", margin: 0 }}>
                Launching early January 2027
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you will learn ── */}
      <section style={{ padding: `6rem ${pad}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <H2>What you will learn</H2>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column" }}>
            {LEARN_ITEMS.map((item, i) => (
              <div key={item.h} style={{ display: "flex", gap: "1.4rem", padding: "1.3rem 0", borderBottom: i < LEARN_ITEMS.length - 1 ? "1px solid rgba(22,22,22,0.12)" : "none", alignItems: "baseline" }}>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "1.1rem", color: "#9c7410", margin: 0, minWidth: "2rem" }}>{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <p style={{ fontFamily: H_FONT, fontSize: "1rem", fontWeight: 600, color: INK, margin: 0 }}>{item.h}</p>
                  <p style={{ fontFamily: H_FONT, fontWeight: 300, fontSize: "0.9rem", color: MUTED, lineHeight: 1.8, marginTop: "0.35rem", maxWidth: "34rem" }}>{item.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it is for ── */}
      <section style={{ padding: `0 ${pad} 6rem` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <H2>Who it is for</H2>
          <div className="mobile-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
            <div className="service-card" style={{ padding: "1.8rem 1.6rem" }}>
              <p style={{ fontFamily: H_FONT, fontSize: "1rem", fontWeight: 600, color: INK, margin: 0 }}>Complete beginners</p>
              <p style={{ fontFamily: H_FONT, fontWeight: 300, fontSize: "0.9rem", color: MUTED, lineHeight: 1.8, marginTop: "0.6rem" }}>You have never opened an editing app, or you opened one and closed it again. We start at zero, together.</p>
            </div>
            <div className="service-card" style={{ padding: "1.8rem 1.6rem" }}>
              <p style={{ fontFamily: H_FONT, fontSize: "1rem", fontWeight: 600, color: INK, margin: 0 }}>Creators who want the look</p>
              <p style={{ fontFamily: H_FONT, fontWeight: 300, fontSize: "0.9rem", color: MUTED, lineHeight: 1.8, marginTop: "0.6rem" }}>You already post, and you want your edits to look like the ones on my page: the transitions, the effects, the finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet your teacher ── */}
      <section style={{ padding: `0 ${pad} 6rem` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <H2>Meet your teacher</H2>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <img src="/about.jpg" alt="Calista" style={{ width: "min(220px, 60vw)", aspectRatio: "3/4", objectFit: "cover", borderRadius: "12px", display: "block" }} />
            <div style={{ flex: "1 1 20rem", minWidth: "min(100%, 18rem)" }}>
              <Body max="30rem">I am Calista, the editor behind cal1star. I taught myself to edit, then brands started asking me to edit for them. Editing 101 is everything I wish someone had shown me at the start.</Body>
              <div className="mobile-2col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.8rem", marginTop: "1.6rem" }}>
                {STATS.map(s => (
                  <div key={s.t} className="stat-card" style={{ padding: "1rem 0.7rem", textAlign: "center" }}>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "1.5rem", color: INK, lineHeight: 1, margin: 0 }}>{s.n}</p>
                    <p style={{ fontFamily: H_FONT, fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: FAINT, marginTop: "0.45rem" }}>{s.t}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: H_FONT, fontSize: "0.78rem", letterSpacing: "0.12em", color: MUTED, marginTop: "1.4rem" }}>
                CapCut&nbsp;&nbsp;·&nbsp;&nbsp;Insta360&nbsp;&nbsp;·&nbsp;&nbsp;Epidemic Sound&nbsp;&nbsp;·&nbsp;&nbsp;Invideo&nbsp;&nbsp;·&nbsp;&nbsp;Captions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Cutting Room ── */}
      <section style={{ padding: `0 ${pad} 6rem` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="stat-card" style={{ padding: "2.2rem clamp(1.4rem, 4vw, 2.6rem)" }}>
            <H2>The Cutting Room</H2>
            <Body>
              The top tier of Editing 101 comes with our Discord community, The Cutting Room, plus one on one messaging with me. It is where students share edits, ask questions, and get feedback. There are no live calls in any tier, so everything is there for you whenever you sit down to edit.
            </Body>
          </div>
        </div>
      </section>

      {/* ── Questions ── */}
      <section style={{ padding: `0 ${pad} 6rem` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <H2>Questions</H2>
          <div style={{ marginTop: "1.6rem", display: "flex", flexDirection: "column" }}>
            {QUESTIONS.map((item, i) => (
              <div key={item.q} style={{ padding: "1.2rem 0", borderBottom: i < QUESTIONS.length - 1 ? "1px solid rgba(22,22,22,0.12)" : "none" }}>
                <p style={{ fontFamily: H_FONT, fontSize: "0.98rem", fontWeight: 600, color: INK, margin: 0 }}>{item.q}</p>
                <p style={{ fontFamily: H_FONT, fontWeight: 300, fontSize: "0.9rem", color: MUTED, lineHeight: 1.8, marginTop: "0.4rem", maxWidth: "36rem" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider: her red artwork as one clean moment with no words on it ── */}
      <div aria-hidden="true" style={{ height: "clamp(200px, 34vh, 340px)", backgroundImage: "url('/background/record-store.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />

      {/* ── Music, gathered into its own section below the course content ── */}
      <section style={{ padding: `6rem ${pad}` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <H2>While you wait</H2>
          <div style={{ display: "flex", justifyContent: "center" }}><Body max="30rem">Her favorite songs, on the record. Hover or tap the record to pick one.</Body></div>
          <div style={{ maxWidth: "min(420px, 78vw)", margin: "2.5rem auto 0" }}>
            <SongVinyl />
          </div>
        </div>
      </section>

      {/* ── The form again, for anyone who read to the end ── */}
      <section style={{ padding: `0 ${pad} 6.5rem` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <H2>Save your spot</H2>
          <div style={{ display: "flex", justifyContent: "center" }}><Body max="30rem">Join the waitlist and the early bird offer lands in your inbox first, before Editing 101 opens to everyone.</Body></div>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <WaitlistForm center tone="light" />
          </div>
          <p style={{ fontFamily: H_FONT, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: FAINT, marginTop: "1.4rem" }}>
            Launching early January 2027
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="section-content relative py-8 text-center"
        style={{ borderTop: "1px solid rgba(22,22,22,0.14)" }}
      >
        <p className="font-inter" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: FAINT, margin: 0 }}>
          @2026 CAL1STAR EDITING.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

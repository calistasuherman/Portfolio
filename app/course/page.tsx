"use client";
import { useState } from "react";
import { Reveal } from "../components/Reveal";

// Kit (ConvertKit) form ID — replace with your own from Kit → Grow → Landing Pages & Forms
const KIT_FORM_ID = "9993946";

const MODULES: [string, string, string][] = [
  ["00", "Setup without the overwhelm", "Install the free version, tour the pages, and set up a vertical project for Reels."],
  ["01", "Editing basics", "Cutting, trimming, and the shortcuts that save you hours."],
  ["02", "Cutting to music", "Beat markers, pacing, and smooth speed ramps."],
  ["03", "Transitions & motion", "Keyframes, smooth zooms, whip pans and match cuts."],
  ["04", "Color grading basics", "Nodes, exposure, white balance, LUTs and natural skin tones."],
  ["05", "Signature effects", "My glow, halation and film grain effects, and building presets you can reuse."],
  ["06", "Audio, text & captions", "Clean sound, simple sound design, and titles that pop."],
  ["07", "Export for Instagram", "The settings that keep your Reel sharp after upload."],
];

const EXTRAS = [
  "A final project: edit a travel Reel with real footage I provide",
  "My project files and a starter LUT pack",
  "A one-page DaVinci shortcut cheat sheet",
  "Short 5–10 minute lessons you can watch at your own pace",
];

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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = new FormData();
    body.append("email_address", email);
    await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
      method: "POST",
      body,
      mode: "no-cors",
    }).catch(() => {});
    setSent(true);
  }

  if (sent) {
    return (
      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "#f5f0f0", letterSpacing: "0.04em", textAlign: center ? "center" : "left" }}>
        You&apos;re on the list. Check your inbox to confirm.
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
        maxWidth: "30rem",
        margin: center ? "0 auto" : undefined,
        justifyContent: center ? "center" : undefined,
      }}
    >
      <input
        type="email"
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
        Join the waitlist →
      </button>
    </form>
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

      {/* Hero */}
      <section
        className="section-content"
        style={{
          position: "relative", zIndex: 2,
          minHeight: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: `calc(80px + 3rem) ${pad} 5rem`,
        }}
      >
        <p style={{ ...label, marginBottom: "3rem" }}>A beginner course by @cal1star</p>
        <h1 style={{ fontWeight: "normal", color: "#f5f0f0", margin: 0 }}>
          <span style={{
            display: "block",
            fontFamily: "BillaMount, cursive",
            fontSize: "clamp(4rem, 11vw, 9.5rem)",
            lineHeight: 1.1,
          }}>
            Editing
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-melodrama)",
            fontSize: "clamp(2.2rem, 5.5vw, 4.6rem)",
            lineHeight: 1.05,
            marginTop: "0.5rem",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}>
            effects & transitions in DaVinci Resolve
          </span>
        </h1>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 300,
          fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
          color: "rgba(245,240,240,0.75)",
          maxWidth: "34rem",
          margin: "2rem 0 2.5rem",
          lineHeight: 1.7,
        }}>
          Learn the advanced effects and transitions behind my videos, step by step in DaVinci Resolve&apos;s free version, even if you&apos;re just starting out.
        </p>
        <WaitlistForm />
        <p style={{ ...label, marginTop: "1rem", letterSpacing: "0.12em" }}>
          Waitlist gets the lowest price it will ever be
        </p>
      </section>

      {/* Stats */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `3rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))", gap: "2rem" }}>
          {[["4.5M", "Reel views in the last 30 days"], ["23.7K", "creators following @cal1star"], ["Free", "Works with DaVinci Resolve's free version"]].map(([n, t], i) => (
            <Reveal key={n} delay={i * 120}>
              <p style={{ fontFamily: "var(--font-melodrama)", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", color: "#f5f0f0", lineHeight: 1 }}>{n}</p>
              <p style={{ ...label, marginTop: "0.75rem" }}>{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `5rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-melodrama)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, color: "#f5f0f0", marginBottom: "3rem" }}>
            What you&apos;ll learn
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", borderTop: "1px solid rgba(245,240,240,0.1)" }}>
          {MODULES.map(([num, title, desc], i) => (
            <Reveal key={num} delay={(i % 2) * 100}>
              <div style={{ display: "flex", gap: "1.5rem", padding: "1.6rem 0", borderBottom: "1px solid rgba(245,240,240,0.1)", paddingRight: "2rem" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.18em", color: num === "05" ? "#c4002a" : "rgba(245,240,240,0.35)", paddingTop: "0.35rem" }}>{num}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "#f5f0f0", marginBottom: "0.35rem" }}>
                    {title}{num === "05" && <span style={{ ...label, color: "#c4002a", marginLeft: "0.6rem" }}>Signature</span>}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: "0.88rem", color: "rgba(245,240,240,0.5)", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `5rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-melodrama)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, color: "#f5f0f0", marginBottom: "2.5rem" }}>
            Also included
          </h2>
        </Reveal>
        <ul style={{ listStyle: "none", display: "grid", gap: "1rem", maxWidth: "40rem" }}>
          {EXTRAS.map((x, i) => (
            <Reveal key={x} delay={i * 80}>
              <li style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "rgba(245,240,240,0.75)", display: "flex", gap: "0.9rem" }}>
                <span style={{ color: "#c4002a" }}>→</span>{x}
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* About */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `5rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "center" }}>
          <Reveal direction="left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-photo1.png" alt="Calista Suherman" style={{ width: "100%", maxWidth: "26rem", aspectRatio: "4 / 5", objectFit: "cover" }} />
          </Reveal>
          <Reveal direction="right">
            <p style={{ ...label, marginBottom: "1rem" }}>Your teacher</p>
            <h2 style={{ fontFamily: "var(--font-melodrama)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, color: "#f5f0f0", marginBottom: "1.5rem" }}>
              Hi, I&apos;m Calista
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "rgba(245,240,240,0.7)", lineHeight: 1.8, maxWidth: "32rem" }}>
              I&apos;m the video editor behind @cal1star, where I break down the effects and transitions behind my edits. This course is everything I wish I had when I started, in the order that actually makes sense.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `6rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: "normal", color: "#f5f0f0", lineHeight: 1.2, marginBottom: "2.5rem" }}>
            Be first in line
          </h2>
          <WaitlistForm center />
        </Reveal>
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

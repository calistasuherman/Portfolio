"use client";
import { useState } from "react";
import { Reveal } from "../components/Reveal";

// Kit (ConvertKit) form ID — replace with your own from Kit → Grow → Landing Pages & Forms
const KIT_FORM_ID = "9993946";

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
        <p style={{ ...label, marginBottom: "1rem" }}>A beginner course by @cal1star</p>
        <h1 style={{ fontWeight: "normal", color: "#f5f0f0", margin: 0 }}>
          <span style={{
            display: "block",
            fontFamily: "BillaMount, cursive",
            fontSize: "clamp(3.6rem, 9vw, 8rem)",
            lineHeight: 1.1,
            padding: "0.95em 0 0.55em",
          }}>
            Editing
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-melodrama)",
            fontSize: "clamp(2.2rem, 5.5vw, 4.6rem)",
            lineHeight: 1.05,
            marginTop: "clamp(0.5rem, 2vw, 1.5rem)",
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

      {/* Final CTA */}
      <section className="section-content" style={{ position: "relative", zIndex: 2, padding: `6rem ${pad}`, borderTop: "1px solid rgba(139,0,0,0.2)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: "normal", color: "#f5f0f0", lineHeight: 1.2, padding: "0.9em 0 0.6em", marginBottom: "1.5rem" }}>
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

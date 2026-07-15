"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [stamped, setStamped] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStamped(true), 600); return () => clearTimeout(t); }, []);

  return (
    <>
      <main className="relative min-h-screen overflow-x-clip">
        {/* Background image */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0,
          backgroundImage: "url('/contact.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "fixed", inset: 0, zIndex: 1, background: "rgba(10,0,0,0.42)" }} />

        <section
          className="section-content relative"
          style={{
            zIndex: 2,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            padding: "5rem clamp(1rem, 4vw, 4rem)",
            paddingTop: "calc(80px + 1rem)",
          }}
        >
          {/* Left — note image */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", marginLeft: "-4rem" }}>
            <div style={{ transformOrigin: "top center", animation: "noteSwing 4s ease-in-out infinite", display: "inline-block", position: "relative" }}>
              <div style={{ position: "relative", width: "clamp(500px, 54vw, 760px)" }}>
                <img src="/note.png" alt="" style={{ width: "100%", display: "block" }} />
                {/* Wax seal stamp */}
                {stamped && (
                  <div className="stamp-seal" style={{
                    position: "absolute", top: "6%", right: "8%",
                    width: "clamp(60px, 7vw, 100px)", height: "clamp(60px, 7vw, 100px)",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 35%, #c0001a, #7a0000)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.45), inset 0 1px 3px rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 5,
                  }}>
                    <span style={{ color: "rgba(245,240,240,0.9)", fontSize: "clamp(1.4rem, 2vw, 2.2rem)", lineHeight: 1 }}>✦</span>
                  </div>
                )}
                {/* Text overlaid on note */}
                <div style={{
                  position: "absolute",
                  top: "42%", left: "47%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.6rem, 4vw, 4.5rem)", color: "#960018", lineHeight: 1, marginBottom: "3rem" }}>
                    Contact me
                  </p>
                  <a
                    href="mailto:cal1starcollab@gmail.com"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.8rem, 1.2vw, 1.1rem)", letterSpacing: "0.03em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "0.5rem" }}
                  >
                    cal1starcollab@gmail.com
                  </a>
                  <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem" }}>
                    {[
                      ["Instagram", "https://instagram.com/cal1star"],
                      ["Youtube",   "https://www.youtube.com/@cal1stvr"],
                      ["Tiktok",    "https://www.tiktok.com/@cal1star"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.65rem, 1vw, 0.9rem)", letterSpacing: "0.08em", color: "#1a1a1a", textDecoration: "none" }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <footer className="section-content relative py-8 text-center" style={{ zIndex: 2, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
          <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
            MADE WITH LOVE - @CAL1STAR 2026
          </p>
        </footer>
      </main>
    </>
  );
}

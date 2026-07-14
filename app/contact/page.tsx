"use client";

export default function ContactPage() {
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "2rem",
            padding: "5rem clamp(2rem, 8vw, 8rem)",
            paddingTop: "calc(80px + 3rem)",
          }}
        >
          {/* Left / center — note image */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ transformOrigin: "top center", animation: "noteSwing 4s ease-in-out infinite", display: "inline-block", position: "relative" }}>
              {/* note.png as background card */}
              <div style={{ position: "relative", width: "clamp(360px, 38vw, 540px)" }}>
                <img src="/note.png" alt="" style={{ width: "100%", display: "block" }} />
                {/* Text overlaid on note */}
                <div style={{
                  position: "absolute",
                  top: "28%", left: "50%",
                  transform: "translateX(-50%)",
                  width: "75%",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", color: "#960018", lineHeight: 1, marginBottom: "1.4rem" }}>
                    Contact me
                  </p>
                  <a
                    href="mailto:cal1starcollab@gmail.com"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.6rem, 0.95vw, 0.82rem)", letterSpacing: "0.03em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "1.1rem" }}
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
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.5rem, 0.75vw, 0.65rem)", letterSpacing: "0.08em", color: "#1a1a1a", textDecoration: "none" }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — "and that's a Wrap" */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "2rem" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "0.4rem" }}>
                and that&apos;s a
              </div>
              <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(6rem, 13vw, 13rem)", color: "#f5f0f0", lineHeight: 1 }}>
                Wrap
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

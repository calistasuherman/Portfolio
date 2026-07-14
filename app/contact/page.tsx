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
            alignItems: "center",
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
              <div style={{ position: "relative", width: "clamp(280px, 28vw, 400px)" }}>
                <img src="/note.png" alt="" style={{ width: "100%", display: "block" }} />
                {/* Text overlaid on note */}
                <div style={{
                  position: "absolute",
                  top: "30%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "70%",
                  textAlign: "left",
                }}>
                  <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: "#1a1a1a", lineHeight: 1, marginBottom: "1.2rem" }}>
                    Contact me
                  </p>
                  <a
                    href="mailto:cal1starcollab@gmail.com"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.55rem, 0.85vw, 0.75rem)", letterSpacing: "0.04em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "1rem" }}
                  >
                    cal1starcollab@gmail.com
                  </a>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {[
                      ["Instagram", "https://instagram.com/cal1star"],
                      ["YouTube",   "https://www.youtube.com/@cal1stvr"],
                      ["TikTok",    "https://www.tiktok.com/@cal1star"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.48rem, 0.72vw, 0.62rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none" }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — "and that's a Wrap." */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "-0.05em" }}>
                and that&apos;s a
              </div>
              <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(5rem, 10vw, 10rem)", color: "#f5f0f0", lineHeight: 0.88 }}>
                Wrap.
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

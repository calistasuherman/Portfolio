"use client";

export default function ContactPage() {
  return (
    <>
      <main className="relative min-h-screen overflow-x-clip">
        <section
          className="section-content relative"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem clamp(2rem, 6vw, 6rem)",
            paddingTop: "calc(80px + 3rem)",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(3rem, 8vw, 8rem)",
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
          }}>
            {/* Left — heading + swinging notepad */}
            <div style={{ flex: "0 0 auto", textAlign: "left" }}>
              {/* "and that's a Wrap." moved up */}
              <div style={{ lineHeight: 1, marginBottom: "2.2rem" }}>
                <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "-0.05em" }}>
                  and that&apos;s a
                </div>
                <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(5rem, 10vw, 10rem)", color: "#f5f0f0", lineHeight: 0.88 }}>
                  Wrap.
                </div>
              </div>

              {/* Swinging notepad with contact info */}
              <div style={{ transformOrigin: "top center", animation: "noteSwing 4s ease-in-out infinite", display: "inline-block" }}>
                {/* Tape */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "-8px", position: "relative", zIndex: 2 }}>
                  <div style={{ width: "72px", height: "26px", background: "rgba(155,150,143,0.52)", borderRadius: "2px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }} />
                </div>
                {/* Note card */}
                <div style={{ background: "#eae6de", borderRadius: "2px", padding: "1.6rem 2rem 1.8rem", width: "240px", boxShadow: "0 6px 24px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,255,255,0.2)" }}>
                  <a
                    href="mailto:cal1starcollab@gmail.com"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.06em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "1rem" }}
                  >
                    cal1starcollab@gmail.com
                  </a>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
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
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none" }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — car video */}
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <video
                src="/car.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ display: "block", height: "clamp(320px, 55vh, 580px)", width: "auto", objectFit: "contain", borderRadius: "16px" }}
              />
            </div>
          </div>
        </section>

        <footer className="section-content py-8 text-center" style={{ borderTop: "1px solid rgba(139,0,0,0.2)" }}>
          <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
            MADE WITH LOVE - @CAL1STAR 2026
          </p>
        </footer>
      </main>
    </>
  );
}

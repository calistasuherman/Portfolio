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
            paddingTop: "calc(80px + 5rem)",
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
            {/* Left — typography + contact */}
            <div style={{ flex: "0 0 auto", textAlign: "left" }}>
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "-0.05em" }}>
                  and that&apos;s a
                </div>
                <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(5rem, 10vw, 10rem)", color: "#f5f0f0", lineHeight: 0.88 }}>
                  Wrap.
                </div>
              </div>
              <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <a
                  href="mailto:cal1starcollab@gmail.com"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.72rem, 1.1vw, 0.92rem)", color: "rgba(245,240,240,0.65)", letterSpacing: "0.06em", textDecoration: "none" }}
                >
                  cal1starcollab@gmail.com
                </a>
                <div style={{ display: "flex", gap: "2rem", marginTop: "0.3rem" }}>
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
                      style={{ fontFamily: "PerandoryCondensed, sans-serif", fontSize: "clamp(0.75rem, 1.1vw, 0.95rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,240,0.45)", textDecoration: "none" }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — car photo */}
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/car.jpg"
                alt=""
                style={{ display: "block", height: "clamp(320px, 55vh, 580px)", width: "auto", objectFit: "contain", borderRadius: "2px" }}
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

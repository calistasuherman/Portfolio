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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem clamp(2rem, 8vw, 8rem)",
            paddingTop: "calc(80px + 3rem)",
          }}
        >
          {/* "and that's a Wrap." — centered */}
          <div style={{ lineHeight: 1, marginBottom: "2.8rem", textAlign: "center" }}>
            <div style={{ fontFamily: "PerandoryCondensed, sans-serif", fontWeight: "normal", fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#f5f0f0", letterSpacing: "0.02em", marginBottom: "-0.05em" }}>
              and that&apos;s a
            </div>
            <div style={{ fontFamily: "BillaMount, cursive", fontWeight: "normal", fontSize: "clamp(5rem, 10vw, 10rem)", color: "#f5f0f0", lineHeight: 0.88 }}>
              Wrap.
            </div>
          </div>

          {/* Notepad — left side, horizontally centered within left area */}
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", paddingLeft: "clamp(0rem, 6vw, 4rem)" }}>
            <div style={{ transformOrigin: "top center", animation: "noteSwing 4s ease-in-out infinite", display: "inline-block" }}>
              {/* Tape */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "-10px", position: "relative", zIndex: 2 }}>
                <div style={{ width: "90px", height: "32px", background: "rgba(155,150,143,0.52)", borderRadius: "2px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }} />
              </div>
              {/* Note card */}
              <div style={{ background: "#eae6de", borderRadius: "2px", padding: "2.4rem 2.8rem 2.6rem", width: "300px", boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.2)" }}>
                {/* Contact me heading */}
                <p style={{ fontFamily: "BillaMount, cursive", fontSize: "2rem", color: "#1a1a1a", lineHeight: 1, marginBottom: "1rem" }}>
                  Contact me
                </p>
                {/* Email */}
                <a
                  href="mailto:cal1starcollab@gmail.com"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", letterSpacing: "0.04em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "1.2rem" }}
                >
                  cal1starcollab@gmail.com
                </a>
                {/* Socials on one line */}
                <div style={{ display: "flex", gap: "1.4rem" }}>
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

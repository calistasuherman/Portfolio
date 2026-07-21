"use client";

export default function ContactPage() {
  return (
    <>
      <main className="relative min-h-screen overflow-x-clip">
        {/* Background image */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/contact.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "fixed", inset: 0, zIndex: 1, background: "rgba(10,0,0,0.48)" }} />

        <section
          className="section-content relative"
          style={{ zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "calc(80px + 2rem) clamp(1.5rem, 5vw, 4rem) 4rem" }}
        >
          <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "#f5f0f0", lineHeight: 1.0, marginBottom: "2.5rem" }}>
            Let&apos;s create<br />something really big
          </p>

          <a
            href="mailto:calistarsuherman@gmail.com"
            style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.75rem, 1.4vw, 1rem)", letterSpacing: "0.08em", color: "rgba(245,240,240,0.7)", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f5f0f0")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.7)")}
          >
            calistarsuherman@gmail.com
          </a>

          <div style={{ display: "flex", gap: "2.5rem" }}>
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
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.6rem, 1vw, 0.78rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,240,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f5f0f0")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.5)")}
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        <footer className="section-content relative py-8 text-center" style={{ zIndex: 2, borderTop: "1px solid rgba(139,0,0,0.2)" }}>
          <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
            @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
          </p>
        </footer>
      </main>
    </>
  );
}

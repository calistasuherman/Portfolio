"use client";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: "#080205" }}>

      {/* Background photo */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "url('/contact.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }} />
      {/* Gradient overlay — heavier at top/bottom, lighter at center so bg breathes */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(8,2,5,0.72) 0%, rgba(8,2,5,0.38) 40%, rgba(8,2,5,0.38) 60%, rgba(8,2,5,0.82) 100%)",
      }} />

      {/* Main content */}
      <section
        className="section-content"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "calc(80px + 3rem) clamp(1.8rem, 5vw, 5rem) 6rem",
        }}
      >
        {/* Headline */}
        <h1 style={{
          fontFamily: "BillaMount, cursive",
          fontSize: "clamp(3.8rem, 11vw, 10.5rem)",
          color: "#f5f0f0",
          lineHeight: 0.95,
          fontWeight: "normal",
          letterSpacing: "-0.01em",
          marginBottom: "clamp(3rem, 6vw, 5.5rem)",
          maxWidth: "14ch",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}>
          Let&apos;s create something!
        </h1>

        {/* Contact tray */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "2rem",
          borderTop: "1px solid rgba(245,240,240,0.12)",
          paddingTop: "1.8rem",
        }}>
          {/* Email */}
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.52rem, 0.78vw, 0.65rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.36)",
              marginBottom: "0.55rem",
            }}>
              Email
            </p>
            <a
              href="mailto:cal1starcollab@gmail.com"
              style={{
                fontFamily: "PerandoryCondensed, sans-serif",
                fontSize: "clamp(1rem, 2.2vw, 1.65rem)",
                color: "#f5f0f0",
                textDecoration: "none",
                letterSpacing: "0.02em",
                fontWeight: "normal",
                borderBottom: "1px solid rgba(245,240,240,0.28)",
                paddingBottom: "2px",
                transition: "color 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#960018";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#960018";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5f0f0";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,240,0.28)";
              }}
            >
              cal1starcollab@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.52rem, 0.78vw, 0.65rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.36)",
              marginBottom: "0.55rem",
            }}>
              Find me
            </p>
            <div style={{ display: "flex", gap: "clamp(1.2rem, 2.5vw, 2.4rem)", alignItems: "center" }}>
              {([
                ["Instagram", "https://instagram.com/cal1star"],
                ["YouTube",   "https://www.youtube.com/@cal1stvr"],
                ["TikTok",    "https://www.tiktok.com/@cal1star"],
              ] as [string, string][]).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "PerandoryCondensed, sans-serif",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.35rem)",
                    color: "rgba(245,240,240,0.55)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    fontWeight: "normal",
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f5f0f0")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.55)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        className="section-content relative py-8 text-center"
        style={{ zIndex: 2, borderTop: "1px solid rgba(139,0,0,0.15)" }}
      >
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

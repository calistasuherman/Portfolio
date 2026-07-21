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
          alignItems: "center",
          padding: "calc(80px + 3rem) clamp(1.8rem, 5vw, 5rem) 6rem",
          gap: "clamp(3rem, 8vw, 8rem)",
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
          flexShrink: 0,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}>
          Let&apos;s create<br />something!
        </h1>

        {/* Right column — contact details */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.2rem",
          borderLeft: "1px solid rgba(245,240,240,0.12)",
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          alignSelf: "center",
        }}>
          {/* Email */}
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.36)",
              marginBottom: "0.5rem",
            }}>
              Email
            </p>
            <a
              href="mailto:cal1starcollab@gmail.com"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.8rem, 1.4vw, 1.05rem)",
                color: "#f5f0f0",
                textDecoration: "none",
                letterSpacing: "0.01em",
                fontWeight: 300,
                borderBottom: "1px solid rgba(245,240,240,0.22)",
                paddingBottom: "2px",
                transition: "color 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#960018";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#960018";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5f0f0";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,240,0.22)";
              }}
            >
              cal1starcollab@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.36)",
              marginBottom: "0.5rem",
            }}>
              Find me
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
                    color: "rgba(245,240,240,0.5)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    fontWeight: 300,
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f5f0f0")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,240,0.5)")}
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

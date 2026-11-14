"use client";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: "#101010" }}>

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
        background: "linear-gradient(to bottom, rgba(12,12,12,0.72) 0%, rgba(12,12,12,0.38) 40%, rgba(12,12,12,0.38) 60%, rgba(12,12,12,0.82) 100%)",
      }} />

      {/* Main content */}
      <section
        className="section-content contact-row"
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
        <h1 className="contact-headline" style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
          color: "#f5f0f0",
          lineHeight: 0.95,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          flexShrink: 0,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}>
          Let&apos;s create<br />something!
        </h1>

        {/* Right column — contact details */}
        <div className="contact-col-right" style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          borderLeft: "1px solid rgba(245,240,240,0.12)",
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          alignSelf: "center",
        }}>
          {/* Email CTA */}
          <div>
            <p style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.35)",
              marginBottom: "0.75rem",
            }}>
              Email
            </p>
            <a
              href="mailto:cal1starpartnerships@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                color: "#f5f0f0",
                textDecoration: "none",
                letterSpacing: "0.01em",
                fontWeight: 300,
                padding: "0.65rem 1.1rem",
                border: "1px solid rgba(245,240,240,0.2)",
                borderRadius: "2px",
                transition: "background 0.25s, border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#161616";
                el.style.borderColor = "#161616";
                el.style.color = "#ffffff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(245,240,240,0.2)";
                el.style.color = "#f5f0f0";
              }}
            >
              cal1starpartnerships@gmail.com
              <span style={{ fontSize: "0.85rem" }}>→</span>
            </a>
          </div>

          {/* Socials */}
          <div>
            <p style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,240,240,0.35)",
              marginBottom: "0.75rem",
            }}>
              Find me
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
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
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
                    color: "rgba(245,240,240,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.06em",
                    fontWeight: 300,
                    transition: "color 0.2s, letter-spacing 0.2s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#f5f0f0";
                    e.currentTarget.style.letterSpacing = "0.1em";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(245,240,240,0.45)";
                    e.currentTarget.style.letterSpacing = "0.06em";
                  }}
                >
                  {label}<span style={{ fontSize: "0.85rem" }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        className="section-content relative py-8 text-center"
        style={{ zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.15)" }}
      >
        <p className="font-inter text-text-muted opacity-40" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          @2026 CAL1STAR EDITING.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>
    </main>
  );
}

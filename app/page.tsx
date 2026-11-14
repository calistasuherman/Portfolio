"use client";
import { useEffect, useRef, useState } from "react";
import { MEDIA_BASE } from "./lib/media";
import { LOGO_SRC } from "./logo-data";
import { SONGS, playSong, getAudio, currentTrack } from "./components/GlobalUI";

/* ── Re-triggering reveal (home page only) ──
   Unlike the shared Reveal component, this toggles visibility every time
   the element enters/leaves the viewport, so sections fade in scrolling
   down and fade back out scrolling away, instead of revealing once. */
function useRevealToggle(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealToggle({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const { ref, visible } = useRevealToggle();
  const translateMap = {
    up: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : translateMap[direction],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Shared bits ── */
const INK = "#161616";
const MUTED = "rgba(22,22,22,0.62)";
const FAINT = "rgba(22,22,22,0.45)";
const SMALL_LABEL: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "0.58rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: FAINT,
};

/* Section heading in the one type system: Helvetica Neue, bold, with a soft gray offset shadow */
function SectionTitle({ first, rest, size = "clamp(2.4rem, 5vw, 4.2rem)" }: { first: string; rest: string; size?: string }) {
  return (
    <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: size, color: INK, letterSpacing: "-0.01em", lineHeight: 1.05, margin: 0, textShadow: "0.045em 0.045em 0 rgba(17,17,17,0.30)" }}>
      {first}{rest}
    </h2>
  );
}

/* ── Data ── */
const LABELS = ["Content Creator", "World Traveler", "Woman of God", "Coffee Connoisseur", "Gen Z (21 Y/O)", "Fashion Lover"];

const FEATURED = [
  { src: `${MEDIA_BASE}/ve/ve1.mp4`,         tag: "Video Editing" },
  { src: `${MEDIA_BASE}/cinema/cinema3.mp4`, tag: "Videography" },
  { src: `${MEDIA_BASE}/yt/invideocollab.mp4`, tag: "Partnerships" },
];

const STATS = [
  { n: "60K+",  t: "Instagram followers" },
  { n: "5.1M",  t: "Reel views" },
  { n: "400K",  t: "Interactions" },
  { n: "62K",   t: "Profile visits" },
];

const BRAND_NAMES = ["CapCut", "Insta360", "Epidemic Sound", "Invideo", "Captions"];

const LOGO_SCALE: Record<number, number> = { 15: 0.6, 17: 2, 18: 0.45 };
const LOGO_IDS = [15, 16, 17, 18];
const LOGOS = LOGO_IDS.map(id => ({
  src: `/logos/portfolio${id}.png`,
  scale: LOGO_SCALE[id] ?? 1,
}));

const EDIT_TOOLS = [
  { src: "/apps/cc.png",     label: "CapCut"          },
  { src: "/apps/dr.png",     label: "DaVinci Resolve" },
  { src: "/apps/fcp.png",    label: "Final Cut Pro"   },
  { src: "/apps/vs.png",     label: "Video Star"      },
  { src: "/apps/c.png",      label: "Canva"           },
];
const WORKFLOW_TOOLS = [
  { src: "/apps/claude.png", label: "Claude" },
];

const STACK_PHOTOS = ["/c1.jpg","/c2.jpg","/c3.jpg","/c4.jpg","/c5.jpg","/c6.jpg","/c7.jpg"];

/* ── Components ── */

function FeaturedCard({ src, tag }: { src: string; tag: string }) {
  const [hovered, setHovered] = useState(false);
  /* only start downloading the video once the card is near the screen */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); obs.disconnect(); } }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href="/work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden", borderRadius: "10px", textDecoration: "none" }}
    >
      <video
        ref={videoRef}
        src={near ? src : undefined} autoPlay muted loop playsInline preload={near ? "auto" : "none"}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(5,0,0,0.15)" : "rgba(5,0,0,0.42)",
        transition: "background 0.5s ease",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1rem" }}>
        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,240,0.7)", margin: 0 }}>{tag}</p>
      </div>
    </a>
  );
}


function ToolGroup({ title, tools, small = false }: { title: string; tools: typeof EDIT_TOOLS; small?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ ...SMALL_LABEL, marginBottom: "1.6rem" }}>{title}</p>
      <div className="toolkit-row" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(1.2rem, 4vw, 3.5rem)" }}>
        {tools.map(({ src, label }, i) => (
          <RevealToggle key={label} direction="left" delay={i * 90}>
            <div style={{ textAlign: "center", width: small ? "clamp(52px, 7vw, 76px)" : "clamp(64px, 9vw, 100px)" }}>
              <img src={src} alt={label} style={{ width: "100%", display: "block", borderRadius: "22%" }} />
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(0.52rem, 0.75vw, 0.68rem)", color: MUTED, letterSpacing: "0.05em", marginTop: "0.4rem" }}>{label}</p>
            </div>
          </RevealToggle>
        ))}
      </div>
    </div>
  );
}

/* The music section: her six songs in one tidy home, played by the same player as the rest of the site */
function MusicSection() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    const sync = () => { setPlaying(!audio.paused); setTrack(currentTrack()); };
    sync();
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    window.addEventListener("cal1star:track", sync);
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      window.removeEventListener("cal1star:track", sync);
    };
  }, []);

  function pick(i: number) {
    const audio = getAudio();
    if (!audio) return;
    if (i === track) {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    } else {
      playSong(i);
    }
  }

  return (
    <section style={{ padding: "6rem clamp(1.5rem, 6vw, 5rem)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <RevealToggle>
          <div style={{ display: "flex", alignItems: "center", gap: "1.6rem", marginBottom: "2.2rem" }}>
            <img src="/vinyl.png" alt="" style={{ width: "84px", height: "84px", objectFit: "contain", animation: "vinylSpin 9s linear infinite", flexShrink: 0 }} />
            <div>
              <SectionTitle first="M" rest="usic" size="clamp(2rem, 4vw, 3.2rem)" />
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, marginTop: "0.6rem" }}>
                Six songs I love. Press play and the little player in the corner travels with you.
              </p>
            </div>
          </div>
        </RevealToggle>
        <RevealToggle>
          <div className="stat-card" style={{ padding: "0.6rem" }}>
            {SONGS.map((s, i) => {
              const active = i === track && playing;
              return (
                <button
                  key={s.title}
                  onClick={() => pick(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.8rem",
                    width: "100%", textAlign: "left",
                    padding: "0.7rem 0.9rem",
                    background: active ? "rgba(17,17,17,0.08)" : "transparent",
                    border: "none", borderRadius: "8px",
                    color: INK, cursor: "pointer",
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.85rem", letterSpacing: "0.03em",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(22,22,22,0.05)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ width: "0.8rem", fontSize: "0.6rem", color: "#161616" }}>{active ? "❚❚" : "▶"}</span>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: FAINT, whiteSpace: "nowrap" }}>{s.artist}</span>
                </button>
              );
            })}
          </div>
        </RevealToggle>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const pad = "clamp(1.5rem, 6vw, 5rem)";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: "transparent" }}>

      {/* ── Hero ── */}
      <section className="relative flex items-center px-6 pt-32 pb-20 overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Her edits montage playing in the background, as on her live site */}
        <video autoPlay muted loop playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src={`${MEDIA_BASE}/background/pg1.mp4`} type="video/mp4" />
        </video>
        {/* Soft white ombre over the video, so the black logo and text stay easy to read */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.66) 46%, rgba(255,255,255,0.30) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

          <div>
            <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.2s", position: "relative" }}>
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(0.55rem, 1vw, 0.75rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: FAINT, marginBottom: "1rem" }}>est. 2026</p>
              <h1 style={{ margin: 0 }}>
                <img src={LOGO_SRC} alt="cal1star editing" style={{ width: "min(540px, 84vw)", height: "auto", display: "block" }} />
              </h1>
            </div>

            <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.55s", marginTop: "1.5rem" }}>
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontStyle: "italic", color: INK, fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)", lineHeight: 1.3 }}>Video editing at its finest.</p>
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, color: MUTED, fontSize: "clamp(0.9rem, 1.15vw, 1rem)", lineHeight: 1.8, marginTop: "0.9rem", maxWidth: "30rem" }}>
                I edit short form videos for brands, and I teach beginners how to edit in CapCut and DaVinci Resolve.
              </p>
            </div>

            <div className={`hero-item${heroVisible ? " hero-visible" : ""}`} style={{ transitionDelay: "0.8s", marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="/work" className="inline-block px-8 py-3 uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "#161616", color: "#ffffff", borderRadius: "2px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Watch my work
              </a>
              <a href="/course" className="inline-block px-8 py-3 uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95" style={{ border: `1px solid rgba(22,22,22,0.35)`, color: INK, borderRadius: "2px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Join Editing 101
              </a>
            </div>
          </div>

        </div>

        {/* Her vinyl, tucked away as one small quiet detail in the corner of the cover */}
        <img src="/vinyl.png" alt="" style={{ position: "absolute", right: "1.4rem", bottom: "1.4rem", width: "54px", height: "54px", objectFit: "contain", opacity: 0.85, animation: "vinylSpin 14s linear infinite", filter: "drop-shadow(0 6px 14px rgba(22,22,22,0.25))", zIndex: 1 }} />
      </section>

      {/* ── Proof strip ── */}
      <section style={{ padding: `0 ${pad} 5.5rem` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="mobile-2col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {STATS.map((s, i) => (
              <RevealToggle key={s.t} delay={i * 90}>
                <div className="stat-card" style={{ padding: "1.4rem 1.2rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", color: INK, lineHeight: 1, margin: 0 }}>{s.n}</p>
                  <p style={{ ...SMALL_LABEL, marginTop: "0.55rem" }}>{s.t}</p>
                </div>
              </RevealToggle>
            ))}
          </div>
          <RevealToggle>
            <p style={{ textAlign: "center", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.8rem", letterSpacing: "0.14em", color: MUTED, marginTop: "1.6rem" }}>
              {BRAND_NAMES.join("  ·  ")}
            </p>
          </RevealToggle>
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ padding: `1rem ${pad} 6rem` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <RevealToggle>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid rgba(22,22,22,0.14)", paddingBottom: "1.2rem", marginBottom: "2.5rem" }}>
              <SectionTitle first="S" rest="elected Work" />
              <a href="/work" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: FAINT, textDecoration: "none", transition: "color 0.3s ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = INK)}
                onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
              >View all →</a>
            </div>
          </RevealToggle>
          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: "1rem", textAlign: "center" }}>
            hover a frame to preview · click to watch
          </p>
          <div className="mobile-1col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {FEATURED.map((item, i) => (
              <RevealToggle key={item.src} delay={i * 110}>
                <FeaturedCard {...item} />
              </RevealToggle>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider: the record store photo, one clean moment with no words on it ── */}
      <div aria-hidden="true" style={{ height: "clamp(220px, 38vh, 380px)", backgroundImage: "url('/background/record-store.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />

      {/* ── For brands ── */}
      <section style={{ padding: `6rem ${pad}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <RevealToggle>
            <SectionTitle first="F" rest="or brands" />
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.95rem", color: MUTED, lineHeight: 1.8, marginTop: "1rem", maxWidth: "34rem" }}>
              Three ways to work with me, all made the same way I make my own videos.
            </p>
          </RevealToggle>
          <div className="mobile-1col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "2.5rem" }}>
            {[
              { h: "Sponsored Reels", p: "A dedicated Reel planned with you from the first idea to the final cut, made to feel at home on my page." },
              { h: "Tutorials and templates", p: "Step by step tutorials and ready to use templates from my own edits, sold in my Gumroad store." },
              { h: "Working together", p: "Script approval before I film, two rounds of changes, and an ad code for your campaign. Reels start at 1,000 dollars." },
            ].map((c, i) => (
              <RevealToggle key={c.h} delay={i * 110}>
                <div className="service-card" style={{ padding: "1.8rem 1.6rem", height: "100%", boxSizing: "border-box" }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "1.35rem", color: INK, letterSpacing: "0.03em", margin: 0 }}>{c.h}</p>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.88rem", color: MUTED, lineHeight: 1.8, marginTop: "0.8rem" }}>{c.p}</p>
                </div>
              </RevealToggle>
            ))}
          </div>
          <RevealToggle>
            <div style={{ marginTop: "2.2rem" }}>
              <a href="/contact" className="inline-block px-8 py-3 uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "#161616", color: "#ffffff", borderRadius: "2px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Work with me
              </a>
            </div>
          </RevealToggle>
        </div>
      </section>

      {/* ── Course teaser ── */}
      <section style={{ padding: `5.5rem ${pad}`, textAlign: "center", borderTop: "1px solid rgba(22,22,22,0.1)" }}>
        <RevealToggle>
          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: FAINT, marginBottom: "1.75rem" }}>New · A beginner course by me</p>
          <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, color: INK, fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.015em", padding: "0.15em 0 0.1em", whiteSpace: "nowrap", margin: 0 }}>
            Editing 101
          </h2>
          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: MUTED, maxWidth: "34rem", margin: "0 auto 2.25rem", lineHeight: 1.75 }}>
            Never edited before? I&apos;ll take you from CapCut to DaVinci Resolve to the effects and transitions you see in my videos.
          </p>
          <a href="/course" className="inline-block uppercase transition-all duration-300 hover:scale-105 active:scale-95" style={{ background: "#161616", color: "#ffffff", borderRadius: "2px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", padding: "0.95rem 2.2rem" }}>
            Join the waitlist →
          </a>
          <div style={{ marginTop: "1.5rem" }}>
            <a href="https://cal1starediting.gumroad.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textDecoration: "none", borderBottom: "1px solid rgba(22,22,22,0.25)", paddingBottom: "0.2rem", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = INK)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              Or browse my Gumroad store →
            </a>
          </div>
        </RevealToggle>
      </section>

      {/* ── About ── */}
      <section id="about" className="section-content relative px-6 md:px-16 lg:px-32" style={{ paddingTop: "5.5rem", paddingBottom: "5.5rem", borderTop: "1px solid rgba(22,22,22,0.1)" }}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealToggle direction="left">
            <SectionTitle first="A" rest="bout me" size="clamp(2.8rem, 6.5vw, 6rem)" />
            <p className="font-inter" style={{ fontSize: "clamp(0.6rem, 0.95vw, 0.78rem)", marginTop: "1.2rem", color: FAINT, letterSpacing: "0.05em" }}>
              @cal1star &nbsp;|&nbsp; 60K+ Instagram, 4K+ YouTube &nbsp;|&nbsp; San Francisco, CA
            </p>
            <p className="font-inter" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)", marginTop: "1.2rem", lineHeight: 1.85, color: MUTED, fontWeight: 300, maxWidth: "36rem" }}>
              Hi! I&apos;m Calista, your friendly neighborhood video editor/videographer, and I&apos;m thrilled you&apos;ve found your way to my corner of the internet.
            </p>
          </RevealToggle>

          {/* All six labels, gathered into one tidy group */}
          <RevealToggle>
            <div className="stat-card" style={{ marginTop: "2.5rem", padding: "1.4rem 1.6rem" }}>
              <p style={{ ...SMALL_LABEL, marginBottom: "0.9rem" }}>A few things about me</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem 2.2rem" }}>
                {LABELS.map(label => (
                  <p key={label} className="font-inter" style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, margin: 0, whiteSpace: "nowrap" }}>{label}</p>
                ))}
              </div>
            </div>
          </RevealToggle>

          {/* All seven photos in one even grid */}
          <RevealToggle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem", marginTop: "2.5rem" }}>
              {STACK_PHOTOS.map(src => (
                <div key={src} style={{ borderRadius: "10px", overflow: "hidden", aspectRatio: "3/4" }}>
                  <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", userSelect: "none" }} />
                </div>
              ))}
            </div>
          </RevealToggle>
        </div>
      </section>

      {/* ── Divider: the second background photo, one clean moment with no words on it ── */}
      <div aria-hidden="true" style={{ height: "clamp(220px, 38vh, 380px)", backgroundImage: "url('/background/pg2.jpg')", backgroundSize: "cover", backgroundPosition: "center 15%" }} />

      {/* ── Toolkit, sorted into two labeled groups ── */}
      <section className="relative" style={{ paddingTop: "6rem", paddingBottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: "900px", width: "100%", padding: "0 2rem", textAlign: "center" }}>
          <RevealToggle>
            <div style={{ marginBottom: "3.5rem", display: "flex", justifyContent: "center" }}>
              <SectionTitle first="M" rest="y Toolkit" size="clamp(2rem, 3.8vw, 3.4rem)" />
            </div>
          </RevealToggle>
          <ToolGroup title="Editing tools" tools={EDIT_TOOLS} />
          <div style={{ marginTop: "3.5rem" }}>
            <ToolGroup title="Workflow helpers" tools={WORKFLOW_TOOLS} small />
          </div>
        </div>
      </section>

      {/* ── Music, in one home of its own ── */}
      <MusicSection />

      {/* ── Trusted by, in its one spot above the footer ── */}
      <section className="section-content relative py-6 overflow-hidden">
        <p className="text-center font-inter uppercase tracking-[0.25em]" style={{ fontSize: "13px", color: FAINT, marginTop: "0.5rem" }}>Trusted by</p>
      </section>
      <section className="section-content relative py-1 overflow-hidden">
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div style={{ display: "flex", animation: "marquee 36s linear infinite", whiteSpace: "nowrap", width: "max-content", alignItems: "center" }}>
            {Array.from({ length: 12 }, () => LOGOS).flat().map(({ src, scale }, i) => (
              <img key={i} src={src} alt="" style={{ height: `${36 * scale}px`, width: "auto", borderRadius: "4px", objectFit: "cover", opacity: 0.75, transition: "opacity 0.3s", display: "block", userSelect: "none", marginRight: "4rem" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="section-content py-10 text-center" style={{ borderTop: "1px solid rgba(22,22,22,0.14)", marginTop: "3rem" }}>
        <img src={LOGO_SRC} alt="cal1star editing" style={{ height: "34px", width: "auto", display: "block", margin: "0 auto 1.3rem" }} />
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem 2.4rem", marginBottom: "1.4rem" }}>
          <a href="mailto:cal1starpartnerships@gmail.com" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: MUTED, textDecoration: "none" }}>cal1starpartnerships@gmail.com</a>
          {([
            ["Instagram", "https://instagram.com/cal1star"],
            ["YouTube", "https://www.youtube.com/@cal1stvr"],
            ["TikTok", "https://www.tiktok.com/@cal1star"],
          ] as [string, string][]).map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: MUTED, textDecoration: "none" }}>{label}</a>
          ))}
        </div>
        <p className="font-inter" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: FAINT, margin: 0 }}>
          @2026 CAL1STAR EDITING.&nbsp;&nbsp;PSALM 46:5
        </p>
      </footer>

    </main>
  );
}

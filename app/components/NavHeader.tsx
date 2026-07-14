"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button");
    const on = () => setCursorHover(true);
    const off = () => setCursorHover(false);
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  }, []);

  const navLinks = [
    { label: "About",    href: isHome ? "#about"   : "/#about",   anchor: isHome },
    { label: "Services", href: isHome ? "#trusted"  : "/#trusted", anchor: isHome, sectionId: "#trusted" },
    { label: "My Work",  href: "/work",    anchor: false },
    { label: "Contact",  href: "/contact", anchor: false },
  ];

  return (
    <>
      {/* Custom cursor */}
      <div
        className="cursor-dot"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${cursorHover ? 2.8 : 1})`,
        }}
      />

      {/* Fixed header */}
      <header className="section-content fixed top-0 left-0 right-0 z-50 py-5 px-6">
        <img
          src="/cs-monogram.png"
          alt="CS"
          style={{ position: "absolute", top: "0.5rem", left: "-1rem", width: "clamp(58px, 7vw, 90px)", opacity: 0.9 }}
        />
        <nav className="flex justify-end gap-8 md:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:tracking-[0.28em] transition-all duration-300"
              style={{ textDecoration: "none" }}
              onClick={link.anchor ? (e) => {
                e.preventDefault();
                const id = link.sectionId ?? link.href;
                const el = document.querySelector(id);
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: id === "#trusted" ? top : top - 80, behavior: "smooth" });
                }
              } : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Spotify widget */}
      <div style={{ position: "fixed", bottom: "1.5rem", left: "1.5rem", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.6rem" }}>
        <div style={{
          overflow: "hidden", borderRadius: "12px",
          maxHeight: spotifyOpen ? "80px" : "0",
          opacity: spotifyOpen ? 1 : 0,
          transform: spotifyOpen ? "translateY(0)" : "translateY(10px)",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, transform 0.35s ease",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
        }}>
          <iframe
            src="https://open.spotify.com/embed/playlist/7b3CSVIpNdUd1aJAjesxai?utm_source=generator&theme=0"
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block", borderRadius: "12px" }}
          />
        </div>
        <button
          onClick={() => setSpotifyOpen(o => !o)}
          aria-label="Toggle Spotify player"
          style={{
            width: "42px", height: "42px", borderRadius: "50%",
            border: "1.5px solid rgba(29,185,84,0.55)",
            background: spotifyOpen ? "rgba(29,185,84,0.15)" : "rgba(15,15,15,0.82)",
            backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "none",
            padding: 0,
            transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
            boxShadow: spotifyOpen ? "0 0 18px rgba(29,185,84,0.3)" : "0 4px 14px rgba(0,0,0,0.45)",
            transform: spotifyOpen ? "scale(1.07)" : "scale(1)",
          }}
        >
          <img
            src="/vinyl.png"
            alt="Vinyl"
            style={{
              width: "30px", height: "30px", borderRadius: "50%",
              animation: spotifyOpen ? "vinylSpin 2s linear infinite" : "none",
            }}
          />
        </button>
      </div>
    </>
  );
}

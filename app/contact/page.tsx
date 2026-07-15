"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Splat = { id: number; x: number; y: number; r: number; rotate: number };

export default function ContactPage() {
  /* ── ink splatter ── */
  const [splats, setSplats] = useState<Splat[]>([]);
  const splatId = useRef(0);

  const addSplat = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("[data-note]")) return;
    const id = ++splatId.current;
    setSplats(prev => [...prev, {
      id, x: e.clientX, y: e.clientY,
      r: 40 + Math.random() * 60,
      rotate: Math.random() * 360,
    }]);
    setTimeout(() => setSplats(prev => prev.filter(s => s.id !== id)), 900);
  }, []);

  /* ── draggable note ── */
  const noteRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [notePos, setNotePos] = useState<{ x: number; y: number } | null>(null);
  const [swinging, setSwinging] = useState(true);

  const onNoteMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    e.preventDefault();
    dragging.current = true;
    setSwinging(false);
    const rect = noteRef.current!.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setNotePos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const noteStyle: React.CSSProperties = notePos
    ? { position: "fixed", left: notePos.x, top: notePos.y, zIndex: 20, cursor: "grab" }
    : { position: "relative", cursor: "grab" };

  return (
    <>
      <main
        className="relative min-h-screen overflow-x-clip"
        onClick={addSplat}
      >
        {/* Background image */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0,
          backgroundImage: "url('/contact.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "fixed", inset: 0, zIndex: 1, background: "rgba(10,0,0,0.42)" }} />

        {/* Ink splats */}
        {splats.map(s => (
          <div key={s.id} style={{
            position: "fixed", left: s.x, top: s.y, zIndex: 15,
            transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
            pointerEvents: "none",
            animation: "splatFade 0.9s ease forwards",
          }}>
            <svg width={s.r * 2} height={s.r * 2} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="28" ry="22" fill="#8b0000" opacity="0.85"/>
              <ellipse cx="72" cy="38" rx="10" ry="7" fill="#8b0000" opacity="0.7" transform="rotate(-30 72 38)"/>
              <ellipse cx="28" cy="62" rx="9" ry="6" fill="#8b0000" opacity="0.7" transform="rotate(20 28 62)"/>
              <ellipse cx="65" cy="68" rx="7" ry="5" fill="#8b0000" opacity="0.65" transform="rotate(-15 65 68)"/>
              <ellipse cx="35" cy="30" rx="6" ry="4" fill="#8b0000" opacity="0.6" transform="rotate(40 35 30)"/>
              <circle cx="80" cy="55" r="4" fill="#8b0000" opacity="0.55"/>
              <circle cx="22" cy="42" r="3" fill="#8b0000" opacity="0.5"/>
              <circle cx="58" cy="80" r="3.5" fill="#8b0000" opacity="0.5"/>
            </svg>
          </div>
        ))}

        <section
          className="section-content relative"
          style={{
            zIndex: 2,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            padding: "5rem clamp(1rem, 4vw, 4rem)",
            paddingTop: "calc(80px + 1rem)",
          }}
        >
          {/* Note — draggable */}
          <div
            ref={noteRef}
            data-note="true"
            onMouseDown={onNoteMouseDown}
            style={noteStyle}
          >
            <div style={{
              transformOrigin: "top center",
              animation: swinging ? "noteSwing 4s ease-in-out infinite" : "none",
              display: "inline-block",
              position: "relative",
            }}>
              <div style={{ position: "relative", width: "clamp(500px, 54vw, 760px)" }}>
                <img src="/note.png" alt="" style={{ width: "100%", display: "block", userSelect: "none" }} draggable={false} />
                {/* Text overlaid on note */}
                <div style={{
                  position: "absolute",
                  top: "42%", left: "47%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "BillaMount, cursive", fontSize: "clamp(2.6rem, 4vw, 4.5rem)", color: "#960018", lineHeight: 1, marginBottom: "3rem" }}>
                    Contact me
                  </p>
                  <a
                    href="mailto:cal1starcollab@gmail.com"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.8rem, 1.2vw, 1.1rem)", letterSpacing: "0.03em", color: "#1a1a1a", textDecoration: "none", display: "block", marginBottom: "0.5rem", paddingLeft: "1.5rem" }}
                  >
                    cal1starcollab@gmail.com
                  </a>
                  <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem" }}>
                    {[
                      ["Instagram", "https://instagram.com/cal1star"],
                      ["Youtube",   "https://www.youtube.com/@cal1stvr"],
                      ["Tiktok",    "https://www.tiktok.com/@cal1star"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.65rem, 1vw, 0.9rem)", letterSpacing: "0.08em", color: "#1a1a1a", textDecoration: "none" }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
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

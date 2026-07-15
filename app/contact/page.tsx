"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ContactPage() {

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
    const onUp = () => { dragging.current = false; setSwinging(true); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const noteStyle: React.CSSProperties = notePos
    ? { position: "fixed", left: notePos.x, top: notePos.y, zIndex: 20, cursor: "grab" }
    : { position: "relative", cursor: "grab" };

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
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "3rem",
            paddingLeft: "clamp(2rem, 6vw, 6rem)",
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
                  <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", paddingLeft: "1.5rem" }}>
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
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.65rem, 1vw, 0.9rem)", letterSpacing: "0.08em", color: "#1a1a1a", textDecoration: "none", fontWeight: 700 }}
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
            @2026 CALISTA SUHERMAN.&nbsp;&nbsp;PSALM 46:5
          </p>
        </footer>
      </main>
    </>
  );
}

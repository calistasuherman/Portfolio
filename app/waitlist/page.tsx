import type { Metadata } from "next";
import "../home.css";
import "./waitlist.css";
import WaitlistClient from "./WaitlistClient";
import { WAITLIST_HTML } from "./waitlist-markup";

/* Standalone waitlist page: the homepage Editing 101 section as its own
   page, with the site's header and footer. The markup and styles are the
   homepage's own (see waitlist-markup.ts), and the form posts to
   /api/waitlist exactly like the homepage form. The favicon and the rest
   of the site metadata come from the root layout. */
export const metadata: Metadata = {
  title: "Editing 101 Waitlist — Cal1star Editing",
  description:
    "Join the waitlist for Editing 101, the beginner video editing course by Calista Suherman. Launching early January.",
};

/* Scroll reveals: the same gate script as the homepage. Enables the
   hidden pre reveal state only when an IntersectionObserver can actually
   run and motion is allowed, with a fallback timer that unhides
   everything if the setup never runs. */
const GATE_SCRIPT =
  "(function () { try { if (!(\"IntersectionObserver\" in window)) { return; } " +
  "if (window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches) { return; } " +
  "document.documentElement.classList.add(\"reveal-on\"); " +
  "window.__revealFallback = setTimeout(function () { document.documentElement.classList.remove(\"reveal-on\"); }, 3000); " +
  "} catch (e) {} })();";

export default function WaitlistPage() {
  return (
    <div className="c1s c1s-waitlist" id="c1sRoot">
      <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
      <div className="wl-shell" dangerouslySetInnerHTML={{ __html: WAITLIST_HTML }} />
      <WaitlistClient />
    </div>
  );
}

import "./home.css";
import HomeClient from "./components/HomeClient";
import { HOME_HTML } from "./home-markup";

/* The follower count the whole page renders from, in milestone form
   (62,952 shows as 60k+ and steps up at the next ten thousand). Checked
   live through Instagram on 2026-11-13. */
const DATA_SCRIPT = "window.CAL1STAR_DATA = { instagramFollowers: 62952 };";

/* Scroll reveals: enable the hidden pre reveal state only when an
   IntersectionObserver can actually run and motion is allowed, with a
   fallback timer that unhides everything if the setup never runs. */
const GATE_SCRIPT =
  "(function () { try { if (!(\"IntersectionObserver\" in window)) { return; } " +
  "if (window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches) { return; } " +
  "document.documentElement.classList.add(\"reveal-on\"); " +
  "window.__revealFallback = setTimeout(function () { document.documentElement.classList.remove(\"reveal-on\"); }, 3000); " +
  "} catch (e) {} })();";

export default function HomePage() {
  return (
    <div className="c1s" id="c1sRoot">
      <script dangerouslySetInnerHTML={{ __html: DATA_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
      <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
      <HomeClient />
    </div>
  );
}

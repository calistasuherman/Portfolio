// @ts-nocheck
"use client";
import { useEffect } from "react";
import { CE_LOGO, CAL1STAR_LOGO, EDITING_101_CLEAN } from "../home-assets";

/* Standalone waitlist page behaviours: the small subset of the homepage's
   HomeClient that this page's markup needs. The image assets are assigned
   from the same bundle the homepage uses, the waitlist form posts to
   /api/waitlist with the exact logic and messages copied from HomeClient,
   and the scroll reveals run the same setup as the homepage (elements in
   view on load show at once, the rest reveal as they enter). Everything
   here only touches this page's own DOM. */
export default function WaitlistClient() {
  useEffect(() => {
    initWaitlist();
  }, []);
  return null;
}

function initWaitlist() {

        "use strict";

        /* ---------- image assets: assigned from this bundle on mount ----------
           Same approach as the homepage: the markup ships a 1px placeholder
           in each <img data-asset> so the image data stays out of the HTML
           document and arrives once, in this cacheable JS file. Only the
           three assets this page uses are wired up. */
        var ASSET_SRC = {
          "ce": CE_LOGO, "cal": CAL1STAR_LOGO,
          "editing101": EDITING_101_CLEAN
        };
        document.querySelectorAll("img[data-asset]").forEach(function (img) {
          var real = ASSET_SRC[img.getAttribute("data-asset")];
          if (real) { img.src = real; }
        });

        /* ---------- waitlist form: same behaviour as the homepage ----------
           Copied from HomeClient: posts JSON to /api/waitlist, the site's
           own Pages Function, which saves the signup on the site and syncs
           it to Kit with the Course Waitlist tag (functions/api/waitlist.js,
           unchanged). Messages match the homepage word for word. */
        var form = document.getElementById("waitlistForm");
        var email = document.getElementById("waitlistEmail");
        var note = document.getElementById("formNote");
        var joinBtn = form ? form.querySelector('button[type="submit"]') : null;
        var joinBtnText = joinBtn ? joinBtn.innerHTML : "";
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var value = email.value.trim();
          var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if (!ok) {
            note.textContent = "That email looks incomplete. Check it and try again.";
            email.focus();
            return;
          }
          if (joinBtn) { joinBtn.disabled = true; joinBtn.innerHTML = "Joining&hellip;"; }
          fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: value })
          }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) {
              if (res.ok && data.ok) {
                note.textContent = data.confirm
                  ? "You\u2019re in! Check your inbox to confirm your spot."
                  : "You\u2019re in! I\u2019ll email you as soon as Editing 101 opens.";
                form.reset();
              } else {
                note.textContent = data.error || "Signup didn\u2019t go through. Please try again.";
              }
            });
          }).catch(function () {
            note.textContent = "Signup didn\u2019t go through. Please try again.";
          }).finally(function () {
            if (joinBtn) { joinBtn.disabled = false; joinBtn.innerHTML = joinBtnText; }
          });
        });

        /* ---------- scroll reveals: same setup as the homepage ----------
           Pairs with the reveal CSS in home.css and the gate script in
           page.tsx that adds html.reveal-on. If that class is missing (no
           IntersectionObserver, or reduced motion) this setup clears the
           fallback timer and leaves every element simply visible. Elements
           already inside the viewport get .is-instant and just show, with
           no slide and no flash; everything below is observed and revealed
           the first time it enters, then unobserved so it never replays. */
        (function initScrollReveals() {
          if (window.__revealFallback) { clearTimeout(window.__revealFallback); window.__revealFallback = null; }
          if (!document.documentElement.classList.contains("reveal-on")) { return; }
          var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
          if (!els.length) { return; }
          if (!("IntersectionObserver" in window)) {
            els.forEach(function (el) { el.classList.add("is-visible", "is-instant"); });
            return;
          }
          var vh = window.innerHeight || document.documentElement.clientHeight || 0;
          var revealIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                en.target.classList.add("is-visible");
                revealIO.unobserve(en.target);
              }
            });
          }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
          els.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < vh && r.bottom > 0) {
              el.classList.add("is-visible", "is-instant");
              return;
            }
            revealIO.observe(el);
          });
        })();

}

// @ts-nocheck
"use client";
import { useEffect } from "react";
import { BRAND_CAPCUT, BRAND_ELEVENLABS, BRAND_HIGGSFIELD, CAL1STAR_LOGO, CAPCUT_WORLD_1, CAPCUT_WORLD_2, CAPCUT_WORLD_3, CE_LOGO, EDITING_101_CLEAN } from "../home-assets";

/* Homepage behaviours, ported from the approved preview's page script:
   follower milestone, the simulated Michael Jackson mini player, the photo
   stack flip and parallax, the work galleries and lightbox, the waitlist
   form (posting to /api/waitlist like the live course page), native
   scrolling with eased link glides, the scroll moving backgrounds, the scroll reveals, the custom
   cursor and the hero video wall. It runs once on mount and every handler
   that outlives the page checks for the homepage root first, so nothing
   here can leak into the other pages. */
export default function HomeClient() {
  useEffect(() => {
    initHome();
  }, []);
  return null;
}

function initHome() {

        "use strict";

        /* ---------- image assets: assigned from this bundle on mount ----------
           The markup ships a 1px placeholder in each <img data-asset> so the
           multi hundred KB of image data stays out of the HTML document
           (where the server render plus flight payload shipped it twice)
           and arrives once, in this cacheable JS file. */
        var ASSET_SRC = {
          "ce": CE_LOGO, "cal": CAL1STAR_LOGO,
          "capcut1": CAPCUT_WORLD_1, "capcut2": CAPCUT_WORLD_2, "capcut3": CAPCUT_WORLD_3,
          "brand-higgsfield": BRAND_HIGGSFIELD, "brand-capcut": BRAND_CAPCUT, "brand-elevenlabs": BRAND_ELEVENLABS,
          "editing101": EDITING_101_CLEAN
        };
        document.querySelectorAll("img[data-asset]").forEach(function (img) {
          var real = ASSET_SRC[img.getAttribute("data-asset")];
          if (real) { img.src = real; }
        });

        /* ---------- follower count: milestone label from the one SITE DATA value ---------- */
        var followerData = window.CAL1STAR_DATA || { instagramFollowers: 0 };
        var followerCount = Number(followerData.instagramFollowers || 0);
        var followerMilestone = Math.floor(followerCount / 10000) * 10;
        var followerText = followerMilestone >= 10 ? followerMilestone + "k+" : followerCount.toLocaleString("en-US");
        document.querySelectorAll(".js-followers-milestone").forEach(function (el) { el.textContent = followerText; });

        /* ---------- music player ---------- */
        var songs = [
          { title: "The Lady in My Life", artist: "Michael Jackson", len: 298 },
          { title: "(I Like) The Way You Love Me", artist: "Michael Jackson", len: 257 },
          { title: "All I Do Is Think Of You", artist: "Michael Jackson", len: 287 },
          { title: "The Girl Is Mine ft. Paul McCartney", artist: "Michael Jackson", len: 222 },
          { title: "You Rock My World", artist: "Michael Jackson", len: 338 },
          { title: "Loving You", artist: "Michael Jackson", len: 189 }
        ];
        var idx = 0, playing = false, elapsed = 0, timer = null;
        var disc = document.getElementById("disc");
        var titleEl = document.getElementById("trackTitle");
        var artistEl = document.getElementById("trackArtist");
        var timeNow = document.getElementById("timeNow");
        var fill = document.getElementById("progressFill");
        var playBtn = document.getElementById("playBtn");
        var playIcon = document.getElementById("playIcon");
        var songBtns = Array.prototype.slice.call(document.querySelectorAll(".song"));
        var ICON_PLAY = "M8 5v14l11-7z";
        var ICON_PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";

        function fmt(s) {
          var m = Math.floor(s / 60), r = Math.floor(s % 60);
          return m + ":" + (r < 10 ? "0" : "") + r;
        }
        var timeTotalEl = document.getElementById("timeTotal");
        function render() {
          titleEl.textContent = songs[idx].title;
          artistEl.textContent = songs[idx].artist;
          timeNow.textContent = fmt(elapsed);
          if (timeTotalEl) { timeTotalEl.textContent = fmt(songs[idx].len); }
          fill.style.width = Math.min(100, (elapsed / songs[idx].len) * 100) + "%";
          disc.classList.toggle("spinning", playing);
          playIcon.innerHTML = "";
          var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
          p.setAttribute("d", playing ? ICON_PAUSE : ICON_PLAY);
          playIcon.appendChild(p);
          playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
          songBtns.forEach(function (b, i) { b.classList.toggle("active", i === idx); });
        }
        function tick() {
          if (!document.getElementById("c1sRoot")) { stopTimer(); return; }
          elapsed += 0.5;
          if (elapsed >= songs[idx].len) { select(idx + 1, true); return; }
          render();
        }
        function startTimer() { stopTimer(); timer = setInterval(tick, 500); }
        function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
        function select(i, autoplay) {
          idx = ((i % songs.length) + songs.length) % songs.length;
          elapsed = 0;
          playing = !!autoplay;
          if (playing) { startTimer(); } else { stopTimer(); }
          render();
        }
        playBtn.addEventListener("click", function () {
          playing = !playing;
          if (playing) { startTimer(); } else { stopTimer(); }
          render();
        });
        document.getElementById("prevBtn").addEventListener("click", function () { select(idx - 1, playing); });
        document.getElementById("nextBtn").addEventListener("click", function () { select(idx + 1, playing); });
        songBtns.forEach(function (b) {
          b.addEventListener("click", function () { select(parseInt(b.getAttribute("data-index"), 10), true); });
        });
        var miniPlayer = document.getElementById("miniPlayer");
        var pickerToggle = document.getElementById("pickerToggle");
        if (pickerToggle && miniPlayer) {
          pickerToggle.addEventListener("click", function () {
            var expanded = miniPlayer.classList.toggle("expanded");
            pickerToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
            var label = pickerToggle.querySelector("span");
            if (label) { label.textContent = expanded ? "Close" : "Songs"; }
          });
        }
        render();

        /* ---------- photo stack: exact port of the live site ----------
           Source of truth: the photo stack component in the live
           cal1star.com homepage bundle (function u in app/page chunk,
           read 2026-11-13). The live code keeps an order array, renders
           every photo once, and on click does order.push(order.shift()):
           the front photo takes the back slot and every other photo
           shifts one slot forward, each animating only its transform
           over 0.4s with cubic-bezier(0.16, 1, 0.3, 1). POS below is the
           live slot table, value for value. There is deliberately no
           flip lock, no timeout, no src swapping and no shadow or 3D
           animation: that machinery was the lag. */
        var POS = [
          { rotate: 0, tx: 0, ty: 0 },
          { rotate: -3, tx: -8, ty: 0 },
          { rotate: 5, tx: 10, ty: 0 },
          { rotate: -6, tx: -14, ty: 0 },
          { rotate: 3, tx: 6, ty: 0 },
          { rotate: -4, tx: -10, ty: 0 },
          { rotate: 7, tx: 12, ty: 0 }
        ];
        var stack = document.getElementById("photoStack");
        var stackCards = Array.prototype.slice.call(stack.querySelectorAll(".stack-card"));
        var order = stackCards.map(function (_, i) { return i; });
        function renderStack() {
          order.forEach(function (photoIdx, slot) {
            var card = stackCards[photoIdx];
            var pos = POS[slot] || POS[POS.length - 1];
            card.style.transform = "translate(" + pos.tx + "px, " + pos.ty + "px) rotate(" + pos.rotate + "deg)";
            card.style.zIndex = String(order.length - slot);
            if (slot === 0) { card.removeAttribute("aria-hidden"); } else { card.setAttribute("aria-hidden", "true"); }
          });
        }
        renderStack();
        stack.addEventListener("click", function () {
          order.push(order.shift());
          renderStack();
        });

        /* ---------- photo stack parallax: wrapper only, flip untouched ----------
           The drift is written to two CSS variables on .stack-zone (the
           wrapper) and eased in its own rAF loop; it never writes to a
           .stack-card transform, so the flip above keeps the live
           site's exact 0.4s transform tween and gains no lag. It also
           freezes for the length of a flip (430ms): while a card is
           mid flip the wrapper holds perfectly still, and the drift
           resumes once the flip has settled. Mouse only: it never runs
           for touch pointers or under reduced motion. The range is
           deliberately tiny, max about 6px, so the stack feels like it
           has depth without ever sliding around. */
        (function initStackParallax() {
          if (!window.matchMedia("(pointer: fine)").matches) { return; }
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
          var zone = stack.closest(".stack-zone");
          var about = document.getElementById("about");
          if (!zone || !about) { return; }
          var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, freezeUntil = 0;
          function loop() {
            raf = null;
            if (performance.now() < freezeUntil) { raf = requestAnimationFrame(loop); return; }
            cx += (tx - cx) * 0.055;
            cy += (ty - cy) * 0.055;
            if (Math.abs(tx - cx) < 0.002 && Math.abs(ty - cy) < 0.002) { cx = tx; cy = ty; }
            zone.style.setProperty("--par-x", cx.toFixed(3));
            zone.style.setProperty("--par-y", cy.toFixed(3));
            if (cx !== tx || cy !== ty) { raf = requestAnimationFrame(loop); }
          }
          function kick() { if (!raf) { raf = requestAnimationFrame(loop); } }
          about.addEventListener("pointermove", function (e) {
            if (e.pointerType && e.pointerType !== "mouse") { return; }
            var r = zone.getBoundingClientRect();
            var nx = (e.clientX - (r.left + r.width / 2)) / 340;
            var ny = (e.clientY - (r.top + r.height / 2)) / 340;
            tx = Math.max(-1, Math.min(1, nx));
            ty = Math.max(-1, Math.min(1, ny));
            kick();
          }, { passive: true });
          about.addEventListener("pointerleave", function () { tx = 0; ty = 0; kick(); }, { passive: true });
          stack.addEventListener("click", function () { freezeUntil = performance.now() + 430; kick(); });
        })();

        /* ---------- work: every video from the live site, restored ----------
           Source of truth: app/work/page.tsx in calistasuherman/Portfolio
           (the code behind cal1star.com/work), checked 2026-11-13.
           Video Editing lists 20 edits in this exact order, Videography
           lists 14 cinema clips, Partnerships lists 4 brand videos, and
           Video Editing also carries a Tutorials subsection with the
           Invideo tutorial. Files stream from the live site's own media
           address (cal1star.com/media, its /media proxy) and load lazily:
           nothing downloads until a frame nears the screen or is hovered,
           and full playback only starts on a click in the lightbox. */
        var MEDIA = "/media";
        function pad2(n) { return (n < 10 ? "0" : "") + n; }
        function fileLabel(f) { return f.replace(/\.[^.]+$/, ""); }
        var VE_FILES = ["ve15.mp4", "ve14.mp4", "ve13.mp4", "ve12.mp4", "ve11.mp4", "ve10.mp4", "ve9.mp4", "ve6.mov", "ve7.mov", "ve8.mp4", "ve1.mp4", "ve2.mp4", "ve3.mp4", "ve4.mp4", "ve5.mp4", "VideoStar5.mp4", "VideoStar4.mp4", "VideoStar3.mp4", "VideoStar2.mp4", "VideoStar1.mp4"];
        var CINEMA_FILES = ["cinema1.mp4", "cinema2.mp4", "cinema3.mp4", "cinema4.mp4", "cinema5.mp4", "cinema6.mp4", "cinema7.mp4", "cinema8.mp4", "cinema9.mp4", "cinema10.mp4", "cinema11.mp4", "cinema12.MP4", "cinema13.MOV", "cinema14.mp4"];
        var workData = {
          "video-editing": {
            idx: "01", title: "Video Editing",
            desc: "Short form edits, motion graphics, VFX, and dynamic transitions built to stop the scroll.",
            layout: "portrait",
            videos: VE_FILES.map(function (f) { return { src: MEDIA + "/ve/" + f, label: fileLabel(f) }; }),
            sub: {
              idx: "01.1", title: "Tutorials",
              desc: "Quick walkthroughs of the tools and techniques behind my edits.",
              videos: [{ src: MEDIA + "/yt/invideotutorial.mp4", label: "Invideo", category: "Tutorial" }]
            }
          },
          "videography": {
            idx: "02", title: "Videography",
            desc: "Cinematic short form and long form content filmed, directed, and edited from concept to final cut.",
            layout: "landscape",
            videos: CINEMA_FILES.map(function (f, i) { return { src: MEDIA + "/cinema/" + f, label: "Cinema " + (i + 1) }; })
          },
          "partnerships": {
            idx: "03", title: "Partnerships",
            desc: "Brand integrations and sponsored content that feel native.",
            layout: "wide",
            videos: [
              { src: MEDIA + "/yt/invideotutorial.mp4", label: "Invideo", category: "AI" },
              { src: MEDIA + "/yt/epidemicsound.mp4", label: "Epidemic Sound", category: "SFX" },
              { src: MEDIA + "/yt/captions2collab.mp4", label: "Captions 2.0", category: "AI" },
              { src: MEDIA + "/yt/invideocollab.mp4", label: "Invideo", category: "AI" }
            ]
          }
        };

        var dialog = document.getElementById("lightbox");
        var lbVideo = document.getElementById("lbVideo");
        var lbTag = document.getElementById("lbTag");
        function openLightbox(src, tag) {
          lbVideo.src = src;
          lbTag.textContent = tag;
          if (typeof dialog.showModal === "function") {
            dialog.showModal();
            var pr = lbVideo.play(); if (pr) { pr.catch(function () {}); }
          }
        }

        /* Lazy frames: the video file is only attached when the frame is
           about to be seen (IntersectionObserver), hovered, or focused,
           so opening a category with 20 videos stays fast. */
        var workIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { ensureVideo(en.target); workIO.unobserve(en.target); }
          });
        }, { rootMargin: "600px 0px" }) : null;
        function ensureVideo(v) {
          if (v && !v.getAttribute("src") && v.getAttribute("data-src")) {
            v.src = v.getAttribute("data-src");
          }
        }
        function bindFrame(frame, v, watchBtn) {
          if (workIO && v) { workIO.observe(v); }
          frame.addEventListener("pointerenter", function () {
            ensureVideo(v);
            if (v) { var pr = v.play(); if (pr) { pr.catch(function () {}); } }
          });
          frame.addEventListener("pointerleave", function () { if (v) { v.pause(); } });
          watchBtn.addEventListener("click", function () {
            openLightbox(watchBtn.getAttribute("data-src"), watchBtn.getAttribute("data-tag"));
          });
        }
        /* Only Partnerships cards carry a title under the video (the brand
           names); Video Editing, Videography and the Tutorials subsection
           show the bare frame with its number tag, per Calista's request. */
        function createWorkCard(item, i, categoryTitle, titled) {
          var display = titled ? (item.category ? item.label : (item.label + " \u00B7 " + pad2(i + 1))) : pad2(i + 1);
          var card = document.createElement("div");
          card.className = "work-card work-card--in";
          card.style.animationDelay = Math.min(i * 60, 360) + "ms";
          var frame = document.createElement("div");
          frame.className = "frame";
          var v = document.createElement("video");
          v.muted = true; v.loop = true; v.playsInline = true;
          v.preload = "none";
          v.setAttribute("data-src", item.src);
          v.setAttribute("aria-label", categoryTitle + ": " + display);
          var play = document.createElement("span");
          play.className = "play"; play.setAttribute("aria-hidden", "true");
          play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
          var tag = document.createElement("span");
          tag.className = "tag";
          /* Partnerships: the word next to the frame's dot is removed
             at Calista's request. It repeated the same category (AI on
             three of the four brand videos, SFX on the other) that the
             label under each frame already shows, so the partnerships
             frames now carry the dot alone with no title beside it.
             Every other category keeps its number next to the dot, and
             the Partnerships brand name labels under the frames stay
             exactly as they were. */
          if (categoryTitle === "Partnerships") {
            tag.className = "tag tag--dot-only";
            tag.setAttribute("aria-hidden", "true");
          } else {
            tag.textContent = item.category || pad2(i + 1);
          }
          var watchBtn = document.createElement("button");
          watchBtn.className = "watch"; watchBtn.type = "button";
          watchBtn.setAttribute("data-src", item.src);
          watchBtn.setAttribute("data-tag", categoryTitle + " \u00B7 " + display);
          watchBtn.setAttribute("aria-label", "Watch " + display + " (" + categoryTitle + ")");
          watchBtn.setAttribute("data-popup", "Click to watch");
          frame.appendChild(v); frame.appendChild(play); frame.appendChild(tag); frame.appendChild(watchBtn);
          card.appendChild(frame);
          if (titled) {
            var label = document.createElement("p");
            label.className = "work-card-label";
            label.textContent = item.label;
            if (item.category) {
              var cat = document.createElement("span");
              cat.textContent = item.category;
              label.appendChild(cat);
            }
            card.appendChild(label);
          }
          bindFrame(frame, v, watchBtn);
          return card;
        }
        function renderGallery(container, videos, layout, categoryTitle, titled) {
          container.innerHTML = "";
          container.className = "work-grid work-grid--" + layout;
          videos.forEach(function (item, i) { container.appendChild(createWorkCard(item, i, categoryTitle, titled)); });
        }

        var vinylView = document.getElementById("vinylView");
        var workDetail = document.getElementById("workDetail");
        var workGallery = document.getElementById("workGallery");
        var workSubsection = document.getElementById("workSubsection");
        var workSubGallery = document.getElementById("workSubGallery");
        document.querySelectorAll(".vinyl").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var d = workData[btn.getAttribute("data-cat")];
            if (!d) { return; }
            document.getElementById("detailIdx").textContent = d.idx + " \u00B7 My work";
            document.getElementById("detailTitle").textContent = d.title;
            document.getElementById("detailDesc").textContent = d.desc;
            var countEl = document.getElementById("detailCount");
            countEl.textContent = d.videos.length + (d.videos.length === 1 ? " video" : " videos");
            if (d.sub) {
              var subNote = document.createElement("span");
              subNote.textContent = " \u00B7 plus " + d.sub.videos.length + " tutorial";
              countEl.appendChild(subNote);
            }
            renderGallery(workGallery, d.videos, d.layout, d.title, btn.getAttribute("data-cat") === "partnerships");
            if (d.sub) {
              document.getElementById("detailSubIdx").textContent = d.sub.idx + " \u00B7 My work";
              document.getElementById("detailSubTitle").textContent = d.sub.title;
              document.getElementById("detailSubDesc").textContent = d.sub.desc;
              renderGallery(workSubGallery, d.sub.videos, "wide", d.sub.title, false);
              workSubsection.hidden = false;
            } else {
              workSubGallery.innerHTML = "";
              workSubsection.hidden = true;
            }
            vinylView.hidden = true;
            workDetail.hidden = false;
            document.getElementById("work").scrollIntoView({ behavior: "smooth", block: "start" });
          });
        });
        document.getElementById("workBack").addEventListener("click", function () {
          workDetail.querySelectorAll("video").forEach(function (v) { v.pause(); });
          workDetail.hidden = true;
          vinylView.hidden = false;
          document.getElementById("work").scrollIntoView({ behavior: "smooth", block: "start" });
        });
        function closeLightbox() {
          lbVideo.pause();
          lbVideo.removeAttribute("src");
          lbVideo.load();
          dialog.close();
        }
        document.getElementById("lbClose").addEventListener("click", closeLightbox);
        dialog.addEventListener("click", function (e) { if (e.target === dialog) { closeLightbox(); } });
        dialog.addEventListener("cancel", function () { lbVideo.pause(); lbVideo.removeAttribute("src"); lbVideo.load(); });

        /* ---------- waitlist form: same behaviour as the live course page ----------
           Posts JSON to /api/waitlist, the site's own Pages Function, which
           saves the signup on the site and syncs it to Kit with the Course
           Waitlist tag (functions/api/waitlist.js, unchanged). Messages match
           the live course page word for word. */
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

        /* ---------- scrolling: native, with an eased glide for in page links ---------- */
        (function initSmoothScroll() {
          var reducedScroll = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reducedScroll) { return; }

          function maxScroll() {
            return Math.max(0, (document.documentElement.scrollHeight || 0) - window.innerHeight);
          }
          function clampY(y) { return Math.min(maxScroll(), Math.max(0, y)); }
          function currentY() { return window.pageYOffset || document.documentElement.scrollTop || 0; }

          /* Scrolling itself is left entirely to the browser. An earlier
             version hijacked every wheel event (preventDefault on a non
             passive listener) and eased window.scrollTo on the main
             thread each frame; that switched off the compositor's own
             scrolling and felt laggy, worst on trackpads. Native wheel,
             trackpad and touch scrolling needs no help, so the only
             scroll listeners in this section are passive ones that
             cancel a link glide (below) when real scroll input arrives. */

          /* In page links: one soft eased glide to the section */
          var DURATION = 900;
          var rafId = null;
          function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
          function stopGlide() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
          function glideTo(targetY) {
            var startY = currentY();
            var distance = targetY - startY;
            if (Math.abs(distance) < 2) { return; }
            stopGlide();
            var startTime = null;
            function step(now) {
              if (!startTime) { startTime = now; }
              var progress = Math.min(1, (now - startTime) / DURATION);
              window.scrollTo(0, startY + distance * easeInOutCubic(progress));
              if (progress < 1) { rafId = requestAnimationFrame(step); } else { rafId = null; }
            }
            rafId = requestAnimationFrame(step);
          }
          window.addEventListener("touchstart", stopGlide, { passive: true });
          window.addEventListener("wheel", stopGlide, { passive: true });
          window.addEventListener("pointerdown", stopGlide, { passive: true });
          window.addEventListener("keydown", function (e) {
            if (["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].indexOf(e.key) !== -1) { stopGlide(); }
          }, { passive: true });
          document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (e) {
              var hash = link.getAttribute("href");
              if (!hash || hash.length < 2) { return; }
              var target = document.querySelector(hash);
              if (!target) { return; }
              e.preventDefault();
              var headerOffset = 84;
              var targetY = target.getBoundingClientRect().top + currentY() - headerOffset;
              if (hash === "#top") { targetY = 0; }
              glideTo(clampY(targetY));
              if (window.history && window.history.pushState) { window.history.pushState(null, "", hash); }
              target.setAttribute("tabindex", "-1");
            });
          });
        })();

        /* ---------- scroll moving backgrounds ----------
           One rAF gated pass per scroll or resize frame, and only
           while a frame is actually owed: at rest this costs nothing.
           Section positions are measured once and cached (re measured
           on resize, or whenever the document height changes), so a
           scroll frame does no layout reads at all, and a --py write
           only happens when the rounded value actually changed.
           Everything it moves is a transform on a dedicated layer
           (the fixed stage's single grid and glow, each section's
           --py fed grid and glow plates), never a layout or paint
           property, so scrolling stays cheap and nothing lags.
           The stage grid wraps modulo its own 54px tile, so its drift
           is seamless and bounded no matter how far the page scrolls.
           The travelling glow follows overall page progress: it starts
           near the top of the viewport and eases down through it,
           swaying a little side to side, as Calista scrolls down.
           Per section, --py is the section centre's distance from the
           viewport centre scaled down and clamped to about 110px, so
           grids visibly slide against the scroll and glows counter
           drift through the CSS calc on the ::after layers (the
           ::before layers are inset by 220px so a 110px drift
           never exposes an edge). Reduced
           motion: the whole thing never starts and the CSS pins every
           layer still, so backgrounds sit exactly where they were. */
        (function initScrollBackgrounds() {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
          var grid = document.querySelector(".bg-grid-layer");
          var glow = document.querySelector(".bg-glow-travel");
          var sections = [];
          [".hero", "#about", "#work", "#course", "#toolkit", "#contact"].forEach(function (sel) {
            var el = document.querySelector(sel);
            if (el) { sections.push(el); }
          });
          if (!grid && !glow && !sections.length) { return; }
          var ticking = false;
          var vh = window.innerHeight || 1;
          var docH = document.documentElement.scrollHeight || 1;
          var measured = [];
          function measure() {
            vh = window.innerHeight || 1;
            docH = document.documentElement.scrollHeight || 1;
            var y = window.pageYOffset || document.documentElement.scrollTop || 0;
            measured = sections.map(function (el) {
              var r = el.getBoundingClientRect();
              return { el: el, top: r.top + y, height: r.height, lastPy: null };
            });
          }
          function update() {
            ticking = false;
            if (!document.getElementById("c1sRoot")) { return; }
            var y = window.pageYOffset || document.documentElement.scrollTop || 0;
            if ((document.documentElement.scrollHeight || 1) !== docH) { measure(); }
            var max = Math.max(1, docH - vh);
            var p = Math.min(1, Math.max(0, y / max));
            if (grid) { grid.style.transform = "translate3d(0," + (-((y * 0.3) % 54)).toFixed(1) + "px,0)"; }
            if (glow) {
              var sway = Math.sin(p * Math.PI * 2) * 16;
              glow.style.transform = "translate3d(calc(-50% + " + sway.toFixed(1) + "vw)," + (p * 88).toFixed(1) + "vh,0)";
            }
            measured.forEach(function (sec) {
              var top = sec.top - y;
              if (top + sec.height < -320 || top > vh + 320) { return; }
              var delta = (top + sec.height / 2) - vh / 2;
              var py = Math.max(-110, Math.min(110, -delta * 0.16)).toFixed(1);
              if (sec.lastPy !== py) { sec.lastPy = py; sec.el.style.setProperty("--py", py + "px"); }
            });
          }
          function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
          function onResize() { measure(); onScroll(); }
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onResize, { passive: true });
          measure();
          update();
        })();

        /* ---------- scroll reveals: slide in on scroll, once each ----------
           Pairs with the reveal CSS and the small head script that adds
           html.reveal-on. If that class is missing (no
           IntersectionObserver, or reduced motion) this setup clears
           the fallback timer and leaves every element simply visible.
           Elements already inside the viewport when this runs get
           .is-instant and just show, with no slide and no flash;
           everything below is observed and revealed the first time it
           enters, then unobserved so it never replays. Only transform
           and opacity are animated (by the CSS animation), so
           scrolling stays smooth. The work detail head and note sit
           inside the hidden detail view: they report a zero rect here,
           are observed, and reveal when a vinyl click shows them. */
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

        /* ---------- custom cursor (restored) ---------- */
        (function initCursor() {
          var fine = window.matchMedia("(pointer: fine)").matches;
          var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!fine || reduced) { return; }
          var dot = document.getElementById("cursorDot");
          var ring = document.getElementById("cursorRing");
          if (!dot || !ring) { return; }
          var c1sRoot = document.getElementById("c1sRoot"); if (c1sRoot) { c1sRoot.classList.add("has-custom-cursor"); }
          var mx = -100, my = -100, rx = -100, ry = -100, raf = null;
          function loop() {
            rx += (mx - rx) * 0.16;
            ry += (my - ry) * 0.16;
            dot.style.transform = "translate(" + (mx - 3) + "px," + (my - 3) + "px)";
            ring.style.transform = "translate(" + (rx - ring.offsetWidth / 2) + "px," + (ry - ring.offsetHeight / 2) + "px)";
            if (Math.abs(mx - rx) > 0.4 || Math.abs(my - ry) > 0.4) { raf = requestAnimationFrame(loop); } else { raf = null; }
          }
          function kick() { if (!raf) { raf = requestAnimationFrame(loop); } }
          document.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; kick(); }, { passive: true });
          document.addEventListener("pointerdown", function () { ring.classList.add("is-down"); });
          document.addEventListener("pointerup", function () { ring.classList.remove("is-down"); });
          var hoverSel = "a, button, input, .tool, .vinyl, .stack, .song, .frame, [data-popup]";
          document.addEventListener("pointerover", function (e) { if (e.target.closest(hoverSel)) { ring.classList.add("is-hover"); } });
          document.addEventListener("pointerout", function (e) { if (e.target.closest(hoverSel)) { ring.classList.remove("is-hover"); } });
        })();

        /* ---------- hero video wall: rows drifting in opposite directions ----------
           The wall carries Calista's full catalog: all 38 videos from
           the My Work data above (20 Video Editing, 14 Videography,
           4 Partnerships, the tutorial counting once), split across
           three rows with each row's set duplicated once in the markup
           for the seamless loop. They stream from the same live site
           media address as the work galleries. With that many clips,
           playback only runs while the hero is on screen: an
           IntersectionObserver pauses the whole wall once it scrolls
           away and resumes it on return, so the rest of the page
           never pays for 76 playing videos. */
        var heroWallVideos = document.querySelectorAll(".hero-video-wall video");
        if (heroWallVideos.length) {
          var heroReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          /* Lazy attach: the markup carries data-src and preload="none", so
             none of the 76 clips fetch anything until the wall is actually
             started here; files then stream exactly as before. */
          var attachWall = function () {
            heroWallVideos.forEach(function (v) {
              var s = v.getAttribute("data-src");
              if (s && !v.getAttribute("src")) { v.src = s; }
            });
          };
          if (heroReduced) {
            attachWall();
            heroWallVideos.forEach(function (v) { v.preload = "metadata"; v.removeAttribute("autoplay"); v.pause(); });
          } else {
            var heroEl = document.querySelector(".hero");
            var wallOnScreen = false;
            var playWall = function () { attachWall(); heroWallVideos.forEach(function (v) { var pr = v.play(); if (pr) { pr.catch(function () {}); } }); };
            var pauseWall = function () { heroWallVideos.forEach(function (v) { v.pause(); }); };
            if (heroEl && "IntersectionObserver" in window) {
              var heroIO = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                  wallOnScreen = !!en.isIntersecting;
                  if (en.isIntersecting) { playWall(); } else { pauseWall(); }
                });
              }, { threshold: 0.02 });
              heroIO.observe(heroEl);
            } else {
              wallOnScreen = true;
              playWall();
            }
            /* A hidden tab should not keep decoding 76 videos either:
               pause the wall while the page is hidden, and resume on
               return if the hero is on screen. */
            document.addEventListener("visibilitychange", function () {
              if (!document.getElementById("c1sRoot")) { return; }
              if (document.hidden) { pauseWall(); }
              else if (wallOnScreen) { playWall(); }
            });
          }
        }
      
}

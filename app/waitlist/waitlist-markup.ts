// Standalone waitlist page markup: the site's header, footer and
// background stage plus the homepage Editing 101 (course) section,
// extracted verbatim from app/home-markup.ts so this page looks exactly
// like the waitlist section on the homepage. The only edits are link
// targets: this page has no About or Work sections, so those links point
// at the homepage sections, and the Course links point at this page's
// own course section. Wired up by app/waitlist/WaitlistClient.tsx.

export const WAITLIST_HTML = `<div class="bg-stage" aria-hidden="true">
      <div class="bg-grid-layer"></div>
      <div class="bg-glow-travel"></div>
    </div>

    <header class="nav">
      <div class="wrap nav-inner">
        <a class="wordmark" href="/" aria-label="Cal1star Editing, home" data-popup="Back to top" data-popup-pos="bottom"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="ce" alt="Cal1star Editing" /></a>
        <nav class="links" aria-label="Site">
          <a href="/" data-popup="Home" data-popup-pos="bottom">Home</a>
          <a href="/#about" data-popup="About me" data-popup-pos="bottom">About</a>
          <a href="/#work" data-popup="Pick a record" data-popup-pos="bottom">My Work</a>
          <a href="#course" data-popup="Editing 101" data-popup-pos="bottom">Guide</a>
        </nav>
      </div>
    </header>

    <main id="top">
      <!-- COURSE -->
      <section class="course" id="course">
        <div class="wrap">
          <p class="label" data-reveal>New &middot; A beginner guide by @cal1star</p>
          <h2 style="margin: 0; --reveal-delay: .06s" data-reveal><img class="course-logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="editing101" alt="Editing 101: made easy" /></h2>
          <p class="course-copy" data-reveal style="--reveal-delay: .12s">Editing changed my life, and I want to make it feel easy for you. I&rsquo;ll walk you through CapCut first, then DaVinci Resolve, then the fun stuff: the effects and transitions you see in my videos. No experience needed, just come as you are.</p>
          <p class="course-copy" data-reveal style="--reveal-delay: .18s">I want to get to know you and work with you individually, so along with the guide I will be offering limited spots for 1:1 editing support, plus a community where we can learn and grow together.</p>
          <img class="first-line-img" data-reveal style="--reveal-delay: .24s" src="/course/be-first-in-line.png" alt="Be first in line!" />
          <form class="waitlist" id="waitlistForm" novalidate data-reveal style="--reveal-delay: .30s">
            <label class="sr" for="waitlistEmail" style="position:absolute; left:-9999px;">Your email</label>
            <input id="waitlistEmail" type="email" name="email" placeholder="Your email" autocomplete="email" required />
            <button class="btn btn-light" type="submit">Join the waitlist &rarr;</button>
          </form>
          <p class="form-note" id="formNote" role="status"></p>
          <p class="launch-line" data-reveal style="--reveal-delay: .36s">Launching <b>early January</b></p>
        </div>
      </section>
    </main>

    <!-- FOOTER / CONTACT -->
    <footer id="contact">
      <div class="wrap">
        <div class="foot-grid">
          <div data-reveal>
            <img class="foot-logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="cal" alt="Cal1star Editing" />
            <p class="tagline">Let’s work together!<br /><a href="mailto:cal1starpartnerships@gmail.com">cal1starpartnerships@gmail.com</a></p>
            <p class="foot-email">For tutorials or just to say hi, find me on Instagram at @cal1star</p>
            <div class="btn-row" style="margin-top: 26px;">
              <a class="btn btn-light" href="#course">Join the waitlist</a>
              <a class="btn btn-outline" href="https://cal1starediting.gumroad.com" target="_blank" rel="noopener">Shop my templates</a>
            </div>
          </div>
          <div class="foot-side" data-reveal style="--reveal-delay: .1s">
            <ul class="foot-links">
              <li><a href="/">Home</a></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#work">My Work</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom" data-reveal style="--reveal-delay: .15s">
          <span>&copy; 2026 CAL1STAR Editing</span>
          <span>Psalm 46:5</span>
        </div>
      </div>
    </footer>
`;

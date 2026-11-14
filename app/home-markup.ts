// Homepage markup, ported one to one from the approved rebrand preview.
// Rendered by app/page.tsx and wired up by app/components/HomeClient.tsx.

export const HOME_HTML = `<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
    <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
    <!-- Scroll moving background stage: fixed behind the content, its
         single grid layer and travelling glow are transform driven by
         the scroll script at the end of the body. Purely decorative. -->
    <div class="bg-stage" aria-hidden="true">
      <div class="bg-grid-layer"></div>
      <div class="bg-glow-travel"></div>
    </div>

    <header class="nav">
      <div class="wrap nav-inner">
        <a class="wordmark" href="#top" aria-label="Cal1star Editing, home" data-popup="Back to top" data-popup-pos="bottom"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="ce" alt="Cal1star Editing" /></a>
        <nav class="links" aria-label="Site">
          <a href="#top" data-popup="Home" data-popup-pos="bottom">Home</a>
          <a href="#about" data-popup="About me" data-popup-pos="bottom">About</a>
          <a href="#work" data-popup="Pick a record" data-popup-pos="bottom">My Work</a>
          <a href="#course" data-popup="Editing 101" data-popup-pos="bottom">Course</a>
        </nav>
      </div>
    </header>

    <main id="top">
      <!-- HERO + MUSIC -->
      <div class="hero">
        <!-- Hero wall: ALL of Calista's videos, not just the old 3 local
             clips: the full My Work catalog (20 Video Editing, 14
             Videography, 4 Partnerships) mixed across three rows,
             each row duplicated once for the seamless loop, streaming
             from the live site's media address like the galleries. -->
        <div class="hero-video-wall" aria-hidden="true">
          <div class="hero-row hero-row--right">
            <div class="hero-row-track">
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve15.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve14.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/epidemicsound.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve13.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve12.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve11.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/invideocollab.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve10.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema4.mp4" tabindex="-1"></video>
              </div>
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve15.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve14.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/epidemicsound.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve13.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve12.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve11.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/invideocollab.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve10.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema4.mp4" tabindex="-1"></video>
              </div>
            </div>
          </div>
          <div class="hero-row hero-row--left">
            <div class="hero-row-track">
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve9.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve6.mov" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/captions2collab.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve7.mov" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema6.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve8.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar4.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema7.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/invideotutorial.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve4.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema8.mp4" tabindex="-1"></video>
              </div>
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve9.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve6.mov" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/captions2collab.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve7.mov" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema6.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve8.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar4.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema7.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve5.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/yt/invideotutorial.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve4.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema8.mp4" tabindex="-1"></video>
              </div>
            </div>
          </div>
          <div class="hero-row hero-row--right">
            <div class="hero-row-track">
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema9.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema10.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema11.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema12.MP4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema13.MOV" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema14.mp4" tabindex="-1"></video>
              </div>
              <div class="hero-row-set">
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema9.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar3.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema10.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/ve1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar2.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema11.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/ve/VideoStar1.mp4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema12.MP4" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema13.MOV" tabindex="-1"></video>
                <video autoplay muted loop playsinline preload="none" data-src="/media/cinema/cinema14.mp4" tabindex="-1"></video>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="wrap hero-grid">
          <div>
            <p class="label">Est. 2026</p>
            <h1><img class="hero-logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="cal" alt="Cal1star Editing" /></h1>
            <p class="tagline">Video editing at its finest.</p>
            <p class="sub">Everything I make lives here: the tutorials, the transitions and the brand work you see on @cal1star, now in one brighter place.</p>
            <div class="btn-row">
              <a class="btn btn-outline" href="#work" data-popup="See the records">Explore my work</a>
              <a class="btn btn-solid" href="#contact" data-popup="Say hi">Work with me</a>
            </div>
          </div>

        </div>
      </div>

      <!-- MINI PLAYER: Liquid Glass, fixed to bottom left corner -->
      <div class="player" id="miniPlayer" aria-label="Music player">
        <div class="player-top">
          <div class="disc" id="disc" aria-hidden="true">
            <span class="star"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.8l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17l-6 3.2 1.3-6.7-5-4.7 6.8-.8z"/></svg></span>
          </div>
          <div class="track-meta">
            <p class="track-title" id="trackTitle">The Lady in My Life</p>
            <p class="track-artist" id="trackArtist">Michael Jackson</p>
            <div class="progress" aria-hidden="true"><i id="progressFill"></i></div>
            <div class="times"><span id="timeNow">0:00</span><span id="timeTotal">--:--</span></div>
            <div class="controls">
              <button class="ctl" id="prevBtn" type="button" aria-label="Previous song"><svg viewBox="0 0 24 24"><path d="M6 5h2v14H6zM20 5v14L9.5 12z"/></svg></button>
              <button class="ctl ctl-main" id="playBtn" type="button" aria-label="Play">
                <svg id="playIcon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button class="ctl" id="nextBtn" type="button" aria-label="Next song"><svg viewBox="0 0 24 24"><path d="M16 5h2v14h-2zM4 5v14l10.5-7z"/></svg></button>
              <button class="ctl ctl-list" id="pickerToggle" type="button" aria-expanded="false" aria-controls="songPicker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h10v2H4z"/></svg><span>Songs</span></button>
            </div>
          </div>
        </div>
        <div class="picker" id="songPicker">
          <h3>Pick a song</h3>
          <div id="songList">
            <button class="song active" type="button" data-index="0"><span class="n">01</span><span class="t">The Lady in My Life</span><span class="a">Michael Jackson</span></button>
            <button class="song" type="button" data-index="1"><span class="n">02</span><span class="t">(I Like) The Way You Love Me</span><span class="a">Michael Jackson</span></button>
            <button class="song" type="button" data-index="2"><span class="n">03</span><span class="t">All I Do Is Think Of You</span><span class="a">Michael Jackson</span></button>
            <button class="song" type="button" data-index="3"><span class="n">04</span><span class="t">The Girl Is Mine ft. Paul McCartney</span><span class="a">Michael Jackson</span></button>
            <button class="song" type="button" data-index="4"><span class="n">05</span><span class="t">You Rock My World</span><span class="a">Michael Jackson</span></button>
            <button class="song" type="button" data-index="5"><span class="n">06</span><span class="t">Loving You</span><span class="a">Michael Jackson</span></button>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <section class="stats" aria-label="Audience numbers">
        <div class="wrap stats-row">
          <div class="stat" data-reveal><b class="js-followers-milestone">60k+</b><span>Instagram followers</span></div>
          <div class="stat" data-reveal style="--reveal-delay: .08s"><b>5.1M</b><span>Reel views</span></div>
          <div class="stat" data-reveal style="--reveal-delay: .16s"><b>62K</b><span>Profile visits</span></div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about">
        <div class="wrap about-grid">
          <div>
            <p class="label" data-reveal>Get to know me</p>
            <h2 data-reveal style="--reveal-delay: .06s"><span class="script" style="color: var(--ink); font-size: 1.35em; margin-right: 10px;">About</span>me</h2>
            <p class="meta-line" data-reveal style="--reveal-delay: .12s"><b>@cal1star</b> &nbsp;|&nbsp; <span class="js-followers-milestone">60k+</span> Instagram followers, 4K+ YouTube &nbsp;|&nbsp; <span class="location">San Francisco, CA</span></p>
            <p class="about-copy" data-reveal style="--reveal-delay: .18s">Hi! I&rsquo;m Calista, your friendly neighborhood video editor, and I&rsquo;m thrilled you&rsquo;ve found your way to my corner of the internet.</p>
            <ul class="labels" data-reveal style="--reveal-delay: .24s">
              <li>Content Creator</li>
              <li>World Traveler</li>
              <li>Woman of God</li>
              <li>Coffee Connoisseur</li>
              <li>Gen Z (21 Y/O)</li>
              <li>Fashion Lover</li>
            </ul>
          </div>
          <div class="stack-zone">
            <button class="stack" id="photoStack" type="button" aria-label="Flip through Calista photos">
              <span class="stack-card"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="capcut2" alt="Calista holding a CapCut sign inside the big frame at the CapCut World event" draggable="false" /></span>
              <span class="stack-card" aria-hidden="true"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="capcut1" alt="" draggable="false" /></span>
              <span class="stack-card" aria-hidden="true"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="capcut3" alt="" draggable="false" /></span>
            </button>
          </div>
        </div>
      </section>

      <!-- TRUSTED BY -->
      <div class="trusted">
        <div class="wrap">
          <p class="label" data-reveal>Trusted by</p>
        </div>
        <div class="brand-marquee" data-reveal style="--reveal-delay: .1s" aria-label="Trusted by invideo, Mirage, Insta360, Epidemic Sound, Higgsfield, CapCut and ElevenLabs">
          <div class="brand-track">
            <div class="brand-set">
              <span class="brand-slot"><img src="/logos/portfolio16.png" alt="invideo" /></span>
              <span class="brand-slot"><img src="/logos/portfolio17.png" alt="Mirage" /></span>
              <span class="brand-slot"><img src="/logos/portfolio18.png" alt="Insta360" /></span>
              <span class="brand-slot"><img src="/logos/portfolio15.png" alt="Epidemic Sound" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-higgsfield" alt="Higgsfield" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-capcut" alt="CapCut" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-elevenlabs" alt="ElevenLabs" /></span>
            </div>
            <div class="brand-set" aria-hidden="true">
              <span class="brand-slot"><img src="/logos/portfolio16.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio17.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio18.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio15.png" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-higgsfield" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-capcut" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-elevenlabs" alt="" /></span>
            </div>
            <div class="brand-set" aria-hidden="true">
              <span class="brand-slot"><img src="/logos/portfolio16.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio17.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio18.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio15.png" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-higgsfield" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-capcut" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-elevenlabs" alt="" /></span>
            </div>
            <div class="brand-set" aria-hidden="true">
              <span class="brand-slot"><img src="/logos/portfolio16.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio17.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio18.png" alt="" /></span>
              <span class="brand-slot"><img src="/logos/portfolio15.png" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-higgsfield" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-capcut" alt="" /></span>
              <span class="brand-slot"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="brand-elevenlabs" alt="" /></span>
            </div>
          </div>
        </div>
      </div>

      <!-- WORK: THE VINYLS -->
      <section id="work" class="work">
        <div class="wrap">
          <div id="vinylView">
            <p class="label" data-reveal>My work</p>
            <h2 data-reveal style="--reveal-delay: .06s">Pick a record</h2>
            <p class="work-sub" data-reveal style="--reveal-delay: .12s">Three records, three sides of what I make. Click one to explore it.</p>
            <div class="vinyl-row">
              <button class="vinyl" type="button" data-cat="video-editing" aria-label="Explore Video Editing" data-popup="Click to explore" data-reveal>
                <span class="vinyl-float">
                  <span class="vinyl-disc" aria-hidden="true"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#0a0a0a"/><circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="48" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="29" style="fill: #ffffff"/><line x1="82" y1="91" x2="118" y2="91" stroke="rgba(255,255,255,0.30)" stroke-width="1"/><line x1="82" y1="102" x2="118" y2="102" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><line x1="82" y1="112" x2="118" y2="112" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><circle cx="100" cy="100" r="4.5" fill="#000000"/></svg></span>
                  <span class="vinyl-sleeve">
                    <img src="/vinyl-sleeve.png" alt="" aria-hidden="true" />
                    <span class="sleeve-text">
                      <span class="sleeve-idx">01</span>
                      <span class="sleeve-name">Video Editing</span>
                      <span class="sleeve-explore">Click to explore &darr;</span>
                    </span>
                  </span>
                </span>
              </button>
              <button class="vinyl" type="button" data-cat="videography" aria-label="Explore Videography" data-popup="Click to explore" data-reveal style="--reveal-delay: .1s">
                <span class="vinyl-float">
                  <span class="vinyl-disc" aria-hidden="true"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#0a0a0a"/><circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="48" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="29" style="fill: #ffffff"/><line x1="82" y1="91" x2="118" y2="91" stroke="rgba(255,255,255,0.30)" stroke-width="1"/><line x1="82" y1="102" x2="118" y2="102" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><line x1="82" y1="112" x2="118" y2="112" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><circle cx="100" cy="100" r="4.5" fill="#000000"/></svg></span>
                  <span class="vinyl-sleeve">
                    <img src="/vinyl-sleeve.png" alt="" aria-hidden="true" />
                    <span class="sleeve-text">
                      <span class="sleeve-idx">02</span>
                      <span class="sleeve-name">Videography</span>
                      <span class="sleeve-explore">Click to explore &darr;</span>
                    </span>
                  </span>
                </span>
              </button>
              <button class="vinyl" type="button" data-cat="partnerships" aria-label="Explore Partnerships" data-popup="Click to explore" data-reveal style="--reveal-delay: .2s">
                <span class="vinyl-float">
                  <span class="vinyl-disc" aria-hidden="true"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#0a0a0a"/><circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="48" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="100" cy="100" r="38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><circle cx="100" cy="100" r="29" style="fill: #ffffff"/><line x1="82" y1="91" x2="118" y2="91" stroke="rgba(255,255,255,0.30)" stroke-width="1"/><line x1="82" y1="102" x2="118" y2="102" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><line x1="82" y1="112" x2="118" y2="112" stroke="rgba(255,255,255,0.30)" stroke-width="0.7"/><circle cx="100" cy="100" r="4.5" fill="#000000"/></svg></span>
                  <span class="vinyl-sleeve">
                    <img src="/vinyl-sleeve.png" alt="" aria-hidden="true" />
                    <span class="sleeve-text">
                      <span class="sleeve-idx">03</span>
                      <span class="sleeve-name">Partnerships</span>
                      <span class="sleeve-explore">Click to explore &darr;</span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div id="workDetail" class="work-detail" hidden>
            <button class="work-back" id="workBack" type="button">&larr; Back to records</button>
            <div class="work-detail-head" data-reveal>
              <p class="label" id="detailIdx">01 &middot; My work</p>
              <h2 id="detailTitle">Video Editing</h2>
              <p class="work-desc" id="detailDesc"></p>
              <p class="work-count" id="detailCount"></p>
            </div>
            <div class="work-grid" id="workGallery"></div>
            <div id="workSubsection" hidden>
              <div class="work-sub-head">
                <p class="label" id="detailSubIdx">01.1 &middot; My work</p>
                <h3 id="detailSubTitle">Tutorials</h3>
                <p class="work-desc" id="detailSubDesc"></p>
              </div>
              <div class="work-grid work-grid--wide" id="workSubGallery"></div>
            </div>
            <p class="work-note" data-reveal>Hover a frame to preview &middot; Click to watch</p>
          </div>
        </div>
      </section>

      <!-- COURSE -->
      <section class="course" id="course">
        <div class="wrap">
          <p class="label" data-reveal>New &middot; A beginner course by @cal1star</p>
          <h2 style="margin: 0; --reveal-delay: .06s" data-reveal><img class="course-logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="editing101" alt="Editing 101: made easy" /></h2>
          <p class="course-copy" data-reveal style="--reveal-delay: .12s">Editing changed my life, and I want to make it feel easy for you. I&rsquo;ll walk you through CapCut first, then DaVinci Resolve, then the fun stuff: the effects and transitions you see in my videos. No experience needed, just come as you are.</p>
          <img class="first-line-img" data-reveal style="--reveal-delay: .18s" src="/course/be-first-in-line.png" alt="Be first in line!" />
          <form class="waitlist" id="waitlistForm" novalidate data-reveal style="--reveal-delay: .24s">
            <label class="sr" for="waitlistEmail" style="position:absolute; left:-9999px;">Your email</label>
            <input id="waitlistEmail" type="email" name="email" placeholder="Your email" autocomplete="email" required />
            <button class="btn btn-light" type="submit">Join the waitlist &rarr;</button>
          </form>
          <p class="form-note" id="formNote" role="status"></p>
          <a class="gumroad-link" data-reveal style="--reveal-delay: .3s" href="https://cal1starediting.gumroad.com" target="_blank" rel="noopener">Or browse my Gumroad store &rarr;</a>
          <p class="launch-line" data-reveal style="--reveal-delay: .36s">Launching <b>early January</b> &middot; The Cutting Room community on Discord</p>
        </div>
      </section>

      <!-- TOOLKIT -->
      <section id="toolkit">
        <div class="wrap">
          <p class="label" data-reveal>Behind the edits</p>
          <h2 data-reveal style="--reveal-delay: .06s">My Toolkit</h2>
          <div class="toolkit-grid">
            <div class="tool" data-popup="In my toolkit" data-reveal><img src="/apps/dr.png" alt="DaVinci Resolve app icon" /><p>DaVinci Resolve</p></div>
            <div class="tool" data-popup="In my toolkit" data-reveal style="--reveal-delay: .07s"><img src="/apps/fcp.png" alt="Final Cut Pro app icon" /><p>Final Cut Pro</p></div>
            <div class="tool" data-popup="In my toolkit" data-reveal style="--reveal-delay: .14s"><img src="/apps/vs.png" alt="Video Star app icon" /><p>Video Star</p></div>
            <div class="tool" data-popup="In my toolkit" data-reveal style="--reveal-delay: .21s"><img src="/apps/cc.png" alt="CapCut app icon" /><p>CapCut</p></div>
            <div class="tool" data-popup="In my toolkit" data-reveal style="--reveal-delay: .28s"><img src="/apps/c.png" alt="Canva app icon" /><p>Canva</p></div>
            <div class="tool" data-popup="In my toolkit" data-reveal style="--reveal-delay: .35s"><img src="/apps/claude.png" alt="Claude app icon" /><p>Claude</p></div>
          </div>
        </div>
      </section>

    </main>

    <!-- FOOTER / CONTACT -->
    <footer id="contact">
      <div class="wrap">
        <div class="foot-grid">
          <div data-reveal>
            <img class="foot-logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-asset="cal" alt="Cal1star Editing" />
            <p class="tagline">For partnerships, tutorials or just to say hi, you can find me on Instagram at @cal1star.</p>
            <div class="btn-row" style="margin-top: 26px;">
              <a class="btn btn-light" href="/course" target="_blank" rel="noopener">Join the waitlist</a>
              <a class="btn btn-outline" href="https://cal1starediting.gumroad.com" target="_blank" rel="noopener">Gumroad store</a>
            </div>
          </div>
          <div class="foot-side" data-reveal style="--reveal-delay: .1s">
            <ul class="foot-links">
              <li><a href="#top">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#work">My Work</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom" data-reveal style="--reveal-delay: .15s">
          <span>&copy; 2026 CAL1STAR Editing</span>
          <span>Psalm 46:5</span>
        </div>
      </div>
    </footer>

    <dialog class="lightbox" id="lightbox" aria-label="Watch work piece">
      <video id="lbVideo" controls playsinline></video>
      <div class="lb-bar">
        <p id="lbTag"></p>
        <button class="lb-close" id="lbClose" type="button">Close</button>
      </div>
    </dialog>`;

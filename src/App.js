import { useState, useEffect, useRef } from "react";

// ── Kanagawa palette (same as Kavin's Neovim) ─────────────────
const C = {
  bg: "#1F1F28",        // sumiInk1
  bgDim: "#16161D",     // sumiInk0
  surface: "#2A2A37",   // sumiInk2
  border: "#363646",    // sumiInk4
  wave: "#223249",      // waveBlue1
  fg: "#DCD7BA",        // fujiWhite
  muted: "#727169",     // fujiGray
  comment: "#54546D",
  blue: "#7E9CD8",      // crystalBlue
  yellow: "#E6C384",    // carpYellow
  green: "#98BB6C",     // springGreen
  violet: "#957FB8",    // oniViolet
  red: "#E46876",       // waveRed
  aqua: "#7AA89F",      // waveAqua2
  orange: "#FFA066",    // surimiOrange
};

const tagColors = {
  GO: C.blue,
  LANG: C.violet,
  DSA: C.aqua,
  "AI/ML": C.green,
  DEV: C.orange,
};

const projects = [
  {
    name: "gost",
    tag: "GO",
    desc: "A distributed key-value store built from scratch. Published on pkg.go.dev (v0.1.4) with a client library.",
    link: "https://pkg.go.dev/github.com/kavinbharathii/gost",
  },
  {
    name: "quest",
    tag: "GO",
    desc: "BM25-powered bash history search with a Bubbletea TUI. Ctrl-R with an actual relevance model.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "lox",
    tag: "LANG",
    desc: "An interpreted programming language, built on Java. Scanner to parser to tree-walking interpreter.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "wave function collapse",
    tag: "DSA",
    desc: "An algorithm for procedural image generation — constraint solving, one tile at a time.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "marching squares",
    tag: "DSA",
    desc: "ASCII art renderer using the marching squares algorithm. Images in, terminal art out.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "NEAT algorithm",
    tag: "AI/ML",
    desc: "NeuroEvolution of Augmenting Topologies, training agents in a game environment.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "genetic algorithm",
    tag: "AI/ML",
    desc: "Genetic algorithms applied to optimal model feature selection.",
    link: "https://github.com/kavinbharathii",
  },
  {
    name: "industrial robot",
    tag: "DEV",
    desc: "Industrial-scale robot built with ROS for handling machinery and tools.",
    link: "https://github.com/kavinbharathii",
  },
];

const offline = [
  {
    k: "◆ hollow knight",
    v: "Peak games — both of them. Mossbag lore videos count as study time.",
    color: C.violet,
  },
  {
    k: "♪ guitar & music",
    v: "Learning guitar, currently in the calluses-forming phase. Music enthusiast in general.",
    color: C.yellow,
  },
  {
    k: "❧ reading",
    v: "Mystery, mostly. Sherlock Holmes on repeat — and actively solving Cain's Jawbone. Yes, actually solving it.",
    color: C.aqua,
  },
  {
    k: "⌁ investing",
    v: "Index funds, SIPs, long horizons. Deliberately boring money.",
    color: C.green,
  },
  {
    k: "✦ linux ricing",
    v: "Omarchy on Hyprland. Volume keys tuned to 1% increments with OSD. This is normal behaviour.",
    color: C.blue,
  },
  {
    k: "⚔ gaming",
    v: "From AAA worlds to indie metroidvanias. Lore-first player.",
    color: C.red,
  },
];

const sections = ["intro", "now", "skills", "projects", "offline", "contact"];

// ── ASCII background field ────────────────────────────────────
const GLYPHS = ["λ", "{", "}", ";", "*", "·", "~", "/", ">", "≈", "⊹", "0", "1", "#"];
const GLYPH_COLORS = ["#7E9CD8", "#957FB8", "#7AA89F", "#E6C384", "#727169"];

function AsciiBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // floating glyph dust
    const count = Math.min(70, Math.floor(window.innerWidth / 18));
    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      color: GLYPH_COLORS[Math.floor(Math.random() * GLYPH_COLORS.length)],
      speed: 0.08 + Math.random() * 0.22,
      size: 10 + Math.random() * 5,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.18,
    }));

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // ── drifting glyph dust ──
      for (const p of parts) {
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase); // twinkle
        ctx.font = `${p.size}px 'IBM Plex Mono', monospace`;
        ctx.globalAlpha = 0.05 + tw * 0.09;
        ctx.fillStyle = p.color;
        ctx.fillText(p.ch, p.x, p.y);
        p.y -= p.speed;
        p.x += p.drift + Math.sin(t * 0.6 + p.phase) * 0.08;
        if (p.y < -16) {
          p.y = h + 16;
          p.x = Math.random() * w;
          p.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      // ── the great ASCII wave (a kanagawa, of sorts) ──
      ctx.font = "13px 'IBM Plex Mono', monospace";
      const bands = [
        { base: h - 46, amp: 9, freq: 0.045, speed: 1.0, ch: "~", color: C.blue, alpha: 0.16 },
        { base: h - 30, amp: 7, freq: 0.06, speed: -0.7, ch: "≈", color: C.aqua, alpha: 0.12 },
        { base: h - 16, amp: 5, freq: 0.05, speed: 0.5, ch: "∿", color: C.wave, alpha: 0.5 },
      ];
      for (const b of bands) {
        ctx.fillStyle = b.color;
        for (let x = 0; x < w; x += 14) {
          const y = b.base + Math.sin(x * b.freq + t * b.speed) * b.amp;
          const crest = Math.sin(x * b.freq + t * b.speed) > 0.92;
          ctx.globalAlpha = crest ? b.alpha + 0.1 : b.alpha;
          ctx.fillText(crest ? "*" : b.ch, x, y);
        }
      }
      ctx.globalAlpha = 1;

      t += 0.016;
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="ascii-bg" aria-hidden="true" />;
}

// ── typing effect for the hero prompt ─────────────────────────
function useTyped(text, speed = 90, delay = 400) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setOut(text); return; }
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, [text, speed, delay]);
  return out;
}

export default function KavinSite() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const typedCmd = useTyped("whoami");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? Math.round((h.scrollTop / max) * 100) : 0);

      let current = "intro";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "j") window.scrollBy({ top: 120, behavior: "smooth" });
      if (e.key === "k") window.scrollBy({ top: -120, behavior: "smooth" });
      if (e.key === "G") window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      if (e.key === "g") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pctLabel =
    scrollPct <= 0 ? "Top" : scrollPct >= 100 ? "Bot" : `${scrollPct}%`;

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Sans:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .site {
          background: ${C.bg};
          color: ${C.fg};
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.65;
          min-height: 100vh;
          padding-bottom: 64px;
          position: relative;
        }
        .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .ascii-bg {
          position: fixed; inset: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 0;
        }
        .content { position: relative; z-index: 1; }

        .wrap { max-width: 820px; margin: 0 auto; padding: 0 24px; }

        section { padding: 72px 0 24px; }

        .label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: ${C.comment};
          letter-spacing: 0.04em;
          margin-bottom: 28px;
          user-select: none;
        }
        .label b { color: ${C.muted}; font-weight: 400; }
        .label .ic { color: ${C.comment}; margin-right: 6px; }

        /* hero */
        .hero { padding-top: 18vh; padding-bottom: 48px; }
        .prompt {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          color: ${C.green};
          margin-bottom: 18px;
          min-height: 21px;
        }
        .prompt .path { color: ${C.blue}; }
        .prompt .cmd { color: ${C.fg}; }
        .prompt .caret {
          display: inline-block; width: 8px; height: 15px;
          background: ${C.fg}; vertical-align: text-bottom;
          margin-left: 2px;
          animation: blink 1.1s steps(1) infinite;
        }
        h1 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 9vw, 84px);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 22px;
          animation: rise 700ms cubic-bezier(.2,.7,.2,1) both;
        }
        h1 .accent { color: ${C.blue}; animation: blink 1.4s steps(1) infinite; }
        @keyframes blink { 0%, 60% { opacity: 1 } 61%, 100% { opacity: 0 } }
        @keyframes rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }

        .lede {
          font-size: 19px; color: ${C.fg}; max-width: 56ch;
          animation: rise 700ms 120ms cubic-bezier(.2,.7,.2,1) both;
        }
        .lede em { color: ${C.yellow}; font-style: normal; }
        .lede .q { color: ${C.violet}; }
        .sub {
          margin-top: 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13.5px;
          color: ${C.muted};
          animation: rise 700ms 220ms cubic-bezier(.2,.7,.2,1) both;
        }
        .sub a { color: ${C.aqua}; text-decoration: none; border-bottom: 1px dotted ${C.aqua}; }
        .sub a:hover, .sub a:focus-visible { color: ${C.fg}; border-bottom-color: ${C.fg}; }

        h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }
        h2 .hx { color: ${C.comment}; font-family: 'IBM Plex Mono', monospace; font-size: 18px; margin-right: 10px; }
        .body { color: ${C.fg}; max-width: 62ch; }

        /* now list — minimal & mysterious */
        .now-list { list-style: none; max-width: 58ch; }
        .now-list li {
          padding: 13px 0;
          border-bottom: 1px solid ${C.border};
          display: flex;
          gap: 14px;
          align-items: baseline;
          font-size: 16.5px;
        }
        .now-list li:last-child { border-bottom: none; }
        .now-list .bullet { color: ${C.yellow}; font-family: 'IBM Plex Mono', monospace; font-size: 13px; flex-shrink: 0; }
        .now-list .dim { color: ${C.muted}; }

        /* skills — syntax blocks */
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 14px;
        }
        .code-block {
          background: ${C.bgDim};
          border: 1px solid ${C.border};
          border-radius: 8px;
          padding: 18px 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          line-height: 1.9;
          transition: border-color 150ms ease;
        }
        .code-block:hover { border-color: ${C.comment}; }
        .code-block .kw { color: ${C.violet}; }
        .code-block .fn { color: ${C.blue}; }
        .code-block .tagname { color: ${C.aqua}; }
        .code-block .typ { color: ${C.yellow}; }
        .code-block .op { color: ${C.orange}; }
        .code-block .punc { color: ${C.muted}; }
        .code-block .str { color: ${C.green}; }
        .code-block .item { color: ${C.fg}; padding-left: 22px; display: block; }

        /* projects */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 14px;
        }
        .card {
          display: block;
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 8px;
          padding: 20px;
          text-decoration: none;
          color: ${C.fg};
          transition: transform 120ms ease, border-color 120ms ease;
        }
        .card:hover, .card:focus-visible {
          transform: translateY(-2px);
          border-color: ${C.blue};
          outline: none;
        }
        .card-top {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 12px;
          margin-bottom: 10px;
        }
        .card-name { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 500; }
        .card-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 10.5px;
          letter-spacing: 0.12em;
          padding: 2px 8px;
          border-radius: 4px;
          background: ${C.bgDim};
          flex-shrink: 0;
        }
        .card-desc { font-size: 14.5px; color: ${C.muted}; line-height: 1.55; }

        /* beyond code */
        .beyond { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 4px 28px; }
        .beyond-item { padding: 14px 0; }
        .beyond-k { font-family: 'IBM Plex Mono', monospace; font-size: 13.5px; margin-bottom: 5px; }
        .beyond-v { font-size: 15px; color: ${C.muted}; line-height: 1.55; }

        /* contact */
        .contact-cols {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 28px;
          margin-top: 26px;
          max-width: 640px;
        }
        .contact-block {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13.5px;
          line-height: 2;
        }
        .contact-block .h { color: ${C.comment}; }
        .contact-block .kw { color: ${C.violet}; }
        .contact-block .punc { color: ${C.muted}; }
        .contact-block .item { color: ${C.fg}; padding-left: 20px; display: block; }
        .contact-block .dim { color: ${C.muted}; }

        .contact-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          padding: 10px 18px;
          border-radius: 6px;
          border: 1px solid ${C.border};
          background: ${C.surface};
          color: ${C.fg};
          text-decoration: none;
          transition: border-color 120ms ease, color 120ms ease, transform 120ms ease;
        }
        .btn:hover, .btn:focus-visible { border-color: ${C.yellow}; color: ${C.yellow}; transform: translateY(-2px); outline: none; }

        .colophon {
          margin-top: 56px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          color: ${C.comment};
        }

        /* statusline */
        .statusline {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          height: 36px;
          background: ${C.bgDim};
          border-top: 1px solid ${C.border};
          display: flex;
          align-items: stretch;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          z-index: 50;
          user-select: none;
        }
        .sl-mode {
          background: ${C.blue};
          color: ${C.bgDim};
          font-weight: 500;
          display: flex; align-items: center;
          padding: 0 14px;
          letter-spacing: 0.05em;
        }
        .sl-file { display: flex; align-items: center; padding: 0 14px; color: ${C.fg}; }
        .sl-spacer { flex: 1; }
        .sl-hint { display: flex; align-items: center; padding: 0 14px; color: ${C.comment}; }
        .sl-pos {
          background: ${C.wave};
          color: ${C.fg};
          display: flex; align-items: center;
          padding: 0 14px;
        }

        @media (max-width: 640px) {
          section { padding: 52px 0 16px; }
          .hero { padding-top: 12vh; }
          .sl-hint { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .card, .btn { transition: none; }
          h1, .lede, .sub { animation: none; }
          h1 .accent, .prompt .caret { animation: none; }
        }
      `}</style>

      <AsciiBackground />

      <div className="content">
        {/* ── hero ── */}
        <header className="wrap hero" id="intro">
          <div className="prompt">
            <span className="path">~/kavin</span> <span>❯</span>{" "}
            <span className="cmd">{typedCmd}</span>
            <span className="caret" />
          </div>
          <h1>
            Kavin Bharathi<span className="accent">_</span>
          </h1>
          <p className="lede">
            Software engineer, designer, tryhard.<br />
            A hectic love for everything <span className="q">"</span><em>code</em><span className="q">"</span>.
          </p>
          <p className="sub mono">
            ⌖ Coimbatore, India ·{" "}
            <a href="https://github.com/kavinbharathii" target="_blank" rel="noreferrer">
              @kavinbharathii
            </a>
          </p>
        </header>

        {/* ── now ── */}
        <section className="wrap" id="now">
          <div className="label"><span className="ic">λ</span>-- <b>now</b> ----------------------------------------</div>
          <h2><span className="hx">❯</span>Usually found</h2>
          <ul className="now-list">
            <li>
              <span className="bullet">▸</span>
              <span>Taking apart things that work. Building things from scratch.</span>
            </li>
            <li>
              <span className="bullet">▸</span>
              <span>Somewhere deep in a rabbit hole — <span className="dim">usually databases, sometimes worse.</span></span>
            </li>
            <li>
              <span className="bullet">▸</span>
              <span>Reading the source when the docs run out.</span>
            </li>
            <li>
              <span className="bullet">▸</span>
              <span className="dim">The rest is undocumented behaviour.</span>
            </li>
          </ul>
        </section>

        {/* ── skills ── */}
        <section className="wrap" id="skills">
          <div className="label"><span className="ic">⚒</span>-- <b>skills</b> --------------------------------------</div>
          <h2><span className="hx">❯</span>The toolkit</h2>
          <div className="skill-grid">
            <div className="code-block">
              <span className="fn">languages</span><span className="punc">() {"{"}</span>
              <span className="item">Go · Python · Rust</span>
              <span className="item">C · JavaScript · TypeScript · Java</span>
              <span className="punc">{"}"}</span>
            </div>
            <div className="code-block">
              <span className="punc">&lt;</span><span className="tagname">Tech</span>
              <span className="item">Django · Next.js · React</span>
              <span className="item">Node.js · Express · Celery</span>
              <span className="punc">/&gt;</span>
            </div>
            <div className="code-block">
              <span className="fn">tools</span> <span className="op">:=</span> <span className="typ">Tools</span><span className="punc">{"{"}</span>
              <span className="item">Docker · AWS · Postgres</span>
              <span className="item">Figma · Firebase · Supabase</span>
              <span className="item">NumPy · TensorFlow · DuckDB</span>
              <span className="punc">{"}"}</span>
            </div>
            <div className="code-block">
              <span className="str">{"`${"}</span><span className="kw">soft_skills</span>
              <span className="item">Logical Reasoning · Practical Thinking</span>
              <span className="item">Ownership · Communication · Adaptability</span>
              <span className="str">{"}`"}</span>
            </div>
          </div>
        </section>

        {/* ── projects ── */}
        <section className="wrap" id="projects">
          <div className="label"><span className="ic">⊹</span>-- <b>projects</b> ------------------------------------</div>
          <h2><span className="hx">❯</span>Things I've built</h2>
          <div className="grid">
            {projects.map((p) => (
              <a className="card" key={p.name} href={p.link} target="_blank" rel="noreferrer">
                <div className="card-top">
                  <span className="card-name" style={{ color: tagColors[p.tag] }}>{p.name}</span>
                  <span className="card-tag" style={{ color: tagColors[p.tag] }}>{p.tag}</span>
                </div>
                <p className="card-desc">{p.desc}</p>
              </a>
            ))}
          </div>
          <p className="colophon" style={{ marginTop: 28 }}>
            ✎ plus articles on tech & development over at{" "}
            <a href="https://dev.to/kavinbharathi" target="_blank" rel="noreferrer" style={{ color: C.aqua, textDecoration: "none" }}>
              dev.to/kavinbharathi
            </a>
          </p>
        </section>

        {/* ── offline ── */}
        <section className="wrap" id="offline">
          <div className="label"><span className="ic">☾</span>-- <b>offline</b> -------------------------------------</div>
          <h2><span className="hx">❯</span>Away from the keyboard</h2>
          <div className="beyond">
            {offline.map((b) => (
              <div className="beyond-item" key={b.k}>
                <div className="beyond-k" style={{ color: b.color }}>{b.k}</div>
                <div className="beyond-v">{b.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── contact ── */}
        <section className="wrap" id="contact">
          <div className="label"><span className="ic">✉</span>-- <b>contact</b> -------------------------------------</div>
          <h2><span className="hx">❯</span>Say hi</h2>
          <p className="body">
            Open to talking about Go, databases, Linux setups, or why Silksong
            was worth the wait.
          </p>

          <div className="contact-cols">
            <div className="contact-block">
              <span className="h">// languages</span><br />
              <span className="kw">fluent</span> <span className="punc">{"{"}</span>
              <span className="item">English · Tamil</span>
              <span className="punc">{"}"}</span><br />
              <span className="kw">basic</span> <span className="punc">{"{"}</span>
              <span className="item">German · French</span>
              <span className="punc">{"}"}</span>
            </div>
            <div className="contact-block">
              <span className="h">// passion</span><br />
              <span className="dim">
                Everything tech, inspired by creative ventures and innovative
                ideas. Music, gaming, mysteries.
              </span>
            </div>
          </div>

          <div className="contact-links">
            <a className="btn" href="https://github.com/kavinbharathii" target="_blank" rel="noreferrer"> GitHub</a>
            <a className="btn" href="mailto:r.m.kavinbharathi@gmail.com">✉ Email</a>
            <a className="btn" href="https://dev.to/kavinbharathi" target="_blank" rel="noreferrer">✎ dev.to</a>
            <a className="btn" href="https://www.linkedin.com/in/kavinbharathii" target="_blank" rel="noreferrer">⊞ LinkedIn</a>
          </div>

          <p className="colophon">
            colorscheme: kanagawa — same as my Neovim. the wave at the bottom? also kanagawa. try j / k / gg / G.
          </p>
        </section>
      </div>

      {/* ── statusline ── */}
      <div className="statusline" role="contentinfo">
        <div className="sl-mode">NORMAL</div>
        <div className="sl-file">~/kavin/{activeSection}.md</div>
        <div className="sl-spacer" />
        <div className="sl-hint">j/k to scroll · gg top · G bottom</div>
        <div className="sl-pos">{pctLabel}</div>
      </div>
    </div>
  );
}

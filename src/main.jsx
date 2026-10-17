import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const A = {
  jhopli: import.meta.env.BASE_URL + 'images/Priyadarshini Jhopli.png',
  nakhre: import.meta.env.BASE_URL + 'images/Priyadarshini Nakhre.png',
  mand: import.meta.env.BASE_URL + 'images/Priyadarshini Mand.png',
  lakshya: import.meta.env.BASE_URL + 'images/Priyadarshini Lakshya.png',
  marel: import.meta.env.BASE_URL + 'images/Priyadarshini Marel.png',
  normal: import.meta.env.BASE_URL + 'images/Priyadarshini Normal.png',
  final: import.meta.env.BASE_URL + 'images/Birthday.jpg'
};
const jokes = [
  { key:'jhopli', title:'Madam, kuthe hotat tumhi? 😴', lines:['मी: पियू, कुठे होतीस तू?',' “अरे झोपली होती मी!”','मी: तुझं नाव प्रियदर्शिनी आहे, पण खरं नाव निद्रदर्शिनीच असायला पाहिजे! 😂'], doodle:'💤', alt:'Priyadarshini — sleep joke photograph' },
  { key:'nakhre', title:'Majhe gunach ase aahet… 😤', lines:['मी: ठीक आहे, आता मी नाही बोलणार तुझ्याशी!',' “नखरे करायचे नाहीत माझ्यासमोर!”','मी: तुझ्यासमोर नाही करणार, तर कोणासमोर करणार? 😂❤️'], doodle:'💬', alt:'Priyadarshini — nakhre joke photograph' },
  { key:'mand', title:'Kay? 😂', lines:['मी: मॅडमला विचारलं, पण त्या ऐकतच नाहीयेत!',' “मंद आहेस का तू जरा?”','मी: नाही गं, हुशार आहे! लक्ष हुशार लोकच देणार ना! 😂'], doodle:'❔', alt:'Priyadarshini — mand joke photograph' },
  { key:'lakshya', title:'Nusta gyaan denar 🙄', lines:['मी: अगं, पियू अशीच आहे. ती कोणाचं ऐकत नाही. मी कितीही सांगितलं तरी तिचं आपलं वेगळंच!',' “लक्ष द्यायचं नसतं ह्याच्याकडे!”','मी: लक्ष देणारे देणार, ज्यांना कळणार! 😎😂'], doodle:'🙄', alt:'Priyadarshini — lakshya joke photograph' },
  { key:'marel', title:'Bass ha ata!! 😡', lines:['मी: तुला चिडवायला खूप मजा येते!',' “मारेलं मी तुला!!”','मी: तू रागावतेस ना, तेव्हा अजूनच सुंदर दिसतेस! 😂❤️'], doodle:'💥', alt:'Priyadarshini — marel joke photograph' }
];
const letter = `Dear Piyu, 💗\n\nI hope your birthday brings you the kind of happiness that stays long after the candles are blown out. You have such a warm and comforting presence, and being around you always feels easy and special. You have a way of making ordinary moments memorable, and I truly cherish that about you. Your kindness, your softness, and your adorable little ways make you incredibly precious to me. 🥹🫶🏻\n\nI'm really thankful for all the memories we've created together, from our random conversations and silly jokes to the moments when we simply stayed beside each other without needing to say much. You have brought so much laughter and comfort into my life, and I hope you know how much your friendship means to me. Even the smallest moments with you have a way of becoming some of my favorite memories. ❤️\n\nAlso, thank you for putting up with my dramatic moments, unnecessary teasing, and endless nonsense. 😭😂 Somehow, you manage to handle me with more patience than I probably deserve, and I appreciate that more than I can explain. Life would definitely be much less fun without our arguments, jokes, and all the chaos we create together. 🤏🏻💗\n\nOn your special day, I hope you receive all the love, peace, and happiness you deserve. May this new year of your life bring exciting opportunities, beautiful surprises, and countless reasons to feel proud of yourself. I hope every dream you carry in your heart slowly turns into reality, and that you always remember how loved and valued you are.\n\nKeep being the wonderful, funny, caring, and slightly annoying Piyu that I know and adore. Never lose your spark, your sweetness, or the little things that make you completely yourself. And yes, please continue allowing me to bother you, because I have no plans of stopping anytime soon. 😭🤍\n\nHappy Birthday, Priyadarshine! 🎂🎀💗\n\nHere's to another year of laughter, unforgettable moments, playful fights, random conversations, and memories that we'll keep adding to our collection. I'm so lucky to have you in my life, and I hope this birthday reminds you of just how special you are to me. Thank you for being you and for making life brighter in your own beautiful way. I appreciate you endlessly. 🫂💗\n\n 🫶🏻✨`;

function Photo({src, alt, className=''}) {
  const [failed,setFailed] = useState(false);
  useEffect(()=>setFailed(false),[src]);
  return failed ? <div className={`photo-placeholder ${className}`} role="img" aria-label={`${alt}. Required photo file is missing.`}><span>✿</span><strong>Photo not added yet</strong><small>Missing file: <code>{src.split('/').pop()}</code></small><small>Copy this photo into <code>public/images/</code></small></div> : <img className={`photo ${className}`} src={src} alt={alt} onError={()=>setFailed(true)} />;
}
function Game({onWin}) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const gameRef = useRef(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Drag the pink heart left and release to launch it!');

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return undefined;

    const width = Math.max(280, host.clientWidth - 38);
    const height = 360;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.touchAction = 'none';

    const anchor = { x: Math.min(92, width * 0.22), y: height - 82 };
    const radius = 14;
    const groundY = height - 15;
    const baseY = height - 43;
    const towerX = Math.min(width - 82, width * 0.72);
    const makeBlocks = () => {
      const result = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3 - row; col++) {
          const x = towerX + col * 28 - row * 14;
          const y = baseY - row * 27;
          result.push({ x, y, startX: x, startY: y, w: 25, h: 25, vx: 0, vy: 0, angle: 0, spin: 0, fallen: false });
        }
      }
      return result;
    };
    const state = {
      ball: { x: anchor.x, y: anchor.y, vx: 0, vy: 0, launched: false, dragging: false, resting: false },
      blocks: makeBlocks(),
      down: false,
      pointerId: null,
      attempts: 0,
      hit: false,
      won: false,
      disposed: false,
      raf: 0,
      winTimer: null,
      lastTime: 0
    };
    gameRef.current = { state, reset: null };
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const pointFromEvent = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (width / rect.width),
        y: (event.clientY - rect.top) * (height / rect.height)
      };
    };
    const reset = () => {
      if (state.winTimer) window.clearTimeout(state.winTimer);
      state.ball = { x: anchor.x, y: anchor.y, vx: 0, vy: 0, launched: false, dragging: false, resting: false };
      state.blocks = makeBlocks();
      state.down = false;
      state.pointerId = null;
      state.hit = false;
      state.won = false;
      state.winTimer = null;
      state.attempts = 0;
      setAttempts(0);
      setMessage('Drag the pink heart left and release to launch it!');
    };
    gameRef.current.reset = reset;

    const pointerDown = (event) => {
      if (state.ball.launched || state.won || event.button === 2) return;
      const point = pointFromEvent(event);
      if (Math.hypot(point.x - state.ball.x, point.y - state.ball.y) > radius + 22) return;
      event.preventDefault();
      state.down = true;
      state.pointerId = event.pointerId;
      state.ball.dragging = true;
      try { canvas.setPointerCapture(event.pointerId); } catch {}
      setMessage('Good! Pull the heart back, then let go.');
    };
    const pointerMove = (event) => {
      if (!state.down || event.pointerId !== state.pointerId) return;
      event.preventDefault();
      const point = pointFromEvent(event);
      // Pull backward to the left; limit the stretch so the heart stays on-screen.
      const dx = Math.max(-82, Math.min(8, point.x - anchor.x));
      const dy = Math.max(-68, Math.min(54, point.y - anchor.y));
      state.ball.x = anchor.x + dx;
      state.ball.y = anchor.y + dy;
      state.ball.vx = 0;
      state.ball.vy = 0;
    };
    const pointerUp = (event) => {
      if (!state.down) return;
      if (event.pointerId !== undefined && state.pointerId !== null && event.pointerId !== state.pointerId) return;
      state.down = false;
      state.ball.dragging = false;
      try {
        if (state.pointerId !== null && canvas.hasPointerCapture(state.pointerId)) canvas.releasePointerCapture(state.pointerId);
      } catch {}
      state.pointerId = null;
      const pullX = anchor.x - state.ball.x;
      const pullY = state.ball.y - anchor.y;
      const distance = Math.hypot(pullX, pullY);
      if (distance < 9) {
        state.ball.x = anchor.x;
        state.ball.y = anchor.y;
        setMessage('Pull the heart farther back before releasing.');
        return;
      }
      state.ball.launched = true;
      // Canvas velocity is positive downward. A heart pulled upward therefore launches with negative Y velocity.
      state.ball.vx = Math.max(4.5, Math.min(10.5, pullX * 0.17));
      state.ball.vy = Math.max(-9.5, Math.min(7, (state.ball.y - anchor.y) * 0.17));
      state.attempts += 1;
      setAttempts(state.attempts);
      setMessage('Nice shot! Aim for the wooden tower.');
    };

    const roundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
      ctx.stroke();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Ground
      ctx.fillStyle = '#a9bd94';
      ctx.fillRect(0, groundY, width, height - groundY);
      ctx.fillStyle = '#91a87b';
      ctx.fillRect(0, groundY, width, 3);

      // Slingshot handle and fork
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#9b6b45';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(anchor.x - 2, anchor.y + 25);
      ctx.lineTo(anchor.x, anchor.y + 3);
      ctx.lineTo(anchor.x - 16, anchor.y - 16);
      ctx.moveTo(anchor.x, anchor.y + 3);
      ctx.lineTo(anchor.x + 16, anchor.y - 16);
      ctx.stroke();
      ctx.strokeStyle = '#c48b59';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(anchor.x - 2, anchor.y + 25);
      ctx.lineTo(anchor.x, anchor.y + 3);
      ctx.moveTo(anchor.x, anchor.y + 3);
      ctx.lineTo(anchor.x - 16, anchor.y - 16);
      ctx.moveTo(anchor.x, anchor.y + 3);
      ctx.lineTo(anchor.x + 16, anchor.y - 16);
      ctx.stroke();

      // Elastic bands remain attached until the heart launches.
      if (!state.ball.launched) {
        ctx.strokeStyle = '#9c5264';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(anchor.x - 16, anchor.y - 16);
        ctx.lineTo(state.ball.x, state.ball.y);
        ctx.moveTo(anchor.x + 16, anchor.y - 16);
        ctx.lineTo(state.ball.x, state.ball.y);
        ctx.stroke();
      }

      // Wooden tower
      state.blocks.forEach((block, index) => {
        ctx.save();
        ctx.translate(block.x, block.y);
        ctx.rotate(block.angle);
        ctx.fillStyle = index < 3 ? '#d5a56b' : '#e9c99e';
        ctx.strokeStyle = '#a77d50';
        ctx.lineWidth = 1.5;
        roundedRect(-block.w / 2, -block.h / 2, block.w, block.h, 3);
        ctx.restore();
      });

      // The heart is always drawn, including after a miss or when it settles on the ground.
      ctx.save();
      ctx.translate(state.ball.x, state.ball.y);
      ctx.fillStyle = '#e88fa2';
      ctx.strokeStyle = '#9c5264';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff8ef';
      ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('♥', 0, 1);
      ctx.restore();
    };

    const update = (time) => {
      if (state.disposed) return;
      const dt = state.lastTime ? Math.min(1.8, (time - state.lastTime) / 16.67) : 1;
      state.lastTime = time;
      const ball = state.ball;
      if (ball.launched && !ball.resting) {
        ball.vy += 0.24 * dt;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        ball.vx *= Math.pow(0.998, dt);

        // Keep the ball visible within the playfield rather than letting it disappear off-canvas.
        if (ball.x < radius) { ball.x = radius; ball.vx = Math.abs(ball.vx) * 0.35; }
        if (ball.x > width - radius) { ball.x = width - radius; ball.vx = -Math.abs(ball.vx) * 0.35; }
        if (ball.y < radius) { ball.y = radius; ball.vy = Math.abs(ball.vy) * 0.35; }
        if (ball.y >= groundY - radius) {
          ball.y = groundY - radius;
          ball.vy = 0;
          ball.vx *= 0.82;
          if (Math.abs(ball.vx) < 0.35) { ball.vx = 0; ball.resting = true; }
        }

        for (const block of state.blocks) {
          if (block.fallen) continue;
          const insideX = Math.abs(ball.x - block.x) < block.w / 2 + radius;
          const insideY = Math.abs(ball.y - block.y) < block.h / 2 + radius;
          if (insideX && insideY) {
            state.hit = true;
            block.vx = Math.max(2.2, ball.vx * 0.55);
            block.vy = Math.min(-2.5, ball.vy * 0.3);
            block.spin = ball.y < block.y ? 0.075 : -0.075;
            block.fallen = true;
            ball.vx *= 0.72;
            ball.vy = Math.min(ball.vy, -1.8);
            setMessage('You hit the tower! 💗');
            // Give the tower time to tumble, then continue to the memories.
            if (!state.winTimer) {
              state.winTimer = window.setTimeout(() => {
                if (!state.disposed && !state.won) {
                  state.won = true;
                  onWin();
                }
              }, 1500);
            }
            break;
          }
        }
      }

      state.blocks.forEach((block) => {
        if (block.fallen) {
          block.vy += 0.22 * dt;
          block.x += block.vx * dt;
          block.y += block.vy * dt;
          block.angle += block.spin * dt;
          block.vx *= Math.pow(0.985, dt);
          if (block.y + block.h / 2 >= groundY) {
            block.y = groundY - block.h / 2;
            block.vy = 0;
            block.spin *= 0.82;
          }
          if (block.x < block.w / 2) block.x = block.w / 2;
          if (block.x > width - block.w / 2) block.x = width - block.w / 2;
        }
      });

      draw();
      state.raf = window.requestAnimationFrame(update);
    };

    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointercancel', pointerUp);
    state.raf = window.requestAnimationFrame(update);

    return () => {
      state.disposed = true;
      if (state.winTimer) window.clearTimeout(state.winTimer);
      window.cancelAnimationFrame(state.raf);
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerup', pointerUp);
      window.removeEventListener('pointercancel', pointerUp);
      gameRef.current = null;
    };
  }, [onWin]);

  const retry = () => {
    const game = gameRef.current;
    if (game?.reset) game.reset();
  };

  return <section className="game-card" ref={hostRef}>
    <div className="game-instructions"><span className="tiny-label">A LITTLE CHALLENGE FOR YOU</span><p>{message}</p></div>
    <canvas ref={canvasRef} aria-label="Slingshot game. Drag the pink heart left and release it to hit the wooden tower." />
    <div className="game-footer"><span>Attempts: {attempts}</span><button className="text-button" onClick={retry}>Restart game ↻</button></div>
    <p className="game-hint">Tip: pull left and slightly upward, then release. The heart stays visible if you miss.</p>
  </section>;
}

const balloonWords = [
  'Fabulous',
  'Radiant',
  'Precious',
  'Kind',
  'Extraordinary'
];

function BalloonIntro({ onContinue }) {
  const [popped, setPopped] = useState([]);

  const popBalloon = (index) => {
    setPopped((previous) =>
      previous.includes(index) ? previous : [...previous, index]
    );
  };

  const allPopped = popped.length === balloonWords.length;

  return (
    <section className="balloon-page page-enter">
      <div className="eyebrow">
        <span>A LITTLE MYSTERY</span>
        <i>✦</i>
        <span>JUST FOR PIYU</span>
      </div>

      <h1 className="balloon-heading">
        So, who is <em>Priyadarshini?</em>
      </h1>

      <p className="balloon-intro-copy">
        Five little balloons. Five little truths.
        Pop them to find out. 🎈
      </p>

      <div className="balloon-grid">
        {balloonWords.map((word, index) => {
          const isPopped = popped.includes(index);

          return (
            <div
              key={word}
              className={`balloon-position balloon-position-${index}`}
            >
              {isPopped ? (
                <div className="balloon-reveal" aria-live="polite">
                  <span className="balloon-revealed-word">{word}</span>

                  <div className="balloon-confetti-wrap" aria-hidden="true">
                    {Array.from({ length: 16 }, (_, i) => (
                      <span
                        key={i}
                        className="balloon-confetti"
                        style={{ '--i': i }}
                      >
                        {i % 3 === 0 ? '✦' : i % 3 === 1 ? '✧' : '♥'}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className={`birthday-balloon birthday-balloon-${index}`}
                  onClick={() => popBalloon(index)}
                  aria-label={`Pop balloon ${index + 1}`}
                >
                  <span className="balloon-shine" />
                  <span className="balloon-number">{index + 1}</span>
                  <span className="balloon-string" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="balloon-progress" aria-live="polite">
        {allPopped
          ? 'You found all five little truths! 💗'
          : `${popped.length} of 5 balloons popped`}
      </p>

      {allPopped && (
        <div className="love-letter-entry page-enter">
          <p>And now, a little letter from me to you…</p>

          <button
            type="button"
            className="love-envelope-button"
            onClick={onContinue}
            aria-label="Open the love letter and continue"
          >
            <span className="love-envelope">
              <span className="love-envelope-flap" />
              <span className="love-envelope-heart">♥</span>
            </span>
            <span className="love-envelope-caption">
              A little letter, sealed with love
            </span>
            <span className="love-envelope-action">
              Open it, Piyu ♡
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

function PriyadarshiniCall({ onContinue }) {
  const [stage, setStage] = useState('video');

  useEffect(() => {
    if (stage !== 'calling') return undefined;

    const timer = window.setTimeout(() => {
      setStage('missed');
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [stage]);

  const startCall = () => {
    if (stage === 'video') setStage('calling');
  };

  return (
    <section className="call-page page-enter">
      <div className="eyebrow">
        <span>MISSION PIYU</span>
        <i>✦</i>
        <span>LET'S FIND OUT</span>
      </div>

      {stage === 'video' && (
        <>
          <h1 className="call-heading">
            Let's call <em>Priyadarshini!</em> 📞
          </h1>

          <p className="call-copy">
            Before we investigate, there's someone we need to call.
          </p>

          <div className="call-video-frame">
            <video
              className="call-video"
              src={
                import.meta.env.BASE_URL +
                'videos/Priyadarshini%20Geetak%20Birthday.mp4'
              }
              controls
              autoPlay
              playsInline
              preload="metadata"
              onEnded={startCall}
            >
              Your browser does not support video playback.
            </video>
          </div>

          <button
            type="button"
            className="primary-button call-action"
            onClick={startCall}
          >
            Call Priyadarshini 📞
          </button>

          <p className="call-hint">
            Watch the little introduction, then let's call her! 💗
          </p>
        </>
      )}

      {stage === 'calling' && (
        <div className="call-status-card">
          <div className="call-phone-animation" aria-hidden="true">
            ☎
          </div>
          <h1>Calling Piyu…</h1>
          <p>Ringing… ringing… 💗</p>
          <div className="call-dots" aria-hidden="true">•••</div>
        </div>
      )}

      {stage === 'missed' && (
        <div className="call-status-card page-enter">
          <div className="missed-call-heart" aria-hidden="true">♡</div>
          <h1>She didn't pick up! 😭😂</h1>
          <p>
            Typical Piyu. Fine, we'll have to discover her
            through our memories instead.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={onContinue}
          >
            Let's see her memories →
          </button>
        </div>
      )}
    </section>
  );
}

function App(){
  const [page,setPage]=useState(0),[photoOpen,setPhotoOpen]=useState(false),[boxOpen,setBoxOpen]=useState(false),[revealedJokes,setRevealedJokes]=useState({});
  useEffect(()=>{const fn=e=>{if(e.key==='Escape')setPhotoOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 
const go = n => {
  setPage(Math.max(0, Math.min(10, n)));
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
  });
};
const next = () => go(page + 1);
const back = () => go(page - 1);
  const next=()=>go(page+1), back=()=>go(page-1);
  return <main className="site-shell"><header className="topbar"><a href="#top" className="brand" onClick={e=>{e.preventDefault();go(0)}}><span className="brand-star">✦</span> Birthday <span>— For Piyu</span> <b>💗</b></a>
<span className="page-count">
  {page === 0 ? 'A tiny world for you' : `${Math.min(page, 10)} / 10`}
</span>

    <div className="decor decor-one">✿</div><div className="decor decor-two">✧</div>
    {page===0&&<section className="hero page-enter" id="top"><div className="eyebrow"><span>MADE WITH LOVE</span><i>✦</i><span>JUST FOR PIYU</span></div><h1>Happy Birthday,<br/><em>Piyu! 💗</em></h1><p className="hero-copy">Before the memories, one tiny challenge. Drag the pink heart back and release it to topple the tower.</p><Game onWin={()=>go(1)}/><p className="footnote">A little patience, a little aim, and a lot of love. ♡</p></section>}
    {page>=1&&page<=5&&(()=>{const j=jokes[page-1];const revealed=Boolean(revealedJokes[page]);return <section className="story-page page-enter"><div className="eyebrow"><span>OUR LITTLE CHAOS</span><i>✦</i><span>MEMORY {page} OF 5</span></div><h1 className="joke-title">{j.title}</h1><div className={`question-reveal-stage ${revealed?'is-revealed':''}`}><div className="question-card"><span className="question-label">PIYU, FIRST THIS… 💌</span><p className="question-line">{j.lines[0]}</p>{!revealed&&<button type="button" className="primary-button reveal-answer-button" onClick={()=>setRevealedJokes(prev=>({...prev,[page]:true}))}>Tap to reveal your picture &amp; my reply 💗</button>}</div>{revealed&&<div className={`joke-layout joke-${j.key} reveal-content`}><div className="joke-photo-wrap"><Photo src={A[j.key]} alt={j.alt} className="joke-photo"/><span className="doodle" aria-hidden="true">{j.doodle}</span></div><div className="dialogue-card"><p className="piyu-line"><strong>Piyu's reaction:</strong><br/>{j.lines[1]}</p><p className="punchline"><strong>My reply:</strong><br/>{j.lines[2]}</p></div></div>}</div><nav className="story-nav"><button className="secondary-button" onClick={back}>← Back</button><span className="dots">{jokes.map((_,i)=><i key={i} className={i===page-1?'active':''}/>)}</span><button className="primary-button" onClick={next} disabled={!revealed}>{page===5?'A little softer →':'Next memory →'}</button></nav>{!revealed&&<p className="reveal-hint">Tap the button when you're ready to see the photo and my reply. ✨</p>}</section>})()}
    {page===6&&<section className="soft-page page-enter"><div className="flower-art" aria-hidden="true">❀</div><Photo src={A.normal} alt="Priyadarshini — Dear Piyu transition photograph" className="normal-photo"/><span className="eyebrow centered">FROM MY HEART</span><h1>Dear Piyu <span>❤️</span></h1><p className="soft-subtitle">मस्करी खूप झाली… आता थोडंसं मनापासून. 🤍</p><button className="primary-button" onClick={next}>There's something I wrote for you →</button></section>}
    {page===7&&<section className="letter-page page-enter"><div className="letter-paper"><div className="letter-top">✿ <span>A LITTLE NOTE FOR YOU</span> ✿</div><article>{letter.split('\n\n').map((p,i)=><p key={i} className={i===0?'letter-greeting':i===5?'letter-birthday':''}>{p}</p>)}</article><div className="letter-bottom">with love, always <span>♡</span></div></div><div className="letter-actions"><button className="secondary-button" onClick={back}>← Back</button><button className="primary-button" onClick={next}>One last surprise →</button></div></section>}
    {page===8&&<section className="keepsake-page page-enter"><span className="eyebrow centered">SOMETHING TO KEEP</span><h1>Some memories deserve<br/><em>their own little box.</em> 🤍</h1>{!boxOpen?<><button className="box-button" onClick={()=>setBoxOpen(true)} aria-label="Open the keepsake box"><span className="box-sparkle">✧</span><span className="box-lid"/><span className="box-body"><span className="box-ribbon"/><span className="box-heart">♡</span></span><span className="box-shadow"/></button><p className="tap-copy">Tap to open.</p></>:<div className="reveal-wrap"><button className="revealed-photo-button" onClick={()=>setPhotoOpen(true)} aria-label="View our photograph larger"><Photo src={A.final} alt="The actual photograph of us together" className="final-photo"/><span className="expand-label">Tap to see it a little closer ↗</span></button><p className="final-message">And that's a little piece of us, kept forever in this tiny corner of the internet. 💗</p></div>}</section>}
    <footer className="site-footer"><span>made with a little mischief & a lot of love</span><span>✦</span></footer>
    {photoOpen&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Our photograph" onClick={()=>setPhotoOpen(false)}><button className="lightbox-close" onClick={()=>setPhotoOpen(false)} aria-label="Close enlarged photograph">×</button><Photo src={A.final} alt="The actual photograph of us together, enlarged" className="lightbox-photo"/><p>our little memory ♡</p></div>}
  </main>
}

{page === 1 && (
  <BalloonIntro onContinue={() => go(2)} />
)}

{page === 2 && (
  <PriyadarshiniCall onContinue={() => go(3)} />
)}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

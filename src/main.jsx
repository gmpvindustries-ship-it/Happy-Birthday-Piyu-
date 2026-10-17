import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Matter from 'matter-js';
import './styles.css';

const A = {
  jhopli: import.meta.env.BASE_URL + 'images/Priyadarshini Jhopli.png',
  nakhre: import.meta.env.BASE_URL + 'images/Priyadarshini Nakhre.png',
  mand: import.meta.env.BASE_URL + 'images/Priyadarshini Mand.png',
  lakshya: import.meta.env.BASE_URL + 'images/Priyadarshini Lakshya.png',
  marel: import.meta.env.BASE_URL + 'images/Priyadarshini Marel.png',
  normal: import.meta.env.BASE_URL + 'images/Priyadarshini Normal.png',
  final: import.meta.env.BASE_URL + 'images/Birthday.jpg',
  callVideo: import.meta.env.BASE_URL + 'videos/Priyadarshini Geetak Birthday.mp4'
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
  return failed ? <div className={`photo-placeholder ${className}`} role="img" aria-label={`${alt}. Required photo file is missing.`}>
<span>✿</span>
<strong>Photo not added yet</strong>
<small>Missing file: <code>{src.split('/').pop()}</code>
</small>
<small>Copy this photo into <code>public/images/</code>
</small>
</div> : <img className={`photo ${className}`} src={src} alt={alt} onError={()=>setFailed(true)} />;
}

function Game({onWin}) {
  const canvasRef=useRef(null), hostRef=useRef(null), gameRef=useRef(null), [attempts,setAttempts]=useState(0), [message,setMessage]=useState('Drag the little heart back, then let go!');
  useEffect(()=>{
    const canvas=canvasRef.current, host=hostRef.current; if(!canvas||!host)return;
    const {Engine,Render,Runner,World,Bodies,Body,Events,Composite}=Matter;
    const engine=Engine.create({enableSleeping:true}); engine.gravity.y=1.05;
    const width=Math.max(300,host.clientWidth), height=360;
    const render=Render.create({canvas,engine,options:{width,height,wireframes:false,background:'transparent',pixelRatio:Math.min(window.devicePixelRatio||1,2)}});
    const ground=Bodies.rectangle(width/2,height-16,width,32,{isStatic:true,render:{fillStyle:'#a9bd94'}});
    const anchor={x:Math.min(95,width*.23),y:height-92};
    const projectile=Bodies.circle(anchor.x,anchor.y,14,{density:.012,restitution:.55,friction:.4,render:{fillStyle:'#e88fa2',strokeStyle:'#9c5264',lineWidth:2}});
    const blocks=[]; const initialBlocks=[]; const bx=Math.min(width-95,width*.72), base=height-43;
    for(let row=0;row<3;row++) for(let col=0;col<3-row;col++){const x=bx+col*29-row*14,y=base-row*27;const block=Bodies.rectangle(x,y,25,25,{density:.002,friction:.6,restitution:.12,render:{fillStyle:row===0?'#d5a56b':'#e9c99e',strokeStyle:'#a77d50',lineWidth:1}});blocks.push(block);initialBlocks.push({x,y});}
    World.add(engine.world,[ground,projectile,...blocks]);
    const elastic={active:false,dragging:false,origin:anchor,projectile,won:false,hasHitTarget:false}; gameRef.current={engine,render,projectile,anchor,elastic,blocks,initialBlocks,base,attempts:0};
    let down=false, startPos=null, pointerId=null, lastX=anchor.x,lastY=anchor.y;
    const pos=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*width/r.width,y:(e.clientY-r.top)*height/r.height}};
    const pointerDown=e=>{if(elastic.won)return; const p=pos(e); const d=Math.hypot(p.x-projectile.position.x,p.y-projectile.position.y);if(d<36){e.preventDefault();down=true;elastic.dragging=true;pointerId=e.pointerId;startPos=p;canvas.setPointerCapture?.(pointerId)}};
    const pointerMove=e=>{if(!down||e.pointerId!==pointerId)return;const p=pos(e),dx=p.x-anchor.x,dy=p.y-anchor.y,len=Math.hypot(dx,dy),max=78,scale=len>max?max/len:1;Body.setPosition(projectile,{x:anchor.x+dx*scale,y:anchor.y+dy*scale});Body.setVelocity(projectile,{x:0,y:0});Body.setAngularVelocity(projectile,0);lastX=projectile.position.x;lastY=projectile.position.y;Render.world(render)};
    const pointerUp=e=>{if(!down||e.pointerId!==pointerId)return;down=false;elastic.dragging=false;const dx=anchor.x-projectile.position.x,dy=anchor.y-projectile.position.y;if(Math.hypot(dx,dy)<10){Body.setPosition(projectile,anchor);setMessage('Pull back a little farther, then release!');return}Body.setStatic(projectile,false);Body.setVelocity(projectile,{x:dx*.19,y:dy*.19});gameRef.current.attempts++;setAttempts(gameRef.current.attempts);setMessage('Nice shot! Can you topple the little tower?');setTimeout(()=>{if(gameRef.current&&!elastic.won){const allDown=blocks.every(b=>b.position.y<base-35||Math.abs(b.angle)>.48);if(!allDown&&gameRef.current.attempts>=3)setMessage('Try a different angle — pull back and aim for the bottom blocks.');}},1300)};
    canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);
    Events.on(engine,'collisionStart',event=>{if(elastic.won)return;const hit=event.pairs.some(pair=>(pair.bodyA===projectile&&blocks.includes(pair.bodyB))||(pair.bodyB===projectile&&blocks.includes(pair.bodyA)));if(hit)elastic.hasHitTarget=true;});
    Events.on(engine,'afterUpdate',()=>{if(elastic.won||!elastic.hasHitTarget)return;const fallen=blocks.filter((b,i)=>Math.abs(b.angle)>.48||b.position.y>initialBlocks[i].y+22).length;if(fallen>=2){elastic.won=true;setMessage('You did it! 💥');setTimeout(()=>onWin(),650)}});
    const runner=Runner.create();Runner.run(runner,engine);Render.run(render);
    const draw=()=>{if(!gameRef.current)return; const ctx=render.context; if(elastic.dragging){ctx.save();ctx.strokeStyle='#9c5264';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(anchor.x-8,anchor.y+7);ctx.lineTo(projectile.position.x,projectile.position.y);ctx.moveTo(anchor.x+8,anchor.y+7);ctx.lineTo(projectile.position.x,projectile.position.y);ctx.stroke();ctx.restore()} requestAnimationFrame(draw)};let raf=requestAnimationFrame(draw);
    return ()=>{gameRef.current=null;cancelAnimationFrame(raf);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointermove',pointerMove);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('pointercancel',pointerUp);Render.stop(render);Runner.stop(runner);Composite.clear(engine.world,false);Engine.clear(engine);render.canvas.width=render.canvas.width;};
  },[]);
  const retry=()=>{setAttempts(0);setMessage('Drag the little heart back, then let go!');const g=gameRef.current;if(!g)return;g.elastic.won=false;g.elastic.hasHitTarget=false;g.attempts=0;Matter.Body.setPosition(g.projectile,g.anchor);Matter.Body.setVelocity(g.projectile,{x:0,y:0});Matter.Body.setAngularVelocity(g.projectile,0);Matter.Body.setAngle(g.projectile,0);g.blocks.forEach((b,i)=>{Matter.Body.setPosition(b,g.initialBlocks[i]);Matter.Body.setVelocity(b,{x:0,y:0});Matter.Body.setAngularVelocity(b,0);Matter.Body.setAngle(b,0);Matter.Sleeping.set(b,false)});Matter.Sleeping.set(g.projectile,false)};
  return <section className="game-card" ref={hostRef}>
<div className="game-instructions">
<span className="tiny-label">A LITTLE CHALLENGE FOR YOU</span>
<p>{message}</p>
</div>
<canvas ref={canvasRef} aria-label="Interactive slingshot game. Drag the pink projectile backward and release it to hit the blocks." />
<div className="game-footer">
<span>Attempts: {attempts}</span>
<button className="text-button" onClick={retry}>Restart game ↻</button>
</div>
<p className="game-hint">Tip: aim for the lower blocks. The tower needs a proper tumble!</p>
</section>;
}

function App(){
  const [page,setPage]=useState(0),[photoOpen,setPhotoOpen]=useState(false),[boxOpen,setBoxOpen]=useState(false),[revealedJokes,setRevealedJokes]=useState({}),[poppedWords,setPoppedWords]=useState([]),[callStatus,setCallStatus]=useState('Calling mobile…'),[callVideoFailed,setCallVideoFailed]=useState(false);
  useEffect(()=>{const fn=e=>{if(e.key==='Escape')setPhotoOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
  useEffect(()=>{if(page!==2)return;setCallStatus('Connecting…');setCallVideoFailed(false);const a=window.setTimeout(()=>setCallStatus('Connected 💗'),1200);return()=>window.clearTimeout(a)},[page]);
  const go=n=>{setPage(Math.max(0,Math.min(10,n)));window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})};
  const next=()=>go(page+1), back=()=>go(page-1);
  return (
    <main className="site-shell">
<header className="topbar">
<a href="#top" className="brand" onClick={e=>{e.preventDefault();go(0)}}>
<span className="brand-star">✦</span> Birthday <span>— For Piyu</span> <b>💗</b>
</a>
<span className="page-count">{page===0?'A tiny world for you':page===1?'A question for Piyu':page===2?'Calling Piyu…':page<=7?`MEMORY ${page-2} / 5`:page===8?'A little softer':page===9?'A little note':'One last keepsake'}</span>
</header>
    <div className="decor decor-one">✿</div>
<div className="decor decor-two">✧</div>
    {page===0&&<section className="hero page-enter" id="top">
<div className="eyebrow">
<span>MADE WITH LOVE</span>
<i>✦</i>
<span>JUST FOR PIYU</span>
</div>
<h1>Happy Birthday,<br/>
<em>Piyu! 💗</em>
</h1>
<p className="hero-copy">Before the memories, one tiny challenge. Drag the pink heart back and release it to topple the tower.</p>
<Game onWin={()=>go(1)}/>
<p className="footnote">A little patience, a little aim, and a lot of love. ♡</p>
</section>}
    {page===1&&<section className="mystery-page page-enter">
<div className="eyebrow">
<span>A VERY IMPORTANT QUESTION</span>
<i>✦</i>
<span>JUST FOR PIYU</span>
</div>
<h1>So… who is <em>Priyadarshini?</em> 💗</h1>
<p className="mystery-copy">Five little words. Pop every balloon to unlock a tiny letter. ✨</p>
<div className="balloon-field" aria-label="Tap each balloon to pop it">{['Fabulous','Radiant','Precious','Kind','Extraordinary'].map((word,i)=>
<button key={word} className={`word-balloon balloon-${['one','two','three','four','five'][i]} ${poppedWords.includes(word)?'popped':''}`} onClick={()=>{if(!poppedWords.includes(word))setPoppedWords(prev=>[...prev,word])}} disabled={poppedWords.includes(word)}>
<span>{word}</span>
<i/>
</button>)}{poppedWords.length>0&&<div className="balloon-sparkles" aria-hidden="true">{Array.from({length:Math.min(20,poppedWords.length*4)},(_,i)=>
<span key={`${poppedWords.length}-${i}`} className="sparkle-bit" style={{left:`${8+(i*37)%84}%`,top:`${10+(i*23)%70}%`,animationDelay:`${(i%5)*.04}s`}}>{['✦','✧','♥','·'][i%4]}</span>)}</div>}</div>
<p className="balloon-progress">{poppedWords.length===5?'Fabulous. Radiant. Precious. Kind. Extraordinary. That’s Piyu. 💗':`${poppedWords.length} of 5 popped`}</p>{poppedWords.length===5&&<button className="primary-button heart-letter-button" onClick={()=>go(2)}>A little letter, sealed with a heart 💌</button>}<button className="secondary-button mystery-back" onClick={()=>go(0)}>← Back to the tower</button>
</section>}
    {page===2&&<section className="call-page page-enter">
<div className="eyebrow centered">
<span>ONE QUICK CALL…</span>
</div>
<h1>Chalo, Priyadarshini ko call karte hain…</h1>
<p className="call-subtitle">Let's find out more about her! 📱</p>
<div className="call-scene call-video-scene">
<div className="call-video-wrap">
{!callVideoFailed ? <video
  className="call-video"
  src={A.callVideo}
  autoPlay
  muted
  playsInline
  controls
  preload="metadata"
  aria-label="Birthday video for Priyadarshini"
  onEnded={()=>go(3)}
  onError={()=>setCallVideoFailed(true)}
/> : <div className="call-video-missing">
  <span>🎥</span>
  <strong>Birthday video not found</strong>
  <p>Add <code>Priyadarshini Geetak Birthday.mp4</code> inside <code>public/videos/</code>.</p>
</div>}
</div>
<div className="call-details">
<div className="call-avatar">P</div>
<strong>Priyadarshini</strong>
<span>{callStatus}</span>
<div className="call-wave" aria-hidden="true">
<i/><i/><i/><i/><i/>
</div>
</div>
</div>
<p className="call-caption">{callVideoFailed?'Looks like Piyu’s video is hiding. 😭😂':'A little video-call moment with Piyu. 💗'}</p>
<p className="call-footnote">The memories begin when the video ends. You can also use the button below to continue.</p>
<button className="primary-button call-continue-button" onClick={()=>go(3)}>Continue to our memories →</button>
</section>}

    {page>=3&&page<=7&&(()=>{const j=jokes[page-3];const revealed=Boolean(revealedJokes[page]);return <section className="story-page page-enter">
<div className="eyebrow">
<span>OUR LITTLE CHAOS</span>
<i>✦</i>
<span>MEMORY {page-2} OF 5</span>
</div>
<h1 className="joke-title">{j.title}</h1>
<div className={`question-reveal-stage ${revealed?'is-revealed':''}`}>
<div className="question-card">
<span className="question-label">PIYU, FIRST THIS… 💌</span>
<p className="question-line">{j.lines[0]}</p>{!revealed&&<button type="button" className="primary-button reveal-answer-button" onClick={()=>setRevealedJokes(prev=>({...prev,[page]:true}))}>Tap to reveal your picture &amp; my reply 💗</button>}</div>{revealed&&<div className={`joke-layout joke-${j.key} reveal-content`}>
<div className="joke-photo-wrap">
<Photo src={A[j.key]} alt={j.alt} className="joke-photo"/>
<span className="doodle" aria-hidden="true">{j.doodle}</span>
</div>
<div className="dialogue-card">
<p className="piyu-line">
<strong>Piyu's reaction:</strong>
<br/>{j.lines[1]}</p>
<p className="punchline">
<strong>My reply:</strong>
<br/>{j.lines[2]}</p>
</div>
</div>}</div>
<nav className="story-nav">
<button className="secondary-button" onClick={()=>page===3?go(2):go(page-1)}>← Back</button>
<span className="dots">{jokes.map((_,i)=>
<i key={i} className={i===page-3?'active':''}/>)}</span>
<button className="primary-button" onClick={()=>page<7?go(page+1):go(8)} disabled={!revealed}>{page===7?'A little softer →':'Next memory →'}</button>
</nav>{!revealed&&<p className="reveal-hint">Tap the button when you're ready to see the photo and my reply. ✨</p>}</section>})()}
    {page===8&&<section className="soft-page page-enter">
<div className="flower-art" aria-hidden="true">❀</div>
<Photo src={A.normal} alt="Priyadarshini — Dear Piyu transition photograph" className="normal-photo"/>
<span className="eyebrow centered">FROM MY HEART</span>
<h1>Dear Piyu <span>❤️</span>
</h1>
<p className="soft-subtitle">मस्करी खूप झाली… आता थोडंसं मनापासून. 🤍</p>
<button className="primary-button" onClick={next}>There's something I wrote for you →</button>
</section>}
    {page===9&&<section className="letter-page page-enter">
<div className="letter-paper">
<div className="letter-top">✿ <span>A LITTLE NOTE FOR YOU</span> ✿</div>
<article>{letter.split('\n\n').map((p,i)=>
<p key={i} className={i===0?'letter-greeting':i===5?'letter-birthday':''}>{p}</p>)}</article>
<div className="letter-bottom">with love, always <span>♡</span>
</div>
</div>
<div className="letter-actions">
<button className="secondary-button" onClick={back}>← Back</button>
<button className="primary-button" onClick={next}>One last surprise →</button>
</div>
</section>}
    {page===10&&<section className="keepsake-page page-enter">
<span className="eyebrow centered">SOMETHING TO KEEP</span>
<h1>Some memories deserve<br/>
<em>their own little box.</em> 🤍</h1>{!boxOpen?<>
<button className="box-button" onClick={()=>setBoxOpen(true)} aria-label="Open the keepsake box">
<span className="box-sparkle">✧</span>
<span className="box-lid"/>
<span className="box-body">
<span className="box-ribbon"/>
<span className="box-heart">♡</span>
</span>
<span className="box-shadow"/>
</button>
<p className="tap-copy">Tap to open.</p>
</>:<div className="reveal-wrap">
<button className="revealed-photo-button" onClick={()=>setPhotoOpen(true)} aria-label="View our photograph larger">
<Photo src={A.final} alt="The actual photograph of us together" className="final-photo"/>
<span className="expand-label">Tap to see it a little closer ↗</span>
</button>
<p className="final-message">And that's a little piece of us, kept forever in this tiny corner of the internet. 💗</p>
</div>}</section>}
    <footer className="site-footer">
<span>made with a little mischief & a lot of love</span>
<span>✦</span>
</footer>
    {photoOpen&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Our photograph" onClick={()=>setPhotoOpen(false)}>
<button className="lightbox-close" onClick={()=>setPhotoOpen(false)} aria-label="Close enlarged photograph">×</button>
<Photo src={A.final} alt="The actual photograph of us together, enlarged" className="lightbox-photo"/>
<p>our little memory ♡</p>
</div>}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode>
<App/>
</React.StrictMode>);

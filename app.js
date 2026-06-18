export const FORMSPREE_URL = "https://formspree.io/f/mkoaearg";

// nav transitions
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-nav]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('http')) return;
  e.preventDefault();
  burstConfetti();
  animateOut(() => window.location.href = href);
});

function animateOut(done){
  const page = document.querySelector('.page');
  if(!page){ done(); return; }
  page.animate(
    [{opacity:1, transform:'none'},{opacity:0, transform:'translateY(8px) scale(.985)'}],
    {duration:380, easing:'ease'}
  ).finished.then(done);
}

// utils
export function spark(el){
  const s=document.createElement('span');
  s.textContent='✨';
  s.className='spark';
  s.style.marginLeft='6px';
  el.appendChild(s);
  setTimeout(()=>s.remove(),800);
}
export function show(el){ el.style.display='inline-flex'; }
export function qs(x){ return document.querySelector(x); }
export function qsa(x){ return [...document.querySelectorAll(x)]; }

export function saveAnswer(key, value){
  const data = JSON.parse(localStorage.getItem('issaAnswers') || '{}');
  data[key] = value;
  localStorage.setItem('issaAnswers', JSON.stringify(data));
}

export function getAnswers(){
  return JSON.parse(localStorage.getItem('issaAnswers') || '{}');
}

export async function sendAnswersIfConfigured(extra = {}){
  if (!FORMSPREE_URL || FORMSPREE_URL.includes("PASTE_YOUR_FORMSPREE_URL_HERE")) {
    return { ok:false, skipped:true };
  }
  const payload = {
    ...getAnswers(),
    ...extra
  };
  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type":"application/json", "Accept":"application/json" },
    body: JSON.stringify(payload)
  });
  return { ok: res.ok, skipped:false };
}

// stars
(function starfield(){
  const c = document.getElementById('stars');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w, h, stars=[];
  function resize(){
    w = c.width = window.innerWidth * devicePixelRatio;
    h = c.height = window.innerHeight * devicePixelRatio;
    stars = Array.from({length: 220}, ()=>({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*1.7+0.25,
      s:Math.random()*0.55+0.1
    }));
  }
  function loop(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(st=>{
      st.y += st.s;
      if(st.y>h) st.y = 0;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.35 + Math.random()*0.55) + ')';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  resize();
  loop();
  window.addEventListener('resize', resize);
})();

// audio
(function audioCtl(){
  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('playAudio');
  const pauseBtn = document.getElementById('pauseAudio');
  if(!audio || !playBtn || !pauseBtn) return;

  audio.volume = 0.9;
  audio.preload = 'auto';

  playBtn.addEventListener('click', async ()=>{
    try{
      await audio.play();
      playBtn.textContent = 'Playing';
      setTimeout(()=>playBtn.textContent='Play', 1400);
    }catch{
      playBtn.textContent = 'Tap again';
      setTimeout(()=>playBtn.textContent='Play', 1400);
    }
  });

  pauseBtn.addEventListener('click',()=>{
    audio.pause();
  });
})();

// slower confetti
export function burstConfetti(){
  const count = 22;
  for(let i=0;i<count;i++){
    const d = document.createElement('div');
    d.textContent = ['🎉','✨','🎊','💖'][Math.floor(Math.random()*4)];
    d.style.position = 'fixed';
    d.style.left = (Math.random()*100)+'vw';
    d.style.top = '-30px';
    d.style.fontSize = (18 + Math.random()*18)+'px';
    d.style.zIndex = 9999;
    d.style.pointerEvents = 'none';
    d.style.transition = 'transform 1800ms ease, opacity 1800ms ease';
    document.body.appendChild(d);
    requestAnimationFrame(()=>{
      d.style.transform = `translateY(${window.innerHeight * (0.68 + Math.random()*0.24)}px) rotate(${Math.random()*260-130}deg)`;
      d.style.opacity = '0';
    });
    setTimeout(()=>d.remove(), 1850);
  }
}

// plane animation
export function flyPlane(){
  const plane = document.createElement('div');
  plane.className = 'fly-plane';
  plane.textContent = '✈️';
  document.body.appendChild(plane);
  setTimeout(()=>plane.remove(), 3700);
}

// mini fireworks burst
export function burstFireworks(target){
  if(!target) return;
  const burst = document.createElement('div');
  burst.style.position = 'absolute';
  burst.style.inset = '0';
  burst.style.display = 'grid';
  burst.style.placeItems = 'center';
  burst.style.pointerEvents = 'none';
  burst.style.fontSize = '56px';
  burst.style.zIndex = '4';
  burst.style.animation = 'fadeUp .6s ease';
  burst.textContent = '🎆';
  target.appendChild(burst);
  setTimeout(()=>burst.remove(), 700);
}

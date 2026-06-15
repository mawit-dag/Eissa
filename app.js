// Navigation transitions
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-nav]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('http')) return; // external
  e.preventDefault();
  animateOut(() => window.location.href = href);
});

function animateOut(done){
  const page = document.querySelector('.page');
  if(!page){ done(); return; }
  page.animate(
    [{opacity:1, transform:'none'},{opacity:0, transform:'translateY(8px) scale(.98)'}],
    {duration:280, easing:'ease'}
  ).finished.then(done);
}

// Tiny utils
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

// Starfield background for every page that has #stars
(function starfield(){
  const c = document.getElementById('stars');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w, h, stars=[];
  function resize(){
    w = c.width = window.innerWidth * devicePixelRatio;
    h = c.height = window.innerHeight * devicePixelRatio;
    stars = Array.from({length: 220}, ()=>({
      x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.6+0.2, s:Math.random()*0.6+0.1
    }));
  }
  function loop(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#0c1324';
    ctx.fillRect(0,0,w,h);
    stars.forEach(st=>{
      st.y += st.s; if(st.y>h) st.y=0;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.6)+')';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  resize(); loop(); window.addEventListener('resize', resize);
})();

// Background audio controller (not autoplay)
(function audioCtl(){
  const bar = document.querySelector('.audio-bar');
  if(!bar) return;
  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('playAudio');
  const pauseBtn = document.getElementById('pauseAudio');
  playBtn.addEventListener('click',()=>audio.play());
  pauseBtn.addEventListener('click',()=>audio.pause());
})();

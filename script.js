  // ---- timecode clock in letterbox ----
  const clockEl = document.getElementById('clock');
  let frame = 0;
  function pad(n){ return n.toString().padStart(2,'0'); }
  setInterval(() => {
    frame++;
    const totalSec = Math.floor(frame/24);
    const h = Math.floor(totalSec/3600);
    const m = Math.floor((totalSec%3600)/60);
    const s = totalSec%60;
    const f = frame%24;
    clockEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  }, 1000/24);

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---- target market flip cards ----
  const targetItems = document.querySelectorAll('.target-item');
  targetItems.forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('flipped'));
    item.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        item.classList.toggle('flipped');
      }
    });
  });

  // reset card ke sisi depan begitu keluar dari viewport (misal saat scroll ke bawah/atas)
  const flipResetIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting){
        e.target.classList.remove('flipped');
      }
    });
  }, { threshold: 0 });
  targetItems.forEach(item => flipResetIo.observe(item));

  // ---- floating contact fab (WA + Instagram) ----
  const floatFab = document.getElementById('floatFab');
  const fabToggle = document.getElementById('fabToggle');
  if(floatFab && fabToggle){
    fabToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = floatFab.classList.toggle('open');
      fabToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if(floatFab.classList.contains('open') && !floatFab.contains(e.target)){
        floatFab.classList.remove('open');
        fabToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && floatFab.classList.contains('open')){
        floatFab.classList.remove('open');
        fabToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- theme toggle (dark/light) ----
  const rootEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    if(theme === 'light'){ rootEl.setAttribute('data-theme','light'); }
    else{ rootEl.removeAttribute('data-theme'); }
  }
  let savedTheme = null;
  try{ savedTheme = localStorage.getItem('bydcontent-theme'); }catch(err){ /* storage unavailable, ignore */ }
  if(savedTheme === 'light' || savedTheme === 'dark'){
    applyTheme(savedTheme);
  } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
    applyTheme('light');
  }
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const next = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try{ localStorage.setItem('bydcontent-theme', next); }catch(err){ /* storage unavailable, ignore */ }
    });
  }

  // ---- header bg on scroll ----
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

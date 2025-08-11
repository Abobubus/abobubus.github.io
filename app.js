
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-skill]').forEach(s => {
    const val = s.getAttribute('data-skill');
    requestAnimationFrame(() => { s.style.width = val + '%'; });
  });
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Active menu link on scroll (IntersectionObserver)
const sections = document.querySelectorAll('main [id]');
const navLinks = document.querySelectorAll('.nav a');
const map = {};
navLinks.forEach(a => { map[a.getAttribute('href').replace('#','')] = a; });

const ob = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l => l.classList.remove('active'));
      if (map[id]) map[id].classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });

sections.forEach(sec => ob.observe(sec));


// Soft highlight current section
(function(){
  const sections = document.querySelectorAll('main [id]');
  const navLinks = document.querySelectorAll('.nav a');
  const map = {};
  navLinks.forEach(a => map[a.getAttribute('href').replace('#','')] = a);

  function setActive(id){
    sections.forEach(s => s.classList.toggle('active', s.id===id));
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
  }

  // On click
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').replace('#','');
      // delay to allow scroll, then activate
      setTimeout(()=>setActive(id), 120);
    });
  });

  // On scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        setActive(id);
      }
    });
  }, { rootMargin:'-50% 0px -45% 0px', threshold:0.01 });

  sections.forEach(sec=>io.observe(sec));
})();

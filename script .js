/* ===========================
   Typing animation (role)
=========================== */
(function () {
  var el = document.getElementById('typing');
  if (!el) return;

  var words = ['Front-End Developer', 'Web Designer', 'JavaScript Learner'];
  var wi = 0, ci = 0, deleting = false;

  function tick() {
    var word = words[wi];
    ci += deleting ? -1 : 1;
    el.textContent = word.substring(0, Math.max(ci, 0));

    var speed = deleting ? 55 : 110;
    if (!deleting && ci >= word.length) {
      deleting = true;
      speed = 1400;
    } else if (deleting && ci <= 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      speed = 350;
    }
    setTimeout(tick, speed);
  }
  tick();
})();


/* ===========================
   Scroll reveal
=========================== */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();


/* ===========================
   Theme toggle (remembered)
=========================== */
(function () {
  var btn = document.getElementById('themeToggle');
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F5F6F8' : '#0B0F14');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  btn.addEventListener('click', function () {
    apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
})();


/* ===========================
   Cursor glow
=========================== */
(function () {
  var glow = document.getElementById('glow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;

  var raf = 0;
  document.addEventListener('mousemove', function (e) {
    if (raf) return;
    var x = e.clientX, y = e.clientY;
    raf = requestAnimationFrame(function () {
      raf = 0;
      glow.style.opacity = '1';
      glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    });
  });
  document.addEventListener('mouseleave', function () { glow.style.opacity = '0'; });
})();


/* ===========================
   Scroll progress + back to top
=========================== */
(function () {
  var bar = document.getElementById('progress');
  var topBtn = document.getElementById('topBtn');

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = 'scaleX(' + Math.min(Math.max(ratio, 0), 1) + ')';
    topBtn.classList.toggle('show', window.scrollY > 300);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* BYSC Soccer Club — Main JS */

// Navbar: transparent over hero, solid on scroll
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  var hasHero = document.querySelector('.hero');

  function tick() {
    if (hasHero) {
      if (window.scrollY > 60) {
        navbar.classList.add('navbar--solid');
        navbar.classList.remove('navbar--transparent');
      } else {
        navbar.classList.remove('navbar--solid');
        navbar.classList.add('navbar--transparent');
      }
    } else {
      navbar.classList.add('navbar--solid');
    }
  }

  if (hasHero) {
    navbar.classList.add('navbar--transparent');
    window.addEventListener('scroll', tick, { passive: true });
  }
  tick();
}());

// Mobile menu toggle
(function () {
  var toggle = document.querySelector('.navbar__toggle');
  var menu   = document.querySelector('.navbar__menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
    }
  });
}());

// Active nav link
(function () {
  var path  = window.location.pathname.replace(/\/$/, '') || '/';
  var links = document.querySelectorAll('.navbar__menu a');
  links.forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (href === '/' ? path === '/' : path.startsWith(href)) {
      a.classList.add('is-active');
    }
  });
}());

// FAQ accordion
(function () {
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var was = item.classList.contains('is-open');
      items.forEach(function (i) { i.classList.remove('is-open'); });
      if (!was) item.classList.add('is-open');
    });
  });
}());

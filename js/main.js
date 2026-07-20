document.addEventListener('DOMContentLoaded', function () {

  // Current Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect
  const roles = [
    'a System Architect',
    'a Web Developer',
    'a Back-End Developer',
    'an IoT Engineer',
    'a Tech Instructor',
    'a Server & Network Engineer',
    'a Front-End Developer',
    'a Mobile Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 30 : 50;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200; // pause at the end of the role
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(typeEffect, speed);
  }

  setTimeout(typeEffect, 600);

  // Hamburger toggle (mobile menu)
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active navigation link tracking while scrolling
  const sections = document.querySelectorAll('section[id]');
  const navLinksContainer = document.getElementById('navLinks');
  const navAnchors = navLinksContainer ? navLinksContainer.querySelectorAll('a') : [];

  function updateActiveNav() {
    let scrollY = window.scrollY + 150;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (anchor) {
          anchor.classList.remove('active');
          if (anchor.getAttribute('href') === '#' + id) {
            anchor.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // PORTFOLIO SHOWCASE SUBSECTION TAB SWITCHER
  const tabs = document.querySelectorAll('.showcase-tab');
  const panes = {
    projects: document.getElementById('pane-projects'),
    skills: document.getElementById('pane-skills')
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Update active state on tab buttons
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Update active state on content panes
      Object.keys(panes).forEach(function (key) {
        if (panes[key]) {
          if (key === targetTab) {
            panes[key].classList.add('active');
          } else {
            panes[key].classList.remove('active');
          }
        }
      });
    });
  });

  // ===== INFINITE MARQUEE SCROLL (no seam) =====
  (function () {
    const marquee = document.getElementById('marqueeContent');
    if (!marquee) return;
    const items = Array.from(marquee.children);
    let pos = 0;
    let oneSet = 0;

    function init() {
      oneSet = 0;
      const totalItems = Math.max(8, Math.ceil(window.innerWidth * 2.5 / (marquee.scrollWidth / items.length)));
      const needed = Math.ceil(totalItems / items.length);
      for (let i = 1; i < needed; i++) {
        for (const item of items) {
          marquee.appendChild(item.cloneNode(true));
        }
      }
      oneSet = marquee.scrollWidth / Math.ceil(marquee.children.length / items.length);
    }
    init();

    function tick() {
      pos -= 1.2;
      if (pos <= -oneSet) pos += oneSet;
      marquee.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  // ===== INTERACTIVE ID BADGE (Drag + Spring Physics) =====
  const idBadge = document.getElementById('idBadge');
  if (idBadge) {
    let tx = 0, ty = 0, rot = 0;
    let vx = 0, vy = 0, vr = 0;
    let isDragging = false;
    let smx = 0, smy = 0, stx = 0, sty = 0, srot = 0;
    const spring = 0.05;
    const damp = 0.9;
    const maxT = 60;
    const maxA = 35;
    const ease = 0.26;
    const strap = document.querySelector('.lanyard-strap');
    const clip = document.querySelector('.lanyard-clip');

    function applyAll() {
      idBadge.style.left = tx + 'px';
      idBadge.style.top = ty + 'px';
      idBadge.style.transform = `rotate(${rot}deg)`;
      if (strap) {
        const h = 90 * (1 + ty / 90);
        const skew = Math.atan(tx / Math.max(h, 30)) * (180 / Math.PI);
        const sy = Math.max(0.45, Math.min(1.55, 1 + ty / 90));
        strap.style.transform = `skewX(${skew}deg) scaleY(${sy})`;
        strap.style.transformOrigin = 'top center';
      }
      if (clip) {
        clip.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot * 0.25}deg)`;
      }
    }

    // Mouse
    idBadge.addEventListener('mousedown', function (e) {
      isDragging = true;
      smx = e.clientX; smy = e.clientY;
      stx = tx; sty = ty; srot = rot;
      idBadge.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      const s = 0.6;
      const ttx = Math.max(-maxT, Math.min(maxT, stx + (e.clientX - smx) * s));
      const tty = Math.max(-maxT, Math.min(maxT, sty + (e.clientY - smy) * s));
      const trot = Math.max(-maxA, Math.min(maxA, srot - (e.clientX - smx) * 0.35));
      tx += (ttx - tx) * ease; ty += (tty - ty) * ease; rot += (trot - rot) * ease;
      vx = 0; vy = 0; vr = 0;
      applyAll();
    });
    document.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      idBadge.style.cursor = 'grab';
    });

    // Touch
    idBadge.addEventListener('touchstart', function (e) {
      if (!e.touches.length) return;
      isDragging = true;
      smx = e.touches[0].clientX; smy = e.touches[0].clientY;
      stx = tx; sty = ty; srot = rot;
    });
    document.addEventListener('touchmove', function (e) {
      if (!isDragging || !e.touches.length) return;
      const s = 0.6;
      const ttx = Math.max(-maxT, Math.min(maxT, stx + (e.touches[0].clientX - smx) * s));
      const tty = Math.max(-maxT, Math.min(maxT, sty + (e.touches[0].clientY - smy) * s));
      const trot = Math.max(-maxA, Math.min(maxA, srot - (e.touches[0].clientX - smx) * 0.35));
      tx += (ttx - tx) * ease; ty += (tty - ty) * ease; rot += (trot - rot) * ease;
      vx = 0; vy = 0; vr = 0;
      applyAll();
    });
    document.addEventListener('touchend', function () {
      if (!isDragging) return;
      isDragging = false;
    });

    // Spring return
    function updateBadge() {
      if (!isDragging) {
        vx += (0 - tx) * spring; vx *= damp; tx += vx;
        vy += (0 - ty) * spring; vy *= damp; ty += vy;
        vr += (0 - rot) * spring; vr *= damp; rot += vr;
        if (Math.abs(tx) < 0.05 && Math.abs(vx) < 0.05) { tx = 0; vx = 0; }
        if (Math.abs(ty) < 0.05 && Math.abs(vy) < 0.05) { ty = 0; vy = 0; }
        if (Math.abs(rot) < 0.05 && Math.abs(vr) < 0.05) { rot = 0; vr = 0; }
        applyAll();
      }
      requestAnimationFrame(updateBadge);
    }
    updateBadge();
  }

  // Scroll Fade-in & Fade-up Interactive Animations (Observer)
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.fade-in, .fade-up').forEach(function (el) {
    observer.observe(el);
  });

  // Contact Form Simulated Submission
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name) { alert('Please enter your name.'); return; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return; }
      if (!message) { alert('Please enter your message.'); return; }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();
        setTimeout(function () {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 2200);
      }, 1200);
    });
  }
});

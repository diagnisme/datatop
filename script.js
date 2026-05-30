(() => {
  'use strict';

  // ============================================================
  // Nav: scrolled state (rAF-throttled)
  // ============================================================
  const nav = document.getElementById('nav');
  if (nav) {
    let lastScrolled = false;
    let ticking = false;
    const updateNav = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        nav.classList.toggle('scrolled', scrolled);
        lastScrolled = scrolled;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
    }, { passive: true });
    updateNav();
  }

  // ============================================================
  // Mobile burger menu
  // ============================================================
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
    document.addEventListener('click', e => {
      if (nav && !nav.contains(e.target) && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================================
  // GSAP — Premium animations (loaded via CDN)
  // ============================================================
  const gsapReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance: disable CSS fade-in, let GSAP own the timeline
    if (document.body.classList.contains('is-home')) {
      document.querySelectorAll('.hero .fade-in').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
      });

      gsap.timeline({ delay: 0.18, defaults: { ease: 'expo.out' } })
        .to('.hero-badge',   { opacity: 1, y: 0, duration: 0.7 })
        .to('.hero-title',   { opacity: 1, y: 0, duration: 0.9 }, '-=0.42')
        .to('.hero-desc',    { opacity: 1, y: 0, duration: 0.8 }, '-=0.52')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.48');
    }

    // ScrollTrigger scroll-reveals (replaces IntersectionObserver)
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.transition = 'none';
      gsap.set(el, { opacity: 0, y: 28 });

      const parent    = el.parentElement;
      const siblings  = parent
        ? [...parent.children].filter(c => c.classList.contains('reveal'))
        : [];
      const sibIdx    = siblings.indexOf(el);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'expo.out',
            delay: Math.min(sibIdx * 0.08, 0.38)
          });
        }
      });
    });

  } else {
    // ============================================================
    // Reveal on scroll — IntersectionObserver fallback
    // ============================================================
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            const parent = e.target.parentElement;
            if (parent) {
              const sibs = [...parent.children].filter(c =>
                c.classList.contains('reveal') && !c.classList.contains('in')
              );
              const idx = sibs.indexOf(e.target);
              if (idx > 0) e.target.style.transitionDelay = `${idx * 0.08}s`;
            }
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
      );
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }
  }

  // ============================================================
  // Animated counters
  // ============================================================
  const counters = document.querySelectorAll('.stat-num');
  const ease4    = t => 1 - Math.pow(1 - t, 4);

  const animateCount = el => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const suffix   = el.dataset.suffix || '';
    const duration = 1600;
    const start    = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(ease4(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      }),
      { threshold: 0.4 }
    );
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ============================================================
  // Smooth anchor scroll (offset for fixed nav)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ============================================================
  // CV file upload
  // ============================================================
  const cvInput = document.getElementById('cvInput');
  if (cvInput) {
    const fileInput = cvInput.querySelector('input[type="file"]');
    const fileName  = cvInput.querySelector('.file-name');
    if (fileInput && fileName) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files?.length) {
          const f = fileInput.files[0];
          fileName.textContent = `${f.name} · ${(f.size / 1048576).toFixed(2)} Mo`;
          cvInput.classList.add('has-file');
        } else {
          fileName.textContent = 'Aucun fichier sélectionné';
          cvInput.classList.remove('has-file');
        }
      });
    }
  }

  // ============================================================
  // EmailJS — Configuration
  // 1. Créez un compte gratuit sur https://www.emailjs.com
  // 2. Email Services → Add New Service → Gmail → connecter datatop@gmail.com
  //    → copiez le Service ID ci-dessous
  // 3. Email Templates → Create New Template (×2 : contact + carrieres)
  //    → collez le HTML des fichiers email-template-contact.html
  //      et email-template-carrieres.html dans le champ "Body (HTML)"
  //    → Template CONTACT   : Subject = [DATATOP] Nouveau message de {{from_name}}
  //                           To      = diagneplus@gmail.com, contact@datatop.fr
  //    → Template CARRIERES : Subject = [DATATOP] Candidature {{position}} — {{from_name}}
  //                           To      = recrutement@datatop.fr
  //    → copiez les Template IDs ci-dessous
  // 4. Account → General → copiez la Public Key ci-dessous
  // ============================================================
  const EJS_KEY           = '8XU68Gu9lqyU0_ycX';
  const EJS_SERVICE       = 'service_ohhhwho';
  const EJS_TPL_CONTACT   = 'template_mlughnx';
  const EJS_TPL_CARRIERES = 'template_mlughnx';

  if (typeof emailjs !== 'undefined') emailjs.init(EJS_KEY);

  const fmtDate = () => new Date().toLocaleString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const resetForm = (f) => {
    f.reset();
    if (cvInput) {
      cvInput.classList.remove('has-file');
      const fn = cvInput.querySelector('.file-name');
      if (fn) fn.textContent = 'Aucun fichier sélectionné';
    }
  };

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn   = form.querySelector('button[type="submit"]');
      const label = btn?.querySelector('span');
      const orig  = label ? label.textContent : btn?.textContent;

      if (btn)   { btn.disabled = true; btn.style.opacity = '.65'; }
      if (label) label.textContent = 'Envoi en cours…';

      const fd   = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const isCarrieres = !!data.position;

      const params = {
        // Variables correspondant au template EmailJS
        name:       data.name     || '',
        email:      data.email    || '',
        time:       fmtDate(),
        message:    data.message  || '',
        title:      data.subject  || data.position || 'Nouveau message',
        // Champs supplémentaires (à ajouter dans le template si besoin)
        phone:      data.phone    || 'Non renseigné',
        company:    data.company  || 'Non renseignée',
        position:   data.position || '',
        link:       data.link     || 'Non renseigné',
        // Alias pour compatibilité HTML template
        from_name:  data.name     || '',
        from_email: data.email    || '',
        date:       fmtDate(),
        subject:    data.subject  || data.position || 'Nouveau message',
      };

      try {
        if (typeof emailjs === 'undefined') throw new Error('SDK non chargé');
        if (EJS_KEY === 'VOTRE_PUBLIC_KEY') throw new Error('EmailJS non configuré — remplacez les clés dans script.js');
        await emailjs.send(EJS_SERVICE, isCarrieres ? EJS_TPL_CARRIERES : EJS_TPL_CONTACT, params);

        resetForm(form);
        if (success) {
          success.hidden = false;
          setTimeout(() => { success.hidden = true; }, 6000);
        }
      } catch (err) {
        console.error('Erreur envoi EmailJS :', err.message || err);
        alert('Erreur lors de l\'envoi. Veuillez réessayer ou écrire directement à contact@datatop.fr\n\n' + (err.message || ''));
      } finally {
        if (btn)   { btn.disabled = false; btn.style.opacity = '1'; }
        if (label) label.textContent = orig;
      }
    });
  }

  // ============================================================
  // Word cycling — hero animated title
  // ============================================================
  const cycleWords = ['intelligence', 'expertise', 'performance', 'stratégie', 'résultats'];
  let cycleIndex = 0;
  const cycleEl = document.getElementById('wordCycle');
  if (cycleEl) {
    const initSpan = cycleEl.querySelector('span');
    if (initSpan) initSpan.classList.remove('wc-enter', 'wc-exit');
    setInterval(() => {
      const old = cycleEl.querySelector('span:not(.wc-exit)');
      cycleIndex = (cycleIndex + 1) % cycleWords.length;
      const next = document.createElement('span');
      next.textContent = cycleWords[cycleIndex];
      next.classList.add('wc-enter');
      cycleEl.appendChild(next);
      if (old) { old.classList.add('wc-exit'); old.classList.remove('wc-enter'); }
      setTimeout(() => {
        if (old && old.parentNode === cycleEl) cycleEl.removeChild(old);
      }, 520);
    }, 2800);
  }

  // ============================================================
  // Footer year
  // ============================================================
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ============================================================
  // Hero parallax — content floats up and fades on scroll
  // ============================================================
  const heroSection  = document.querySelector('.hero');
  const heroInner    = document.querySelector('.hero-inner');
  const scrollHintEl = document.querySelector('.scroll-hint');

  if (heroSection && heroInner) {
    let heroTicking = false;
    const onHeroScroll = () => {
      if (heroTicking) return;
      heroTicking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = heroSection.offsetHeight;
        if (y < h) {
          const p = y / h;
          heroInner.style.opacity   = String(Math.max(0, 1 - p * 1.55));
          heroInner.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
          if (scrollHintEl) scrollHintEl.style.opacity = String(Math.max(0, 1 - p * 6));
        } else {
          heroInner.style.opacity   = '0';
          heroInner.style.transform = '';
        }
        heroTicking = false;
      });
    };
    window.addEventListener('scroll', onHeroScroll, { passive: true });
    onHeroScroll();
  }

  // ============================================================
  // Scroll progress bar
  // ============================================================
  const progressEl = document.createElement('div');
  progressEl.className = 'scroll-progress';
  progressEl.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressEl);
  let progTick = false;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  };
  window.addEventListener('scroll', () => {
    if (!progTick) { requestAnimationFrame(() => { updateProgress(); progTick = false; }); progTick = true; }
  }, { passive: true });
  updateProgress();

  // ============================================================
  // Hero Canvas — Particle Network
  // ============================================================
  const initHeroCanvas = () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    let W, H, dots, animId;
    const mouse = { x: -3000, y: -3000 };
    const NUM = 90, MAX_DIST = 168;
    const BRAND = [
      [27,  58, 107],
      [37,  99, 235],
      [59, 184, 240],
      [37,  99, 235],
      [27,  58, 107],
    ];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Dot {
      constructor() { this.init(); }
      init() {
        this.x   = Math.random() * (W || 1200);
        this.y   = Math.random() * (H || 700);
        this.bvx = (Math.random() - 0.5) * 0.52;
        this.bvy = (Math.random() - 0.5) * 0.52;
        this.vx  = this.bvx; this.vy = this.bvy;
        this.r   = Math.random() * 2.4 + 0.7;
        this.rgb = BRAND[Math.floor(Math.random() * BRAND.length)];
        this.ba  = Math.random() * 0.42 + 0.13;
        this.alpha = this.ba;
        this.ph  = Math.random() * Math.PI * 2;
        this.ps  = 0.016 + Math.random() * 0.02;
      }
      update() {
        this.ph += this.ps;
        this.alpha = this.ba + Math.sin(this.ph) * 0.09;
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const d  = Math.hypot(dx, dy);
        if (d < 150) {
          const f = (1 - d / 150) * 0.017;
          this.vx += dx * f; this.vy += dy * f;
        }
        this.vx += (this.bvx - this.vx) * 0.048;
        this.vy += (this.bvy - this.vy) * 0.048;
        this.x  += this.vx; this.y += this.vy;
        if (this.x < -12) this.x = W + 12;
        if (this.x > W + 12) this.x = -12;
        if (this.y < -12) this.y = H + 12;
        if (this.y > H + 12) this.y = -12;
      }
      draw() {
        const [r, g, b] = this.rgb;
        if (this.r > 1.6) {
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
          grd.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 0.32})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
        ctx.fill();
      }
    }

    const initDots = () => { dots = Array.from({ length: NUM }, () => new Dot()); };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < MAX_DIST) {
            const al  = (1 - dist / MAX_DIST) * 0.1;
            const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grd.addColorStop(0, `rgba(${a.rgb[0]},${a.rgb[1]},${a.rgb[2]},${al})`);
            grd.addColorStop(1, `rgba(${b.rgb[0]},${b.rgb[1]},${b.rgb[2]},${al})`);
            ctx.beginPath();
            ctx.strokeStyle = grd; ctx.lineWidth = 0.75;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      dots.forEach(d => { d.update(); d.draw(); });
      animId = requestAnimationFrame(frame);
    };

    resize(); initDots(); frame();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId); resize(); initDots(); frame();
    }, { passive: true });

    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }, { passive: true });
      heroEl.addEventListener('mouseleave', () => { mouse.x = -3000; mouse.y = -3000; });
    }
  };

  initHeroCanvas();

  // ============================================================
  // Carousel — bulletproof rAF, works on all platforms
  // ============================================================
  const initCarousel = () => {
    const track    = document.querySelector('.logos-track');
    const scroller = document.querySelector('.logos-scroller');
    if (!track || !scroller) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPEED = 55; // px / second — constant across all devices
    let pos     = 0;
    let paused  = false;
    let lastTs  = 0;
    let halfW   = 0;
    let running = false;

    // Move helper — sets both prefixed and standard transform
    const move = v => {
      const val = `translateX(-${v.toFixed(2)}px)`;
      track.style.webkitTransform = val;
      track.style.transform       = val;
    };

    // Measure scrollWidth — void offsetWidth forces synchronous layout
    const measure = () => {
      void track.offsetWidth;
      const w = track.scrollWidth / 2;
      if (w > 10) { halfW = w; return true; }
      return false;
    };

    // Main animation loop
    const tick = ts => {
      if (!paused && halfW > 0) {
        const dt = lastTs ? Math.min(ts - lastTs, 64) : 0;
        pos = (pos + SPEED * dt / 1000) % halfW;
        move(pos);
      }
      lastTs = ts;
      requestAnimationFrame(tick);
    };

    // Start — with retry if images not yet laid out
    const start = () => {
      if (running) return;
      if (measure()) {
        running = true;
        requestAnimationFrame(tick);
        return;
      }
      // Retry every 150 ms until images are measured (max 20 tries = 3 s)
      let tries = 0;
      const retry = setInterval(() => {
        if (measure() || ++tries > 20) {
          clearInterval(retry);
          if (halfW > 0 && !running) { running = true; requestAnimationFrame(tick); }
        }
      }, 150);
    };

    // Hover pause (desktop)
    scroller.addEventListener('mouseenter', () => { paused = true;  },             { passive: true });
    scroller.addEventListener('mouseleave', () => { paused = false; lastTs = 0; }, { passive: true });

    // Touch swipe (mobile) — finger drag advances carousel
    let touchX = 0;
    scroller.addEventListener('touchstart', e => {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    scroller.addEventListener('touchmove', e => {
      if (!halfW) return;
      const dx = touchX - e.touches[0].clientX;
      touchX   = e.touches[0].clientX;
      pos      = ((pos + dx) % halfW + halfW) % halfW;
      move(pos);
    }, { passive: true });

    // Use IntersectionObserver so we start when section is actually visible
    // (guarantees images are rendered and scrollWidth is correct)
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { io.disconnect(); start(); }
      }, { threshold: 0.05 });
      io.observe(scroller);
    } else {
      // Fallback for very old browsers
      if (document.readyState === 'complete') { start(); }
      else { window.addEventListener('load', start, { once: true }); }
    }
  };

  initCarousel();


  // ============================================================
  // Page transitions — fade veil between pages
  // ============================================================
  const initPageTransitions = () => {
    const veil = document.createElement('div');
    veil.className = 'page-veil';
    document.body.appendChild(veil);

    // Reveal page on load (double rAF ensures paint happened)
    requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('revealed')));

    // Intercept internal navigation links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href
        || href.startsWith('#')
        || href.startsWith('mailto:')
        || href.startsWith('tel:')
        || /^https?:\/\//.test(href)
        || href.startsWith('//')
      ) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        veil.classList.remove('revealed');         // fade to dark
        setTimeout(() => { window.location.href = href; }, 500);
      });
    });
  };
  initPageTransitions();

})();

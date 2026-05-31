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

      gsap.timeline({ delay: 0.18, defaults: { ease: 'back.out(1.8)' } })
        .to('.hero-badge',   { opacity: 1, y: 0, duration: 0.8 })
        .to('.hero-title',   { opacity: 1, y: 0, duration: 1.0 }, '-=0.48')
        .to('.hero-desc',    { opacity: 1, y: 0, duration: 0.9 }, '-=0.54')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.85 }, '-=0.50');
    }

    // ScrollTrigger scroll-reveals with spring easing
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.transition = 'none';
      gsap.set(el, { opacity: 0, y: 32 });

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
            duration: 1.1,
            ease: 'back.out(1.6)',
            delay: Math.min(sibIdx * 0.09, 0.42)
          });
        }
      });
    });

    // Card hover glow effect with GSAP
    document.querySelectorAll('.service-card-lg, .card, .feature-item, .case-card, .job-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0 24px 64px rgba(37, 99, 235, 0.22), 0 8px 24px rgba(0, 0, 0, 0.08)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: 'var(--sh-xs)',
          duration: 0.3,
          ease: 'power2.out'
        });
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
              if (idx > 0) e.target.style.transitionDelay = `${idx * 0.09}s`;
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
  // Animated counters with GSAP
  // ============================================================
  const counters = document.querySelectorAll('.stat-num');

  if (gsapReady && counters.length) {
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';

      if (isNaN(target)) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2.2,
            ease: 'expo.out',
            onUpdate: function() {
              el.textContent = Math.floor(this.targets()[0].val) + suffix;
            },
            onComplete: () => {
              el.textContent = target + suffix;
            }
          });
        }
      });
    });
  } else {
    // Fallback: animate counters without GSAP
    const ease4    = t => 1 - Math.pow(1 - t, 4);

    const animateCount = el => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const suffix   = el.dataset.suffix || '';
      const duration = 2200;
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
  // Hero parallax — enhanced with smooth easing
  // ============================================================
  const heroSection  = document.querySelector('.hero');
  const heroInner    = document.querySelector('.hero-inner');
  const scrollHintEl = document.querySelector('.scroll-hint');

  if (heroSection && heroInner && gsapReady) {
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.getVelocity() > 0 ? self.progress : self.progress;
        heroInner.style.opacity = String(Math.max(0, 1 - progress * 1.6));
        heroInner.style.transform = `translate3d(0, ${progress * window.innerHeight * 0.32}px, 0)`;
        if (scrollHintEl) scrollHintEl.style.opacity = String(Math.max(0, 1 - progress * 8));
      }
    });
  } else if (heroSection && heroInner) {
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
          heroInner.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
          if (scrollHintEl) scrollHintEl.style.opacity = String(Math.max(0, 1 - p * 6.5));
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

    // Hover and Touch logic to prevent getting stuck on mobile
    let isTouch = false;

    scroller.addEventListener('mouseenter', () => { if (!isTouch) paused = true; }, { passive: true });
    scroller.addEventListener('mouseleave', () => { if (!isTouch) { paused = false; lastTs = 0; } }, { passive: true });

    // Touch swipe (mobile) — finger drag advances carousel
    let touchX = 0;
    scroller.addEventListener('touchstart', e => {
      isTouch = true;
      paused = true;
      touchX = e.touches[0].clientX;
    }, { passive: true });
    scroller.addEventListener('touchmove', e => {
      if (!halfW) return;
      const dx = touchX - e.touches[0].clientX;
      touchX   = e.touches[0].clientX;
      pos      = ((pos + dx) % halfW + halfW) % halfW;
      move(pos);
    }, { passive: true });

    const endTouch = () => {
      paused = false;
      lastTs = 0;
      // Prevent synthesized mouse events from pausing
      setTimeout(() => isTouch = false, 500);
    };
    scroller.addEventListener('touchend', endTouch, { passive: true });
    scroller.addEventListener('touchcancel', endTouch, { passive: true });

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
        setTimeout(() => { window.location.href = href; }, 200);
      });
    });
  };
  initPageTransitions();

})();

// Email Obfuscation Decoder
document.addEventListener('DOMContentLoaded', () => {
  const protectedEmails = document.querySelectorAll('.protected-email');
  protectedEmails.forEach(span => {
    span.style.cursor = 'pointer';
    span.style.textDecoration = 'underline';
    span.addEventListener('click', () => {
      const user = span.getAttribute('data-user');
      const domain = span.getAttribute('data-domain');
      if (user && domain) {
        window.location.href = 'mailto:' + user + '@' + domain;
      }
    });
  });
});

// ============================================================
// ✦ PREMIUM HIGH-END INTERACTIONS (Cursor & Magnetic UX)
// ============================================================
const initPremiumUX = () => {
  if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return;
  
  // 1. Magnetic Buttons
  document.querySelectorAll('.btn-primary, .btn-white, .btn-hero-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // 2. Fluid Custom Cursor
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  });

  const tick = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  document.querySelectorAll('a, button, input, textarea, select, .card, .service-card-lg, .job-card, .feature-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
};
initPremiumUX();

// ==============================================================================
// 🚀 SUPABASE ANALYTICS & FORM MANAGEMENT (DRY OPTIMIZED)
// ==============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialisation Supabase (Silencieuse)
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    window.supabaseClient = createClient('https://bugmdnowmtyiftujfhmm.supabase.co', 'sb_publishable_Ir0Rf5tsxTtClH4XxbtomA_qmoAE-lp');
  } catch (e) {
    console.warn("Supabase bypassé (bloqueur de pub ou hors-ligne).");
  }

  // 2. Gestion de Session
  window.datatopSessionId = localStorage.getItem('datatop_session_id') || (crypto.randomUUID ? crypto.randomUUID() : 'session-' + Math.random().toString(36).substr(2, 9));
  localStorage.setItem('datatop_session_id', window.datatopSessionId);

  // 3. Moteur de Tracking Centralisé
  window.trackEvent = async function(eventType, additionalData = {}) {
    if (!window.supabaseClient) return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      await window.supabaseClient.from('analytics_events').insert([{ 
        event_type: eventType, session_id: window.datatopSessionId,
        url: window.location.href, path: window.location.pathname,
        user_agent: navigator.userAgent, referrer: document.referrer,
        language: navigator.language, screen_width: window.screen ? window.screen.width : null,
        viewport_width: window.innerWidth, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        utm_source: urlParams.get('utm_source'), utm_campaign: urlParams.get('utm_campaign'),
        ...additionalData
      }]);
    } catch (err) {}
  };

  // Auto-tracking
  window.trackEvent('page_view');
  const pageLoadTime = Date.now();
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') window.trackEvent('page_leave', { duration: Math.round((Date.now() - pageLoadTime) / 1000) });
  });
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target && window.trackEvent) window.trackEvent('click', { target_text: (target.innerText || '').substring(0, 100).trim(), target_href: target.href || null });
  });

  // 4. Interception Globale des Formulaires (UX Pro & CRM)
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    form.setAttribute('novalidate', 'true');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn ? btn.innerHTML : 'Envoyer';

      // Nettoyage UI
      form.querySelectorAll('.custom-error-msg').forEach(el => el.remove());
      form.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));

      let hasError = false;
      let firstErrorElement = null;
      let errorMessages = [];

      form.querySelectorAll('input, textarea, select').forEach(input => {
        const isEmpty = !input.value.trim();
        const isRequired = input.hasAttribute('required');
        const isEmail = input.type === 'email';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (isRequired && isEmpty) {
          hasError = true;
          input.classList.add('error-border');
          if (!firstErrorElement) firstErrorElement = input;
          const fieldName = (input.getAttribute('placeholder') || input.getAttribute('name') || 'Ce champ').replace('*', '').trim();
          errorMessages.push(`Le champ <strong>${fieldName}</strong> est obligatoire.`);
        } else if (isEmail && !isEmpty && !emailRegex.test(input.value.trim())) {
          hasError = true;
          input.classList.add('error-border');
          if (!firstErrorElement) firstErrorElement = input;
          errorMessages.push(`L'adresse email renseignée n'est pas valide.`);
        }
      });

      if (hasError) {
        if (!document.getElementById('form-error-styles')) {
          document.head.insertAdjacentHTML('beforeend', `<style id="form-error-styles">.error-border { border: 1px solid #ff4757 !important; background-color: rgba(255, 71, 87, 0.05) !important; transition: all 0.3s ease; }</style>`);
        }
        const errorDiv = document.createElement('div');
        errorDiv.className = 'custom-error-msg';
        errorDiv.style.cssText = 'padding: 20px; background: rgba(255, 71, 87, 0.1); border-left: 4px solid #ff4757; border-radius: 8px; margin-bottom: 20px; text-align: left;';
        errorDiv.innerHTML = `
          <h4 style="margin-top: 0; color: #ff4757; font-size: 1.1rem; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Informations manquantes
          </h4>
          <ul style="margin-bottom: 0; color: #fff; padding-left: 20px; line-height: 1.5; font-size: 0.95rem;">
            ${errorMessages.map(msg => `<li style="margin-bottom: 5px;">${msg}</li>`).join('')}
          </ul>
        `;
        if (btn) form.insertBefore(errorDiv, btn);
        else form.appendChild(errorDiv);
        if (firstErrorElement) firstErrorElement.focus();
        return;
      }

      if (btn) { btn.disabled = true; btn.innerHTML = '<span>Envoi en cours...</span>'; btn.style.opacity = '0.7'; }

      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const isCarrieres = !!data.position || window.location.pathname.includes('carrieres');
      const formName = form.getAttribute('name') || (isCarrieres ? 'candidature' : 'contact');
      fd.append('form-name', formName);

      try {
        await fetch('/', { method: 'POST', body: fd }).catch(() => {});

        if (window.supabaseClient && data.email) {
          const tableName = isCarrieres ? 'candidatures' : 'contacts';
          const payload = { 
            name: data.name || '', email: data.email || '', 
            message: data.message || '', session_id: window.datatopSessionId || null 
          };
          if (isCarrieres) payload.role = data.position || 'Candidature spontanée';
          else payload.form_type = data.subject || formName;
          
          await window.supabaseClient.from(tableName).insert([payload]);
          if (window.trackEvent) window.trackEvent('form_submit', { target_text: payload.form_type || payload.role });
        }

        const firstName = (data.name || '').split(' ')[0] || 'Monsieur/Madame';
        form.innerHTML = `
          <div style="padding: 30px; background: rgba(0, 217, 255, 0.05); border-left: 4px solid var(--cyan, #00D9FF); border-radius: 8px; text-align: left; margin-top: 20px;">
            <h3 style="margin-top: 0; color: var(--cyan, #00D9FF); font-size: 1.5rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Message envoyé avec succès !
            </h3>
            <p style="margin-bottom: 0; font-size: 1.1rem; line-height: 1.6; color: var(--text, #fff);">Merci <strong>${firstName}</strong>.<br/>Votre demande a bien été transmise. Notre équipe prendra le temps d'étudier vos besoins avec soin pour vous apporter une réponse personnalisée très prochainement.</p>
          </div>
        `;
      } catch (err) {
        console.error('Erreur:', err);
        alert("Erreur lors de l'envoi. Veuillez vérifier votre connexion et réessayer.");
        if (btn) { btn.disabled = false; btn.innerHTML = origText; btn.style.opacity = '1'; }
      }
    });
  });
});

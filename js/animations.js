/**
 * Lucca Restaurante - Animações Avançadas e ScrollReveal (GSAP + ScrollTrigger)
 * Implementa coreografias de entrada, parallax cinematográfico, contadores e micro-interações.
 */

class LuccaAnimations {
  constructor() {
    this.hasGSAP = typeof gsap !== 'undefined';
    this.hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    this.init();
  }

  init() {
    if (this.hasGSAP && this.hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      this.initGSAPAnimations();
    } else {
      this.initIntersectionObserverFallback();
    }

    this.initCounters();
    this.initParallax();
    this.initMagneticButtons();
  }

  initGSAPAnimations() {
    // 1. Hero Reveal Choreography (Rápida, fluida e sofisticada)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.65 } });

    if (document.querySelector('.hero-badge')) {
      heroTl.from('.hero-badge', { y: -15, opacity: 0, delay: 0.05 });
    }
    if (document.querySelectorAll('.hero-title-line').length) {
      heroTl.from('.hero-title-line', { y: 25, opacity: 0, stagger: 0.08 }, '-=0.45');
    }
    if (document.querySelector('.hero-subtitle')) {
      heroTl.from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.4');
    }
    if (document.querySelector('.hero-cta-group')) {
      heroTl.from('.hero-cta-group', { y: 15, opacity: 0 }, '-=0.35');
    }
    if (document.querySelectorAll('.hero-stats-card').length) {
      heroTl.from('.hero-stats-card', { y: 20, opacity: 0, stagger: 0.06 }, '-=0.35');
    }

    // 2. Parallax no Background do Hero
    if (document.querySelector('.hero-bg-img') && document.querySelector('#hero')) {
      gsap.to('.hero-bg-img', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 20,
        ease: 'none'
      });
    }

    // 3. Scroll Reveal para Seções
    const reveals = gsap.utils.toArray('.reveal-on-scroll');
    if (reveals.length) {
      reveals.forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      });
    }

    // 4. Stagger para os Cards do Menu
    if (document.querySelector('#cardapio') && document.querySelector('#menu-items-grid')) {
      ScrollTrigger.create({
        trigger: '#cardapio',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          this.animateMenuCards();
        }
      });
    }

    // 5. Stagger para os Cards do Instagram
    if (document.querySelector('#galeria') && document.querySelector('#instagram-gallery-container')) {
      ScrollTrigger.create({
        trigger: '#galeria',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          this.animateInstaCards();
        }
      });
    }

    // 6. Destaque Especial: Seção de Tradição & Festival de Risotto
    if (document.querySelector('.tradition-image-box') && document.querySelector('#sobre')) {
      gsap.from('.tradition-image-box', {
        scrollTrigger: {
          trigger: '#sobre',
          start: 'top 75%'
        },
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.tradition-content-box') && document.querySelector('#sobre')) {
      gsap.from('.tradition-content-box', {
        scrollTrigger: {
          trigger: '#sobre',
          start: 'top 75%'
        },
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }
  }

  animateMenuCards() {
    const cards = document.querySelectorAll('.menu-card-item');
    if (!cards.length) return;
    if (this.hasGSAP) {
      gsap.fromTo(cards,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }
      );
    } else {
      cards.forEach(card => card.style.opacity = '1');
    }
  }

  animateInstaCards() {
    const cards = document.querySelectorAll('.insta-card');
    if (!cards.length) return;
    if (this.hasGSAP) {
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.94, y: 25 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
      );
    } else {
      cards.forEach(card => card.style.opacity = '1');
    }
  }

  initIntersectionObserverFallback() {
    // Fallback nativo suave com IntersectionObserver caso GSAP não esteja disponível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-init, .reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  initCounters() {
    const counterElements = document.querySelectorAll('.stat-counter');
    let hasAnimated = false;

    const animateCounters = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      counterElements.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          const currentVal = (easeOutQuad * target).toFixed(decimals);

          counter.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const statsSection = document.querySelector('#stats-trigger') || document.querySelector('.social-proof-section');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(statsSection);
    }
  }

  initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxBgs = document.querySelectorAll('.parallax-bg');
      parallaxBgs.forEach(bg => {
        const speed = bg.dataset.speed || 0.3;
        bg.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }

  initMagneticButtons() {
    // Efeito magnético elegante em botões principais (Desktop)
    if (window.innerWidth > 1024) {
      const magneticElements = document.querySelectorAll('.btn-magnetic');
      magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0px, 0px)';
          btn.style.transition = 'transform 0.4s ease';
        });

        btn.addEventListener('mouseenter', () => {
          btn.style.transition = 'none';
        });
      });
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.luccaAnimations = new LuccaAnimations();
});

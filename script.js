document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Atualizar Ano Dinâmico
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Menu Mobile e Navbar Header Scroll Effect
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  const header = document.querySelector('.site-header');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      // Força o fundo branco no header quando abre o menu mobile
      if(isOpen) {
          header.classList.add('scrolled');
      } else if (window.scrollY <= 50) {
          header.classList.remove('scrolled');
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // Efeito glassmorphism e cores na navbar ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      // só remove se o menu mobile não estiver aberto
      if (nav && !nav.classList.contains('open')) {
        header.classList.remove('scrolled');
      }
    }
  });

  // 3. Scroll Progress Bar (Barra de progresso de leitura no topo)
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if(progressBar) progressBar.style.width = progress + '%';
  });

  // 4. Efeito Parallax suave na imagem principal
  const heroImg = document.querySelector('.parallax-img');
  window.addEventListener('scroll', () => {
    if (heroImg && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });

  // 5. Observer para Animações Reveal de Alta Performance
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach((el) => { observer.observe(el); });
  } else {
    // Fallback para browsers antigos
    reveals.forEach(el => el.classList.add('active'));
  }

  // Navegação da marca leva ao início da página.
  const brandLink = document.querySelector('.brand');
  if (brandLink) {
    brandLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  // Atalho explícito para o topo, inclusive em navegadores que não rolam âncoras suavemente.
  const footerBackToTop = document.getElementById('footerBackToTop');
  if (footerBackToTop) {
    footerBackToTop.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  // Carrossel do destaque lateral.
  const carousel = document.getElementById('heroCarousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const toggleButton = carousel.querySelector('[data-carousel-toggle]');
    let activeIndex = 0;
    let timer;
    let paused = reducedMotion.matches;
    let hovering = false;
    let focused = false;

    const showSlide = (nextIndex) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const active = index === activeIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, index) => {
        const active = index === activeIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });
    };

    const stopTimer = () => window.clearInterval(timer);
    const startTimer = () => {
      stopTimer();
      if (!paused && !hovering && !focused && !document.hidden) {
        timer = window.setInterval(() => showSlide(activeIndex + 1), 5500);
      }
    };
    const updateToggle = () => {
      toggleButton.setAttribute('aria-pressed', String(paused));
      toggleButton.setAttribute('aria-label', paused ? 'Reproduzir apresentação' : 'Pausar apresentação');
      toggleButton.innerHTML = '<span class="carousel-play-icon" aria-hidden="true"></span>';
      carousel.setAttribute('aria-live', paused ? 'polite' : 'off');
    };

    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startTimer();
    });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startTimer();
    });
    dots.forEach((dot) => dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.carouselSlide));
      startTimer();
    }));
    toggleButton.addEventListener('click', () => {
      paused = !paused;
      updateToggle();
      startTimer();
    });
    carousel.addEventListener('mouseenter', () => {
      hovering = true;
      stopTimer();
    });
    carousel.addEventListener('mouseleave', () => {
      hovering = false;
      startTimer();
    });
    carousel.addEventListener('focusin', () => {
      focused = true;
      stopTimer();
    });
    carousel.addEventListener('focusout', (event) => {
      focused = carousel.contains(event.relatedTarget);
      if (!focused) startTimer();
    });
    document.addEventListener('visibilitychange', startTimer);
    reducedMotion.addEventListener?.('change', (event) => {
      if (event.matches) {
        paused = true;
        updateToggle();
      }
      startTimer();
    });
    updateToggle();
    startTimer();
  }

  // Mapa interativo incorporado na seção de redes sociais.
  const mapToggle = document.querySelector('[data-map-toggle]');
  const mapPanel = document.getElementById('mapa-da-regiao');
  const mapFrame = mapPanel?.querySelector('iframe[data-src]');
  const mapClose = mapPanel?.querySelector('[data-map-close]');

  if (mapToggle && mapPanel && mapFrame) {
    const setMapOpen = (isOpen) => {
      mapPanel.hidden = !isOpen;
      mapToggle.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        if (!mapFrame.hasAttribute('src')) mapFrame.src = mapFrame.dataset.src;
        window.requestAnimationFrame(() => {
          mapPanel.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start'
          });
        });
      } else {
        mapToggle.focus();
      }
    };

    mapToggle.addEventListener('click', () => {
      setMapOpen(mapPanel.hidden);
    });
    mapClose?.addEventListener('click', () => setMapOpen(false));
  }

  // 6. Manipulador do Formulário do WhatsApp
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value.trim();
      const regiao = document.getElementById('regiao').value;
      const assunto = document.getElementById('assunto').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      const telefone = '5561985150079';
      const texto = `Olá AMPAR-DF! Me chamo *${nome}* e sou de _${regiao}_.\n\n*Assunto:* ${assunto}\n*Mensagem:* ${mensagem}\n\nMensagem enviada através do portal da AMPAR-DF.`;
      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});

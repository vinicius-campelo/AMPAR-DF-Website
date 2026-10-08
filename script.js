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

  // Feed público em formato Atom das notícias da comunidade AMPAR-DF.
  const instagramFeed = document.querySelector('[data-instagram-feed]');
  const feedList = instagramFeed?.querySelector('[data-feed-list]');
  const feedStatus = instagramFeed?.querySelector('[data-feed-status]');

  if (instagramFeed && feedList && feedStatus) {
    const feedUrl = new URL(instagramFeed.dataset.feedUrl, window.location.href);
    const profileUrl = 'https://www.facebook.com/ampardf';
    let hasLoaded = false;

    const safeUrl = (value) => {
      if (typeof value !== 'string') return null;
      try {
        const url = new URL(value);
        return url.protocol === 'https:' ? url : null;
      } catch {
        return null;
      }
    };

    const safePostUrl = (value) => {
      const url = safeUrl(value);
      return url && (url.hostname === 'facebook.com' || url.hostname.endsWith('.facebook.com')) ? url.href : profileUrl;
    };

    const safeImageUrl = (value) => {
      const url = safeUrl(value);
      return url && (url.hostname.endsWith('.fbcdn.net') || url.hostname.endsWith('.fbsbx.com')) ? url.href : null;
    };

    const showFeedStatus = (message, includeProfileLink = false) => {
      feedStatus.replaceChildren(document.createTextNode(message));
      if (includeProfileLink) {
        const link = document.createElement('a');
        link.href = profileUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Acessar a página da AMPAR-DF.';
        feedStatus.append(' ', link);
      }
      feedStatus.hidden = false;
      feedList.hidden = true;
    };

    const extractEntryText = (rawContent) => {
      const parsedContent = new DOMParser().parseFromString((rawContent || '').replace(/<br\s*\/?\s*>/gi, ' '), 'text/html');
      parsedContent.querySelectorAll('script, style, iframe, noscript').forEach((element) => element.remove());
      return (parsedContent.body.textContent || '')
        .replace(/\(Feed generated with FetchRSS\)[\s\S]*$/i, '')
        .replace(/When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted\.?/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const createPostCard = (post) => {
      const item = document.createElement('li');
      item.className = 'instagram-post-card';

      const link = document.createElement('a');
      link.className = 'instagram-post-link';
      link.href = safePostUrl(post.url);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const imageUrl = safeImageUrl(post.image);
      if (imageUrl) {
        const image = document.createElement('img');
        image.className = 'instagram-post-thumbnail';
        image.src = imageUrl;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.addEventListener('error', () => image.remove(), { once: true });
        link.append(image);
      } else {
        const marker = document.createElement('span');
        marker.className = 'instagram-post-marker';
        marker.setAttribute('aria-hidden', 'true');
        marker.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4.75h14A2.25 2.25 0 0 1 21.25 7v10A2.25 2.25 0 0 1 19 19.25H5A2.25 2.25 0 0 1 2.75 17V7A2.25 2.25 0 0 1 5 4.75Z" stroke="currentColor" stroke-width="1.6"/><path d="m3 15 5-5 4 4 2.5-2.5L21 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        link.append(marker);
      }

      const content = document.createElement('div');
      content.className = 'instagram-post-content';

      const timestamp = Date.parse(post.date || '');
      if (Number.isFinite(timestamp)) {
        const time = document.createElement('time');
        time.className = 'instagram-post-date';
        time.dateTime = new Date(timestamp).toISOString();
        time.textContent = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(timestamp);
        content.append(time);
      }

      const headline = document.createElement('p');
      headline.className = 'instagram-post-caption';
      headline.textContent = post.title || 'Notícia da AMPAR-DF';
      content.append(headline);

      if (post.summary) {
        const summary = document.createElement('p');
        summary.className = 'instagram-post-summary';
        summary.textContent = post.summary.length > 220 ? `${Array.from(post.summary).slice(0, 217).join('').trimEnd()}…` : post.summary;
        content.append(summary);
      }

      link.append(content);

      const callToAction = document.createElement('span');
      callToAction.className = 'instagram-post-cta';
      callToAction.append(document.createTextNode('Ler notícia '));
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      callToAction.append(arrow);
      link.append(callToAction);
      item.append(link);
      return item;
    };

    const loadInstagramFeed = async () => {
      if (hasLoaded || !feedUrl) return;
      hasLoaded = true;
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12000);

      try {
        const response = await fetch(feedUrl.href, {
          headers: { Accept: 'application/json, application/atom+xml, application/xml, text/xml' },
          signal: controller.signal,
          cache: 'no-store'
        });
        if (!response.ok) throw new Error('Feed indisponível');

        const responseText = await response.text();
        const contentType = response.headers.get('content-type') || '';
        let posts;

        if (contentType.includes('application/json')) {
          const data = JSON.parse(responseText);
          if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Feed RSS inválido');

          posts = data.items.map((entry) => {
            const rawTitle = (entry.title || '').trim();
            const summary = extractEntryText(entry.content || entry.description || '');
            const genericTitle = !rawTitle || /^(this content isn't available right now|untitled)$/i.test(rawTitle);
            const title = genericTitle ? (summary.split(/(?<=[.!?])\s+/)[0] || summary) : rawTitle;
            const summaryText = title && summary.startsWith(title) ? summary.slice(title.length).replace(/^[\s,.!?…-]+/, '').trim() : summary;

            return {
              title: title || 'Notícia da AMPAR-DF',
              summary: summaryText,
              url: entry.link || '',
              date: entry.pubDate || '',
              image: entry.thumbnail || entry.enclosure?.link || ''
            };
          });
        } else {
          const xml = new DOMParser().parseFromString(responseText, 'application/xml');
          if (xml.querySelector('parsererror')) throw new Error('Formato Atom inválido');

          const atomNamespace = 'http://www.w3.org/2005/Atom';
          const entries = Array.from(xml.getElementsByTagNameNS(atomNamespace, 'entry'));
          posts = entries.map((entry) => {
            const getText = (tag) => entry.getElementsByTagNameNS(atomNamespace, tag)[0]?.textContent?.trim() || '';
            const rawTitle = getText('title');
            const content = entry.getElementsByTagNameNS(atomNamespace, 'content')[0]?.textContent || '';
            const summary = extractEntryText(content);
            const genericTitle = !rawTitle || /^(this content isn't available right now|untitled)$/i.test(rawTitle);
            const title = genericTitle ? (summary.split(/(?<=[.!?])\s+/)[0] || summary) : rawTitle;
            const summaryText = title && summary.startsWith(title) ? summary.slice(title.length).replace(/^[\s,.!?…-]+/, '').trim() : summary;
            const alternateLink = Array.from(entry.getElementsByTagNameNS(atomNamespace, 'link')).find((candidate) => candidate.getAttribute('rel') === 'alternate')
              || entry.getElementsByTagNameNS(atomNamespace, 'link')[0];
            const media = entry.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0];

            return {
              title: title || 'Notícia da AMPAR-DF',
              summary: summaryText,
              url: alternateLink?.getAttribute('href') || '',
              date: getText('published') || getText('updated'),
              image: media?.getAttribute('url') || ''
            };
          });
        }

        posts = posts.filter((post) => post.title || post.summary)
          .sort((a, b) => Date.parse(b.date || '') - Date.parse(a.date || ''));

        if (!posts.length) {
          showFeedStatus('Ainda não há notícias disponíveis. Acompanhe as novidades na página da AMPAR-DF.', true);
          return;
        }

        const fragment = document.createDocumentFragment();
        posts.forEach((post) => fragment.append(createPostCard(post)));
        feedList.replaceChildren(fragment);
        feedStatus.hidden = true;
        feedList.hidden = false;
      } catch {
        showFeedStatus('Não foi possível atualizar as notícias agora. Acompanhe as novidades diretamente na página da AMPAR-DF.', true);
      } finally {
        window.clearTimeout(timeout);
      }
    };

    if ('IntersectionObserver' in window) {
      const feedObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          feedObserver.disconnect();
          loadInstagramFeed();
        }
      }, { rootMargin: '240px 0px' });
      feedObserver.observe(instagramFeed);
    } else {
      loadInstagramFeed();
    }
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

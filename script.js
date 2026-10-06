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

  // 6. Manipulador do Formulário do WhatsApp
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const regiao = document.getElementById('regiao').value;
      const assunto = document.getElementById('assunto').value;
      const mensagem = document.getElementById('mensagem').value;
      
      const telefone = '5561985150079'; // Número Oficial
      
      // Formata a mensagem lindamente para o WhatsApp
      const textoFormatado = `Olá AMPAR-DF! Me chamo *${nome}* e sou de _${regiao}_.%0A%0A*Assunto:* ${assunto}%0A*Mensagem:* ${mensagem}%0A%0A🌐 _Mensagem enviada através do novo Portal da AMPAR-DF_`;
      
      window.open(`https://wa.me/${telefone}?text=${textoFormatado}`, '_blank');
    });
  }
});

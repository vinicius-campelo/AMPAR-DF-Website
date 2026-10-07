<p align="center">
  <img src="images/media1.png" alt="AMPAR-DF Logo" width="160">
</p>

<h1 align="center">AMPAR-DF</h1>
<h3 align="center">Associação dos Moradores da Ponte Alta Norte e Regiões</h3>

<p align="center">
  <em>Ponte Alta Norte tem <strong>voz</strong>, tem <strong>rumo</strong>.</em>
</p>

<p align="center">
  <a href="https://vinicius-campelo.github.io/AMPAR-DF-Website/">
    <img src="https://img.shields.io/badge/🌐_Site_no_Ar-GitHub_Pages-6b1f60?style=for-the-badge" alt="GitHub Pages">
  </a>
  <img src="https://img.shields.io/github/deployments/vinicius-campelo/AMPAR-DF-Website/github-pages?style=for-the-badge&label=Deploy&color=8cc63f" alt="Deploy Status">
  <img src="https://img.shields.io/github/languages/top/vinicius-campelo/AMPAR-DF-Website?style=for-the-badge&color=f26522" alt="Linguagem Principal">
  <img src="https://img.shields.io/github/license/vinicius-campelo/AMPAR-DF-Website?style=for-the-badge&color=451340" alt="Licença">
</p>

---

## 📋 Sobre o Projeto

Site institucional da **AMPAR-DF** — organização comunitária sem fins lucrativos sediada no **Gama, Distrito Federal**, que representa famílias e produtores rurais de três núcleos:

| 🟢 Ponte Alta Norte | 🟠 Núcleo Rural Casa Grande | 🟣 Olhos D'Água |
|:---:|:---:|:---:|
| Sede da associação | Comunidade vizinha | Incluída no pedido de nova RA |

A associação atua como **canal direto entre a comunidade e o poder público**, com destaque para a luta pela criação de uma **Região Administrativa própria** junto à Câmara Legislativa do DF.

---

## ✨ Funcionalidades

- 🏛️ **Apresentação institucional** — História, missão e frentes de atuação da associação
- 📅 **Timeline interativa** — Marcos da trajetória da AMPAR-DF
- 🖼️ **Galeria de fotos** — Espaços preparados para registros da comunidade
- 👥 **Diretoria** — Seção dedicada à equipe da associação
- 🗺️ **Área atendida** — Detalhamento dos três núcleos representados
- 📱 **Redes sociais** — Links diretos para Instagram, Facebook, WhatsApp e site oficial
- 💬 **Formulário de contato** — Envio de mensagem direta via WhatsApp
- 📱 **Design responsivo** — Adaptado para desktop, tablet e celular
- 🎨 **Animações suaves** — Parallax, reveal on scroll e efeitos de hover

---

## 🎨 Design

O visual do site é construído sobre a **identidade visual da AMPAR-DF**, utilizando:

```
Paleta de Cores
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟣 Roxo Institucional    #6b1f60
🟣 Roxo Escuro           #451340
🟢 Verde (destaque)      #8CC63F
🟠 Laranja (acento)      #F26522
⚪ Branco                #FFFFFF
```

**Tipografia:**
- **Display:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — títulos e destaques
- **Corpo:** [Manrope](https://fonts.google.com/specimen/Manrope) — textos e navegação
- **Mono:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — tags e labels

---

## 🛠️ Tecnologias

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome">
  <img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white" alt="Google Fonts">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

- **HTML5** — Estrutura semântica e acessível
- **CSS3** — Layout com CSS Grid e Flexbox, animações nativas, variáveis CSS
- **JavaScript** — Menu mobile, scroll effects, formulário WhatsApp, IntersectionObserver
- **Font Awesome 6** — Ícones no formulário de contato
- **Google Fonts** — Tipografia personalizada
- **GitHub Actions** — CI/CD com deploy automático no GitHub Pages

---

## 📁 Estrutura do Projeto

```
AMPAR-DF-Website/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Workflow de deploy automático
├── images/
│   ├── media1.png            # Logo da AMPAR-DF
│   └── media2.png            # Foto de destaque (hero)
├── index.html                # Página principal
├── style.css                 # Estilos do site
├── script.js                 # Scripts e interatividade
├── .gitignore
└── README.md
```

---

## 🚀 Deploy

O site é publicado automaticamente no **GitHub Pages** a cada push na branch `main`, via **GitHub Actions**.

```mermaid
graph LR
    A[git push main] --> B[GitHub Actions]
    B --> C[Checkout]
    C --> D[Upload Artifact]
    D --> E[Deploy Pages]
    E --> F[🌐 Site no ar!]
    
    style A fill:#6b1f60,color:#fff,stroke:#451340
    style B fill:#451340,color:#fff,stroke:#6b1f60
    style F fill:#8cc63f,color:#fff,stroke:#6b1f60
```

**URL do site:** [https://vinicius-campelo.github.io/AMPAR-DF-Website/](https://vinicius-campelo.github.io/AMPAR-DF-Website/)

---

## 💻 Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/vinicius-campelo/AMPAR-DF-Website.git

# Entre na pasta
cd AMPAR-DF-Website

# Abra no navegador (ou use um servidor local)
start index.html
```

> **Dica:** Para uma experiência completa, use um servidor local como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VS Code.

---

## 📞 Contato da Associação

| Canal | Informação |
|:------|:-----------|
| 📱 **WhatsApp** | [(61) 98515-0079](https://wa.me/5561985150079) |
| 📧 **E-mail** | [df.ampar@gmail.com](mailto:df.ampar@gmail.com) |
| 📸 **Instagram** | [@ampardf](https://www.instagram.com/ampardf/) |
| 📘 **Facebook** | [AMPAR DF](https://www.facebook.com/ampardf/) |
| 🌐 **Site oficial** | [ampardf.com.br](https://ampardf.com.br/) |
| 📍 **Endereço** | Chácara 09, Lote 04 — Ponte Alta Norte, Gama-DF · CEP 72427-010 |

---

<p align="center">
  <sub>⚠️ Site informativo elaborado a partir de informações públicas. Para informações oficiais, consulte os canais diretos da AMPAR-DF.</sub>
</p>

<p align="center">
  <sub>Feito com 💜 para a comunidade de Ponte Alta Norte, Gama-DF</sub>
</p>


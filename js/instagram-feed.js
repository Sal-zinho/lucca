/**
 * Lucca Restaurante - Módulo de Feed e Galeria Instagram
 * Integração com fotos reais do ambiente, pratos e presença social (@complexobrasil21 / #LuccaRestaurante)
 * Contém mecanismo de fallback resiliente e visualizador Lightbox interativo.
 */

const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    category: 'pratos',
    url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Dourado, crocante e suculento: o tradicional Galeto al Primo Canto marinado em vinho e ervas da serra. Servido à vontade no nosso rodízio! 🍗✨ #LuccaRestaurante #Brasil21Gastronomia #GaleteriaBrasilia',
    likes: '482 curtidas',
    comments: '38 comentários',
    date: 'Há 3 dias',
    tag: 'Rodízio Tradicional'
  },
  {
    id: 'post-2',
    category: 'pratos',
    url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Festival de Risotto em cartaz! Nosso clássico Risotto de Funghi Porcini com queijo Grana Padano e azeite trufado. Pura cremosidade italiana no seu jantar. 🍲🇮🇹 #FestivalDeRisotto #GastronomiaBSB',
    likes: '629 curtidas',
    comments: '54 comentários',
    date: 'Há 5 dias',
    tag: 'Festival de Risotto'
  },
  {
    id: 'post-3',
    category: 'ambiente',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Ambiente aconchegante, iluminação cênica e a sofisticação que o seu jantar romântico merece no Complexo Brasil 21. Já reservou a sua mesa para hoje? 🕯️🥂 #JantarRomantico #NoiteEmBrasilia',
    likes: '512 curtidas',
    comments: '41 comentários',
    date: 'Há 1 semana',
    tag: 'Ambiente & Romantismo'
  },
  {
    id: 'post-4',
    category: 'pratos',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Combinação sublime: Risotto Al Parmigiano com Tornedor de Mignon alto grelhado na manteiga de ervas e redução de vinho do Porto. Uma obra de arte à mesa! 🥩🍷 #LuccaCucina',
    likes: '741 curtidas',
    comments: '63 comentários',
    date: 'Há 1 semana',
    tag: 'Cortes Nobres'
  },
  {
    id: 'post-5',
    category: 'vinhos',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Nossa adega conta com mais de 120 rótulos selecionados das melhores regiões vinícolas da Itália, França, Portugal e Serra Gaúcha. Peça a harmonização do sommelier! 🍇🍾 #AdegaLucca',
    likes: '389 curtidas',
    comments: '27 comentários',
    date: 'Há 2 semanas',
    tag: 'Adega & Vinhos'
  },
  {
    id: 'post-6',
    category: 'pratos',
    url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Filé de Tilápia fresca com crosta de ervas e raspas cítricas, servida com legumes salteados no azeite extravirgem. Uma opção leve e surpreendente do nosso rodízio! 🐟🌿',
    likes: '415 curtidas',
    comments: '31 comentários',
    date: 'Há 2 semanas',
    tag: 'Peixes & Grelhados'
  },
  {
    id: 'post-7',
    category: 'ambiente',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Almoço de negócios no coração do Plano Piloto. Localizado no Complexo Brasil 21 Suítes, com serviço ágil, Wi-Fi veloz e privacidade para suas reuniões. 👔💼 #AlmocoExecutivoBSB',
    likes: '352 curtidas',
    comments: '19 comentários',
    date: 'Há 3 semanas',
    tag: 'Executivo & Brasil 21'
  },
  {
    id: 'post-8',
    category: 'sobremesas',
    url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85',
    instagramLink: 'https://www.instagram.com/complexobrasil21/',
    caption: 'Para fechar com chave de ouro: Tiramisù clássico veneziano com mascarpone fresco e cacau belga 100%. Uma explosão de leveza e sabor! 🍮☕ #DolciItaliani #SobremesaPerfeita',
    likes: '598 curtidas',
    comments: '47 comentários',
    date: 'Há 3 semanas',
    tag: 'Sobremesas Artesanais'
  }
];

class InstagramFeedManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderGallery(this.currentFilter);
    this.bindEvents();
    this.setupLightbox();
  }

  renderGallery(filter = 'all') {
    const filteredPosts = filter === 'all'
      ? INSTAGRAM_POSTS
      : INSTAGRAM_POSTS.filter(post => post.category === filter);

    this.container.innerHTML = filteredPosts.map((post, idx) => `
      <div class="insta-card group" data-category="${post.category}" data-id="${post.id}" style="animation-delay: ${idx * 0.08}s">
        <div class="insta-image-wrapper">
          <img
            src="${post.url}"
            alt="Lucca Restaurante - ${post.tag}"
            loading="lazy"
            class="insta-img"
            onerror="this.onerror=null; this.src='${post.fallbackUrl}'"
          />
          <div class="insta-overlay">
            <div class="insta-tag-pill">${post.tag}</div>
            <div class="insta-metrics">
              <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> ${post.likes}</span>
              <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> ${post.comments}</span>
            </div>
            <p class="insta-caption-preview">${post.caption.substring(0, 90)}...</p>
            <button class="insta-view-btn" data-post-id="${post.id}" aria-label="Ver detalhes do post">
              <span>Ver Detalhes</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
          <div class="insta-corner-logo">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        </div>
      </div>
    `).join('');

    // Re-bind click handlers for modal
    this.container.querySelectorAll('.insta-view-btn, .insta-image-wrapper').forEach(el => {
      el.addEventListener('click', (e) => {
        const card = el.closest('.insta-card');
        const postId = card ? card.dataset.id : null;
        if (postId) {
          this.openPostModal(postId);
        }
      });
    });

    if (window.luccaAnimations && typeof window.luccaAnimations.animateInstaCards === 'function') {
      window.luccaAnimations.animateInstaCards();
    }
  }

  bindEvents() {
    const filterButtons = document.querySelectorAll('.insta-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter || 'all';
        this.currentFilter = filter;
        this.renderGallery(filter);
      });
    });
  }

  setupLightbox() {
    let modal = document.getElementById('insta-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'insta-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 hidden';
      modal.innerHTML = `
        <div class="relative max-w-4xl w-full bg-[#161311] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform scale-95 transition-transform duration-300">
          <button id="close-insta-modal" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors" aria-label="Fechar">
            ✕
          </button>
          <div class="md:w-3/5 bg-black flex items-center justify-center relative min-h-[320px]">
            <img id="modal-insta-img" src="" alt="Post Lucca" class="max-h-[500px] w-full object-cover">
          </div>
          <div class="md:w-2/5 p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 pb-4 border-b border-white/10">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#6B1D2F] p-0.5">
                  <div class="w-full h-full rounded-full bg-[#161311] flex items-center justify-center font-serif text-[#D4AF37] font-bold">L</div>
                </div>
                <div>
                  <h4 class="font-serif font-bold text-white text-sm">lucca.restaurante</h4>
                  <p class="text-xs text-[#D4AF37]">Complexo Brasil 21 • Brasília, DF</p>
                </div>
              </div>
              <p id="modal-insta-caption" class="text-gray-300 text-sm mt-4 leading-relaxed"></p>
              <div id="modal-insta-tag" class="mt-3 inline-block px-2.5 py-1 bg-[#D4AF37]/15 text-[#D4AF37] rounded-full text-xs font-semibold"></div>
            </div>
            <div class="pt-4 border-t border-white/10 mt-6">
              <div class="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span id="modal-insta-likes"></span>
                <span id="modal-insta-date"></span>
              </div>
              <a id="modal-insta-link" href="https://www.instagram.com/complexobrasil21/" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-center text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span>Ver no Instagram Oficial</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('#close-insta-modal')) {
          this.closePostModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
          this.closePostModal();
        }
      });
    }
  }

  openPostModal(postId) {
    const post = INSTAGRAM_POSTS.find(p => p.id === postId);
    if (!post) return;

    const modal = document.getElementById('insta-modal');
    const img = document.getElementById('modal-insta-img');
    const caption = document.getElementById('modal-insta-caption');
    const tag = document.getElementById('modal-insta-tag');
    const likes = document.getElementById('modal-insta-likes');
    const date = document.getElementById('modal-insta-date');
    const link = document.getElementById('modal-insta-link');

    img.src = post.url;
    caption.textContent = post.caption;
    tag.textContent = post.tag;
    likes.textContent = `❤️ ${post.likes} • 💬 ${post.comments}`;
    date.textContent = post.date;
    link.href = post.instagramLink;

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      const innerCard = modal.querySelector('.transform');
      if (innerCard) {
        innerCard.classList.remove('scale-95');
        innerCard.classList.add('scale-100');
      }
    });
    document.body.style.overflow = 'hidden';
  }

  closePostModal() {
    const modal = document.getElementById('insta-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    const innerCard = modal.querySelector('.transform');
    if (innerCard) {
      innerCard.classList.add('scale-95');
      innerCard.classList.remove('scale-100');
    }
    setTimeout(() => {
      if (modal.classList.contains('opacity-0')) {
        modal.classList.add('hidden');
      }
    }, 300);
    document.body.style.overflow = '';
  }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('instagram-gallery-container')) {
    window.instaManager = new InstagramFeedManager('instagram-gallery-container');
  }
});

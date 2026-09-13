/**
 * Lucca Restaurante & Galeteria - Lógica Principal da Aplicação
 * Funcionalidades: Horário em tempo real (Brasília), Renderização do Menu,
 * Simulador de Reservas WhatsApp, Carrossel de Avaliações e Modais.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveRestaurantStatus();
  initNavigation();
  initMenuRenderer();
  initReviewsCarousel();
  initReservationModal();
  initDishModal();
  initFaqAccordion();
});

/* ==========================================================================
   1. STATUS EM TEMPO REAL DO RESTAURANTE (Fuso Horário de Brasília)
   ========================================================================== */
function initLiveRestaurantStatus() {
  const statusPills = document.querySelectorAll('.restaurant-live-status');
  if (!statusPills.length) return;

  const updateStatus = () => {
    // Obter hora atual no fuso de Brasília
    const now = new Date();
    const bsbTimeString = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    const bsbDate = new Date(bsbTimeString);

    const dayOfWeek = bsbDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = bsbDate.getHours();
    const minute = bsbDate.getMinutes();
    const currentTimeInMinutes = hour * 60 + minute;

    let isOpen = false;
    let statusText = '';
    let nextEventText = '';

    // Horários Oficiais:
    // Almoço Seg-Sex: 12:00 (720m) às 15:00 (900m)
    // Almoço Sáb-Dom: 12:00 (720m) às 16:00 (960m)
    // Jantar Seg-Sáb: 19:00 (1140m) às 23:30 (1410m)

    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const lunchStart = 12 * 60;
    const lunchEnd = isWeekend ? 16 * 60 : 15 * 60;
    const dinnerStart = 19 * 60;
    const dinnerEnd = 23 * 60 + 30;

    if (currentTimeInMinutes >= lunchStart && currentTimeInMinutes < lunchEnd) {
      isOpen = true;
      statusText = 'Aberto Agora • Almoço & Rodízio';
      nextEventText = `Fecha às ${isWeekend ? '16:00' : '15:00'}`;
    } else if (dayOfWeek !== 0 && currentTimeInMinutes >= dinnerStart && currentTimeInMinutes < dinnerEnd) {
      isOpen = true;
      statusText = 'Aberto Agora • Festival de Risotto & Jantar';
      nextEventText = 'Fecha às 23:30';
    } else {
      isOpen = false;
      if (currentTimeInMinutes < lunchStart) {
        statusText = 'Fechado no Momento';
        nextEventText = 'Abre hoje para almoço às 12:00';
      } else if (currentTimeInMinutes >= lunchEnd && currentTimeInMinutes < dinnerStart && dayOfWeek !== 0) {
        statusText = 'Intervalo da Tarde';
        nextEventText = 'Reabre para jantar às 19:00';
      } else {
        statusText = 'Fechado no Momento';
        nextEventText = 'Abre amanhã às 12:00';
      }
    }

    statusPills.forEach(pill => {
      pill.innerHTML = `
        <span class="status-dot ${isOpen ? 'open' : 'closed'}"></span>
        <span class="text-white font-medium">${statusText}</span>
        <span class="text-gray-400 text-xs hidden sm:inline-block">(${nextEventText})</span>
      `;
    });
  };

  updateStatus();
  setInterval(updateStatus, 60000); // Atualizar a cada 1 minuto
}

/* ==========================================================================
   2. NAVEGAÇÃO & HEADER RESPONSIVO
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Detecção de Scroll para Efeito Glassmorphism
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('glass-header', 'py-3');
      header.classList.remove('py-5');
    } else {
      header.classList.remove('glass-header', 'py-3');
      header.classList.add('py-5');
    }
  }, { passive: true });

  // Mobile Menu Drawer
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileDrawer.classList.toggle('active');
      mobileDrawer.classList.toggle('hidden', !isExpanded);
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);

      const icon = mobileMenuBtn.querySelector('svg');
      if (isExpanded) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileDrawer.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      });
    });
  }
}

/* ==========================================================================
   3. RENDERIZADOR DINÂMICO DO CARDÁPIO & FILTROS
   ========================================================================== */
function initMenuRenderer() {
  const tabsContainer = document.getElementById('menu-tabs-container');
  const itemsContainer = document.getElementById('menu-items-grid');
  if (!tabsContainer || !itemsContainer || typeof MENU_DATA === 'undefined') return;

  // Renderizar Botões de Categorias
  const allCategoryBtn = `
    <button class="menu-tab-btn active" data-category="all">
      <span>✨</span>
      <span>Destaques & Menu Completo</span>
    </button>
  `;

  const categoryButtons = MENU_DATA.categories.map(cat => `
    <button class="menu-tab-btn" data-category="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  tabsContainer.innerHTML = allCategoryBtn + categoryButtons;

  // Função para Renderizar os Cards de Pratos
  const renderItems = (category = 'all') => {
    const filteredItems = category === 'all'
      ? MENU_DATA.items
      : MENU_DATA.items.filter(item => item.category === category);

    itemsContainer.innerHTML = filteredItems.map((item, idx) => `
      <div class="menu-card menu-card-item group" data-id="${item.id}" style="animation-delay: ${idx * 0.05}s">
        <div class="menu-card-img-wrapper cursor-pointer" onclick="openDishQuickView('${item.id}')">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="menu-card-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'"
          />
          ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
              <span>Clique para ver detalhes & harmonização</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-baseline gap-2 mb-2">
              <h3 class="font-serif font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-snug cursor-pointer" onclick="openDishQuickView('${item.id}')">
                ${item.name}
              </h3>
              <span class="text-[#D4AF37] font-bold font-serif whitespace-nowrap text-base">${item.price}</span>
            </div>
            <p class="text-xs text-[#C5A059] font-medium mb-3">${item.subtitle}</p>
            <p class="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">${item.description}</p>
          </div>

          <div>
            ${item.pairing ? `
              <div class="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400 mb-4">
                <span class="text-[#D4AF37]">🍷 Sugestão do Sommelier:</span>
                <span class="truncate text-gray-300">${item.pairing}</span>
              </div>
            ` : ''}

            <div class="flex items-center gap-2 pt-2">
              <button onclick="openDishQuickView('${item.id}')" class="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors text-center">
                Ver Receita & Detalhes
              </button>
              <button onclick="openReservationWithDish('${item.name}')" class="py-2 px-4 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 transition-all text-center flex items-center gap-1">
                <span>Reservar</span>
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Inicializar com todos os pratos
  renderItems('all');

  // Evento de Clique nas Abas
  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab-btn');
    if (!btn) return;

    tabsContainer.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.category;
    renderItems(category);

    if (window.luccaAnimations && typeof window.luccaAnimations.animateMenuCards === 'function') {
      window.luccaAnimations.animateMenuCards();
    }
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
}

/* ==========================================================================
   4. MODAL DE DETALHES DO PRATO (QUICK VIEW)
   ========================================================================== */
function initDishModal() {
  window.openDishQuickView = function(dishId) {
    const item = MENU_DATA.items.find(d => d.id === dishId);
    if (!item) return;

    let modal = document.getElementById('dish-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dish-detail-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300 opacity-0 pointer-events-none';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="relative max-w-2xl w-full bg-[#161311] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col transform scale-95 transition-transform duration-300">
        <button onclick="closeDishModal()" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors" aria-label="Fechar">
          ✕
        </button>

        <div class="relative h-64 sm:h-72 w-full bg-black overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-[#161311] via-transparent to-transparent"></div>
          ${item.badge ? `<span class="absolute top-4 left-4 menu-badge">${item.badge}</span>` : ''}
          <div class="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <span class="text-xs text-[#C5A059] uppercase tracking-wider font-semibold">Tradição Italiana • Lucca</span>
              <h3 class="font-serif font-bold text-2xl text-white">${item.name}</h3>
            </div>
            <span class="font-serif font-bold text-xl text-[#D4AF37] bg-black/60 px-3 py-1 rounded-lg border border-[#D4AF37]/40">${item.price}</span>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <div>
            <h4 class="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-2">Descrição da Receita</h4>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed">${item.description}</p>
          </div>

          ${item.pairing ? `
            <div class="p-4 rounded-xl bg-[#0B0A09] border border-white/10 flex items-start gap-3">
              <span class="text-2xl">🍷</span>
              <div>
                <h5 class="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Harmonização Sugerida pelo Sommelier</h5>
                <p class="text-gray-300 text-sm mt-0.5">${item.pairing}</p>
              </div>
            </div>
          ` : ''}

          ${item.dietary ? `
            <div class="flex flex-wrap gap-2">
              ${item.dietary.map(d => `<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">✓ ${d}</span>`).join('')}
              <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">🍽️ Porção: ${item.serves}</span>
            </div>
          ` : ''}

          <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <button onclick="openReservationWithDish('${item.name}')" class="btn-gold flex-1 py-3 text-sm flex items-center justify-center gap-2">
              <span>Reservar Mesa para Provar</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
            </button>
            <button onclick="closeDishModal()" class="py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-colors">
              Continuar Olhando
            </button>
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      const inner = modal.querySelector('.transform');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    });
    document.body.style.overflow = 'hidden';

    modal.onclick = (e) => {
      if (e.target === modal) closeDishModal();
    };
  };

  window.closeDishModal = function() {
    const modal = document.getElementById('dish-detail-modal');
    if (modal) {
      modal.classList.add('opacity-0', 'pointer-events-none');
      const inner = modal.querySelector('.transform');
      if (inner) {
        inner.classList.add('scale-95');
        inner.classList.remove('scale-100');
      }
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 300);
      document.body.style.overflow = '';
    }
  };
}

/* ==========================================================================
   5. SIMULADOR INTELIGENTE DE RESERVA VIA WHATSAPP (61) 3218-4746
   ========================================================================== */
function initReservationModal() {
  const reservationModal = document.getElementById('reservation-modal');
  const openButtons = document.querySelectorAll('.open-reservation-btn');
  const closeBtn = document.getElementById('close-reservation-modal');
  const form = document.getElementById('reservation-form');

  if (!reservationModal || !form) return;

  const openModal = (dishName = '') => {
    if (dishName && form.querySelector('#res-dish-highlight')) {
      form.querySelector('#res-dish-highlight').value = dishName;
    }
    reservationModal.classList.remove('hidden');
    requestAnimationFrame(() => {
      reservationModal.classList.remove('opacity-0', 'pointer-events-none');
      const inner = reservationModal.querySelector('.transform');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    reservationModal.classList.add('opacity-0', 'pointer-events-none');
    const inner = reservationModal.querySelector('.transform');
    if (inner) {
      inner.classList.add('scale-95');
      inner.classList.remove('scale-100');
    }
    setTimeout(() => {
      if (reservationModal.classList.contains('opacity-0')) {
        reservationModal.classList.add('hidden');
      }
    }, 300);
    document.body.style.overflow = '';
  };

  window.openReservationWithDish = (dishName) => {
    if (dishName) {
      const dishInput = document.getElementById('res-dish-highlight');
      if (dishInput) dishInput.value = `Destaque: ${dishName}`;
    }
    if (typeof closeDishModal === 'function') closeDishModal();
    openModal(dishName);
  };

  openButtons.forEach(btn => btn.addEventListener('click', () => openModal()));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) closeModal();
  });

  // Submissão do Formulário de Reserva
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#res-name').value.trim();
    const phone = form.querySelector('#res-phone').value.trim();
    const date = form.querySelector('#res-date').value;
    const time = form.querySelector('#res-time').value;
    const guests = form.querySelector('#res-guests').value;
    const occasion = form.querySelector('#res-occasion').value;
    const notes = form.querySelector('#res-notes').value.trim();
    const dishHighlight = form.querySelector('#res-dish-highlight') ? form.querySelector('#res-dish-highlight').value : '';

    if (!name || !date || !time) {
      alert('Por favor, preencha seu nome, data e horário para a reserva.');
      return;
    }

    // Formatar Data para formato brasileiro (DD/MM/AAAA)
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Construir mensagem personalizada para o WhatsApp oficial
    let message = `*SOLICITAÇÃO DE RESERVA - LUCCA RESTAURANTE*\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    if (phone) message += `📞 *Telefone:* ${phone}\n`;
    message += `📅 *Data:* ${formattedDate}\n`;
    message += `⏰ *Horário:* ${time}\n`;
    message += `👥 *Número de Pessoas:* ${guests}\n`;
    message += `✨ *Ocasião:* ${occasion}\n`;
    if (dishHighlight) message += `🍽️ *Interesse Principal:* ${dishHighlight}\n`;
    if (notes) message += `📝 *Observações / Preferência de Mesa:* ${notes}\n\n`;
    message += `_Mensagem enviada através do site oficial luccarestaurante.com.br (Complexo Brasil 21)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/556132184746?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    closeModal();
  });
}

/* ==========================================================================
   6. CARROSSEL DE AVALIAÇÕES E PROVA SOCIAL (4.8 / 5.0 Estrelas)
   ========================================================================== */
function initReviewsCarousel() {
  const container = document.getElementById('reviews-container');
  if (!container || typeof MENU_DATA === 'undefined' || !MENU_DATA.reviews) return;

  let currentIndex = 0;
  const reviews = MENU_DATA.reviews;

  const renderCarousel = () => {
    container.innerHTML = `
      <div class="relative overflow-hidden w-full">
        <div class="reviews-slider flex transition-transform duration-500 ease-out" style="transform: translateX(-${currentIndex * 100}%)">
          ${reviews.map(rev => `
            <div class="w-full flex-shrink-0 px-2">
              <div class="testimonial-card">
                <div class="flex items-center justify-between gap-4 mb-4">
                  <div class="flex items-center gap-3">
                    <img src="${rev.avatar}" alt="${rev.author}" class="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/50">
                    <div>
                      <h4 class="font-serif font-bold text-white text-base">${rev.author}</h4>
                      <p class="text-xs text-[#C5A059]">${rev.role}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    <span class="text-[#D4AF37] font-bold text-sm">4.8</span>
                    <span class="text-yellow-400 text-sm">★★★★★</span>
                  </div>
                </div>
                <div class="mb-3">
                  <span class="text-xs font-semibold text-[#D4AF37] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    "${rev.highlight}"
                  </span>
                </div>
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                  "${rev.text}"
                </p>
                <div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
                  <span>${rev.date}</span>
                  <span class="flex items-center gap-1 text-emerald-400">
                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    Avaliação Verificada
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center justify-between mt-6 px-2">
        <div class="flex items-center gap-2">
          ${reviews.map((_, i) => `
            <button class="review-dot w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/20'}" data-index="${i}" aria-label="Avaliação ${i + 1}"></button>
          `).join('')}
        </div>
        <div class="flex items-center gap-2">
          <button id="prev-review-btn" class="w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors" aria-label="Avaliação Anterior">
            ←
          </button>
          <button id="next-review-btn" class="w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white border border-white/10 flex items-center justify-center transition-colors" aria-label="Próxima Avaliação">
            →
          </button>
        </div>
      </div>
    `;

    // Botões Próximo / Anterior
    const prevBtn = container.querySelector('#prev-review-btn');
    const nextBtn = container.querySelector('#next-review-btn');
    const dots = container.querySelectorAll('.review-dot');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
        renderCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % reviews.length;
        renderCarousel();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        renderCarousel();
      });
    });
  };

  renderCarousel();

  // Autoplay suave a cada 7 segundos
  setInterval(() => {
    currentIndex = (currentIndex + 1) % reviews.length;
    renderCarousel();
  }, 7000);
}

/* ==========================================================================
   7. ACCORDION DE DÚVIDAS FREQUENTES (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

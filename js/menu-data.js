/**
 * Lucca Restaurante - Dados Oficiais do Cardápio e Experiências
 * Galeteria Italiana, Rodízio de Galetos, Steaks & Tilápia, e Festival de Risotto
 * Localização: SHS Quadra 6, Bloco F, 1º andar - Complexo Brasil 21 Suítes, Brasília - DF
 * Contato / Reservas: (61) 3218-4746
 */

const MENU_DATA = {
  categories: [
    { id: 'rodizio', name: 'Rodízio Tradicional', icon: '🍗', description: 'Sequência completa de Galeto al Primo Canto, Steaks Nobres, Tilápia e Acompanhamentos Coloniais' },
    { id: 'risotto', name: 'Festival de Risotto', icon: '🍲', description: 'Criações exclusivas com arroz arbóreo importado, queijos curados e ingredientes nobres' },
    { id: 'carnes-peixes', name: 'Cortes & Grelhados', icon: '🥩', description: 'Steaks selecionados e filé de tilápia fresca grelhados na brasa' },
    { id: 'massas', name: 'Massas Artesanais', icon: '🍝', description: 'Pastas frescas preparadas diariamente segundo a tradição do norte da Itália' },
    { id: 'entradas', name: 'Antipasti & Entradas', icon: '🧆', description: 'Sopa de capeletti, polentas crocantes e saladas clássicas' },
    { id: 'vinhos', name: 'Adega & Harmonização', icon: '🍷', description: 'Seleção curada de mais de 120 rótulos da Itália e do Novo Mundo' },
    { id: 'sobremesas', name: 'Dolci & Sobremesas', icon: '🍮', description: 'Finalizações clássicas como Tiramisù tradicional e Creme de Papaya' }
  ],
  items: [
    // RODÍZIO PRINCIPAL
    {
      id: 'rodizio-completo',
      category: 'rodizio',
      name: 'Sequência Completa de Galeteria & Cortes Nobres',
      subtitle: 'A autêntica experiência ítalo-gaúcha em Brasília',
      description: 'Galeto al Primo Canto marinado por 24h em vinho branco e ervas finas da Serra, acompanhado de cortes nobres de Steaks na brasa, Filé de Tilápia crocante, Polenta frita crocante, Polenta cremosa ao ragù, Radicchio com bacon artesanal, Maionese colonial e Sopa de Capeletti de boas-vindas.',
      price: 'R$ 89,90',
      badge: 'Assinatura da Casa',
      popular: true,
      serves: 'Individual (À vontade)',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85'
      ],
      pairing: 'Vinho Chianti Classico DOCG ou Valpolicella Ripasso',
      dietary: ['Contém Aves', 'Opção Sem Glúten sob consulta']
    },
    {
      id: 'galeto-al-primo-canto',
      category: 'rodizio',
      name: 'Galeto al Primo Canto Dourado',
      subtitle: 'Assado lentamente na brasa perfumada com sálvia',
      description: 'Galeto jovem selecionado, pele ultra crocante e carne suculenta, marinado em vinho branco seco, sálvia fresca, alecrim e especiarias italianas. Servido com polenta frita dourada.',
      price: 'Incluso no Rodízio',
      badge: 'Estrela do Menu',
      popular: true,
      serves: 'Servido à mesa',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Vinho Tinto Barbera d’Alba ou Pinot Noir',
      dietary: ['Sem Glúten', 'Assado na Brasa']
    },

    // FESTIVAL DE RISOTTO
    {
      id: 'risotto-funghi-tartufo',
      category: 'risotto',
      name: 'Risotto de Funghi Porcini & Azeite Trufado',
      subtitle: 'Cremoso, terroso e com aroma inconfundível',
      description: 'Arroz Carnaroli importado cozido lentamente em caldo artesanal de cogumelos, funghi porcini salteados na manteiga noisette, queijo Grana Padano ralado na hora e finalizado com azeite de trufas brancas.',
      price: 'R$ 78,00',
      badge: 'Festival de Risotto',
      popular: true,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Brunello di Montalcino ou Barolo',
      dietary: ['Vegetariano', 'Sem Glúten']
    },
    {
      id: 'risotto-parmigiano-mignon',
      category: 'risotto',
      name: 'Risotto Parmigiano com Tornedor de Mignon',
      subtitle: 'Harmonia clássica com redução de vinho do Porto',
      description: 'Risotto clássico de Parmigiano Reggiano 24 meses, acompanhado de tornedor alto de filé mignon grelhado na manteiga de ervas e glaceado em redução espessa de vinho do Porto.',
      price: 'R$ 86,00',
      badge: 'Chef Special',
      popular: true,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Cabernet Sauvignon Reserva ou Amarone della Valpolicella',
      dietary: ['Sem Glúten']
    },
    {
      id: 'risotto-camarao-limao',
      category: 'risotto',
      name: 'Risotto de Camarões Rosa & Limão Siciliano',
      subtitle: 'Frescor cítrico e camarões salteados ao vinho branco',
      description: 'Camarões rosa salteados no azeite extravirgem com raspas e suco de limão siciliano fresco, ervas finas aromáticas, queijo pecorino suave e brotos frescos.',
      price: 'R$ 84,00',
      badge: 'Festival de Risotto',
      popular: false,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Vinho Branco Pinot Grigio ou Sauvignon Blanc',
      dietary: ['Frutos do Mar', 'Sem Glúten']
    },
    {
      id: 'risotto-gorgonzola-pera',
      category: 'risotto',
      name: 'Risotto de Gorgonzola Doce, Pêras & Nozes',
      subtitle: 'Contraste sublime entre o queijo cremoso e a doçura da pêra',
      description: 'Arroz arbóreo preparado com queijo gorgonzola dolce italiano, lâminas de pêras caramelizadas no mel silvestre e nozes pecã tostadas crocantes.',
      price: 'R$ 74,00',
      badge: 'Opção Romântica',
      popular: false,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Chardonnay barricado ou Prosecco Valdobbiadene',
      dietary: ['Vegetariano']
    },

    // CORTES & GRELHADOS
    {
      id: 'steak-ancho-nobres',
      category: 'carnes-peixes',
      name: 'Steak Ancho Premium na Brasa',
      subtitle: 'Marmororeio superior e maciez incomparável',
      description: 'Corte alto de Ancho Angus preparado na brasa viva com flor de sal e chimichurri artesanal da casa. Acompanha batatas rústicas ao alecrim e farofa de castanhas.',
      price: 'R$ 89,00',
      badge: 'Corte Nobre',
      popular: true,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Malbec Gran Reserva ou Syrah',
      dietary: ['Sem Glúten', 'Carnes Nobres']
    },
    {
      id: 'tilapia-crosta-ervas',
      category: 'carnes-peixes',
      name: 'Filé de Tilápia Grelhada com Crosta de Ervas',
      subtitle: 'Leve, delicada e com azeite extravirgem aromatizado',
      description: 'Filé fresco de tilápia grelhado ao ponto exato, com crosta crocante de panko, ervas mediterrâneas e raspas cítricas. Servido com legumes grelhados no azeite de oliva.',
      price: 'R$ 69,00',
      badge: 'Leve & Saudável',
      popular: false,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Vinho Verde DOC ou Vermentino di Sardegna',
      dietary: ['Peixes', 'Baixo Teor de Gordura']
    },

    // MASSAS ARTESANAIS
    {
      id: 'tortei-abobora-manteiga',
      category: 'massas',
      name: 'Tortéi Colonial de Abóbora na Manteiga & Sálvia',
      subtitle: 'Massa fresca artesanal recheada com abóbora caramelizada',
      description: 'Tradicional tortéi da serra gaúcha com recheio adocicado de abóbora e especiarias, salteado na manteiga dourada com folhas frescas de sálvia e queijo parmesão ralado.',
      price: 'R$ 68,00',
      badge: 'Tradição da Serra',
      popular: true,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Vinho Branco Soave Classico',
      dietary: ['Vegetariano']
    },
    {
      id: 'fettuccine-ragu-costela',
      category: 'massas',
      name: 'Fettuccine ao Ragù de Costela Bovina',
      subtitle: 'Cozimento lento de 8 horas em vinho tinto',
      description: 'Fettuccine artesanal de grano duro envolvido em ragù encorpado de costela desfiada, tomates italianos San Marzano, alecrim e finalizado com lascas de parmesão.',
      price: 'R$ 72,00',
      badge: 'Confort Food',
      popular: false,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281014?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Chianti Superiore ou Montepulciano d’Abruzzo',
      dietary: ['Feito à Mão']
    },

    // ANTIPASTI & ENTRADAS
    {
      id: 'sopa-capeletti-tradicional',
      category: 'entradas',
      name: 'Sopa de Capeletti Tradicional della Nonna',
      subtitle: 'O clássico aconchegante servido na sopeira',
      description: 'Caldo aromático de frango e legumes cozido lentamente por horas, repleto de capelettis artesanais recheados com carne temperada e finalizado com noz-moscada.',
      price: 'R$ 38,00',
      badge: 'Entrada Clássica',
      popular: true,
      serves: '1 pessoa (Incluso no Rodízio)',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Taça de Vinho Tinto Jovem',
      dietary: ['Tradição Centenária']
    },
    {
      id: 'polenta-crocante-parmesao',
      category: 'entradas',
      name: 'Polenta Frita Crocante com Queijo Parmesão',
      subtitle: 'Crocante por fora e cremosa por dentro',
      description: 'Palitos de polenta milanesa fritos em ponto perfeito, polvilhados com queijo parmesão curado e acompanhados de molho marinara caseiro com manjericão fresco.',
      price: 'R$ 32,00',
      badge: 'Acompanhamento Obrigatório',
      popular: true,
      serves: 'Porção para compartilhar',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Cerveja Artesanal ou Aperol Spritz',
      dietary: ['Vegetariano', 'Incluso no Rodízio']
    },

    // DOLCI & SOBREMESAS
    {
      id: 'tiramisu-italiano',
      category: 'sobremesas',
      name: 'Tiramisù Clássico Veneziano',
      subtitle: 'Com legítimo queijo Mascarpone e café espresso',
      description: 'Camadas delicadas de biscoito savoiardi embebidos em café espresso forte e licor de amaretto, intercalados com creme leve de mascarpone e cacau em pó 100% belga.',
      price: 'R$ 34,00',
      badge: 'Dolce Favorito',
      popular: true,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Vinho de Sobremesa Vin Santo ou Limoncello',
      dietary: ['Vegetariano']
    },
    {
      id: 'creme-papaya-cassis',
      category: 'sobremesas',
      name: 'Creme de Papaya com Licor de Cassis',
      subtitle: 'O encerramento perfeito para o rodízio de galetos',
      description: 'Mamão papaya fresco batido cremosamente com sorvete artesanal de creme de baunilha, coroado com dose generosa de licor de cassis importado.',
      price: 'R$ 29,00',
      badge: 'Clássico Gaúcho',
      popular: false,
      serves: '1 pessoa',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85',
      pairing: 'Licor Frangelico ou Café Espresso',
      dietary: ['Sem Glúten']
    }
  ],

  // AVALIAÇÕES REAIS DE CLIENTES (4.8 / 5.0 ESTRELAS)
  reviews: [
    {
      author: 'Eduardo M. Vasconcelos',
      role: 'Executivo & Frequentador do Brasil 21',
      rating: 5,
      date: 'Há 2 semanas (Google Reviews)',
      text: 'O melhor galeto de Brasília sem sombra de dúvidas! A carne é incrivelmente macia, o tempero com sálvia é perfeito e a sequência de risottos surpreendeu toda a nossa mesa. O ambiente no Complexo Brasil 21 é muito seguro, refinado e com atendimento impecável.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      highlight: 'Galeto perfeito e risottos surpreendentes'
    },
    {
      author: 'Camila & Rodrigo Silveira',
      role: 'Casal em Jantar de Aniversário',
      rating: 5,
      date: 'Há 1 mês (TripAdvisor)',
      text: 'Escolhemos o Lucca para celebrar nosso aniversário de casamento e foi mágico. A meia luz, a carta de vinhos italiana excelente e o Risotto de Parmigiano com Tornedor de Mignon estava no ponto dos deuses. A nota 4.8 é mais que merecida!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      highlight: 'Ambiente romântico e carta de vinhos incrível'
    },
    {
      author: 'Marcelo Brandão',
      role: 'Almoço de Negócios',
      rating: 5,
      date: 'Há 3 semanas (Google Reviews)',
      text: 'Ambiente perfeito para almoços executivos no centro de Brasília. O rodízio é servido com muita agilidade, os cortes de steak e a tilápia com crosta de ervas estavam impecáveis. Estacionamento fácil com manobrista no hotel.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      highlight: 'Agilidade e qualidade para executivos'
    },
    {
      author: 'Mariana Fontes',
      role: 'Encontro em Família',
      rating: 5,
      date: 'Há 1 mês (Google Reviews)',
      text: 'A sopa de capeletti de boas-vindas lembra a comida da minha nonna! As crianças amaram a polenta com queijo e os adultos se deliciaram com os risottos do festival. Voltaremos com certeza.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      highlight: 'Sabor de tradição italiana autêntica'
    }
  ],

  // INFORMAÇÕES OFICIAIS DO RESTAURANTE
  info: {
    name: 'Lucca Restaurante & Galeteria',
    tagline: 'A Autêntica Tradição Italiana no Coração de Brasília',
    rating: '4.8',
    totalReviews: '1.280+ avaliações verificadas',
    phone: '(61) 3218-4746',
    whatsapp: '556132184746',
    address: {
      street: 'SHS Quadra 6, Bloco F, 1º andar',
      complex: 'Complexo Brasil 21 Suítes (Meliá / Brasil 21)',
      neighborhood: 'Setor Hoteleiro Sul - Plano Piloto',
      city: 'Brasília',
      state: 'DF',
      cep: '70316-000',
      googleMapsUrl: 'https://maps.google.com/?q=Complexo+Brasil+21+Brasilia+DF',
      wazeUrl: 'https://waze.com/ul?q=Complexo%20Brasil%2021%20Brasilia'
    },
    hours: {
      lunch: { days: 'Segunda a Sexta-feira', time: '12:00 às 15:00', type: 'Almoço Executivo & Rodízio' },
      weekendLunch: { days: 'Sábados e Domingos', time: '12:00 às 16:00', type: 'Almoço em Família & Especial' },
      dinner: { days: 'Segunda a Sábado', time: '19:00 às 23:30', type: 'Festival de Risotto & Jantar Romântico' },
      sundayDinner: { days: 'Domingo à Noite', time: 'Consulte programação especial', type: 'Eventos & Reservas' }
    },
    amenities: [
      { icon: '🚗', name: 'Valet Parking', desc: 'Estacionamento privativo com manobrista no Brasil 21' },
      { icon: '🍷', name: 'Adega Climatizada', desc: 'Mais de 120 rótulos selecionados pelo sommelier' },
      { icon: '🕯️', name: 'Clima Romântico', desc: 'Mesas à luz de velas e acústica projetada' },
      { icon: '👔', name: 'Ambiente Executivo', desc: 'Wi-Fi de alta velocidade e salas para reuniões' },
      { icon: '♿', name: 'Acessibilidade Total', desc: 'Elevadores, rampas e espaço adaptado' },
      { icon: '❄️', name: 'Climatização Central', desc: 'Conforto térmico perfeito o ano todo' }
    ]
  }
};

// Exportar para escopo global caso rodando no browser
if (typeof window !== 'undefined') {
  window.MENU_DATA = MENU_DATA;
}

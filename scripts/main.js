document.addEventListener('DOMContentLoaded', () => {
  // Seção "Por que escolher o Renovaí?"
  const features = [
    {
      icon: './images/Shield lock (1).svg',
      title: 'Transparência',
      sub: 'Negociações mais claras e seguras',
      list: [
        'Propostas com material, quantidade e valor',
        'Mais confiança entre quem vende e quem compra',
        'Tudo registrado, nada se perde'
      ]
    },
    {
      icon: './images/Connected.People.svg',
      title: 'Conexão',
      sub: 'Aproximamos quem vende de quem compra',
      list: [
        'Encontre fornecedores sem depender de indicação',
        'Negociações combinadas dentro da plataforma',
        'Menos etapas, mais agilidade no fechamento'
      ]
    },
    {
      icon: './images/People.svg',
      title: 'Impacto Social',
      sub: 'Uma rede que cresce junto',
      list: [
        'Cooperativas e recicladoras da sua região',
        'Trocas de experiência entre parceiros',
        'Impacto social acompanhado de perto'
      ]
    },
    {
      icon: './images/Lightning Bolt.svg',
      title: 'Eficiência',
      sub: 'Processos mais rápidos, do início ao fim',
      list: [
        'Cadastro e negociação em poucos passos',
        'Menos burocracia na hora de fechar negócio',
        'Acompanhamento do processo em tempo real'
      ]
    }
  ];

  const iconeTrilha = document.getElementById('iconeTrilha');
  const cardIcone = document.getElementById('cardIcone');
  const cardTitulo = document.getElementById('cardTitulo');
  const cardSubtitulo = document.getElementById('cardSubtitulo');
  const cardLista = document.getElementById('cardLista');

  if (iconeTrilha) {
    iconeTrilha.addEventListener('click', (event) => {
      const segmento = event.target.closest('.icone-segmento');
      if (!segmento) return;

      const featureIndex = segmento.dataset.feature;

      iconeTrilha.querySelectorAll('.icone-segmento').forEach((el) => el.classList.remove('active'));
      iconeTrilha.querySelectorAll('.icone-conteudo').forEach((el) => el.classList.remove('active'));

      segmento.classList.add('active');
      iconeTrilha.querySelector(`.icone-conteudo[data-feature="${featureIndex}"]`)?.classList.add('active');

      const feature = features[parseInt(featureIndex, 10)];
      cardIcone.innerHTML = `<img src="${feature.icon}" alt="">`;
      cardTitulo.textContent = feature.title;
      cardSubtitulo.textContent = feature.sub;
      cardLista.innerHTML = feature.list.map((item) => `<li><span>✓</span> ${item}</li>`).join('');
    });
  }

// Conteúdo do bloco de destaque por tipo
const planosDestaqueConteudo = {
  cooperativa: {
    titulo: 'Fortaleça sua cooperativa <span class="planos-destaque-titulo1">sem custos</span>',
    descricao: 'O Renovaí é gratuito para cooperativas porque acreditamos que a tecnologia deve apoiar quem move a reciclagem. Organize sua operação, conecte-se com empresas e venda com mais facilidade.',
    badge: 'Cooperativas',
    preco: 'GRATUITO',
    lista: ['Gestão de materiais', 'Gestão de materiais', 'Gestão de materiais', 'Gestão de materiais', 'Gestão de materiais'],
    botao: 'Cadastre sua cooperativa'
  },
  recicladora: {
    // PLACEHOLDER — troque pelo conteúdo real da Recicladora quando tiver
    titulo: 'Compre direto <span class="planos-destaque-titulo1">das cooperativas</span>',
    descricao: 'Texto placeholder para a versão Recicladora. Troque por este conteúdo real quando estiver definido.',
    badge: 'Recicladoras',
    preco: 'GRATUITO',
    lista: ['Benefício x', 'Benefício x', 'Benefício x', 'Benefício x', 'Benefício x'],
    botao: 'Cadastre sua recicladora'
  }
};

function atualizarPlanos(tipo) {

  // Atualiza o card de destaque
  const dados = planosDestaqueConteudo[tipo];

  if (dados) {
    document.getElementById('destaque-titulo').innerHTML = dados.titulo;
    document.getElementById('destaque-descricao').textContent = dados.descricao;

    const card = document.getElementById('destaque-card');

    card.querySelector('.plano-card-badge').textContent = dados.badge;
    card.querySelector('.plano-card-preco-grande').textContent = dados.preco;

    card.querySelector('.plano-card-lista').innerHTML =
      dados.lista.map((item) => `<li>✓ ${item}</li>`).join('');

    card.querySelector('.plano-card-btn').textContent = dados.botao;
  }

  // Mostra somente os planos do tipo selecionado
  const cooperativa = document.getElementById('pagos-cooperativa');
  const recicladora = document.getElementById('pagos-recicladora');

  cooperativa?.classList.remove('ativo');
  recicladora?.classList.remove('ativo');

  if (tipo === 'cooperativa') {
    cooperativa?.classList.add('ativo');
  }

  if (tipo === 'recicladora') {
    recicladora?.classList.add('ativo');
  }
}

// Seletor Cooperativa / Recicladora da seção Planos
document.querySelectorAll('.planos [data-plano-tipo]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.planos [data-plano-tipo]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('painel-cooperativa')?.classList.toggle('ativo', btn.dataset.planoTipo === 'cooperativa');
    document.getElementById('painel-recicladora')?.classList.toggle('ativo', btn.dataset.planoTipo === 'recicladora');
  });
});

// ===== Carrossel infinito (com suporte a blocos escondidos) =====
const carrosselState = {}; // guarda { larguraConjunto, inicializado } por id

function inicializarCarrosselInfinito(containerId) {
  if (carrosselState[containerId]?.inicializado) return;

  const container = document.getElementById(containerId);
  if (!container) return;

  const cardsOriginais = Array.from(container.children);
  if (cardsOriginais.length === 0) return;

  const gap = 24; // precisa bater com .carrossel-cards no CSS

  const clonesAntes = cardsOriginais.map((card) => card.cloneNode(true));
  const clonesDepois = cardsOriginais.map((card) => card.cloneNode(true));

  clonesAntes.reverse().forEach((clone) => container.insertBefore(clone, container.firstChild));
  clonesDepois.forEach((clone) => container.appendChild(clone));

  const larguraConjunto = cardsOriginais.reduce((acc, card) => acc + card.offsetWidth + gap, 0);

  // posiciona no conjunto do meio sem animar (senão o carrossel abre "deslizando")
  container.style.scrollBehavior = 'auto';
  container.scrollLeft = larguraConjunto;
  container.style.scrollBehavior = '';

  let ajustando = false;
  container.addEventListener('scroll', () => {
    if (ajustando) return;
    const estado = carrosselState[containerId];
    if (container.scrollLeft <= 0) {
      ajustando = true;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft += estado.larguraConjunto;
      container.style.scrollBehavior = 'smooth';
      ajustando = false;
    } else if (container.scrollLeft >= estado.larguraConjunto * 2) {
      ajustando = true;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= estado.larguraConjunto;
      container.style.scrollBehavior = 'smooth';
      ajustando = false;
    }
  });

  carrosselState[containerId] = { larguraConjunto, inicializado: true };
}

// Setas do carrossel
document.querySelectorAll('.carrossel-seta').forEach((seta) => {
  seta.addEventListener('click', () => {
    const trilho = document.getElementById(seta.dataset.carrossel);
    if (!trilho) return;
    const larguraCard = trilho.querySelector('.funcionalidade-card')?.offsetWidth || 280;
    const distancia = larguraCard + 24;
    trilho.scrollBy({ left: seta.classList.contains('seta-direita') ? distancia : -distancia, behavior: 'smooth' });
  });
});

// ===== Tabs Funcionalidades (mostrar/esconder + inicializa carrossel ao exibir) =====
document.querySelectorAll('.tab-cooperativa, .tab-recicladora').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-cooperativa, .tab-recicladora').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.bloco-funcionalidade').forEach((bloco) => bloco.classList.remove('ativo'));
    const alvo = document.getElementById(btn.dataset.target);
    if (alvo) {
      alvo.classList.add('ativo');
      const carrosselInterno = alvo.querySelector('.carrossel-cards');
      if (carrosselInterno) inicializarCarrosselInfinito(carrosselInterno.id);
    }
  });
});

// Mostra o bloco de Funcionalidades ativo por padrão (Cooperativa) e já inicializa o carrossel dele
document.getElementById('bloco-cooperativa')?.classList.add('ativo');
inicializarCarrosselInfinito('carrossel-coop');

  // FAQ: sorteia 5 perguntas do banco a cada visita (edite aqui)
  const listaFaq = document.querySelector('.faq-lista');

  if (listaFaq) {
    const QTD_FAQ = 5;
    const bancoFaq = [
      { p: 'O que é o Renovaí?', r: 'O Renovaí é uma plataforma que conecta cooperativas e recicladoras de ponta a ponta, da busca pelo material até o fechamento do acordo. Ele também ajuda as cooperativas a organizar sua operação em um só lugar.' },
      { p: 'Como funciona a negociação?', r: 'A cooperativa cadastra o que tem disponível, a recicladora encontra o material e envia uma proposta com o valor por quilo. Tudo fica na plataforma: proposta, contraproposta, aceite e acordo, sem a negociação espalhada entre diferentes canais.' },
      { p: 'Quanto custa para cooperativas?', r: 'Nada! O Renovaí é gratuito para cooperativas, porque acreditamos que a tecnologia deve apoiar quem move a reciclagem.' },
      { p: 'Quanto custa para recicladoras?', r: 'Existem dois planos: o Essencial, por R$49,00/mês, para quem está começando a comprar, e o RenovaPRO, por R$149,00/mês, para quem compra em escala.' },
      { p: 'Como faço meu cadastro?', r: 'É só clicar em "Começar agora" no topo da página, ou escolher "Sou cooperativa" ou "Sou recicladora" e preencher o cadastro.' },
      { p: 'O pagamento e a retirada passam pela plataforma?', r: 'Não. O Renovaí conecta as partes e organiza a negociação. A retirada e o pagamento são combinados diretamente entre cooperativa e recicladora, depois do acordo fechado.' },
      { p: 'Qual o objetivo do projeto?', r: 'Apoiar o ODS 12 da ONU (Consumo e Produção Responsáveis), em especial a meta 12.5, que propõe reduzir a geração de resíduos por meio da prevenção, reciclagem e reuso.' },
      { p: 'Como entro em contato?', r: 'Pelo e-mail renovai.institutojef@gmail.com ou pelo Instagram @renovai.app.' },
      { p: 'Preciso pagar para usar como cooperativa?', r: 'Não. Todas as ferramentas para cooperativas, como gestão de cooperados, coletas, materiais disponíveis e relatórios, são gratuitas.' },
      { p: 'O que a recicladora consegue fazer na plataforma?', r: 'Buscar cooperativas por material, cidade ou quantidade, ver tudo em um mapa interativo, enviar propostas diretas, acompanhar negociações e receber alertas quando surgir um material de interesse.' },
      { p: 'Como a cooperativa mostra o que tem disponível?', r: 'Na área de materiais disponíveis, a cooperativa divulga o que está pronto para negociar. Não é controle de estoque: é uma vitrine simples para as recicladoras encontrarem você.' },
      { p: 'A plataforma ajuda a controlar as coletas?', r: 'Sim. Você registra coletas externas ou entregas recebidas, cadastra rotas fixas e acompanha a equipe em tempo real no mapa.' },
      { p: 'Como é feito o rateio entre os cooperados?', r: 'Ao registrar uma venda, manualmente ou direto de uma negociação aceita, o sistema calcula automaticamente o rateio entre os cooperados.' },
      { p: 'Dá para gerar relatórios?', r: 'Dá. Vendas, financeiro, coletas, negociações e impacto ambiental ficam prontos para consultar ou exportar em PDF, sempre que for preciso prestar contas.' },
      { p: 'Posso recusar ou fazer uma contraproposta?', r: 'Pode. Cada proposta recebida pode ser aceita, recusada ou respondida com uma contraproposta, e o histórico fica registrado.' },
      { p: 'Qual a diferença entre os planos das recicladoras?', r: 'O Essencial (R$49,00/mês) é para quem está começando a comprar. O RenovaPRO (R$149,00/mês) é para quem compra em escala e precisa de mais recursos.' },
      { p: 'Por que o projeto existe?', r: 'No Brasil são produzidos cerca de 80 milhões de toneladas de resíduos por ano e apenas 8% são reciclados. O problema não é falta de consciência, e sim de conexão entre quem coleta e quem recicla.' },
      { p: 'Quem desenvolveu o Renovaí?', r: 'Uma equipe de estudantes do 1º e do 2º ano, que uniu design, dados e desenvolvimento. Conheça todo mundo na página Quem Somos.' }
    ];

    // embaralhamento de Fisher-Yates
    for (let i = bancoFaq.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bancoFaq[i], bancoFaq[j]] = [bancoFaq[j], bancoFaq[i]];
    }

    const escaparHtml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    listaFaq.innerHTML = bancoFaq.slice(0, QTD_FAQ).map((item) => `
        <div class="faq-item">
            <button class="faq-pergunta">
                ${escaparHtml(item.p)}
                <span class="faq-icone">+</span>
            </button>
            <div class="faq-resposta">
                <p>${escaparHtml(item.r)}</p>
            </div>
        </div>`).join('');
  }

  // Acordeão do FAQ
  document.querySelectorAll('.faq-item').forEach((item) => {
    const pergunta = item.querySelector('.faq-pergunta');
    const resposta = item.querySelector('.faq-resposta');

    pergunta.addEventListener('click', () => {
      const estaAberto = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach((outro) => {
        outro.classList.remove('active');
        outro.querySelector('.faq-resposta').style.maxHeight = null;
      });

      if (!estaAberto) {
        item.classList.add('active');
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
      }
    });
  });
// ===== Equipe: carrossel infinito com autoplay =====
const trilhoEquipe = document.getElementById('equipe-trilho');

if (trilhoEquipe) {
  // Edite aqui os membros de cada ano
  const equipe = {
    1: [
      { nome: 'Davi Sobral', cargo: 'Full Stack', foto: '../images/Davi.jpg' },
      { nome: 'Joel Gracek', cargo: 'Back End', foto: '../images/Joel.jpg' },
      { nome: 'Luiza Caravaggio', cargo: 'Back End', foto: '../images/Luiza.jpg' },
      { nome: 'Lukas Theodoro', cargo: 'Dados & Back End', foto: '../images/Lukas.jpg' },
      { nome: 'Paola Pietropoli', cargo: 'UX/UI Design', foto: '../images/Paola.jpg' }
    ],
    2: [
      { nome: 'Caio França', cargo: 'Dados & Front End', foto: '../images/Caio.jpg' },
      { nome: 'Gabriel Masagão', cargo: 'Full Stack', foto: '../images/Gabriel.jpg' },
      { nome: 'Guilherme Norcia', cargo: 'Back End & Front End', foto: '../images/Guilherme.jpg' },
      { nome: 'Iago Diniz', cargo: 'Back End & Dados', foto: '../images/Iago.jpg' },
      { nome: 'Kauã Sales', cargo: 'Front End', foto: '../images/Kauã.jpg' },
      { nome: 'Rafael Takematsu', cargo: 'Dados', foto: '../images/Rafael.jpg' }
    ]
  };

  const INTERVALO_AUTOPLAY = 1500; // tempo entre cada avanço, em milissegundos
  const GAP = 28;                  // precisa bater com o gap de .equipe-trilho no CSS
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const carrosselEquipe = trilhoEquipe.closest('.equipe-carrossel');
  const setasEquipe = document.querySelectorAll('.equipe-seta');

  let anoAtual = 1;
  let passo = 0;           // largura de um card + gap
  let tamanhoConjunto = 0; // largura de uma "volta" completa dos membros
  let inicioConjunto = 0;  // scrollLeft onde começa o conjunto original
  let infinito = false;
  let arrastando = false;
  let inicioX = 0;
  let inicioScroll = 0;
  let timerAutoplay = null;
  let timerNormalizar = null;
  const pausas = new Set();

  function htmlCard(m, clone) {
    return `
      <article class="equipe-card"${clone ? ' aria-hidden="true"' : ''}>
        ${m.foto
          ? `<img src="${m.foto}" alt="${clone ? '' : m.nome}" class="equipe-foto" draggable="false">`
          : `<div class="equipe-foto equipe-foto-vazia"></div>`}
        <h4>${m.nome}</h4>
        <p class="equipe-cargo">${m.cargo}</p>
        <img src="../images/Leaf spark.svg" alt="" class="equipe-folha">
      </article>`;
  }

  // Muda o scroll sem animação (o usuário não percebe o "salto")
  function saltar(posicao) {
    trilhoEquipe.style.scrollBehavior = 'auto';
    trilhoEquipe.scrollLeft = posicao;
    trilhoEquipe.style.scrollBehavior = '';
  }

  function renderizarEquipe(ano) {
    anoAtual = ano;
    const membros = equipe[ano];
    const originais = membros.map((m) => htmlCard(m, false)).join('');

    // 1ª passada: só os originais, para medir os cards
    trilhoEquipe.innerHTML = originais;
    passo = trilhoEquipe.firstElementChild.offsetWidth + GAP;
    tamanhoConjunto = membros.length * passo;

    // Só vira infinito se os cards não couberem todos na tela
    infinito = tamanhoConjunto - GAP > trilhoEquipe.clientWidth - 8;

    if (infinito) {
      // Quantas cópias de cada lado são necessárias para nunca "acabar"
      const lados = Math.ceil((trilhoEquipe.clientWidth + passo) / tamanhoConjunto);
      const clones = membros.map((m) => htmlCard(m, true)).join('');
      trilhoEquipe.innerHTML = clones.repeat(lados) + originais + clones.repeat(lados);
      inicioConjunto = lados * tamanhoConjunto;
      saltar(inicioConjunto);
    } else {
      saltar(0);
    }

    setasEquipe.forEach((seta) => {
      seta.style.display = infinito ? '' : 'none';
    });
  }

  // Quando a rolagem para, volta para o conjunto do meio (idêntico ao que o usuário vê)
  function normalizar() {
    if (!infinito || arrastando) return;
    const deslocamento = trilhoEquipe.scrollLeft - inicioConjunto;
    const dentro = ((deslocamento % tamanhoConjunto) + tamanhoConjunto) % tamanhoConjunto;
    const alvo = inicioConjunto + dentro;
    if (Math.abs(alvo - trilhoEquipe.scrollLeft) > 1) saltar(alvo);
  }

  trilhoEquipe.addEventListener('scroll', () => {
    clearTimeout(timerNormalizar);
    timerNormalizar = setTimeout(normalizar, 120);
  });

  function avancar(direcao) {
    if (!infinito) return;
    trilhoEquipe.scrollBy({ left: direcao * passo, behavior: 'smooth' });
  }

  // ----- Autoplay -----
  function iniciarAutoplay() {
    clearInterval(timerAutoplay);
    if (!infinito || reduzirMovimento) return;
    timerAutoplay = setInterval(() => {
      if (pausas.size === 0) avancar(1);
    }, INTERVALO_AUTOPLAY);
  }

  function pausar(motivo) {
    pausas.add(motivo);
  }

  function retomar(motivo) {
    pausas.delete(motivo);
    iniciarAutoplay(); // recomeça a contagem do zero
  }

  // Pausa quando o usuário está interagindo
  carrosselEquipe.addEventListener('mouseenter', () => pausar('hover'));
  carrosselEquipe.addEventListener('mouseleave', () => retomar('hover'));
  carrosselEquipe.addEventListener('focusin', (e) => {
    if (e.target.matches(':focus-visible')) pausar('foco'); // só foco por teclado
  });
  carrosselEquipe.addEventListener('focusout', () => retomar('foco'));
  trilhoEquipe.addEventListener('touchstart', () => pausar('toque'), { passive: true });
  trilhoEquipe.addEventListener('touchend', () => retomar('toque'));
  trilhoEquipe.addEventListener('touchcancel', () => retomar('toque'));

  // Pausa quando a aba está escondida ou o carrossel está fora da tela
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausar('aba');
    else retomar('aba');
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) retomar('fora-da-tela');
      else pausar('fora-da-tela');
    }, { threshold: 0.2 }).observe(carrosselEquipe);
  }

  // ----- Setas -----
  setasEquipe.forEach((seta) => {
    seta.addEventListener('click', () => {
      avancar(Number(seta.dataset.direcao));
      iniciarAutoplay(); // reinicia a contagem depois do clique
    });
  });

  // ----- Arrastar com o mouse (toque e trackpad já funcionam nativamente) -----
  trilhoEquipe.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    arrastando = true;
    inicioX = e.clientX;
    inicioScroll = trilhoEquipe.scrollLeft;
    trilhoEquipe.classList.add('arrastando');
  });

  window.addEventListener('pointermove', (e) => {
    if (!arrastando) return;
    trilhoEquipe.scrollLeft = inicioScroll - (e.clientX - inicioX);
  });

  window.addEventListener('pointerup', () => {
    if (!arrastando) return;
    arrastando = false;
    trilhoEquipe.classList.remove('arrastando');
    clearTimeout(timerNormalizar);
    timerNormalizar = setTimeout(normalizar, 150);
  });

  // ----- Alternar entre 1º e 2º ano -----
  document.querySelectorAll('.equipe-ano').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.equipe-ano').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      trilhoEquipe.closest('.equipe').dataset.ano = btn.dataset.ano;

      renderizarEquipe(Number(btn.dataset.ano));
      iniciarAutoplay();
    });
  });

  // Recalcula se a largura da janela mudar (ignora a barra de endereço do celular)
  let larguraJanela = window.innerWidth;
  let timerResize = null;
  window.addEventListener('resize', () => {
    if (window.innerWidth === larguraJanela) return;
    larguraJanela = window.innerWidth;
    clearTimeout(timerResize);
    timerResize = setTimeout(() => {
      renderizarEquipe(anoAtual);
      iniciarAutoplay();
    }, 200);
  });

  renderizarEquipe(1);
  iniciarAutoplay();
}
  // ===== Valores: 3 primeiro, depois 4 =====
  const secaoValores = document.querySelector('.valores');
  const itensValores = secaoValores
    ? Array.from(secaoValores.querySelectorAll('.valores-item'))
    : [];

  if (
    itensValores.length > 0 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const TAMANHOS_GRUPOS = [3, 4];
    const SCROLL_POR_GRUPO = 0.6;

    const pista = secaoValores.querySelector('.valores-pista');
    const pin = secaoValores.querySelector('.valores-pin');
    const lista = secaoValores.querySelector('.valores-lista');

    // Divide os 7 valores em grupos de 3 e 4
    const grupos = [];
    let inicio = 0;

    TAMANHOS_GRUPOS.forEach((tamanho) => {
      if (inicio < itensValores.length) {
        grupos.push(itensValores.slice(inicio, inicio + tamanho));
        inicio += tamanho;
      }
    });

    // Caso existam mais itens, inclui-os no último grupo
    if (inicio < itensValores.length) {
      grupos[grupos.length - 1].push(
        ...itensValores.slice(inicio)
      );
    }

    const totalGrupos = grupos.length;
    let grupoAtual = -1;

    secaoValores.classList.add('com-js');

    function mostrarGrupo(g) {
      if (g < 0 || g >= totalGrupos) return;

      itensValores.forEach((item) => {
        const pertenceAoGrupo = grupos[g].includes(item);

        if (pertenceAoGrupo) {
          item.hidden = false;
          item.style.transitionDelay =
            `${grupos[g].indexOf(item) * 120}ms`;

          // Reinicia a animação somente dos itens que vão aparecer
          item.classList.remove('visivel');
          void item.offsetWidth;
          item.classList.add('visivel');
        } else {
          item.classList.remove('visivel');
          item.style.transitionDelay = '0ms';
          item.hidden = true;
        }
      });

      grupoAtual = g;
    }

    function medirLayout() {
      // Exibe todos temporariamente para medir os grupos
      itensValores.forEach((item) => {
        item.hidden = false;
      });

      lista.style.minHeight = '';

      let maiorAltura = 0;

      grupos.forEach((grupo) => {
        const primeiro = grupo[0];
        const ultimo = grupo[grupo.length - 1];

        if (!primeiro || !ultimo) return;

        const altura =
          ultimo.offsetTop + ultimo.offsetHeight - primeiro.offsetTop;

        maiorAltura = Math.max(maiorAltura, altura);
      });

      lista.style.minHeight = `${Math.ceil(maiorAltura)}px`;

      // O primeiro grupo fica visível durante a inicialização
      mostrarGrupo(grupoAtual < 0 ? 0 : grupoAtual);

      pista.style.height =
        `${pin.offsetHeight +
          totalGrupos * SCROLL_POR_GRUPO * window.innerHeight}px`;
    }

    function atualizar() {
      const topoFixo = parseFloat(getComputedStyle(pin).top) || 0;
      const percurso = pista.offsetHeight - pin.offsetHeight;

      if (percurso <= 0) {
        mostrarGrupo(0);
        return;
      }

      const progresso = Math.min(
        Math.max(
          (topoFixo - pista.getBoundingClientRect().top) / percurso,
          0
        ),
        1
      );

      const grupo = Math.min(
        totalGrupos - 1,
        Math.floor(progresso * totalGrupos)
      );

      if (grupo !== grupoAtual) {
        mostrarGrupo(grupo);
      }
    }

    let aguardando = false;

    window.addEventListener('scroll', () => {
      if (aguardando) return;

      aguardando = true;

      requestAnimationFrame(() => {
        atualizar();
        aguardando = false;
      });
    }, { passive: true });

    let larguraAnterior = window.innerWidth;

    window.addEventListener('resize', () => {
      if (window.innerWidth === larguraAnterior) return;

      larguraAnterior = window.innerWidth;

      medirLayout();
      atualizar();
    });

    // Inicialização
    medirLayout();
    mostrarGrupo(0);
    atualizar();

    document.fonts?.ready.then(() => {
      medirLayout();
      atualizar();
    });
  }

  // ===== Linha do tempo (Renovaí): cada passo aparece ao entrar na tela =====
  const secaoFunciona = document.querySelector('.funciona');
  if (secaoFunciona && 'IntersectionObserver' in window) {
    // O CSS só esconde os passos se esta classe existir, assim nada some se o script falhar
    secaoFunciona.classList.add('com-js');

    const observadorPassos = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visivel');
        observadorPassos.unobserve(entrada.target);
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -8% 0px' });

    secaoFunciona.querySelectorAll('.funciona-linha-item').forEach((passo) => observadorPassos.observe(passo));
  }

  // ===== Entrada por rolagem: todas as seções (exceto as que já têm animação própria) =====
  if ('IntersectionObserver' in window) {
    // hero do início anima ao carregar; linha do tempo e valores têm animação própria
    const secoesProprias = '.hero, .funciona, .valores';
    // só decoração, não faz sentido animar
    const ignorar = ['retangulos', 'solucoes-fundo-logo'];
    // grupos cujos itens entram em sequência (em vez do grupo inteiro de uma vez)
    const gruposEscalonados = [
      '.faq-lista', '.importa-grid', '.ods12-grid', '.planos-pagos-cards',
      '.caminho-passos', '.caminho-passo-3-grid', '.beneficios_coop_reci'
    ].join(', ');

    const itens = [];
    const marcar = (el, indice = 0) => {
      el.classList.add('rev');
      el.style.setProperty('--atraso', `${Math.min(indice, 5) * 90}ms`);
      itens.push(el);
    };

    document.querySelectorAll('main > section').forEach((secao) => {
      if (secao.matches(secoesProprias)) return;

      Array.from(secao.children).forEach((filho) => {
        if (filho.tagName === 'IMG' || ignorar.some((c) => filho.classList.contains(c))) return;

        if (filho.matches(gruposEscalonados)) {
          Array.from(filho.children)
            .filter((neto) => neto.tagName !== 'IMG')
            .forEach((neto, i) => marcar(neto, i));
        } else {
          marcar(filho);
        }
      });
    });

    const observadorRev = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visivel');
        observadorRev.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    // O CSS só esconde os itens depois desta classe, assim nada some se o script falhar
    document.documentElement.classList.add('rev-pronto');
    itens.forEach((el) => observadorRev.observe(el));
  }

  // Acesso discreto à área administrativa
  const logoAdmin = document.getElementById('logo');
  let cliquesLogo = 0;
  let temporizadorCliques;

  if (logoAdmin) {
    logoAdmin.addEventListener('click', () => {
      cliquesLogo++;

      clearTimeout(temporizadorCliques);

      temporizadorCliques = setTimeout(() => {
        cliquesLogo = 0;
      }, 2000);

      if (cliquesLogo >= 5) {
        cliquesLogo = 0;
        window.location.href =
          'https://renovai-backend-athb.onrender.com/login';
      }
    });
  }

  // ===== Nimo: pop-up de perguntas e respostas =====
  const mascoteNimo = document.querySelector('.hero-mascote, .pesquisa-mascote');

  if (mascoteNimo) {
    // Edite aqui as perguntas e respostas
    const perguntasNimo = [
      {
        pergunta: 'O que é o Renovaí?',
        resposta: 'O Renovaí é uma plataforma que conecta cooperativas e recicladoras de ponta a ponta, da busca pelo material até o fechamento do acordo.'
      },
      {
        pergunta: 'Como funciona a negociação?',
        resposta: 'Tudo fica em um só lugar: proposta, contraproposta, aceite e acordo, sem a negociação espalhada entre diferentes canais.'
      },
      {
        pergunta: 'Sou cooperativa. Como o Renovaí me ajuda?',
        resposta: 'Você divulga seus materiais, encontra recicladoras interessadas e acompanha propostas e negociações em uma jornada digital.'
      },
      {
        pergunta: 'Sou recicladora. Como o Renovaí me ajuda?',
        resposta: 'Você busca cooperativas com os materiais que precisa, envia propostas diretas e acompanha tudo até a negociação ser concluída.'
      },
      {
        pergunta: 'Qual o objetivo do projeto?',
        resposta: 'Apoiar o ODS 12 da ONU (Consumo e Produção Responsáveis), em especial a meta 12.5, que propõe reduzir a geração de resíduos por meio da reciclagem e do reuso.'
      },
      {
        pergunta: 'Quanto custa para cooperativas?',
        resposta: 'Nada! O Renovaí é gratuito para cooperativas, porque acreditamos que a tecnologia deve apoiar quem move a reciclagem.'
      },
      {
        pergunta: 'Quanto custa para recicladoras?',
        resposta: 'Existem dois planos: o Essencial, por R$49,00/mês, para quem está começando a comprar, e o RenovaPRO, por R$149,00/mês, para quem compra em escala.'
      },
      {
        pergunta: 'Que ferramentas o Renovaí oferece?',
        resposta: 'Gestão de materiais e de cooperados, dashboard, mapa interativo, busca de cooperativas, propostas diretas, histórico de negociações e alertas automáticos.'
      },
      {
        pergunta: 'Como faço meu cadastro?',
        resposta: 'É só clicar em "Começar agora" no topo da página, ou escolher "Sou cooperativa" ou "Sou recicladora" e preencher o cadastro.'
      },
      {
        pergunta: 'O que é o ODS 12?',
        resposta: 'É um dos 17 Objetivos de Desenvolvimento Sustentável da ONU e trata do uso mais eficiente dos recursos naturais e da redução do desperdício.'
      },
      {
        pergunta: 'Por que o projeto existe?',
        resposta: 'No Brasil são produzidas cerca de 80 milhões de toneladas de resíduos por ano e só 8% são reciclados. O problema não é falta de consciência, e sim de conexão entre quem coleta e quem recicla.'
      },
      {
        pergunta: 'Quem está por trás do Renovaí?',
        resposta: 'Uma equipe de estudantes do 1º e 2º ano que uniu design, dados e desenvolvimento. Conheça todo mundo na página Quem Somos!'
      },
      {
        pergunta: 'Como entro em contato?',
        resposta: 'Pelo e-mail renovai.institutojef@gmail.com ou pelo Instagram @renovai.app.'
      }
    ];

    const prefixoImg = document.querySelector('link[rel="shortcut icon"]').getAttribute('href');

    const painelNimo = document.createElement('div');
    painelNimo.className = 'nimo-chat';
    painelNimo.setAttribute('role', 'dialog');
    painelNimo.setAttribute('aria-label', 'Converse com o Nimo');
    painelNimo.hidden = true;
    painelNimo.innerHTML = `
      <div class="nimo-chat-topo">
        <img src="${prefixoImg}" alt="" class="nimo-chat-avatar">
        <div class="nimo-chat-titulo">
          <strong>Nimo</strong>
          <span>Assistente do Renovaí</span>
        </div>
        <button type="button" class="nimo-chat-fechar" aria-label="Fechar">×</button>
      </div>
      <div class="nimo-chat-mensagens" aria-live="polite"></div>
      <div class="nimo-chat-opcoes"></div>`;
    document.body.appendChild(painelNimo);

    const areaMensagens = painelNimo.querySelector('.nimo-chat-mensagens');
    const areaOpcoes = painelNimo.querySelector('.nimo-chat-opcoes');

    function adicionarMensagem(texto, tipo) {
      const msg = document.createElement('p');
      msg.className = `nimo-msg nimo-msg-${tipo}`;
      msg.textContent = texto;
      areaMensagens.appendChild(msg);
      areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }

    function mostrarOpcoes() {
      areaOpcoes.innerHTML = '';
      perguntasNimo.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = item.pergunta;
        btn.addEventListener('click', () => {
          adicionarMensagem(item.pergunta, 'usuario');

          // "digitando..." antes da resposta
          const digitando = document.createElement('p');
          digitando.className = 'nimo-msg nimo-msg-nimo nimo-digitando';
          digitando.innerHTML = '<i></i><i></i><i></i>';
          areaMensagens.appendChild(digitando);
          areaMensagens.scrollTop = areaMensagens.scrollHeight;

          setTimeout(() => {
            digitando.remove();
            adicionarMensagem(item.resposta, 'nimo');
          }, 600);
        });
        areaOpcoes.appendChild(btn);
      });
    }

    function abrirChatNimo() {
      if (!areaMensagens.children.length) {
        adicionarMensagem('Olá, eu sou o Nimo! Como posso te ajudar? Escolha uma pergunta abaixo.', 'nimo');
        mostrarOpcoes();
      }
      painelNimo.hidden = false;
      mascoteNimo.classList.add('nimo-ativo');
    }

    function fecharChatNimo() {
      painelNimo.hidden = true;
      mascoteNimo.classList.remove('nimo-ativo');
    }

    mascoteNimo.setAttribute('role', 'button');
    mascoteNimo.setAttribute('tabindex', '0');
    mascoteNimo.setAttribute('aria-label', 'Abrir conversa com o Nimo');
    mascoteNimo.style.cursor = 'pointer';

    mascoteNimo.addEventListener('click', () => {
      if (painelNimo.hidden) abrirChatNimo();
      else fecharChatNimo();
    });
    mascoteNimo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mascoteNimo.click();
      }
    });
    painelNimo.querySelector('.nimo-chat-fechar').addEventListener('click', fecharChatNimo);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !painelNimo.hidden) fecharChatNimo();
    });
  }
});

// Menu hambúrguer da navbar (celular/tablet)
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  if (!navbar || !toggle) return;

  const fechar = () => {
    navbar.classList.remove('menu-aberto');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const aberto = navbar.classList.toggle('menu-aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  navbar.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', fechar));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) fechar(); });
});

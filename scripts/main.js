document.addEventListener('DOMContentLoaded', () => {
  // Seção "Por que escolher o Renovaí?"
  const features = [
    {
      icon: './images/Shield lock (1).svg',
      title: 'Transparência',
      sub: 'Negociações mais claras e seguras',
      list: [
        'Preços justos e atualizados em tempo real',
        'Histórico de negociações sempre disponível',
        'Avaliações e reputação visíveis para os dois lados'
      ]
    },
    {
      icon: './images/Connected.People.svg',
      title: 'Conexão',
      sub: 'Cooperativas e recicladoras, sem intermediários',
      list: [
        'Contato direto entre as duas pontas da cadeia',
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
});
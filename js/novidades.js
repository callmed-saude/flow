/* CallMed Flow — Novidades: o que mudou em cada versão, mostrado uma vez depois de atualizar, e o atalho "Como usar" (tour). */
'use strict';

/** Mais recente primeiro. `id` só cresce; a pessoa vê as versões com id maior que a última que ela já viu. */
const NOVIDADES = [
  {
    id: 15, data: '16/11', titulo: 'Observações direto na ficha', lib: 'obs-na-ficha',
    itens: [
      ['Escreva e salve ali mesmo', 'Na ficha do médico, o quadro Observações virou um campo: clique, escreva e salve (ou Ctrl+Enter). Não precisa mais abrir o "Editar cadastro" só para isso.'],
    ],
  },
  {
    id: 14, data: '09/11', titulo: 'Versão de segunda: pedidos da Priscila',
    itens: [
      ['Observações no card', 'No Kanban, as observações do médico aparecem no próprio card (até 3 linhas). Passe o mouse para ler tudo, sem abrir a ficha.'],
      ['"Cobrar documentos"', 'Na coluna Documentação pendente, a ação agora aparece como "Cobrar documentos", mais curta e fácil de ler no card.'],
    ],
  },
  {
    id: 13, data: '06/11', titulo: 'Versão nova toda segunda, urgente em até 48 horas',
    itens: [
      ['Versão nova às segundas', 'A versão nova do Flow passa a sair toda segunda-feira: de segunda a quarta a gente recolhe as sugestões, na quinta conversa sobre elas e na segunda seguinte entra no sistema.'],
      ['Urgente em até 48 horas', 'Se algo não funciona e impede o uso, marque "Urgente" nas Sugestões ou no balão 💬: resolvemos em até 48 horas.'],
    ],
  },
  {
    id: 11, data: '04/11', titulo: 'Menu mais curto e tela de Apresentação',
    itens: [
      ['Apresentação', 'Novo primeiro item do menu: o que é o Flow, quem faz o quê e o que estamos construindo. Quem entra pela primeira vez começa por ela.'],
      ['Médicos', 'O antigo "Fluxo" agora se chama Médicos e é a tela de entrada, já no Kanban (quem usa a Jornada continua nela).'],
      ['Relatórios num lugar só', 'Indicadores e Relatórios ficam juntos no botão Relatórios do menu.'],
      ['"Avançar para…" na ficha', 'O botão azul passa o médico para a próxima etapa. As outras etapas ficam em "Outra etapa…".'],
      ['Letras mais legíveis', 'Os textos claros ficaram mais escuros, para ler melhor.'],
    ],
  },
  {
    id: 10, data: '04/11', titulo: 'Menos cliques no dia a dia',
    itens: [
      ['A ficha abre ao lado do Kanban', 'Clique no card: a ficha abre num painel à direita e o Kanban continua atrás, com seu filtro e na mesma posição. Feche com ✕, Esc ou clicando fora. Use "‹ anterior" e "próximo ›" para passar pelos médicos da mesma coluna.'],
      ['"Já falei com o médico"', 'No Novo médico, marque essa opção e o cadastro já entra em Aguardando médico, com a ação "Cobrar retorno do médico". Sem precisar abrir a ficha e mover depois.'],
      ['Seu filtro de hospital fica guardado', 'O Kanban volta com o último hospital que você filtrou, e os hospitais que você mais usa viram atalhos de um clique ao lado do filtro.'],
    ],
  },
  {
    id: 9, data: '29/10', titulo: 'Quem faz o quê no fluxo',
    itens: [
      ['Escalista', 'Cadastra o médico (entra em Primeiro contato), pode mover para Aguardando médico e corrigir os cadastros que ele mesmo fez. Também registra a próxima ação (Feito / Amanhã) de qualquer médico.'],
      ['Cadastro e gestão', 'Avançam as outras etapas, aprovam e reprovam, como antes.'],
      ['Coluna "Documentação pendente"', 'Voltou a ter o nome que o time conhece, e a coluna repetida foi unificada nela.'],
    ],
  },
  {
    id: 8, data: '29/10', titulo: 'Kanban mais fácil de navegar',
    itens: [
      ['Barra de rolagem no rodapé', 'No Kanban, a barra para ir às outras colunas agora fica sempre visível no rodapé da tela (pedido da Denise).'],
      ['Renomear coluna', 'Administradores clicam no ✎ do cabeçalho da coluna para trocar o nome. O histórico e os relatórios continuam certos.'],
    ],
  },
  {
    id: 7, data: '28/10', titulo: 'Ajustes da revisão geral',
    itens: [
      ['Aprovar pede confirmação', 'E avisa quando ainda há documentos pendentes. Aprovar e Reprovar ficam só nos botões próprios (saíram do "Mover para").'],
      ['Feito sugere o passo seguinte', 'Ex.: depois de "Enviar cadastro ao hospital", sugere "Cobrar retorno do hospital".'],
      ['Print do balão 💬 mais rápido', 'E certo mesmo com a tela rolada.'],
      ['Relatórios', '"CSV desta aba" baixa um arquivo só; o Excel traz todas as abas, inclusive Formação e Motivos de perda.'],
      ['Tela larga', 'No monitor grande, as listas do Hoje viram colunas.'],
    ],
  },
  {
    id: 6, data: '27/10', titulo: 'Sugestões com retorno e print marcado',
    itens: [
      ['A resposta chega até você', 'Quando a gestão responde a sua sugestão, o aviso aparece na tela de onde ela saiu e o menu Sugestões mostra um número. Clique em "Ficou bom" ou "Ainda não ficou".'],
      ['Print do jeito que você quer', 'No balão 💬, "Tirar print e marcar": escolha a área (ou outra janela), risque, desenhe um retângulo ou escreva em cima.'],
      ['Suas sugestões são suas', 'Cada sugestão só aparece para quem a criou e para a gestão.'],
      ['Telas na largura toda', 'O Flow agora usa a tela inteira, do celular ao monitor grande.'],
    ],
  },
  {
    id: 5, data: '27/10', titulo: 'Filtro por data de cadastro',
    itens: [
      ['Cadastrados de … até …', 'Em Filtros, escolha as datas para ver só os médicos cadastrados naquele período. Junto com o filtro de hospital, separa os cadastros novos dos antigos.'],
      ['Vale para a exportação', 'O botão Exportar leva para o Excel só os médicos do período escolhido.'],
    ],
  },
  {
    id: 4, data: '19/10', titulo: 'Hospitais novos sem travar o cadastro',
    itens: [
      ['Hospital não está na lista?', 'No cadastro do médico, clique nesse link. Administrador cadastra na hora; os demais enviam o pedido e recebem o aviso quando o hospital entrar.'],
      ['Quem cuida da lista', 'Os administradores, em Admin → Hospitais: incluir, renomear, inativar e excluir. Pedidos pendentes aparecem no topo.'],
      ['Sem duplicar', 'O Flow avisa quando o nome é parecido com um hospital que já existe (ex.: "H. Santa Cruz" e "Hospital Santa Cruz").'],
    ],
  },
  {
    id: 3, data: '19/10', titulo: 'Melhorias desta semana',
    itens: [
      ['Parecer jurídico na ficha', 'Aprovado, aprovado com restrição ou não aprovado. Só o Jurídico marca, e quem cuida do médico recebe o aviso na hora.'],
      ['Reprovar pede o motivo', 'E já cria a ação de avisar o médico. Aprovar também cria "Informar aprovação e próximos passos".'],
      ['Cor do parecer no Kanban e na Jornada', 'Verde liberado, amarelo com restrição, vermelho não aprovado.'],
      ['Etapas mais simples', 'Os médicos R3 voltaram para "Aguardando médico" (seguem marcados como R3).'],
      ['Relatórios', 'Nova aba "Motivos de perda" e exportação do histórico completo em Excel, para auditoria.'],
      ['Balão 💬 em todas as telas', 'Conta pra gente o que achou: escreva ou fale, e o print da tela vai junto.'],
    ],
  },
  {
    id: 2, data: '15/10', titulo: 'Flow mais simples',
    itens: [
      ['Abre no Hoje', 'Suas ações do dia, atrasadas primeiro, com Feito, Amanhã e WhatsApp num clique.'],
      ['Novo médico', 'O sistema avisa o que falta preencher e bloqueia cadastro repetido no mesmo hospital.'],
      ['Urgente vale 7 dias', 'Depois volta para rotina sozinho, a menos que alguém marque de novo.'],
    ],
  },
];
/** Entrada com `lib` só aparece no dia em que a entrega sai para a equipe (tela Entregas). */
function novVisiveis() { return NOVIDADES.filter((n) => !n.lib || (typeof libLivre === 'function' && libLivre(n.lib))); }
function novUltima() { const v = novVisiveis(); return v.length ? v[0].id : 0; }
const TOUR_URL = 'demo.html';

const Novidades = {
  chave() { return 'flow:novidades:' + String((S.user && S.user.email) || '').toLowerCase(); },
  vista() { try { return +localStorage.getItem(this.chave()) || 0; } catch (_) { return novUltima(); } },
  marcar() { try { localStorage.setItem(this.chave(), String(novUltima())); } catch (_) { /* sem armazenamento */ } this.ponto(); },
  ponto() { const p = $('#nov-dot'); if (p) p.hidden = this.vista() >= novUltima(); },
  /** Chamado ao entrar: mostra o que mudou desde a última vez (quem nunca viu, vê só a versão atual). */
  checar() {
    if (window.FLOW_DEMO) return;
    this.ponto();
    const visto = this.vista();
    if (visto >= novUltima()) return;
    const lista = visto ? novVisiveis().filter((n) => n.id > visto) : novVisiveis().slice(0, 1);
    setTimeout(() => { if (!document.querySelector('.modal-bg')) this.abrir(lista); }, 900);
  },
  abrir(lista = novVisiveis()) {
    const m = openModal(`
      <div class="modal-head"><div><h2>Novidades do Flow</h2><div class="om-sub">O que mudou nas últimas versões</div></div><button class="x" data-close>✕</button></div>
      <div class="modal-body">
        ${lista.map((n) => `<div class="nov-bloco"><div class="nov-cab"><b>${esc(n.titulo)}</b><span class="tagx mute">${esc(n.data)}</span></div>
          <ul class="nov-lista">${n.itens.map(([t, d]) => `<li><b>${esc(t)}.</b> ${esc(d)}</li>`).join('')}</ul></div>`).join('')}
        <div class="nov-tour"><div><b>Primeira vez por aqui?</b><div class="muted small">Um tour de 3 minutos mostra o caminho de um médico, do cadastro à aprovação.</div></div>
          <a class="btn btn-line" href="${TOUR_URL}" target="_blank" rel="noopener">${ic('hoje', 15)}Ver como usar</a></div>
      </div>
      <div class="modal-foot"><button class="btn btn-primary" id="nov-ok">Entendi</button></div>`, { size: 'sm', onClose: () => this.marcar() });
    $('#nov-ok', m.el).onclick = () => m.close();
  },
};

$('#btn-novidades').onclick = () => Novidades.abrir();
$('#btn-tour').onclick = () => window.open(TOUR_URL, '_blank', 'noopener');

const novCss = document.createElement('style');
novCss.textContent = `
  .nov-bloco{ margin-bottom:16px; } .nov-cab{ display:flex; align-items:center; gap:8px; margin-bottom:6px; }
  .nov-lista{ margin:0; padding-left:18px; font-size:13px; line-height:1.55; color:var(--ink-soft); } .nov-lista li{ margin-bottom:4px; } .nov-lista b{ color:var(--ink); font-weight:600; }
  .nov-tour{ display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap; background:var(--brand-soft); border:1px solid var(--brand-line); border-radius:10px; padding:12px 14px; }
  #btn-novidades{ position:relative; } #nov-dot{ position:absolute; top:5px; right:5px; width:7px; height:7px; border-radius:50%; background:var(--red); box-shadow:0 0 0 2px var(--surface); }`;
document.head.appendChild(novCss);

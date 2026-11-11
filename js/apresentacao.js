/* CallMed Flow — Apresentação: o que é o sistema, como foi montado (lê / junta / cria) e como a equipe usa. Padrão Torre de Controle da Capacity Case. */
'use strict';

/** Quem nunca abriu a Apresentação entra por ela (ver startApp). */
function chaveSobre() { return 'flow:sobre-visto:' + String((S.user && S.user.email) || '').toLowerCase(); }

function renderSobre() {
  try { localStorage.setItem(chaveSobre(), '1'); } catch (_) { /* sem armazenamento */ }
  const card = (verbo, titulo, itens) => `<div class="sb-card"><span class="sb-verbo">${verbo}</span><h3>${titulo}</h3><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  const frente = (titulo, itens) => `<div class="sb-card"><h3>${titulo}</h3><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  const passo = (n, t, d) => `<div class="sb-passo"><small>${n}</small><b>${t}</b><span>${d}</span></div>`;
  const seta = '<div class="sb-seta">→</div>';
  const prio = (n, t, d, tag, ok) => `<div class="sb-prio-l"><span class="sb-prio-n">${n}</span><div><b>${t}</b><p>${d}</p></div><span class="sb-tag ${ok ? 'ok' : ''}">${tag}</span></div>`;
  $('#view-sobre').innerHTML = `<div class="sb">
    <div class="sb-hero">
      <div class="sb-kick">Torre de Controle - CallMed · Credenciamento</div>
      <h1>Cada médico, em cada hospital, com a etapa, o prazo e a próxima ação à vista.</h1>
      <p>O Flow junta numa tela só o que antes ficava espalhado entre planilha, WhatsApp e o sistema antigo: quem é o médico, em que etapa está, o que falta e quem cuida.</p>
      <div class="sb-frase">Ninguém precisa perguntar "como está o credenciamento do Dr. Fulano?": está aqui.</div>
    </div>

    <h2 class="sb-h">Como a torre foi montada aqui</h2>
    <div class="sb-jlc">
      ${card('Lê', 'O que já existia', ['Todo o histórico do sistema antigo veio para cá na virada de 03/11/2026, com etapas, anotações e responsáveis.', 'A lista oficial de hospitais da CallMed, cuidada pela gestão em Admin.'])}
      ${card('Junta', 'Uma ficha por médico e hospital', ['Cadastro, documentos, histórico e cobranças no mesmo lugar.', 'Kanban para mover de etapa e Jornada para ver o caminho dia a dia.', 'WhatsApp com mensagem pronta, sem copiar e colar.'])}
      ${card('Cria', 'O que faltava', ['Prazo (SLA) por etapa e aviso do que está atrasado.', 'Próxima ação com data para todo médico, para nada ficar parado.', 'Parecer do Jurídico, aprovação e reprovação com motivo, tudo registrado.'])}
    </div>

    <h2 class="sb-h">O que a torre entrega</h2>
    <div class="sb-pilares">
      ${frente('Médicos', ['Kanban por etapa, com atalhos para os hospitais que você mais usa.', 'Ficha ao lado do Kanban, com "Avançar para…" num clique.', 'Novo médico avisa o que falta e bloqueia cadastro repetido.'])}
      ${frente('Hoje', ['Suas ações do dia, atrasadas primeiro.', 'Feito, Amanhã e WhatsApp sem abrir a ficha.'])}
      ${frente('Relatórios', ['Funil, tempo em cada etapa e SLA.', 'Motivos de perda e produtividade da equipe.', 'Exportação para Excel, para auditoria.'])}
    </div>

    <h2 class="sb-h">Como funciona</h2>
    <div class="sb-fluxo">
      ${passo('1 · ESCALISTA', 'Cadastra o médico', 'Ele entra em Primeiro contato no hospital certo.')}${seta}
      ${passo('2 · CADASTRO', 'Fala e confere documentos', 'Avança as etapas e registra cada contato.')}${seta}
      ${passo('3 · JURÍDICO E HOSPITAL', 'Parecer e envio', 'O Jurídico dá o parecer; o cadastro segue ao hospital.')}${seta}
      ${passo('4 · RESULTADO', 'Aprovado ou reprovado', 'Com motivo e com a ação de avisar o médico.')}
    </div>

    <h2 class="sb-h">O que estamos construindo primeiro</h2>
    <div class="sb-prio">
      ${prio(1, 'Menos cliques no dia a dia', 'Ficha ao lado do Kanban, "Avançar para…" e menu mais curto.', 'pronto · 04/11', true)}
      ${prio(2, 'Prazos por etapa revisados', 'Acertar o SLA de cada etapa com a gestão do Cadastro.', 'a combinar')}
      ${prio(3, 'Documentos do médico ligados ao sistema de documentos da CallMed', 'Abrir os documentos direto da ficha e trazer as pendências sozinho.', 'a definir')}
    </div>

    <h2 class="sb-h">Como a gente usa</h2>
    <div class="sb-pilares">
      ${frente('Todo dia', ['Cada pessoa abre Médicos ou Hoje e trabalha nas suas ações.', 'Toda mudança de etapa e todo contato ficam no histórico.'])}
      ${frente('Toda semana', ['A gestão olha em Relatórios o funil, o SLA e onde está travando.'])}
      ${frente('No caminho', ['O balão 💬 e as Sugestões chegam direto para quem ajusta o sistema.', 'A versão nova sai toda segunda-feira, com as sugestões da semana anterior; o que é urgente (algo não funciona e impede o uso) é resolvido em até 48 horas.', 'Cada versão nova avisa no topo da tela e mostra o que mudou.'])}
    </div>

    <h2 class="sb-h">Princípios</h2>
    <ul class="sb-princ">
      <li><b>Não é bala de prata</b>A equipe já sabe credenciar; o Flow faz o trabalho girar mais rápido e sem perder nada.</li>
      <li><b>Um dado, uma fonte</b>O médico é cadastrado uma vez, aqui, e todos veem o mesmo cadastro.</li>
      <li><b>Poucos números que importam</b>Atrasadas, SLA vencido e sem próxima ação.</li>
      <li><b>Cada um vê o que precisa</b>O acesso é por pessoa e por setor, garantido no banco de dados.</li>
      <li><b>Os dados ficam na CallMed</b>Ninguém fica refém de ninguém.</li>
    </ul>

    <h2 class="sb-h">Quem acessa</h2>
    <div class="sb-perfis">
      <div class="sb-perfil"><b>Escalista</b><span>Cadastra médicos, passa para Aguardando médico e corrige o que cadastrou.</span></div>
      <div class="sb-perfil"><b>Cadastro</b><span>Conduz as etapas, confere documentos, aprova e reprova.</span></div>
      <div class="sb-perfil"><b>Jurídico</b><span>Dá o parecer jurídico de cada médico.</span></div>
      <div class="sb-perfil"><b>Gestão</b><span>Vê tudo, cuida de usuários e hospitais e responde às sugestões.</span></div>
      <div class="sb-perfil"><b>Acompanhamento</b><span>Só leitura: vê, exporta e manda sugestões.</span></div>
    </div>
    <p class="sb-sub" style="margin-top:12px">A entrada é por convite: a gestão cria o acesso em Admin e a pessoa troca a senha no primeiro login.</p>

    <div class="sb-metodo"><b>Sobre o método</b>A Torre de Controle é o método da Capacity Case, de Luiz Amo: juntar, ler e criar os sistemas da empresa numa torre só, para o dono decidir com número, não com sensação. <a href="https://capacitycase.com.br" target="_blank" rel="noopener">capacitycase.com.br</a></div>
    <div class="sb-cta"><button type="button" id="sb-ir">Ir para Médicos</button><button type="button" class="sec" id="sb-sug">💬 Dar uma sugestão</button></div>
    <div class="sb-pe"><span>Uso interno da CallMed. Dados de médicos protegidos pela LGPD: não compartilhe fora da equipe.</span><span>Método Torre de Controle · Capacity Case</span></div>
  </div>`;
  $('#sb-ir').onclick = () => go('fluxo');
  $('#sb-sug').onclick = () => { const b = document.getElementById('ac-btn'); if (b) b.click(); else go('sugestoes'); };
}
VIEWS.sobre = renderSobre;

const sbCss = document.createElement('style');
sbCss.textContent = `
  .sb{ padding:4px 0 40px; }
  .sb-hero{ background:linear-gradient(135deg, var(--brand) 0%, #0a1db8 100%); color:#fff; border-radius:var(--radius-lg); padding:32px 36px; position:relative; overflow:hidden; }
  .sb-hero::after{ content:""; position:absolute; right:-60px; top:-60px; width:240px; height:240px; border-radius:50%; border:28px solid rgba(56,227,191,.22); }
  .sb-kick{ font:600 12px var(--f-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--teal); }
  .sb-hero h1{ font:700 clamp(24px, 2.2vw, 42px)/1.2 var(--f-ui); margin:8px 0 10px; max-width:calc(100% - 200px); color:#fff; }
  .sb-hero p{ font-size:clamp(15px, 1vw, 19px); line-height:1.55; margin:0; max-width:calc(100% - 200px); opacity:.94; }
  .sb-frase{ margin-top:18px; display:inline-block; background:rgba(255,255,255,.12); border-left:4px solid var(--teal); padding:10px 14px; border-radius:0 10px 10px 0; font-size:15px; }
  .sb-h{ font-size:17px; margin:30px 0 12px; }
  .sb-sub{ margin:0; color:var(--ink-soft); font-size:14px; }
  .sb-pilares, .sb-jlc{ display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; }
  .sb-card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:18px; box-shadow:var(--shadow-xs); }
  .sb-jlc .sb-card{ border-top:3px solid var(--brand); }
  .sb-card h3{ margin:0 0 6px; font-size:16px; }
  .sb-card ul{ margin:0; padding-left:18px; font-size:13.5px; line-height:1.6; color:var(--ink-soft); }
  .sb-verbo{ display:inline-block; font:700 12px var(--f-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--brand); background:var(--brand-soft); border-radius:999px; padding:3px 10px; margin-bottom:8px; }
  .sb-fluxo{ display:flex; align-items:stretch; flex-wrap:wrap; }
  .sb-passo{ flex:1; min-width:180px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:14px 16px; }
  .sb-passo small{ display:block; font:600 11px var(--f-mono); color:var(--brand); margin-bottom:6px; letter-spacing:.05em; }
  .sb-passo b{ display:block; font-size:15px; margin-bottom:4px; } .sb-passo span{ font-size:13.5px; color:var(--ink-soft); line-height:1.45; }
  .sb-seta{ display:flex; align-items:center; padding:0 8px; color:var(--ink-faint); font-size:20px; }
  .sb-prio{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden; }
  .sb-prio-l{ display:grid; grid-template-columns:34px 1fr auto; gap:12px; align-items:center; padding:12px 16px; border-top:1px solid var(--border-soft); } .sb-prio-l:first-child{ border-top:0; }
  .sb-prio-n{ width:28px; height:28px; border-radius:50%; background:var(--brand); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; }
  .sb-prio-l b{ font-size:15px; } .sb-prio-l p{ margin:2px 0 0; font-size:13.5px; color:var(--ink-soft); }
  .sb-tag{ font-size:12px; font-weight:600; padding:4px 10px; border-radius:999px; background:var(--amber-soft); color:var(--amber-ink); white-space:nowrap; } .sb-tag.ok{ background:var(--green-soft); color:var(--green); }
  .sb-princ{ display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:10px 18px; margin:0; padding:0; list-style:none; }
  .sb-princ li{ background:var(--surface-2); border:1px solid var(--border-soft); border-radius:var(--radius-sm); padding:12px 14px; font-size:14px; line-height:1.5; color:var(--ink-soft); } .sb-princ li b{ display:block; margin-bottom:2px; color:var(--ink); }
  .sb-perfis{ display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; }
  .sb-perfil{ border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px 14px; background:var(--surface); } .sb-perfil b{ display:block; font-size:14.5px; margin-bottom:4px; } .sb-perfil span{ font-size:13px; color:var(--ink-soft); line-height:1.45; }
  .sb-metodo{ margin-top:30px; background:var(--surface-2); border:1px solid var(--border); border-left:4px solid var(--teal); border-radius:var(--radius-md); padding:16px 18px; font-size:14.5px; line-height:1.55; }
  .sb-metodo b{ display:block; font-size:15.5px; margin-bottom:4px; } .sb-metodo a{ color:var(--brand); font-weight:600; }
  .sb-cta{ margin-top:22px; display:flex; gap:10px; flex-wrap:wrap; }
  .sb-cta button{ border:1px solid var(--brand); background:var(--brand); color:#fff; border-radius:999px; padding:9px 18px; font-weight:600; font-size:14px; cursor:pointer; } .sb-cta button.sec{ background:var(--surface); color:var(--brand); }
  .sb-pe{ margin-top:34px; padding-top:16px; border-top:1px solid var(--border); display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; font-size:13px; color:var(--ink-faint); }
  @media (max-width:820px){ .sb-hero{ padding:24px 20px; } .sb-hero h1, .sb-hero p{ max-width:none; } .sb-pilares, .sb-princ, .sb-perfis, .sb-jlc{ grid-template-columns:1fr; } .sb-fluxo{ flex-direction:column; } .sb-seta{ transform:rotate(90deg); justify-content:center; padding:4px 0; } .sb-prio-l{ grid-template-columns:34px 1fr; } .sb-prio-l .sb-tag{ grid-column:2; justify-self:start; } }`;
document.head.appendChild(sbCss);

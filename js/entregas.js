/* CallMed Flow — Entregas (05/11/2026, regra do negócio da Capacity Case): as melhorias saem toda sexta, até o fim do dia;
   o que é urgente (algo não funciona e impede o uso) é resolvido em até 48 horas. O que fica pronto antes da sexta tem uma chave em
   flow_liberacoes com a data de liberação: até lá só a Capacity Case vê (borda roxa tracejada + 🔒); no dia, aparece sozinho para a equipe
   e quem estiver com a aba aberta vê a faixa de versão nova. Correção de erro nunca espera a sexta. */
'use strict';

const LIB = { pend: new Set(), datas: {}, lista: [], carregado: false };
/** Capacity Case = administrador com e-mail @capacitycase.com.br (o banco confere de novo em flow_e_capacity). */
function libCapacity() { return !!(S.isAdmin && /@capacitycase\.com\.br$/i.test((S.user && S.user.email) || '')); }
/** A equipe já vê esta entrega? (a Capacity Case vê tudo, com a borda roxa no que ainda não saiu) */
function libLivre(chave) { return libCapacity() || !LIB.pend.has(chave); }
function libSoVoce(chave) { return libCapacity() && LIB.pend.has(chave); }
function libRot(chave) { const d = LIB.datas[chave]; return d ? 'sai ' + d.slice(8, 10) + '/' + d.slice(5, 7) : 'sem data'; }
/** classe e atributos para marcar um elemento que só a Capacity Case vê: `<button class="x${libC(k)}"${libD(k)}>` */
function libC(chave) { return libSoVoce(chave) ? ' so-voce' : ''; }
function libD(chave) { return libSoVoce(chave) ? ` data-sv="${libRot(chave)}" title="Só você vê: ${libRot(chave)} para a equipe (tela Entregas)"` : ''; }
const libPend = (data) => new Set((data || []).map((x) => (typeof x === 'string' ? x : Object.values(x)[0])));

async function libCarrega() {
  try { const { data, error } = await sb.rpc('flow_liberacoes_pendentes'); if (error) throw error; LIB.pend = libPend(data); }
  catch (_) { LIB.pend = new Set(LIB.lista.map((l) => l.chave)); } // sem resposta do banco: o que já se sabia que estava guardado continua guardado
  if (libCapacity()) {
    try { const { data } = await sb.rpc('flow_liberacoes_lista'); LIB.lista = data || []; LIB.datas = Object.fromEntries(LIB.lista.map((l) => [l.chave, l.libera_em])); } catch (_) { /* segue */ }
  }
  LIB.carregado = true;
}
/** No dia da liberação, quem está com a aba aberta vê a faixa de versão nova (nunca recarrega sozinho). */
async function libConfere() {
  if (!LIB.carregado || libCapacity() || document.getElementById('ac-versao')) return;
  try {
    const { data, error } = await sb.rpc('flow_liberacoes_pendentes'); if (error) return;
    const agora = libPend(data);
    if ([...LIB.pend].some((k) => !agora.has(k)) && window.ACOMP && window.ACOMP._testeFaixa) window.ACOMP._testeFaixa();
  } catch (_) { /* sem rede: tenta de novo depois */ }
}
setInterval(libConfere, 10 * 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) libConfere(); });

// ---------- tela Entregas (só a Capacity Case) ----------
const EN_SEM = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const enDia = (d) => { const x = new Date(d + 'T12:00:00'); return `${EN_SEM[x.getDay()]}, ${d.slice(8, 10)}/${d.slice(5, 7)}`; };
function enProxSextas(n) { const r = [], x = new Date(); x.setHours(12, 0, 0, 0); while (r.length < n) { if (x.getDay() === 5) r.push(ymd(x)); x.setDate(x.getDate() + 1); } return r; }

async function renderEntregas() {
  const root = $('#view-entregas'); if (!root) return;
  if (!libCapacity()) { root.innerHTML = '<div class="op-more">Esta tela é só da Capacity Case.</div>'; return; }
  root.innerHTML = '<div class="op-more">Carregando o calendário…</div>';
  const { data, error } = await sb.rpc('flow_liberacoes_lista');
  if (error) { root.innerHTML = `<div class="op-more">Erro: ${esc(error.message)}</div>`; return; }
  const L = data || [], hoje = ymdToday();
  LIB.lista = L; LIB.datas = Object.fromEntries(L.map((l) => [l.chave, l.libera_em]));
  const saiu = L.filter((l) => l.libera_em && l.libera_em <= hoje), vem = L.filter((l) => l.libera_em && l.libera_em > hoje), espera = L.filter((l) => !l.libera_em);
  const datas = [...new Set(vem.map((l) => l.libera_em))].sort(), sextas = enProxSextas(8);
  const linha = (l) => `<tr><td><b>${esc(l.titulo)}</b><br><small style="color:var(--ink-soft)">${esc(l.descricao || '')}</small></td><td>${esc(l.pedido_por || '')}</td>
      <td>${l.onde ? `<a href="#" data-goview="${esc(l.onde)}">${esc(VIEW_TITLES[l.onde] || l.onde)} ›</a>` : ''}</td>
      <td>${!l.libera_em ? `<span class="tagx">aguardando</span><br><small>${esc(l.condicao || '')}</small>` : l.libera_em <= hoje ? `<span class="tagx">✅ a equipe já vê</span>` : `<span class="tagx so-voce" style="outline-offset:0">🔒 só você · ${esc(enDia(l.libera_em))}</span>`}</td>
      <td><select data-endata="${esc(l.chave)}" aria-label="Quando sai"><option value="">Sem data (aguardando)</option>
        ${[...new Set([hoje, ...sextas, l.libera_em].filter(Boolean))].sort().map((d) => `<option value="${d}" ${d === l.libera_em ? 'selected' : ''}>${d === hoje ? 'Hoje · ' : ''}${enDia(d)}</option>`).join('')}</select></td></tr>`;
  const tabela = (rs) => `<div class="panel" style="padding:0;overflow:auto"><table class="t"><thead><tr><th>Entrega</th><th>Quem pediu</th><th>Onde fica</th><th>Situação</th><th>Quando sai</th></tr></thead><tbody>${rs.map(linha).join('')}</tbody></table></div>`;
  const recado = (d) => 'Pessoal, saiu hoje no CallMed Flow:\n' + vem.filter((l) => l.libera_em === d).map((l) => `• ${l.titulo}${l.pedido_por ? ' (pedido: ' + l.pedido_por + ')' : ''}`).join('\n')
    + '\n\nSe aparecer a faixa "Saiu uma versão nova", é só clicar em Atualizar. Dúvida ou ideia: o balão 💬 no canto da tela.';
  root.innerHTML = `
    <div class="pg-head"><h2>Entregas</h2><span class="sub">O calendário das melhorias: o que a equipe já vê e o que sai em cada sexta. Só a Capacity Case vê esta tela.</span></div>
    <div class="es-box" style="margin-bottom:12px"><b>Regra:</b> as melhorias saem toda sexta-feira, até o fim do dia. O que é urgente (algo não funciona e impede o uso) é resolvido em até 48 horas. Correção de erro sai na hora. No sistema, o que só você vê tem <span class="so-voce" style="padding:1px 6px">borda roxa tracejada</span> e 🔒.</div>
    ${!L.length ? '<div class="op-more">Nenhuma entrega no calendário. Quando uma melhoria ficar pronta antes da sexta, ela entra aqui com a data em que sai para a equipe.</div>' : ''}
    ${datas.map((d) => `<h3 style="margin:16px 0 6px">${esc(enDia(d))} <button class="btn btn-line btn-sm" data-enrec="${d}">Copiar recado para o grupo</button></h3>${tabela(vem.filter((l) => l.libera_em === d))}`).join('')}
    ${espera.length ? `<h3 style="margin:16px 0 6px">Aguardando</h3>${tabela(espera)}` : ''}
    ${saiu.length ? `<h3 style="margin:16px 0 6px">A equipe já vê</h3>${tabela(saiu.slice().reverse())}` : ''}`;
  root.querySelectorAll('[data-endata]').forEach((sel) => sel.addEventListener('change', async () => {
    const v = sel.value || null, l = L.find((x) => x.chave === sel.dataset.endata);
    if (v === hoje && !confirm(`Soltar "${l.titulo}" para a equipe hoje?`)) { renderEntregas(); return; }
    sel.disabled = true;
    const { error: er } = await sb.rpc('flow_liberacao_data', { p_chave: sel.dataset.endata, p_data: v });
    if (er) { toast('Erro: ' + er.message, 'err'); sel.disabled = false; return; }
    toast(v ? `"${l.titulo}" sai ${v === hoje ? 'hoje' : 'na ' + enDia(v)}.` : `"${l.titulo}" ficou aguardando, sem data.`, 'ok');
    await libCarrega(); renderEntregas();
  }));
  root.querySelectorAll('[data-enrec]').forEach((b) => b.addEventListener('click', async () => {
    const t = recado(b.dataset.enrec);
    try { await navigator.clipboard.writeText(t); toast('Recado copiado: cole no grupo no dia da entrega.', 'ok'); } catch (_) { prompt('Copie o recado:', t); }
  }));
}
VIEWS.entregas = renderEntregas;

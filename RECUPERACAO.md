# Recuperação — CallMed Flow

> Atualizado em 15/10/2026. Veja também `Grupo CM Callegaro/RECUPERACAO-GERAL.md`.

## O que é
Site estático (HTML + JS puro: `index.html`, `js/`, `config.js`) sobre Supabase. Publicado no GitHub Pages: `https://luizdeamo-sketch.github.io/callmed-flow/`.

## Onde está cada parte
| Parte | Onde |
|---|---|
| Código | GitHub `luizdeamo-sketch/callmed-flow` (**público**, Pages ativo) + esta pasta |
| Banco | Supabase **CallMed_Plantoes** (sa-east-1): esquema em `supabase/001_flow_schema.sql`, funções em `supabase/functions/` |
| Migração do Lovable | `migracao/` e `migracao_lovable.py`; especificação em `docs/spec-lovable-atual.md` |

## Segredos
O front só usa a URL e a chave **publicável** do Supabase, que já ficam em `config.js` (público por desenho; a proteção é a RLS). Os segredos reais ficam nas Edge Functions (Supabase › Secrets). A integração de WhatsApp (`painelWebhook`) está **desligada**.

## Passo a passo
1. `git clone https://github.com/luizdeamo-sketch/callmed-flow.git`
2. Rodar local: `python -m http.server 5510` na pasta → `http://localhost:5510`.
3. Publicar: `bash publicar.sh "mensagem"` (carimba a versão dos scripts, faz commit e `git push`; o Pages publica sozinho).

## Se o banco for perdido
Criar projeto Supabase, aplicar `supabase/001_flow_schema.sql`, reimplantar as funções e atualizar `url`/`key` em `config.js`.

## Como saber que funcionou
A página carrega e lista os dados do Supabase sem erro no console do navegador.

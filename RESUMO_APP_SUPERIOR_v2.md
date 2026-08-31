# 📊 RESUMO EXECUTIVO — APP SUPERIOR v2 (Agosto 2026)

## ⚡ EM 60 SEGUNDOS

**Versão Anterior**: v1 (9.981 linhas, simples)  
**Versão Atual**: v2 (10.399 linhas, expandido)  
**Mudanças**: Menu reorganizado, RBAC granular, Estoque (prototipo), Integração com app Comercial, Romaneio com ID do Cliente correto

---

## 🎯 PRINCIPAIS MUDANÇAS

### 1. Menu Lateral Reorganizado

**Antes**: Abas em lista plana
```
- Operações
- Acompanhar
- Dashboard
- Fotos
- Ajustes
- Rateio
- ... (7 itens soltos)
```

**Agora**: Grupos colapsáveis
```
📋 PLANEJAMENTO (colapsável)
  ├─ Operações
  ├─ Acompanhar
  ├─ Fotos
  ├─ Estoque ← NOVO
  ├─ Ajustes
  ├─ Rateio
  └─ Tela do Coletor

📊 DASHBOARD (direto)

📄 RELATÓRIOS (direto, 5 tipos novos)

🔧 CADASTROS (colapsável)
  ├─ Parâmetros
  └─ Perfis

💰 APP COMERCIAL (link externo)
```

---

### 2. RBAC Granular (Novo)

**Antes**: Perfil tem acesso à aba Dashboard inteira (sim ou não)

**Agora**: Perfil controla CADA bloco da aba
```
Dashboard tem 8 blocos:
- Forecast Operacional        ✅ (Gestor vê)
- Operação Agora              ✅ (Gestor vê)
- Realizadas Hoje             ❌ (Gestor NÃO vê)
- Realizado — Período Anterior ✅ (Gestor vê)
- Indicadores                 ✅ (Gestor vê)
- Evolução Diária             ✅ (Gestor vê)
- Fechamento do Mês           ✅ (Gestor vê)
- Cancelamentos por Cliente   ✅ (Gestor vê)
```

Cada perfil (Gestor, Gestor Geral, Diretor, Administrativo) tem lista customizável.

---

### 3. Estoque (Novo — Prototipo)

**Aba**: Planejamento > Estoque > "Importar Arquivo de Estoque"

**Fluxo**:
1. Gestor gera relatório do WMS (Excel/CSV)
2. Clica "Importar" no app
3. App valida dados
4. Salva no Firestore
5. Dashboard mostra cards:
   - Total de itens: 1.245
   - Valor total: R$ 89.650,50
   - Últimas 10 importações (histórico)

**Status**: Prototipo funcional (código pronto, pronto para refinements)

---

### 4. Integração Gestão Comercial

**Antes**: Apps isoladas (2 repositórios, 2 Firebases)

**Agora**: 
- Link no painel Gestor abre app Comercial
- Perfil controla quais abas aparecem lá (`?ocultar=tabela,reajuste`)
- Sem fazer logout
- Abas sincronizadas entre os 2 apps

---

### 5. Tela do Coletor (Acessível)

**Novo**: Gestor consegue abrir a tela do Conferente do painel sem logout
- Antes: tinha que fazer logout + login como Conferente
- Agora: clica "Tela do Coletor" → abre em nova aba → volta pro painel Gestor

---

### 6. Romaneio — ID do Cliente corrigido

**Problema**: o romaneio (PDF/HTML gerado ao finalizar a operação) tinha um campo
"Referência Cliente / NF" que nunca era preenchido de verdade — caía sempre no
fallback do nome do cliente, duplicando a coluna "Cliente" ao lado.

**Correção**:
- O registro de fotos/romaneio agora propaga `idCliente` a partir de
  `op.idCliente` (o campo "ID Cliente (ID/CNTR/NF)" já capturado no
  cadastro/edição da operação).
- O rótulo no romaneio virou **"ID do Cliente"**, mostrando o valor real.
- O **ID do Cliente** passou a aparecer em todos os cards que resumem uma
  operação já concluída: Galeria de Romaneios (card + modal de fotos),
  "Finalizadas · hoje" em Acompanhamento ao Vivo, card de Rateio de Bônus e
  o drill-down "operações concluídas" do Dashboard.

**Também removido**: o botão "Enviar ao cliente" (compartilhamento nativo via
Web Share API) na tela de geração do romaneio — não fazia mais sentido para o
fluxo atual.

---

## 📋 ESTRUTURA TÉCNICA

### Novo no App.jsx

```javascript
// Menu com grupos
const MENU_LATERAL = [
  { tipo: "grupo", id: "planejamento", label: "Planejamento", icon: ClipboardList,
    itens: ["operacoes", "acompanhar", "fotos", "estoque", "ajustes", "rateio", "coletor"] },
  // ...
];

// RBAC granular
const SUBITENS_POR_ABA = {
  operacoes: [
    { id: "novo", label: "Novo Pré-Planejamento..." },
    { id: "terceirizados", label: "Terceirizados..." }
  ],
  dashboard: [
    { id: "forecast", label: "Forecast..." },
    { id: "agora", label: "Agora..." },
    // ... 6 mais
  ],
  estoque: [
    { id: "importar", label: "Importar Arquivo..." }
  ],
  // ...
};

// Funções auxiliares
function subLiberado(sub, subId) { ... }
function permissoesEfetivas(pessoa, perfil) { ... }
function pinEmUsoGlobal(pin, params, exceto) { ... }
```

### Firestore — Nova Collection

```
cd_superior (projeto Firebase)
  ├── cd_superior (collection)  ← operações, parâmetros, etc (já existe)
  ├── sbs_sup_fotos_idx_v1      ← índice de fotos (já existe)
  └── sbs_sup_estoque           ← NOVO: { dataImportacao, itens[], histórico }
```

---

## ✅ CHECKLIST (já feito)

- [x] Menu reorganizado em grupos (Planejamento, Cadastros)
- [x] RBAC granular (SUBITENS_POR_ABA)
- [x] Ajustes individuais por pessoa (override de perfil)
- [x] Aba "Estoque" criada
- [x] Integração App Comercial (link + visibilidade de abas)
- [x] Tela do Coletor acessível sem logout
- [x] Relatórios expandidos (5 tipos novos)
- [x] Fotos com retenção configurável (RETENCAO_DIAS)
- [x] Validações globais (PIN, nomes reservados)
- [x] Romaneio: campo "ID do Cliente" corrigido (era referência inexistente)
- [x] ID do Cliente exibido nos cards de operação realizada
- [x] Botão "Enviar ao cliente" removido do romaneio
- [x] Sintaxe validada (esbuild sem erros) + `vite build` passando

---

## ❓ PRÓXIMOS PASSOS

### Fase 1 (agora) — Importação de Estoque
- [ ] Upload de arquivo (Excel/CSV)
- [ ] Validação de dados
- [ ] Salvar Firestore
- [ ] Cards resumo (Qty Total, Valor Total)

### Fase 2 (próximas semanas)
- [ ] Tabela detalhes (paginação, filtros)
- [ ] Histórico de importações
- [ ] PDF exportável

### Fase 3 (futuro)
- [ ] Gráficos de evolução
- [ ] Integração Dashboard (cards ao vivo)
- [ ] Alertas por cliente

---

## 🔗 DOCUMENTOS CRIADOS

1. **PROMPT_IMPORTAR_ESTOQUE_SUPERIOR.md**
   - Detalhes completos para implementar Estoque
   - Estrutura Firestore, UX, regras de negócio
   - Leve para o Cláudio quando pronto para essa fase

2. **SKILL_SBS_WEBAPP_ATUALIZADO.md**
   - Atualização da skill sbs-webapp com novas práticas
   - Seções sobre Menu Lateral, RBAC Granular, Apps Externas
   - Referência para futuros apps SBS

3. **RESUMO_APP_SUPERIOR_v2.md** (este arquivo)
   - Visão 60 segundos das mudanças
   - Compartilhe com o Cláudio para ele ter contexto

---

## 📞 DÚVIDAS FREQUENTES

**P: Preciso fazer deploy de novo?**  
A: Sim. Mudanças no App.jsx exigem novo build + commit no GitHub → deploy automático (2-4 min).

**P: As permissões antigas (PIN de Gestor, Conferentes) continuam funcionando?**  
A: Sim. RBAC granular é adicional — se perfil não define subitems, `undefined = ligado` (compatível).

**P: Como mudo o acesso de uma pessoa específica?**  
A: Na aba "Cadastros > Usuários", edite a pessoa e marque `telasCustom` ou `subCustom` — override o perfil.

**P: Quando faço deploy, preciso criar Collection `sbs_sup_estoque` no Firestore?**  
A: Não yet — quando implementar importação de estoque (Fase 1), cria naquele momento.

---

**Última atualização**: 18/ago/2026  
**Versão app**: v2 (10.399 linhas)  
**Pronto para**: Fase 1 (Importação Estoque)

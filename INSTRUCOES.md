# App Gestão CD Superior — Guia de Publicação

**Para:** Pablo Bona — SBS Solution
**Operação:** CD Superior Transportes
**Meta:** app no ar e rodando na segunda-feira

Tempo total estimado: **40 a 60 minutos**, sem conhecimento técnico.
Custo: **R$ 0,00** — tudo em plano gratuito.

---

## O que muda em relação ao que você tinha

O app que você me enviou funcionava dentro do Claude porque usava um
recurso de armazenamento que só existe aqui. Fora do Claude, ele não
abriria — e, mesmo que abrisse, cada celular teria seus próprios dados:
o gestor não veria nada do que o conferente lançou.

Troquei essa camada por um banco de dados na nuvem. Agora, quando o
conferente encerra uma operação no celular, o número aparece na tela do
gestor em segundos. Todo o resto do app — cálculo de meta, bônus,
rateio, exportação para Excel — continua exatamente como você desenhou.

Também acrescentei um aviso vermelho no topo da tela que aparece se uma
gravação não chegar ao banco. Sem ele, um conferente sem sinal sairia do
CD achando que registrou.

---

## Visão geral das 4 etapas

| Etapa | O que é | Tempo |
|---|---|---|
| 1 | Criar as contas (GitHub e Firebase) | 10 min |
| 2 | Criar o banco de dados | 15 min |
| 3 | Publicar o app e obter o link | 20 min |
| 4 | Instalar nos celulares | 5 min |

---

# ETAPA 1 — Criar as contas

## 1.1 — Conta no GitHub

O GitHub vai hospedar o app de graça e gerar o endereço que os
conferentes vão abrir no celular.

1. Acesse **github.com**
2. Clique em **Sign up**
3. Informe e-mail, senha e um nome de usuário
   → sugestão: `sbssolution` ou `pablobona`
   → **anote esse nome**, ele vai aparecer no link do app
4. Confirme o e-mail que o GitHub enviar

## 1.2 — Conta no Firebase

O Firebase é o banco de dados. É do Google — se você já tem Gmail, use a
mesma conta.

1. Acesse **firebase.google.com**
2. Clique em **Comece agora** / **Get started**
3. Entre com sua conta Google

---

# ETAPA 2 — Criar o banco de dados

## 2.1 — Criar o projeto

1. No Firebase, clique em **Criar um projeto**
2. Nome: `cd-superior`
3. Google Analytics: **desative** (não precisamos)
4. Clique em **Criar projeto** e aguarde

## 2.2 — Criar o banco

1. No menu lateral, clique em **Criar** > **Firestore Database**
2. Clique em **Criar banco de dados**
3. Local: escolha **southamerica-east1 (São Paulo)**
   → é o mais próximo, deixa o app mais rápido
4. Escolha **Iniciar no modo de teste**
5. Clique em **Ativar**

## 2.3 — Aplicar as regras de segurança

1. Ainda no Firestore, abra a aba **Regras**
2. Apague tudo o que estiver lá
3. Abra o arquivo **REGRAS_FIREBASE.txt** que veio junto
4. Copie o bloco indicado e cole no lugar
5. Clique em **Publicar**

## 2.4 — Pegar a chave de conexão

Esta é a parte que mais gera dúvida. Vá com calma.

1. Clique na **engrenagem** ⚙️ (canto superior esquerdo) >
   **Configurações do projeto**
2. Role até o fim, na seção **Seus aplicativos**
3. Clique no ícone **`</>`** (Web)
4. Apelido do app: `cd-superior-web`
5. **Não** marque Firebase Hosting
6. Clique em **Registrar app**
7. A tela vai mostrar um bloco de código parecido com isto:

```js
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "cd-superior-abc12.firebaseapp.com",
  projectId: "cd-superior-abc12",
  storageBucket: "cd-superior-abc12.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

8. **Copie esse bloco inteiro.** Você vai colar no próximo passo.

## 2.5 — Colar a chave no app

1. Abra a pasta do app no seu computador
2. Entre em `src` e abra o arquivo **`storage.js`**
   → use o Bloco de Notas ou qualquer editor de texto
3. Localize o trecho que diz `COLE_AQUI_SUA_API_KEY`
4. **Substitua o bloco inteiro** pelo que você copiou do Firebase
5. Salve o arquivo

> **Atenção ao colar:** mantenha o `const firebaseConfig = {` e o `};`.
> Troque apenas o miolo, com os valores reais.

---

# ETAPA 3 — Publicar o app

## 3.1 — Enviar os arquivos para o GitHub

1. No GitHub, clique no **+** (canto superior direito) >
   **New repository**
2. Nome: `cd-superior`
3. Marque **Public**
   → precisa ser público para o site gratuito funcionar
   → isso expõe o *código*, não os *dados* da operação
4. Clique em **Create repository**
5. Na tela seguinte, clique em **uploading an existing file**
6. Arraste **todos os arquivos e pastas** da pasta do app
   → **exceto** a pasta `node_modules`, se ela existir
7. Clique em **Commit changes**

## 3.2 — Ligar a publicação automática

1. No seu repositório, abra a aba **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Pronto — não precisa configurar mais nada

O arquivo `.github/workflows/deploy.yml` que veio junto já ensina o
GitHub a montar e publicar o app sozinho.

## 3.3 — Aguardar a publicação

1. Abra a aba **Actions** do repositório
2. Você verá um processo rodando (bolinha amarela)
3. Em 2 a 4 minutos vira um **✅ verde**
4. Se ficar **❌ vermelho**, veja a seção *Se algo der errado*

## 3.4 — Seu link

O endereço do app será:

```
https://SEU-USUARIO.github.io/cd-superior/
```

Trocando `SEU-USUARIO` pelo nome que você criou na Etapa 1.1.
Exemplo: `https://sbssolution.github.io/cd-superior/`

**Abra esse link no computador para conferir se o app aparece.**

---

# ETAPA 4 — Instalar nos celulares

O app não vai para a Play Store nem para a App Store. Ele se instala
direto pelo navegador e fica com ícone na tela inicial, igual a qualquer
outro aplicativo.

## Android (a maioria dos conferentes)

1. Abrir o link no **Google Chrome**
2. Tocar nos **três pontinhos** ⋮ (canto superior direito)
3. Tocar em **Instalar aplicativo** ou **Adicionar à tela inicial**
4. Confirmar em **Instalar**

Pode aparecer sozinho um aviso na parte de baixo dizendo *"Adicionar
CD Superior à tela inicial"* — se aparecer, é só tocar.

## iPhone

1. Abrir o link no **Safari** (precisa ser o Safari)
2. Tocar no botão **Compartilhar** (quadrado com seta para cima)
3. Rolar e tocar em **Adicionar à Tela de Início**
4. Tocar em **Adicionar**

## Como fica

O ícone azul da Superior aparece na tela do celular. Ao tocar, o app
abre em tela cheia, sem barra de navegador — parece um app comum.

## Mensagem pronta para mandar no WhatsApp

> Pessoal, a partir de segunda vamos registrar as operações pelo app.
>
> 1. Abra este link no celular: **[COLE SEU LINK AQUI]**
> 2. **Android:** toque nos 3 pontinhos ⋮ e depois em *Instalar aplicativo*
>    **iPhone:** toque em Compartilhar e depois em *Adicionar à Tela de Início*
> 3. Vai aparecer o ícone azul da Superior na tela do celular
> 4. Entre como **Conferente** e use o seu PIN
>
> Qualquer dúvida me chama.

---

# Acesso do gestor e o seu

Todos usam **o mesmo link**. O que muda é o modo de entrada:

| Quem | Modo | O que precisa |
|---|---|---|
| Conferente | Conferente | PIN individual |
| Gestor | Gestor | PIN do gestor |
| Você (Pablo) | Gestor | PIN do gestor |

O gestor pode usar celular, tablet ou computador. No computador a
visualização dos gráficos fica melhor.

## Antes de segunda — cadastre as pessoas

1. Abra o app e entre como **Gestor** (PIN inicial: **1234**)
2. Vá em **Parâmetros**
3. **Troque o PIN do gestor** — não deixe 1234
4. Cadastre cada conferente com nome e PIN próprio
5. Confira o custo da terceirizada e o valor do bônus

> **Por que PIN individual:** o app grava quem registrou cada operação.
> Se houver divergência num lançamento, você sabe com quem conversar.
> Com PIN compartilhado, essa rastreabilidade se perde.

---

# Como atualizar o app depois

Quando você quiser mudar algo, me envie o pedido que eu devolvo o
arquivo alterado. Para publicar:

1. Vá ao repositório no GitHub
2. Abra o arquivo que mudou
3. Clique no **lápis** ✏️
4. Cole o conteúdo novo
5. Clique em **Commit changes**

Em 2 a 4 minutos o app atualiza sozinho no celular de todo mundo.

---

# Se algo der errado

**A tela fica azul e não sai do lugar**
Chave do Firebase colada errada. Revise o passo 2.5 — normalmente falta
uma aspa ou uma vírgula.

**Aparece a faixa vermelha "Não foi possível salvar"**
Sem internet ou regras do Firebase não publicadas. Confira o passo 2.3.
Enquanto a faixa estiver visível, o registro **não** foi gravado.

**O conferente lança e o gestor não vê**
O app atualiza a cada 20 segundos. Se não aparecer, puxe a tela para
baixo ou toque no botão de atualizar.

**Actions ficou vermelho ❌**
Clique no processo e veja a mensagem. Quase sempre é a pasta
`node_modules` enviada por engano — apague-a do repositório.

**Não instala no iPhone**
Precisa ser o Safari. Chrome no iPhone não oferece a instalação.

**Esqueceu o PIN do gestor**
Me acione. Dá para restaurar pelo painel do Firebase.

---

# Checklist final — antes de segunda

- [ ] App abre no link
- [ ] Instalado no seu celular
- [ ] Instalado no celular do gestor
- [ ] Instalado no celular de cada conferente
- [ ] PIN do gestor trocado (não é mais 1234)
- [ ] Conferentes cadastrados com PIN individual
- [ ] Custo da terceirizada e valor do bônus conferidos
- [ ] **Teste real:** registrar uma operação num celular e confirmar
      que ela aparece no painel do gestor em outro aparelho

Esse último item é o que vale. Faça o teste no domingo, com calma —
não na segunda de manhã com a operação rodando.

---

**Dúvida em qualquer ponto, me acione.**

SBS Solution — Consultoria em Lean Manufacturing e Logística

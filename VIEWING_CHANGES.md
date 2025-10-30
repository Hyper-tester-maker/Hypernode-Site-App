# Como Visualizar as Mudanças (GPU Hosts Module)

## ⚠️ IMPORTANTE: Você está vendo o site certo?

As mudanças foram feitas no **código local** e ainda **NÃO foram publicadas** no site de produção (Vercel).

### ❌ NÃO FUNCIONA:
- Acessar https://hypernodesolana.org/app
- Esse é o site em produção que ainda tem o código antigo

### ✅ FUNCIONA:
- Acessar http://localhost:3000/app
- Esse é o servidor de desenvolvimento com o código novo

---

## 🚀 Passo a Passo para Ver as Mudanças

### 1. Certifique-se de que o servidor está rodando

```bash
# Se não estiver rodando, execute:
npm install
npm run dev
```

Você deve ver:
```
VITE v4.5.14  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://21.0.0.186:3000/
```

### 2. Abra o navegador

Acesse: **http://localhost:3000/app**

### 3. Limpe o cache

**Opção A: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R` ou `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**Opção B: Abra em janela anônima**
- Chrome: `Ctrl + Shift + N` (Windows) ou `Cmd + Shift + N` (Mac)
- Firefox: `Ctrl + Shift + P` (Windows) ou `Cmd + Shift + P` (Mac)
- Safari: `Cmd + Shift + N`

### 4. Role para baixo na página

Você deve ver, nesta ordem:

1. **Header** com "HYPERNODE App" e botão de wallet
2. **Wallet/Balances** (cards com saldo SOL/HYPER)
3. **Connect & Earn** (seção com dropdown de GPUs)
4. **DeFi & Services** (3 cards: Liquidity Pools, Staking, Token Services)
5. **🆕 GPU Hosts (Beta)** ← ESTA É A NOVA SEÇÃO

---

## 🎯 O que você deve ver na nova seção

### GPU Hosts (Beta)

**Card 1: "How it works"**
- 3 colunas com passos numerados:
  1. Connect your Solana wallet
  2. Generate a node token
  3. Run the command on your GPU host

**Card 2: Botão central**
- Se wallet não conectada: aviso amarelo "Connect your Solana wallet to register a GPU node"
- Se wallet conectada: botão azul grande "Generate node token"

**Card 3: Tabela "My GPU Nodes"** (aparece vazia inicialmente)
- Colunas: Node ID | Hostname | GPU | Status | Last heartbeat | Earned (HYPER)
- Mensagem: "No nodes registered yet..."

**Card 4: Tabela "Recent Jobs"** (aparece vazia inicialmente)
- Colunas: Job ID | Type | Node | Status | Duration
- Mensagem: "No jobs executed yet..."

**Card 5: "How to run the host"**
- Prerequisites (lista com Ubuntu, Docker, etc.)
- Steps (passos numerados)
- Link para Discord

---

## 🐛 Troubleshooting

### Problema 1: "Não vejo a seção GPU Hosts"

**Solução:**
1. Verifique se está em http://localhost:3000/app (não no site de produção)
2. Faça hard refresh (Ctrl+Shift+R)
3. Abra em janela anônima
4. Verifique o console do navegador (F12)

### Problema 2: "Vejo erro no console"

**Abra o console:**
- Windows/Linux: `F12` ou `Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

**Erros comuns:**

**"Failed to fetch http://localhost:3001/api/nodes/..."**
- Isso é NORMAL! O backend não está rodando
- A UI ainda deve aparecer, só não vai funcionar o botão de gerar token

**"Cannot find module '@/components/TokenGenerator'"**
- Execute: `npm install`
- Reinicie o servidor

**"Unexpected token"**
- Pode haver erro de sintaxe
- Verifique qual arquivo está causando o erro no console

### Problema 3: "Página em branco"

**Solução:**
1. Verifique o console para erros (F12)
2. Reinicie o servidor:
   ```bash
   # Ctrl+C para parar
   npm run dev
   ```
3. Limpe completamente o cache do navegador
4. Tente outro navegador

### Problema 4: "Mudanças não aparecem após atualizar"

**Solução:**
1. Pare o servidor (Ctrl+C)
2. Delete a pasta `.vite` se existir:
   ```bash
   rm -rf .vite
   ```
3. Reinicie:
   ```bash
   npm run dev
   ```

---

## 📋 Checklist de Verificação

- [ ] Servidor rodando (http://localhost:3000)
- [ ] Acesso correto (localhost, não hypernodesolana.org)
- [ ] Hard refresh feito (Ctrl+Shift+R)
- [ ] Rolar até o final da página /app
- [ ] Ver título "GPU Hosts (Beta)" com ícone de CPU
- [ ] Ver 5 cards/seções dentro de "GPU Hosts"

---

## 🌐 Para Ver no Site de Produção

Para ver as mudanças em https://hypernodesolana.org/app, você precisa:

1. **Fazer merge do Pull Request** no GitHub
2. **Fazer deploy na Vercel**
3. **Configurar as variáveis de ambiente** na Vercel:
   ```
   VITE_NODE_API_ENDPOINT=https://your-backend-url.com
   VITE_NODE_WS_ENDPOINT=wss://your-backend-url.com
   ```
4. **Aguardar o build da Vercel** (1-2 minutos)
5. **Limpar cache do navegador** ao acessar o site

---

## 🔧 Comandos Úteis

```bash
# Ver arquivos modificados
git status

# Ver diferenças
git diff src/pages/App.jsx

# Verificar se componentes existem
ls -l src/components/TokenGenerator.jsx
ls -l src/components/NodeTable.jsx
ls -l src/components/JobTable.jsx
ls -l src/components/CodeBlock.jsx

# Ver imports no App.jsx
grep "import.*Token\|Node\|Job" src/pages/App.jsx

# Verificar se a seção existe no código
grep -A 5 "GPU Hosts" src/pages/App.jsx

# Reiniciar servidor limpo
rm -rf node_modules/.vite
npm run dev
```

---

## 💡 Dica Final

Se ainda não conseguir ver as mudanças após seguir todos os passos:

1. Tire um screenshot do que você está vendo
2. Tire um screenshot do console do navegador (F12)
3. Copie e cole qualquer mensagem de erro
4. Verifique se está na URL correta (localhost:3000/app)

A seção **GPU Hosts (Beta)** deve aparecer no final da página, com bordas cyan e fundo escuro, mantendo o tema do site.

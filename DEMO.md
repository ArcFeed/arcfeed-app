# Hackathon Demo Guide

## Arc Network DeFi Data Marketplace Demo

**Time: 4 minutes** | **Goal: Show AI-powered micropayment data marketplace**

---

## 🎬 Demo Script

### Opening (15 seconds)

**Say:**
> "I built a DeFi data marketplace where AI agents can buy real-time data using USDC micropayments on Arc Network. Let me show you how it works."

**Show:**
- Frontend dashboard loaded at `http://localhost:3000`
- Quick pan across UI to show modern interface

---

### Part 1: Data Products Catalog (30 seconds)

**Do:**
1. Click "Data Products" tab
2. Scroll through data products

**Point Out:**
- 14 DeFi data feeds organized by category
- Micropayment pricing: 0.001-0.005 USDC per request
- Arc Network logo in footer
- Product categories: Yields, TVL, Analytics

**Say:**
> "We have 14 real-time DeFi data products from DeFiLlama. Prices range from just 0.001 to 0.005 USDC - perfect for Arc Network's low fees. This is data that trading bots and AI agents need in real-time."

---

### Part 2: AI Agent Purchase (2 minutes)

**Do:**
1. Click "Chat" tab
2. Type: `What data is available?`
3. Wait for AI response listing products
4. Type: `Get me Aave yields`
5. Watch AI execute purchase

**Point Out as AI responds:**
- ✅ AI checks wallet balance first
- ✅ AI sends 0.002 USDC payment on Arc Network
- ✅ Transaction hash displayed
- ✅ Fresh Aave yield data from DeFiLlama displayed
- ✅ Payment confirmation shown

**Say:**
> "The AI agent handles everything autonomously. It checks my balance, sends the micropayment on Arc Network, waits for confirmation, then retrieves and displays the data. All in under a second thanks to Arc's speed."

**Follow-up question:**
Type: `What's my wallet balance now?`

**Say:**
> "Notice the balance decreased by exactly 0.002 USDC - the cost of Aave data."

---

### Part 3: HTTP 402 Protocol Demo (1 minute)

**Do:**
1. Open terminal/Postman
2. Run prepared curl command:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  http://localhost:3001/api/data/yields/aave
```

**Point Out:**
- 402 Payment Required response
- Payment instructions in response body
- Receiver address
- Amount required

**Say:**
> "Under the hood, we use HTTP 402 Payment Required - a rarely-used HTTP status code perfect for micropayments. The endpoint tells you exactly how much to pay and where to send it."

**Do:**
3. Run second curl with payment header:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     -H "X-Payment-Tx: 0x..." \
  http://localhost:3001/api/data/yields/aave
```

**Point Out:**
- Data returned instantly
- Payment cached (no re-verification needed)

**Say:**
> "After payment, the endpoint verifies the transaction on Arc Network and returns the data. Payments are cached for an hour, so you can re-fetch data without paying twice."

---

### Part 4: Why Arc Network (45 seconds)

**Show:**
- Open Arc Network testnet explorer: `https://testnet.arcscan.app`
- Search for recent transaction hash
- Show sub-second confirmation time
- Show minimal gas fees

**Say:**
> "Why Arc Network? Three reasons:
> 
> 1. **Ultra-low fees** - Perfect for 0.001 USDC micropayments. Traditional chains would eat half the payment in gas.
> 2. **Sub-second finality** - AI agents need data NOW, not in 12 seconds like Ethereum.
> 3. **High throughput** - This scales to thousands of data requests per second for high-frequency trading bots.
> 
> Arc Network makes micropayments practical for the first time."

---

### Closing (30 seconds)

**Say:**
> "This unlocks a new business model: Pay-per-query data access for AI agents. Imagine:
> - Trading bots buying arbitrage opportunities in real-time
> - DeFi aggregators purchasing cross-chain yields
> - Risk engines fetching liquidation data on-demand
> 
> All powered by Arc Network's Economic OS for autonomous AI payments."

**Show:**
- Quick return to dashboard
- Highlight "Built on Arc Network" footer

**Final Line:**
> "Questions? Let me show you the code."

---

## 🎯 Backup Questions & Answers

### Q: "How do you prevent double-spending?"

**A:** 
> "Great question. The payment middleware caches verified transactions for 1 hour using NodeCache. Once a payment is verified on Arc Network, it's stored with a TTL. If someone tries to reuse the same transaction hash, we check the cache first and reject it if already used. The cache prevents both re-verification overhead and double-spending."

**Show:** `/backend/src/services/payment.ts` - PaymentCache class

---

### Q: "What if the transaction fails?"

**A:**
> "The middleware verifies three things: 1) Transaction exists on Arc Network, 2) Recipient matches our payment address, 3) Amount is exact or greater. If any fail, we return a new 402 response. The client can retry with a new payment. Circle wallets also have built-in retry logic for failed transactions."

**Show:** `/backend/src/services/circleService.ts` - verifyUSDCTransaction()

---

### Q: "How do you get real-time DeFi data?"

**A:**
> "We integrate directly with DeFiLlama's public API - the most comprehensive DeFi data aggregator. They pull from 2000+ protocols across 100+ chains. Our service layer caches responses for 5 minutes to avoid rate limits, but data is still fresh enough for most use cases."

**Show:** `/backend/src/services/defiData.ts`

---

### Q: "Can users build on top of this?"

**A:**
> "Absolutely. We expose both the AI chat interface AND direct REST APIs. Developers can:
> - Use our AI agent as a conversational layer
> - Call the HTTP 402 endpoints directly from their bots
> - Fork the project and add new data sources
> 
> Everything is TypeScript, fully type-safe, and MIT licensed."

**Show:** `/backend/src/routes/data.routes.ts` - API structure

---

### Q: "What's the business model?"

**A:**
> "We take a small margin on data costs. For example:
> - DeFiLlama API is free
> - We charge 0.002 USDC per request
> - Platform keeps 0.001 USDC, 0.001 goes to data provider incentives
> 
> At scale (1M requests/day), that's $1K daily revenue. High-frequency users can subscribe for unlimited access. The key is Arc Network makes these tiny margins profitable by keeping fees near zero."

---

### Q: "How did you handle Circle Wallets on Arc?"

**A:**
> "Circle just added Arc Network support for their Developer-Controlled Wallets SDK. We specify `ARC-TESTNET` as the blockchain when creating wallets. The SDK handles all the wallet creation, signing, and transaction broadcasting. We just verify the on-chain transaction using ethers.js and the Arc RPC."

**Show:** 
- `/backend/src/config/networks.ts` - CIRCLE_BLOCKCHAIN constant
- `/backend/src/services/circleService.ts` - getArcProvider()

---

## 📋 Pre-Demo Checklist

### 30 Minutes Before

- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Fund primary wallet with 1 USDC on Arc testnet
- [ ] Test chat: "What's my balance?" - should show ~1 USDC
- [ ] Test data purchase: "Get me Aave yields" - should work end-to-end
- [ ] Prepare curl commands in text file with real API key
- [ ] Open Arc testnet explorer in browser tab
- [ ] Clear browser console for clean demo

### 5 Minutes Before

- [ ] Have transaction hash from test purchase ready to show in explorer
- [ ] Close unnecessary browser tabs
- [ ] Set terminal font size large enough for audience
- [ ] Open these files in VS Code (for code walkthrough):
  - `/backend/src/middleware/x402.ts`
  - `/backend/src/services/payment.ts`
  - `/backend/src/agent/tools/data.tools.ts`
  - `/frontend/src/components/DataMarketplace.tsx`
- [ ] Test screen share and audio

### Right Before

- [ ] Reload frontend to ensure fresh state
- [ ] Type "What data is available?" in chat but DON'T send yet (ready to demo)
- [ ] Have curl command ready to paste

---

## 🎥 Camera Positioning

### Recommended Layout

```
┌─────────────────────────────────────┐
│  Your Face (Small PIP)              │
│                                     │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │    Browser (70%)             │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │    Terminal (30%)            │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Focus Order

1. **Browser (Chat)** - 50% of demo time
2. **Browser (Data Products)** - 20%
3. **Terminal (curl)** - 20%
4. **VS Code (code)** - 10% (only if time permits)

---

## 💡 Pro Tips

### Energy & Pacing

- **Speak 20% slower** than normal - judges need to absorb info
- **Pause after each major point** - let it sink in
- **Use hand gestures** to emphasize Arc Network benefits
- **Smile when AI completes purchase** - show excitement

### Handling Issues

**If AI agent fails:**
- Don't panic, say: "Let me try that again" 
- Worst case, switch to curl demo (more impressive anyway)

**If backend is down:**
- Show code instead
- Walk through architecture
- Show .env.example to prove Arc integration

**If screen freezes:**
- Have backup recording ready
- Switch to slides with architecture diagrams

### Time Management

- ⏱️ **2:00 left?** Skip curl demo, go straight to "Why Arc"
- ⏱️ **1:00 left?** Jump to closing statement
- ⏱️ **4:00 used?** Perfect timing, take questions

---

## 🏆 Winning Points to Emphasize

1. **HTTP 402 is novel** - Most judges haven't seen this status code used
2. **AI autonomy** - Agent handles entire payment flow without human intervention
3. **Real DeFi data** - Not fake demo data, actual DeFiLlama integration
4. **Arc Network makes it possible** - Emphasize fees would kill this on Ethereum
5. **Production-ready code** - TypeScript, type-safe, error handling, caching

---

## 📊 Metrics to Mention

- **14 data products** across 4 categories
- **0.001-0.005 USDC** per request (emphasize how small)
- **Sub-second** transaction finality on Arc
- **1-hour** payment cache TTL
- **1M+ requests/day** potential scale

---

## 🎤 Opening Line Variations

**Technical audience:**
> "I built an HTTP 402 micropayment gateway for DeFi data using Arc Network and AI agents."

**Business audience:**
> "I'm solving the high-frequency data access problem for AI trading bots using USDC micropayments."

**Mixed audience:**
> "What if AI agents could buy the exact data they need, when they need it, for fractions of a cent? That's what I built on Arc Network."

---

**Remember: You're not just showing code, you're showing the FUTURE of AI-driven micropayments. Arc Network makes it real. Now go win this! 🚀**

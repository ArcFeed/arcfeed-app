# Arc Network DeFi Data Marketplace

**High-Frequency Data Marketplace for AI Agents** - Built on Arc Network using HTTP 402 micropayments

An AI-agentic payment gateway built on the Arc blockchain. Arcfeed enables autonomous AI agents to purchase real-time DeFi data using sub-second USDC micropayments on the Arc Economic OS.

## 🌟 Overview

This project transforms a wallet-integrated AI assistant into a **High-Frequency DeFi Data Marketplace** where AI agents can purchase real-time DeFi data using USDC micropayments on Arc Network.

### Key Features

- 🤖 **AI-Powered Data Access** - Chat with an AI agent to purchase and retrieve DeFi data
- 💰 **Micropayments** - Pay 0.001-0.005 USDC per data request using HTTP 402 protocol
- ⚡ **Arc Network** - Ultra-low fees and high-speed transactions
- 📊 **Real-Time DeFi Data** - Live yields, TVL, prices from DeFiLlama
- 🔒 **Secure Wallets** - Circle Developer-Controlled Wallets
- 🎨 **Professional Landing Page** - Next.js marketing site with interactive demos

## 📁 Monorepo Structure

This project uses npm workspaces for a clean monorepo architecture:

```
arcfeed-app/
├── packages/
│   ├── backend/          # Express API with Arc Network integration (coming soon)
│   ├── marketplace/      # React Vite data marketplace app (coming soon)
│   └── landing/          # Next.js landing page ✅
├── backend/              # Current backend location (to be moved)
├── frontend/             # Current frontend location (to be moved)
└── package.json          # Root workspace configuration
```

**Note:** We're transitioning to the packages/ structure. The backend and frontend folders will be moved to packages/ shortly.

## 🏗️ Architecture

### Technology Stack

**Landing Page:**
- Next.js 14.1.0
- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Static export for Vercel deployment

**Backend:**
- Express + TypeScript
- Circle Developer-Controlled Wallets SDK
- Groq AI (Llama 3.3) + LangChain.js
- Ethers.js for Arc Network integration
- DeFiLlama API for real-time data

**Marketplace Frontend:**
- React + TypeScript
- Vite build system
- Real-time chat interface

**Blockchain:**
- Arc Network Testnet
- Circle USDC programmable wallets

### HTTP 402 Payment Protocol

Endpoints are protected by the `requirePayment()` middleware:

1. Client requests data endpoint without payment → **402 Payment Required**
2. Response includes payment instructions and receiver address
3. Client sends USDC on Arc Network
4. Client retries request with `X-Payment-Tx` header containing transaction hash
5. Middleware verifies payment on Arc Network
6. Data is returned if payment is valid

## 🚀 Quick Start

### Landing Page (Available Now)

```bash
# Install dependencies
cd packages/landing
npm install

# Run development server
npm run dev
# Visit http://localhost:3002
```

### Full Monorepo (Coming Soon)

### Prerequisites

- Node.js 18+
- Circle Developer Account
- Groq API Key
- Arc Network wallet with testnet USDC

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Entity Secret
npm run generate:entity-secret

# Register Entity Secret with Circle
npm run register:entity-secret

# Create wallet set
npm run create:wallet-set

# Create wallets on Arc Network
npm run create:wallets
```

### 2. Environment Configuration

Create `backend/.env`:

```bash
# Circle API
CIRCLE_API_KEY=your_circle_api_key
CIRCLE_ENTITY_SECRET=generated_entity_secret

# AI Agent
GROQ_API_KEY=

# Security
API_KEY_SECRET=your_random_secret

# Wallets
PRIMARY_WALLET_ID=your_primary_wallet_id

# Arc Network
ARC_RPC_URL=https://rpc-testnet.arc.network
USDC_ADDRESS_ARC=0x... # Get from Arc docs
PAYMENT_RECEIVER_ADDRESS=0x... # Your marketplace wallet address

# Server
PORT=3001
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env
echo "VITE_API_KEY=your_api_key_secret" > .env
echo "VITE_API_BASE_URL=/api" >> .env
echo "VITE_PRIMARY_WALLET_ID=your_primary_wallet_id" >> .env
```

### 4. Run the Application

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Visit: `https://arcfeed-app.vercel.app/`

## 📊 Available Data Products

### Yield Data (0.002-0.003 USDC)
- **Aave Yields** - Real-time lending APYs
- **Compound Yields** - Supply/borrow rates
- **Uniswap Yields** - V3 pool fee APRs
- **Curve Yields** - Stable pool rewards

### TVL Data (0.002-0.003 USDC)
- **Protocol TVL** - Top 100 protocols
- **Chain TVL** - TVL by blockchain

### Analytics (0.005 USDC)
- **Best Yields** - Cross-protocol optimizer
- **Arbitrage Opportunities** - DEX price differences
- **Impermanent Loss** - LP position tracking

## 🤖 AI Agent Usage

### Chat Examples

```
User: "What data products are available?"
AI: [Lists all 14 data products with prices]

User: "Get me Aave yields"
AI: [Checks balance] → [Sends payment] → [Returns Aave data]

User: "Show me the best yield opportunities"
AI: [Purchases yield aggregator data] → [Displays top yields]

User: "What's my wallet balance?"
AI: [Shows USDC balance and token ID]
```

### Purchase Workflow

1. **Check Balance**: AI automatically checks wallet before purchasing
2. **Send Payment**: AI sends USDC micropayment on Arc Network
3. **Fetch Data**: AI retrieves fresh data from DeFiLlama
4. **Display Results**: AI formats and presents the data

## 🔌 API Endpoints

### Free Endpoints

```bash
GET /api/data/catalog              # List all data products
GET /api/data/catalog/search?q=    # Search products
GET /api/data/catalog/:id          # Get product details
```

### Paid Endpoints (HTTP 402 Protected)

```bash
GET /api/data/yields/aave          # 0.002 USDC
GET /api/data/yields/compound      # 0.002 USDC
GET /api/data/yields/uniswap       # 0.003 USDC
GET /api/data/yields/curve         # 0.002 USDC
GET /api/data/tvl/protocols        # 0.003 USDC
GET /api/data/tvl/chains           # 0.002 USDC
GET /api/data/analytics/best-yields # 0.005 USDC
```

### Making Paid Requests

```bash
# Step 1: Request without payment
curl -H "X-API-Key: YOUR_KEY" \
  http://localhost:3001/api/data/yields/aave

# Response: 402 Payment Required
{
  "error": "Payment Required",
  "payment": {
    "amount": "0.002",
    "currency": "USDC",
    "receiver": "0x...",
    "network": "ARC-TESTNET"
  }
}

# Step 2: Send USDC payment on Arc Network
# (Get transaction hash)

# Step 3: Retry with payment proof
curl -H "X-API-Key: YOUR_KEY" \
     -H "X-Payment-Tx: 0xYOUR_TX_HASH" \
  http://localhost:3001/api/data/yields/aave

# Response: Data returned
{
  "success": true,
  "data": [ /* Aave yields */ ],
  "timestamp": "2026-01-15T...",
  "source": "DeFiLlama"
}
```

## 💻 Frontend Integration

The frontend provides a TypeScript API client for easy integration:

### Using the Data API

```typescript
import { dataApi, walletApi } from './services/api';

// Browse free catalog
const products = await dataApi.getCatalog();
console.log(products); // All 14 data products

// Search products
const yieldProducts = await dataApi.searchProducts('yield');

// Purchase data (AI agent handles payment automatically via chat)
// Or manually with payment transaction hash:
try {
  const data = await dataApi.getAaveYields();
} catch (error) {
  if (error.message.includes('402')) {
    // Send payment, get TX hash, retry
    const txHash = await sendPayment('0x...', '0.002');
    const data = await dataApi.getAaveYields(txHash);
  }
}
```

### Using the Wallet API

```typescript
// Check balance
const balance = await walletApi.getBalance(PRIMARY_WALLET_ID);
console.log(`USDC Balance: ${balance[0].amount}`);

// Transfer tokens
await walletApi.transferTokens(
  PRIMARY_WALLET_ID,
  'usdc-token-id',
  '0xRecipientAddress',
  '0.002'
);

// List transactions
const txs = await walletApi.listTransactions(PRIMARY_WALLET_ID);
```

### Using the Chat API

```typescript
import { chatApi } from './services/api';

// Send message to AI agent
const response = await chatApi.sendMessage(
  'Get me Aave yields',
  PRIMARY_WALLET_ID
);

console.log(response.response); // AI response with data
```

## 🧪 Testing

### Test Data Purchase via Chat

1. Open chat interface
2. Type: "What data is available?"
3. Type: "Get me Aave yields"
4. AI will:
   - Check your balance
   - Send 0.002 USDC payment
   - Fetch and display Aave yield data
   - Show transaction confirmation

### Test Direct API Call

```bash
# Get data product catalog
curl -H "X-API-Key: YOUR_KEY" \
  http://localhost:3001/api/data/catalog | jq

# Test 402 response
curl -H "X-API-Key: YOUR_KEY" \
  http://localhost:3001/api/data/yields/aave

# Should return 402 with payment instructions
```

### Test Frontend API Client

```typescript
// In browser console or React component
import { dataApi } from './services/api';

// Free endpoint - should work
const catalog = await dataApi.getCatalog();
console.log('Products:', catalog.length);

// Paid endpoint - should get 402 error
try {
  await dataApi.getAaveYields();
} catch (error) {
  console.log('Expected 402 error:', error.message);
}
```

### Verify Payment Cache

```bash
# Make same request twice with same TX hash
# Second request should be instant (cached verification)
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── networks.ts          # Arc Network config
│   ├── middleware/
│   │   ├── auth.ts              # API key auth
│   │   └── x402.ts              # HTTP 402 payment middleware
│   ├── services/
│   │   ├── circleService.ts     # Arc Network integration
│   │   ├── payment.ts           # Payment verification & caching
│   │   └── defiData.ts          # DeFiLlama integration
│   ├── routes/
│   │   ├── data.routes.ts       # Data marketplace endpoints
│   │   ├── wallet.routes.ts     # Wallet management
│   │   └── chat.routes.ts       # AI chat
│   ├── agent/
│   │   ├── agent.ts             # AI agent core
│   │   └── tools/
│   │       ├── wallet.tools.ts  # Wallet tools
│   │       └── data.tools.ts    # Data purchase tools
│   ├── marketplace/
│   │   └── data.ts              # Data product catalog
│   └── index.ts                 # Server entry

frontend/
├── src/
│   ├── components/
│   │   ├── DataMarketplace.tsx  # Data products UI
│   │   ├── ChatInterface.tsx    # AI chat UI
│   │   ├── Sidebar.tsx          # Navigation
│   │   ├── WalletBalance.tsx    # Balance display
│   │   ├── WalletList.tsx       # Wallet management
│   │   ├── TransactionList.tsx  # TX history
│   │   └── TransferForm.tsx     # Token transfers
│   ├── services/
│   │   └── api.ts               # API client (dataApi, walletApi, chatApi)
│   └── App.tsx
```

## 🎯 Hackathon Demo Script

### 1. Show the Marketplace (30 seconds)
- Open Data Products tab
- Highlight 14 DeFi data feeds
- Point out micropayment prices (0.001-0.005 USDC)
- Show Arc Network badge

### 2. Demo AI Agent (2 minutes)
- Chat: "What data is available?"
- Chat: "Get me Aave yields"
- Show live payment + data retrieval
- Highlight transaction on Arc Network

### 3. Explain HTTP 402 (1 minute)
- Show Postman/curl making request
- Show 402 response with payment instructions
- Show retry with payment proof
- Data returned instantly

### 4. Arc Network Benefits (30 seconds)
- Ultra-low fees perfect for micropayments
- Fast confirmations for real-time data
- Future-ready for high-frequency trading bots

## 🔐 Security

- **API Key Authentication**: All endpoints require valid API key
- **Payment Verification**: Blockchain verification of USDC transfers
- **Payment Caching**: Prevents double-spending and re-verification
- **Circle Wallets**: Non-custodial, secure wallet management

## �️ Development

### Project Structure

**Backend Services:**
- `circleService.ts` - Arc Network integration, USDC transaction verification
- `payment.ts` - Payment verification with 1-hour caching
- `defiData.ts` - DeFiLlama API integration with 5-minute caching
- `walletManager.ts` - Circle wallet operations

**Backend Routes:**
- `data.routes.ts` - HTTP 402 protected data endpoints
- `wallet.routes.ts` - Wallet management (balance, transfers, transactions)
- `chat.routes.ts` - AI agent chat interface

**Frontend Services:**
- `api.ts` - Unified API client:
  - `dataApi` - Data marketplace methods (catalog, purchases)
  - `walletApi` - Wallet operations (balance, transfer, transactions)
  - `chatApi` - AI chat interface

**AI Agent:**
- `agent.ts` - Groq + LangChain.js integration
- `data.tools.ts` - Data purchase tools (browse, search, purchase)
- `wallet.tools.ts` - Wallet tools (balance, transfer, transactions)

### Adding New Data Products

1. **Add to catalog** (`/backend/src/marketplace/data.ts`):
```typescript
{
  id: 'new-product',
  name: 'New DeFi Data',
  price: 0.003,
  category: 'analytics',
  endpoint: '/data/new-endpoint'
}
```

2. **Create data fetcher** (`/backend/src/services/defiData.ts`):
```typescript
export async function getNewData(): Promise<any> {
  const response = await axios.get('https://api.source.com/data');
  return response.data;
}
```

3. **Add protected route** (`/backend/src/routes/data.routes.ts`):
```typescript
router.get('/new-endpoint', requirePayment('0.003'), async (req, res) => {
  const data = await defiDataService.getNewData();
  res.json({ success: true, data, timestamp: new Date().toISOString() });
});
```

4. **Add to frontend API** (`/frontend/src/services/api.ts`):
```typescript
getNewData: (paymentTx?: string) =>
  apiRequest<DeFiData>('/data/new-endpoint', {
    headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
  }),
```

### Environment Variables

**Backend:**
```bash
# Circle API (required)
CIRCLE_API_KEY=           # Your Circle API key
CIRCLE_ENTITY_SECRET=     # Generated entity secret

# AI Agent (required)
GROQ_API_KEY=            # Groq API key for Llama 3.3

# Security (required)
API_KEY_SECRET=          # Random secret for API authentication

# Wallets (required)
PRIMARY_WALLET_ID=       # Your primary wallet ID

# Arc Network (required)
ARC_RPC_URL=https://rpc-testnet.arc.network
USDC_ADDRESS_ARC=        # USDC contract on Arc (get from docs)
PAYMENT_RECEIVER_ADDRESS= # Your payment receiver wallet

# Optional
PORT=3001
```

**Frontend:**
```bash
VITE_API_KEY=            # Same as API_KEY_SECRET
VITE_API_BASE_URL=/api   # API base URL
VITE_PRIMARY_WALLET_ID=  # Primary wallet ID
```

## 📈 Future Enhancements

- **Subscription Model**: Monthly unlimited access
- **Volume Discounts**: Bulk data purchases
- **Custom Data Queries**: SQL-like data filtering
- **WebSocket Streams**: Real-time data push
- **API Keys per User**: Multi-tenant support
- **Historical Data**: Time-series DeFi metrics
- **Multi-Wallet Support**: Let users manage multiple wallets
- **Payment Channels**: State channels for high-frequency users
- **Data Caching**: Intelligent caching based on update frequency
- **Analytics Dashboard**: Usage metrics and cost tracking

## 🤝 Contributing

This is a hackathon project showcasing Arc Network's micropayment capabilities for AI-driven DeFi data access.

## 📄 License

MIT

## 🙏 Acknowledgments

- **Arc Network** - High-speed blockchain for micropayments
- **Circle** - Developer-Controlled Wallets
- **DeFiLlama** - DeFi data aggregation
- **Groq** - Fast AI inference

---

**Built for Arc Network Hackathon** 🚀

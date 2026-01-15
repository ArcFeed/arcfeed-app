import Link from 'next/link'
import AgentTerminal from '@/components/AgentTerminal'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold text-gradient">ArcFeed</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-primary transition">Home</Link>
              <Link href="/demo" className="text-primary font-semibold">Demo</Link>
              <Link href="/docs" className="text-slate-600 hover:text-primary transition">Docs</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition">Pricing</Link>
            </div>
            <a 
              href="http://localhost:3000" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              Launch App →
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Live Demo
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch an AI agent autonomously purchase DeFi data using HTTP 402 micropayments on Arc Network
            </p>
          </div>

          {/* Terminal Demo */}
          <div className="mb-16">
            <AgentTerminal />
          </div>

          {/* Technical Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Technical Breakdown
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Initial Request</h3>
                  <p className="text-slate-600 mb-4">
                    The AI agent makes a standard HTTP GET request to the data endpoint. The server checks for payment and responds with <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">402 Payment Required</span>.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`// Agent request
const response = await fetch('https://api.arcfeed.com/data/yields/aave')

// Server response
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": "Payment required",
  "amount": "0.002",
  "currency": "USDC",
  "receiver": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "network": "ARC-TESTNET",
  "chainId": 1234567890
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Execution</h3>
                  <p className="text-slate-600 mb-4">
                    The agent uses Circle's Developer-Controlled Wallets SDK to send the exact USDC amount to the specified address on Arc Network. The transaction confirms in under 1 second.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`// Agent sends payment
const txHash = await circle.transferUSDC({
  amount: "0.002",
  destinationAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  network: "ARC-TESTNET"
})

// Result
{
  "transactionHash": "0xabc123def456...",
  "status": "confirmed",
  "confirmationTime": "0.8s",
  "blockNumber": 1234567
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Delivery</h3>
                  <p className="text-slate-600 mb-4">
                    The agent retries the request with the transaction hash. The server verifies the payment on-chain using ethers.js, confirms it matches the required amount and receiver, then returns the fresh DeFi data.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`// Agent retry with proof
const response = await fetch('https://api.arcfeed.com/data/yields/aave', {
  headers: {
    'X-Payment-Tx': '0xabc123def456...'
  }
})

// Server verifies on-chain
const tx = await provider.getTransaction(txHash)
const parsedAmount = parseUSDCTransfer(tx.data)
if (parsedAmount === 0.002 && tx.to === receiver) {
  // Payment verified ✓
}

// Server response
HTTP/1.1 200 OK

{
  "protocol": "Aave V3",
  "chain": "Ethereum",
  "apy": 3.45,
  "tvl": 4200000000,
  "apyBase": 2.1,
  "apyReward": 1.35,
  "timestamp": "2026-01-20T12:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Try It Yourself */}
          <div className="bg-gradient-to-br from-arc-blue to-arc-purple rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try It Yourself
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Launch the full ArcFeed marketplace app and interact with the AI agent. Purchase real DeFi data with USDC micropayments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Launch Marketplace App
              </a>
              <Link 
                href="/docs"
                className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition"
              >
                Read API Documentation
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Arc Network?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">⚡</span>
                  <span><strong>Sub-second finality:</strong> Payments confirm almost instantly, enabling real-time data delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">💰</span>
                  <span><strong>Near-zero fees:</strong> Transaction costs are negligible, making $0.001 payments profitable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">🔗</span>
                  <span><strong>USDC native:</strong> Stable currency for predictable pricing without volatility</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Data Sources</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">📊</span>
                  <span><strong>DeFiLlama API:</strong> Real-time yield rates from 100+ protocols across 80+ chains</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">💎</span>
                  <span><strong>Protocol TVL:</strong> Total value locked data updated every 15 minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">🔄</span>
                  <span><strong>14 data products:</strong> From single protocols to complete market overviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import AgentTerminal from '@/components/AgentTerminal'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold text-gradient">ArcFeed</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Home</Link>
              <Link href="/demo" className="text-primary font-semibold">Demo</Link>
              <Link href="/docs" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Docs</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Pricing</Link>
            </div>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-xl font-medium hover:shadow-glow-md transition-all duration-300 hover:scale-105"
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
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Technical Breakdown
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Initial Request</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    The AI agent makes a standard HTTP GET request to the data endpoint. The server checks for payment and responds with <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded-lg">402 Payment Required</span>.
                  </p>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-700">
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
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Execution</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    The agent uses Circle's Developer-Controlled Wallets SDK to send the exact USDC amount to the specified address on Arc Network. The transaction confirms in under 1 second.
                  </p>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-700">
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
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Delivery</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    The agent retries the request with the transaction hash. The server verifies the payment on-chain using ethers.js, confirms it matches the required amount and receiver, then returns the fresh DeFi data.
                  </p>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-700">
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
          <div className="bg-gradient-to-br from-arc-blue via-purple-600 to-arc-purple rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Try It Yourself
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Launch the full ArcFeed marketplace app and interact with the AI agent. Purchase real DeFi data with USDC micropayments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Launch Marketplace App
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
                <Link
                  href="/docs"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Read API Documentation
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Arc Network?</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
                  <span className="text-purple-600 mr-3 text-2xl">⚡</span>
                  <span><strong className="text-slate-900">Sub-second finality:</strong> Payments confirm almost instantly, enabling real-time data delivery</span>
                </li>
                <li className="flex items-start p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
                  <span className="text-purple-600 mr-3 text-2xl">💰</span>
                  <span><strong className="text-slate-900">Near-zero fees:</strong> Transaction costs are negligible, making $0.001 payments profitable</span>
                </li>
                <li className="flex items-start p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
                  <span className="text-purple-600 mr-3 text-2xl">🔗</span>
                  <span><strong className="text-slate-900">USDC native:</strong> Stable currency for predictable pricing without volatility</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Data Sources</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                  <span className="text-blue-600 mr-3 text-2xl">📊</span>
                  <span><strong className="text-slate-900">DeFiLlama API:</strong> Real-time yield rates from 100+ protocols across 80+ chains</span>
                </li>
                <li className="flex items-start p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                  <span className="text-blue-600 mr-3 text-2xl">💎</span>
                  <span><strong className="text-slate-900">Protocol TVL:</strong> Total value locked data updated every 15 minutes</span>
                </li>
                <li className="flex items-start p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                  <span className="text-blue-600 mr-3 text-2xl">🔄</span>
                  <span><strong className="text-slate-900">14 data products:</strong> From single protocols to complete market overviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function DocsPage() {
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
              <Link href="/demo" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Demo</Link>
              <Link href="/docs" className="text-primary font-semibold">Docs</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Pricing</Link>
            </div>
            <a
              href="https://arcfeed-app-di19.vercel.app/"
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-slate-600">
              Everything you need to integrate ArcFeed's micropayment-gated DeFi data API
            </p>
          </div>

          {/* Quick Start */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Quick Start</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Make Initial Request</h3>
                <p className="text-slate-600 mb-3">
                  Request any data endpoint. You'll receive a <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">402 Payment Required</span> response with payment instructions.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`curl https://arcfeed-app.vercel.app/api/data/yields/aave

# Response:
HTTP/1.1 402 Payment Required
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

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Send Payment</h3>
                <p className="text-slate-600 mb-3">
                  Transfer the exact USDC amount to the receiver address on Arc Network. Use Circle's SDK or any wallet that supports Arc Network.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`// Using Circle SDK (TypeScript)
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets'

const client = initiateDeveloperControlledWalletsClient({
  apiKey: 'YOUR_CIRCLE_API_KEY',
  entitySecret: 'YOUR_ENTITY_SECRET'
})

const response = await client.createTransaction({
  walletId: 'your-wallet-id',
  blockchain: 'ARC-TESTNET',
  tokenAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // USDC
  destinationAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  amounts: ['0.002']
})

const txHash = response.data.transactionHash`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Retry with Payment Proof</h3>
                <p className="text-slate-600 mb-3">
                  Retry the same endpoint with the transaction hash in the <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">X-Payment-Tx</span> header.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`curl https://arcfeed-app.vercel.app/api/data/yields/aave \\
  -H "X-Payment-Tx: 0xabc123def456..."

# Response:
HTTP/1.1 200 OK
{
  "protocol": "Aave V3",
  "chain": "Ethereum",
  "symbol": "USDC",
  "apy": 3.45,
  "apyBase": 2.1,
  "apyReward": 1.35,
  "tvlUsd": 1200000000,
  "timestamp": "2026-01-20T12:00:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Available Endpoints</h2>
            
            <div className="space-y-8">
              {/* Yields */}
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Yield Data</h3>
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/yields/:protocol</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.002</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get current yield rates for a specific protocol (aave, compound, curve, etc.)
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/yields/aave</code>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/yields/top/:count</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.005</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get top N highest-yielding opportunities across all protocols
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/yields/top/10</code>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/yields/stablecoin</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.003</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get all stablecoin yield opportunities (USDC, USDT, DAI, etc.)
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/yields/stablecoin</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* TVL */}
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">TVL Data</h3>
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/tvl/protocol/:name</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.002</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get total value locked for a specific protocol
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/tvl/protocol/uniswap</code>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/tvl/chain/:name</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.002</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get TVL breakdown for a specific blockchain
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/tvl/chain/ethereum</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pools */}
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Pool Data</h3>
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">GET</span>
                        <code className="text-sm">/api/data/pools/:protocol</code>
                      </div>
                      <span className="text-sm font-mono text-purple-600">$0.003</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      Get liquidity pool stats for Uniswap, Curve, etc.
                    </p>
                    <div className="bg-slate-50 rounded p-3 text-xs">
                      <strong>Example:</strong> <code>/api/data/pools/uniswap-v3</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Handling */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Error Handling</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex items-center mb-2">
                  <strong className="text-yellow-900">402 Payment Required</strong>
                </div>
                <p className="text-yellow-800 text-sm mb-2">
                  No payment transaction provided or found. Send USDC to the specified address and retry.
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono">
                  {`{ "error": "Payment required", "amount": "0.002", ... }`}
                </div>
              </div>

              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <div className="flex items-center mb-2">
                  <strong className="text-red-900">400 Invalid Payment</strong>
                </div>
                <p className="text-red-800 text-sm mb-2">
                  Payment transaction found but amount is incorrect or sent to wrong address.
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono">
                  {`{ "error": "Invalid payment amount", "expected": "0.002", "received": "0.001" }`}
                </div>
              </div>

              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex items-center mb-2">
                  <strong className="text-blue-900">404 Not Found</strong>
                </div>
                <p className="text-blue-800 text-sm mb-2">
                  Data product doesn't exist. Check the endpoint path and protocol name.
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono">
                  {`{ "error": "Data product not found" }`}
                </div>
              </div>

              <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                <div className="flex items-center mb-2">
                  <strong className="text-purple-900">500 Server Error</strong>
                </div>
                <p className="text-purple-800 text-sm mb-2">
                  DeFiLlama API error or server issue. Retry after a few seconds. Payment is cached for 1 hour.
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono">
                  {`{ "error": "Failed to fetch data from upstream" }`}
                </div>
              </div>
            </div>
          </div>

          {/* Network Info */}
          <div className="bg-gradient-to-br from-arc-blue to-arc-purple rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-6">Network Configuration</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-100 mb-2">Arc Network Testnet</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Chain ID:</span>
                    <code className="font-mono">1234567890</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">RPC URL:</span>
                    <code className="font-mono text-xs">https://rpc-testnet.arc.network</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Network:</span>
                    <code className="font-mono">ARC-TESTNET</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-purple-100 mb-2">Payment Receiver</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Address:</span>
                    <code className="font-mono text-xs">0x742d35...f0bEb</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Currency:</span>
                    <code className="font-mono">USDC</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Token:</span>
                    <code className="font-mono text-xs">0x1c7D4B...379C7238</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Additional Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a 
                href="https://github.com/ArcFeed/arcfeed-app" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div className="text-3xl">📦</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">GitHub Repository</h3>
                  <p className="text-sm text-slate-600">
                    Full source code, examples, and integration guides
                  </p>
                </div>
              </a>

              <Link 
                href="/demo"
                className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div className="text-3xl">🎮</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Live Demo</h3>
                  <p className="text-sm text-slate-600">
                    Interactive terminal showing the full payment flow
                  </p>
                </div>
              </Link>

              <a 
                href="https://arc.network" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Arc Network Docs</h3>
                  <p className="text-sm text-slate-600">
                    Learn about Arc Network's fast, low-cost blockchain
                  </p>
                </div>
              </a>

              <a 
                href="https://defillama.com/docs/api" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">DeFiLlama API</h3>
                  <p className="text-sm text-slate-600">
                    Upstream data source documentation
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

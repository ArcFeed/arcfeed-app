import Link from 'next/link'
import AgentTerminal from '@/components/AgentTerminal'
import PricingWidget from '@/components/PricingWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold text-gradient">ArcFeed</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/demo" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Demo</Link>
              <Link href="/docs" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Docs</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">Pricing</Link>
              <a href="https://github.com/ArcFeed/arcfeed-app" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-all duration-200 font-medium">GitHub</a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-5 py-2.5 rounded-full mb-8 animate-float shadow-lg border border-purple-200/50">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-glow shadow-glow-sm"></span>
            <span className="text-sm font-semibold">Built on Arc Network</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            The Agentic
            <br />
            <span className="text-gradient">Data Economy</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            High-frequency DeFi data marketplace where AI agents pay <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">$0.001-$0.005</span> per query.
            <br />
            Built with HTTP 402 micropayments on Arc Network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-2xl font-semibold text-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                Try Live Demo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            <Link
              href="/docs"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold text-lg hover:border-primary hover:bg-white transition-all duration-300 hover:shadow-lg"
            >
              Read the Docs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">14</div>
              <div className="text-sm font-medium text-slate-600">Data Products</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">$0.001</div>
              <div className="text-sm font-medium text-slate-600">Min Price</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">&lt;1s</div>
              <div className="text-sm font-medium text-slate-600">Confirmation</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">HTTP 402</div>
              <div className="text-sm font-medium text-slate-600">Protocol</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Terminal Demo */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              See it in Action
            </h2>
            <p className="text-xl text-slate-600">
              Watch AI agents purchase DeFi data with Arc Network micropayments
            </p>
          </div>
          <AgentTerminal />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Three simple steps from request to data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Request Data</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                AI agent calls API endpoint. Server responds with <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded-lg">402 Payment Required</span> and payment instructions.
              </p>
              <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-green-400 p-4 rounded-xl text-xs overflow-x-auto shadow-inner border border-slate-700">
{`GET /api/data/yields/aave
→ 402 Payment Required
{
  "amount": "0.002 USDC",
  "receiver": "0x...",
  "network": "ARC-TESTNET"
}`}
              </pre>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Payment</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Agent sends USDC micropayment on Arc Network. Transaction confirms in under 1 second with minimal fees.
              </p>
              <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-green-400 p-4 rounded-xl text-xs overflow-x-auto shadow-inner border border-slate-700">
{`Circle.transferUSDC({
  amount: "0.002",
  to: "0x...",
  network: "ARC-TESTNET"
})
→ txHash: 0xabc123...`}
              </pre>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Data</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Retry request with transaction hash. Server verifies payment and returns fresh DeFi data from DeFiLlama.
              </p>
              <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-green-400 p-4 rounded-xl text-xs overflow-x-auto shadow-inner border border-slate-700">
{`GET /api/data/yields/aave
X-Payment-Tx: 0xabc123...
→ 200 OK
{
  "data": [...yields...]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Micropayments vs. SaaS
            </h2>
            <p className="text-xl text-slate-300">
              Why pay $500/month when you only need 100 queries?
            </p>
          </div>
          <PricingWidget />
        </div>
      </section>

      {/* Why Arc Network */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-arc-blue via-purple-600 to-arc-purple rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Arc Network?
                </h2>
                <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                  Traditional blockchains eat your micropayment profits in gas fees. Arc Network makes $0.001 payments economically viable.
                </p>
                <div className="space-y-5">
                  <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">✓</div>
                    <div>
                      <div className="font-bold text-lg">Sub-second finality</div>
                      <div className="text-purple-100">Real-time data requires real-time payments</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">✓</div>
                    <div>
                      <div className="font-bold text-lg">Near-zero fees</div>
                      <div className="text-purple-100">Keep 99%+ of your micropayment revenue</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">✓</div>
                    <div>
                      <div className="font-bold text-lg">High throughput</div>
                      <div className="text-purple-100">Scale to thousands of requests per second</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">$0.001</div>
                  <div className="text-purple-100 text-lg">Profitable on Arc</div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-purple-100">Data cost</span>
                    <span className="font-mono font-bold">$0.0001</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-purple-100">Arc Network fee</span>
                    <span className="font-mono font-bold">$0.00001</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-purple-100">Platform margin</span>
                    <span className="font-mono font-bold">$0.00089</span>
                  </div>
                  <div className="border-t border-white/30 pt-4 mt-4 flex justify-between font-bold text-lg p-3 bg-white/10 rounded-xl">
                    <span>Total</span>
                    <span className="font-mono">$0.001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-3xl p-12 text-center border border-slate-200 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the agentic data economy. Start accepting micropayments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-2xl font-semibold text-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Try the Demo
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
              <a
                href="https://github.com/ArcFeed/arcfeed-app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-2xl font-semibold text-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <span className="text-xl font-bold">ArcFeed</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The agentic data economy, powered by Arc Network.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/demo" className="hover:text-purple-400 transition-colors duration-200">Demo</Link></li>
                <li><Link href="/docs" className="hover:text-purple-400 transition-colors duration-200">Documentation</Link></li>
                <li><Link href="/pricing" className="hover:text-purple-400 transition-colors duration-200">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://github.com/ArcFeed/arcfeed-app" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200">GitHub</a></li>
                <li><a href="https://arc.network" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200">Arc Network</a></li>
                <li><a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200">DeFiLlama</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200">Twitter</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>Built for Arc Network Hackathon 2026 🚀</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
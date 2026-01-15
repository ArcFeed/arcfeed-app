import Link from 'next/link'
import AgentTerminal from '@/components/AgentTerminal'
import PricingWidget from '@/components/PricingWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold text-gradient">ArcFeed</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/demo" className="text-slate-600 hover:text-primary transition">Demo</Link>
              <Link href="/docs" className="text-slate-600 hover:text-primary transition">Docs</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition">Pricing</Link>
              <a href="https://github.com/ArcFeed/arcfeed-app" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition">GitHub</a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6 animate-float">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-glow"></span>
            <span className="text-sm font-medium">Built on Arc Network</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            The Agentic
            <br />
            <span className="text-gradient">Data Economy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12">
            High-frequency DeFi data marketplace where AI agents pay <span className="font-semibold text-primary">$0.001-$0.005</span> per query.
            <br />
            Built with HTTP 402 micropayments on Arc Network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-xl font-semibold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Try Live Demo
            </a>
            <Link 
              href="/docs"
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:border-primary transition"
            >
              Read the Docs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">14</div>
              <div className="text-sm text-slate-600 mt-1">Data Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">$0.001</div>
              <div className="text-sm text-slate-600 mt-1">Min Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">&lt;1s</div>
              <div className="text-sm text-slate-600 mt-1">Confirmation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">HTTP 402</div>
              <div className="text-sm text-slate-600 mt-1">Protocol</div>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Request Data</h3>
              <p className="text-slate-600 mb-4">
                AI agent calls API endpoint. Server responds with <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">402 Payment Required</span> and payment instructions.
              </p>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`GET /api/data/yields/aave
→ 402 Payment Required
{
  "amount": "0.002 USDC",
  "receiver": "0x...",
  "network": "ARC-TESTNET"
}`}
              </pre>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Payment</h3>
              <p className="text-slate-600 mb-4">
                Agent sends USDC micropayment on Arc Network. Transaction confirms in under 1 second with minimal fees.
              </p>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`Circle.transferUSDC({
  amount: "0.002",
  to: "0x...",
  network: "ARC-TESTNET"
})
→ txHash: 0xabc123...`}
              </pre>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Data</h3>
              <p className="text-slate-600 mb-4">
                Retry request with transaction hash. Server verifies payment and returns fresh DeFi data from DeFiLlama.
              </p>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
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
          <div className="bg-gradient-to-br from-arc-blue to-arc-purple rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Arc Network?
                </h2>
                <p className="text-xl text-purple-100 mb-8">
                  Traditional blockchains eat your micropayment profits in gas fees. Arc Network makes $0.001 payments economically viable.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                    <div>
                      <div className="font-semibold">Sub-second finality</div>
                      <div className="text-purple-100">Real-time data requires real-time payments</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                    <div>
                      <div className="font-semibold">Near-zero fees</div>
                      <div className="text-purple-100">Keep 99%+ of your micropayment revenue</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                    <div>
                      <div className="font-semibold">High throughput</div>
                      <div className="text-purple-100">Scale to thousands of requests per second</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold">$0.001</div>
                  <div className="text-purple-100 mt-2">Profitable on Arc</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-100">Data cost</span>
                    <span className="font-mono">$0.0001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Arc Network fee</span>
                    <span className="font-mono">$0.00001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Platform margin</span>
                    <span className="font-mono">$0.00089</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-bold">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join the agentic data economy. Start accepting micropayments today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-arc-blue to-arc-purple text-white rounded-xl font-semibold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Try the Demo
            </a>
            <a 
              href="https://github.com/ArcFeed/arcfeed-app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:border-primary transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <span className="text-xl font-bold">ArcFeed</span>
              </div>
              <p className="text-slate-400 text-sm">
                The agentic data economy, powered by Arc Network.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
                <li><Link href="/docs" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://github.com/ArcFeed/arcfeed-app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li>
                <li><a href="https://arc.network" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Arc Network</a></li>
                <li><a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">DeFiLlama</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Discord</a></li>
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
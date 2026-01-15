import Link from 'next/link'
import PricingWidget from '@/components/PricingWidget'

export default function PricingPage() {
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
              <Link href="/demo" className="text-slate-600 hover:text-primary transition">Demo</Link>
              <Link href="/docs" className="text-slate-600 hover:text-primary transition">Docs</Link>
              <Link href="/pricing" className="text-primary font-semibold">Pricing</Link>
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
              Simple, Fair Pricing
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pay only for the data you use. No subscriptions, no tiers, no hidden fees.
            </p>
          </div>

          {/* Pricing Calculator */}
          <div className="mb-16">
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
              <PricingWidget />
            </div>
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Data Product Pricing
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-slate-900">Data Product</th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-900">Description</th>
                      <th className="text-right py-4 px-4 font-semibold text-slate-900">Price (USDC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Aave Yields</td>
                      <td className="py-4 px-4 text-slate-600">Current APY rates for Aave V3 lending pools</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Compound Yields</td>
                      <td className="py-4 px-4 text-slate-600">Real-time yield data from Compound Finance</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Uniswap V3 Pools</td>
                      <td className="py-4 px-4 text-slate-600">Liquidity pool stats and fee APRs</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.003</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Curve Pool Stats</td>
                      <td className="py-4 px-4 text-slate-600">Stablecoin pool yields and volumes</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Top 10 Yields</td>
                      <td className="py-4 px-4 text-slate-600">Highest yielding opportunities across all protocols</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.005</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Protocol TVL</td>
                      <td className="py-4 px-4 text-slate-600">Total value locked for major DeFi protocols</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Chain TVL</td>
                      <td className="py-4 px-4 text-slate-600">TVL breakdown by blockchain network</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">Stablecoin Yields</td>
                      <td className="py-4 px-4 text-slate-600">USDC, USDT, DAI lending rates across platforms</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.003</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">ETH Staking Yields</td>
                      <td className="py-4 px-4 text-slate-600">Liquid staking APRs from Lido, Rocket Pool, etc.</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.002</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">All Yields Snapshot</td>
                      <td className="py-4 px-4 text-slate-600">Complete overview of all available yield opportunities</td>
                      <td className="py-4 px-4 text-right font-mono text-purple-600">$0.005</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  How does payment work?
                </h3>
                <p className="text-slate-600">
                  When you request data, the API responds with <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">402 Payment Required</span> and payment instructions. Send the specified USDC amount on Arc Network, then retry your request with the transaction hash in the <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">X-Payment-Tx</span> header.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Why is it cheaper than traditional APIs?
                </h3>
                <p className="text-slate-600">
                  Traditional API providers charge $99-$499/month to cover infrastructure and support costs. We use blockchain for authentication and payment processing, eliminating those overhead costs. You pay only for the actual data retrieval cost plus a small margin.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  What if I make a lot of requests?
                </h3>
                <p className="text-slate-600">
                  There are no volume tiers or discounts—but you also don't get price-gouged. $0.002 per query stays $0.002 whether you make 10 requests or 10,000. For high-frequency use cases, consider caching responses or batching requests to minimize costs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  How fresh is the data?
                </h3>
                <p className="text-slate-600">
                  All data comes directly from DeFiLlama's API, which updates every 15 minutes for most protocols. When you pay for data, you get the absolute latest available snapshot—no stale cached data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  What happens if my payment fails?
                </h3>
                <p className="text-slate-600">
                  If the payment transaction fails or doesn't include the correct amount, the server will reject it and return an error. Your funds aren't lost—they're simply not sent. Once you fix the issue, retry with a new payment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Can I get a refund?
                </h3>
                <p className="text-slate-600">
                  Payments are final and non-refundable. Since data is delivered instantly and can't be "returned," we can't offer refunds. However, at $0.001-$0.005 per request, the financial risk is minimal.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              No signup required. No credit card needed. Just send USDC and get data.
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
              <Link 
                href="/docs"
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:border-primary transition"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

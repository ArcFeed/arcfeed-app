'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PricingTier {
  name: string
  price: string
  queries: number
  costPerQuery: number
  features: string[]
  type: 'traditional' | 'arcfeed'
}

const traditionalTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    queries: 100,
    costPerQuery: 0,
    type: 'traditional',
    features: ['100 requests/month', 'Rate limited', 'No support', 'Public data only']
  },
  {
    name: 'Pro',
    price: '$99',
    queries: 10000,
    costPerQuery: 0.0099,
    type: 'traditional',
    features: ['10K requests/month', 'Standard rate limits', 'Email support', 'All endpoints']
  },
  {
    name: 'Enterprise',
    price: '$499',
    queries: 100000,
    costPerQuery: 0.00499,
    type: 'traditional',
    features: ['100K requests/month', 'Higher limits', 'Priority support', 'SLA included']
  }
]

export default function PricingWidget() {
  const [monthlyQueries, setMonthlyQueries] = useState(1000)

  // ArcFeed pricing: $0.002 per query
  const arcfeedCostPerQuery = 0.002
  const arcfeedMonthly = monthlyQueries * arcfeedCostPerQuery

  // Traditional SaaS: Find appropriate tier
  const traditionalTier = monthlyQueries <= 100
    ? traditionalTiers[0]
    : monthlyQueries <= 10000
    ? traditionalTiers[1]
    : traditionalTiers[2]

  const traditionalMonthly = parseFloat(traditionalTier.price.replace('$', ''))
  const savings = traditionalMonthly - arcfeedMonthly
  const savingsPercent = traditionalMonthly > 0 ? ((savings / traditionalMonthly) * 100).toFixed(0) : 0

  return (
    <div className="max-w-5xl mx-auto">
      {/* Interactive Calculator */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Calculate Your Savings</h3>
          <p className="text-slate-300">
            Slide to see how much you save with pay-per-use pricing
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-medium">Monthly API Calls</label>
            <div className="text-3xl font-bold text-purple-200">
              {monthlyQueries.toLocaleString()}
            </div>
          </div>
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={monthlyQueries}
            onChange={(e) => setMonthlyQueries(Number(e.target.value))}
            className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #667eea 0%, #764ba2 ${((monthlyQueries - 100) / (100000 - 100)) * 100}%, rgba(255,255,255,0.2) ${((monthlyQueries - 100) / (100000 - 100)) * 100}%)`
            }}
          />
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>100</span>
            <span>50K</span>
            <span>100K</span>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional SaaS */}
          <motion.div
            key={traditionalTier.name}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="text-sm text-slate-400 mb-2">Traditional SaaS</div>
            <div className="text-3xl font-bold mb-1">{traditionalTier.price}<span className="text-lg text-slate-400">/mo</span></div>
            <div className="text-sm text-slate-400 mb-4">{traditionalTier.name} Tier</div>
            <div className="space-y-2 text-sm">
              {traditionalTier.features.map((feature, i) => (
                <div key={i} className="flex items-center text-slate-300">
                  <span className="mr-2">•</span> {feature}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
              ${traditionalTier.costPerQuery.toFixed(4)} per query
            </div>
          </motion.div>

          {/* ArcFeed */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl p-6 border-2 border-purple-400 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              SAVE {savingsPercent}%
            </div>
            <div className="text-sm text-purple-200 mb-2">ArcFeed (Pay-Per-Use)</div>
            <div className="text-3xl font-bold mb-1">
              ${arcfeedMonthly.toFixed(2)}<span className="text-lg text-slate-300">/mo</span>
            </div>
            <div className="text-sm text-purple-200 mb-4">No tiers, no limits</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-white">
                <span className="mr-2">✓</span> Pay only for what you use
              </div>
              <div className="flex items-center text-white">
                <span className="mr-2">✓</span> No monthly commitments
              </div>
              <div className="flex items-center text-white">
                <span className="mr-2">✓</span> Real-time payments
              </div>
              <div className="flex items-center text-white">
                <span className="mr-2">✓</span> All 14 data products
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-400/30 text-xs text-purple-100">
              ${arcfeedCostPerQuery.toFixed(4)} per query
            </div>
          </motion.div>
        </div>

        {/* Savings Highlight */}
        {savings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-green-500/20 border border-green-400 rounded-xl p-6 text-center"
          >
            <div className="text-2xl font-bold mb-2">
              You save ${savings.toFixed(2)}/month
            </div>
            <div className="text-green-100">
              That's ${(savings * 12).toFixed(2)} per year with ArcFeed's micropayment model
            </div>
          </motion.div>
        )}
      </div>

      {/* Why Micropayments */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-4xl mb-3">📊</div>
          <h4 className="font-semibold text-lg mb-2">Variable Usage</h4>
          <p className="text-slate-300 text-sm">
            AI agents don't make the same number of requests every month. Why pay a fixed price?
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h4 className="font-semibold text-lg mb-2">No Vendor Lock-in</h4>
          <p className="text-slate-300 text-sm">
            No contracts, no subscriptions. Switch providers instantly without losing money.
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">💎</div>
          <h4 className="font-semibold text-lg mb-2">Pay for Quality</h4>
          <p className="text-slate-300 text-sm">
            Each query is verified on-chain. You pay for data you actually receive.
          </p>
        </div>
      </div>
    </div>
  )
}

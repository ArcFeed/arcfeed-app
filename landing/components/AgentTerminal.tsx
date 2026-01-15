'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LogEntry {
  id: number
  timestamp: string
  type: 'info' | 'success' | 'payment' | 'data'
  message: string
}

export default function AgentTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const simulateAgentFlow = async () => {
    setLogs([])
    setIsRunning(true)

    const steps: Omit<LogEntry, 'id' | 'timestamp'>[] = [
      { type: 'info', message: '🤖 AI Agent: Requesting Aave yield data...' },
      { type: 'info', message: 'GET /api/data/yields/aave' },
      { type: 'payment', message: '← 402 Payment Required' },
      { type: 'payment', message: '  Amount: 0.002 USDC' },
      { type: 'payment', message: '  Receiver: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
      { type: 'payment', message: '  Network: ARC-TESTNET' },
      { type: 'info', message: '' },
      { type: 'info', message: '💰 Initiating USDC transfer on Arc Network...' },
      { type: 'success', message: '✓ Transaction sent: 0xabc123...def456' },
      { type: 'success', message: '✓ Confirmed in 0.8s' },
      { type: 'info', message: '' },
      { type: 'info', message: '🔄 Retrying request with payment proof...' },
      { type: 'info', message: 'GET /api/data/yields/aave' },
      { type: 'info', message: 'X-Payment-Tx: 0xabc123...def456' },
      { type: 'success', message: '← 200 OK' },
      { type: 'data', message: '📊 Received Aave yield data:' },
      { type: 'data', message: '  {' },
      { type: 'data', message: '    "protocol": "Aave V3",' },
      { type: 'data', message: '    "chain": "Ethereum",' },
      { type: 'data', message: '    "apy": 3.45,' },
      { type: 'data', message: '    "tvl": 4200000000,' },
      { type: 'data', message: '    "timestamp": "2026-01-20T12:00:00Z"' },
      { type: 'data', message: '  }' },
      { type: 'info', message: '' },
      { type: 'success', message: '✅ Data purchased for $0.002 • Total time: 1.2s' },
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const entry: LogEntry = {
        id: i,
        timestamp: new Date().toLocaleTimeString(),
        ...steps[i]
      }
      setLogs(prev => [...prev, entry])
    }

    setIsRunning(false)
  }

  useEffect(() => {
    // Auto-run on mount
    simulateAgentFlow()
  }, [])

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-400'
      case 'payment': return 'text-yellow-400'
      case 'data': return 'text-blue-400'
      default: return 'text-gray-300'
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Terminal Header */}
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-slate-400 text-sm font-mono">agent-terminal</span>
          </div>
          <button
            onClick={simulateAgentFlow}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              isRunning
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            {isRunning ? 'Running...' : '▶ Run Demo'}
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-6 h-[500px] overflow-y-auto font-mono text-sm">
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-1 ${getLogColor(log.type)}`}
              >
                <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                {log.message}
              </motion.div>
            ))}
          </AnimatePresence>
          {isRunning && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-green-400"
            >
              ▋
            </motion.div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700">
          <div>HTTP 402 Payment Protocol Demo</div>
          <div className="flex items-center space-x-4">
            <span>Arc Network Testnet</span>
            <span>•</span>
            <span>USDC Payments</span>
          </div>
        </div>
      </div>

      {/* Info Cards Below Terminal */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-slate-900 mb-2">Fast Payments</h3>
          <p className="text-sm text-slate-600">
            Arc Network confirms USDC transfers in under 1 second
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="font-semibold text-slate-900 mb-2">Micropayments</h3>
          <p className="text-sm text-slate-600">
            Pay $0.001-$0.005 per API call. No monthly subscriptions.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-slate-900 mb-2">Trustless</h3>
          <p className="text-sm text-slate-600">
            Blockchain verification. No API keys or authentication needed.
          </p>
        </div>
      </div>
    </div>
  )
}

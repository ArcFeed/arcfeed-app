import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ArcFeed - The Agentic Data Economy',
  description: 'High-frequency DeFi data marketplace for AI agents. Pay-per-query with USDC micropayments on Arc Network.',
  keywords: ['DeFi', 'AI agents', 'Arc Network', 'micropayments', 'data marketplace', 'HTTP 402'],
  openGraph: {
    title: 'ArcFeed - The Agentic Data Economy',
    description: 'High-frequency DeFi data marketplace for AI agents',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

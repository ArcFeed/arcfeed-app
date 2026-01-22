/**
 * Demo Routes for HTTP 402 Presentation
 *
 * These endpoints simulate the HTTP 402 payment flow for demo purposes.
 * No real payments are required - use the demo TX hash to bypass verification.
 */

import { Router, Request, Response } from 'express';
import { apiKeyAuth } from '../middleware/auth';
import { PAYMENT_RECEIVER_ADDRESS } from '../config/networks';

const router = Router();

// Demo transaction hash that bypasses payment verification
const DEMO_TX_HASH = 'demo-payment-0x1234567890abcdef';

// Mock Aave yields data for demo
const MOCK_AAVE_DATA = {
  success: true,
  data: [
    { asset: 'USDC', chain: 'Ethereum', supplyAPY: 4.52, borrowAPY: 5.89, totalSupply: 2847000000, utilizationRate: 78.3 },
    { asset: 'WETH', chain: 'Ethereum', supplyAPY: 2.14, borrowAPY: 3.45, totalSupply: 1523000000, utilizationRate: 65.2 },
    { asset: 'WBTC', chain: 'Ethereum', supplyAPY: 0.89, borrowAPY: 2.12, totalSupply: 892000000, utilizationRate: 42.1 },
    { asset: 'DAI', chain: 'Ethereum', supplyAPY: 5.23, borrowAPY: 6.78, totalSupply: 1247000000, utilizationRate: 81.5 },
    { asset: 'USDT', chain: 'Ethereum', supplyAPY: 4.87, borrowAPY: 6.15, totalSupply: 1893000000, utilizationRate: 75.8 },
  ],
  timestamp: new Date().toISOString(),
  source: 'DeFiLlama (Demo)',
  paymentVerified: true,
  transactionHash: DEMO_TX_HASH,
};

/**
 * GET /api/demo/402-flow
 *
 * Demonstrates HTTP 402 Payment Required protocol:
 *
 * Step 1: Request without X-Payment-Tx header → Returns 402 with payment instructions
 * Step 2: Request with X-Payment-Tx: demo-payment-0x1234567890abcdef → Returns data
 *
 * Demo commands:
 *
 * # Show 402 response:
 * curl -s -H "X-API-Key: YOUR_KEY" http://localhost:3001/api/demo/402-flow | jq
 *
 * # Show successful payment:
 * curl -s -H "X-API-Key: YOUR_KEY" -H "X-Payment-Tx: demo-payment-0x1234567890abcdef" http://localhost:3001/api/demo/402-flow | jq
 */
router.get('/402-flow', apiKeyAuth, async (req: Request, res: Response) => {
  const txHash = req.headers['x-payment-tx'] as string;
  const requiredAmount = 0.002;

  // If no payment TX or wrong demo TX, return 402
  if (!txHash) {
    return res.status(402).json({
      error: 'Payment Required',
      code: 402,
      message: 'Missing payment transaction',
      payment: {
        required: true,
        amount: requiredAmount.toString(),
        currency: 'USDC',
        network: 'ARC-TESTNET',
        blockchain: 'Arc Network',
        receiver: PAYMENT_RECEIVER_ADDRESS || '0xDemoReceiverAddress',
        instructions: {
          step1: `Send ${requiredAmount} USDC to receiver on Arc Network`,
          step2: 'Include the transaction hash in X-Payment-Tx header',
          step3: 'Retry the request with the payment proof',
        },
        demo: {
          note: 'For demo purposes, use the following TX hash:',
          demoTxHash: DEMO_TX_HASH,
          exampleCurl: `curl -H "X-API-Key: YOUR_KEY" -H "X-Payment-Tx: ${DEMO_TX_HASH}" ${req.protocol}://${req.get('host')}${req.originalUrl}`,
        },
      },
    });
  }

  // Verify demo TX hash
  if (txHash !== DEMO_TX_HASH) {
    return res.status(402).json({
      error: 'Payment Required',
      code: 402,
      message: 'Invalid payment transaction. For demo, use: ' + DEMO_TX_HASH,
      payment: {
        required: true,
        amount: requiredAmount.toString(),
        currency: 'USDC',
        demo: {
          correctTxHash: DEMO_TX_HASH,
        },
      },
    });
  }

  // Payment verified! Return data
  return res.json({
    ...MOCK_AAVE_DATA,
    timestamp: new Date().toISOString(),
    _demo: {
      message: 'This is demo data showing the HTTP 402 payment flow',
      realEndpoint: '/api/data/yields/aave',
    },
  });
});

/**
 * GET /api/demo/info
 *
 * Returns information about available demo endpoints and how to use them
 */
router.get('/info', async (req: Request, res: Response) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  res.json({
    title: 'ArcFeed HTTP 402 Demo Endpoints',
    description: 'These endpoints demonstrate the HTTP 402 micropayment protocol without requiring real payments.',
    demoTxHash: DEMO_TX_HASH,
    endpoints: {
      '402-flow': {
        url: `${baseUrl}/api/demo/402-flow`,
        description: 'Demonstrates the full HTTP 402 payment flow',
        steps: [
          {
            step: 1,
            description: 'Request without payment - get 402 response',
            curl: `curl -s -H "X-API-Key: YOUR_KEY" ${baseUrl}/api/demo/402-flow | jq`,
          },
          {
            step: 2,
            description: 'Request with demo payment TX - get data',
            curl: `curl -s -H "X-API-Key: YOUR_KEY" -H "X-Payment-Tx: ${DEMO_TX_HASH}" ${baseUrl}/api/demo/402-flow | jq`,
          },
        ],
      },
    },
    realEndpoints: {
      aaveYields: `${baseUrl}/api/data/yields/aave`,
      compoundYields: `${baseUrl}/api/data/yields/compound`,
      protocolTvl: `${baseUrl}/api/data/tvl/protocols`,
    },
  });
});

export default router;

/**
 * Payment Verification Service
 * 
 * Handles USDC payment verification on Arc Network with caching
 */

import { verifyUSDCTransaction } from './circleService';
import NodeCache from 'node-cache';

/**
 * Payment verification result
 */
export interface PaymentVerification {
  verified: boolean;
  actualAmount?: string;
  error?: string;
  timestamp?: number;
}

/**
 * Payment Cache
 * Stores verified transactions to avoid re-verification
 */
export class PaymentCache {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 3600) {
    // Cache verified payments for 1 hour by default
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: 120 });
  }

  /**
   * Check if a payment has been verified
   */
  isPaymentVerified(txHash: string): boolean {
    return this.cache.has(txHash);
  }

  /**
   * Get verified payment details
   */
  getPayment(txHash: string): PaymentVerification | undefined {
    return this.cache.get<PaymentVerification>(txHash);
  }

  /**
   * Add verified payment to cache
   */
  addVerifiedPayment(txHash: string, amount: string): void {
    this.cache.set<PaymentVerification>(txHash, {
      verified: true,
      actualAmount: amount,
      timestamp: Date.now(),
    });
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return this.cache.getStats();
  }

  /**
   * Clear all cached payments
   */
  clear(): void {
    this.cache.flushAll();
  }
}

// Global payment cache instance
const globalPaymentCache = new PaymentCache();

/**
 * Verify a USDC payment on Arc Network
 * 
 * @param txHash - Transaction hash to verify
 * @param expectedAmount - Expected USDC amount
 * @param toAddress - Expected recipient address
 * @returns Payment verification result
 */
export async function verifyPayment(
  txHash: string,
  expectedAmount: string,
  toAddress: string
): Promise<PaymentVerification> {
  try {
    // Check cache first
    const cached = globalPaymentCache.getPayment(txHash);
    if (cached) {
      console.log(`Payment ${txHash} verified from cache`);
      return cached;
    }

    // Verify on blockchain
    console.log(`Verifying payment ${txHash} on Arc Network...`);
    const result = await verifyUSDCTransaction(txHash, expectedAmount, toAddress);

    if (result.verified) {
      // Cache successful verification
      globalPaymentCache.addVerifiedPayment(txHash, result.actualAmount || expectedAmount);
      console.log(`Payment ${txHash} verified: ${result.actualAmount} USDC`);
    } else {
      console.error(`Payment ${txHash} verification failed: ${result.error}`);
    }

    return {
      verified: result.verified,
      actualAmount: result.actualAmount,
      error: result.error,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return {
      verified: false,
      error: error.message || 'Unknown error',
      timestamp: Date.now(),
    };
  }
}

/**
 * Get payment cache instance for external use
 */
export function getPaymentCache(): PaymentCache {
  return globalPaymentCache;
}

/**
 * Clear payment cache (useful for testing)
 */
export function clearPaymentCache(): void {
  globalPaymentCache.clear();
}

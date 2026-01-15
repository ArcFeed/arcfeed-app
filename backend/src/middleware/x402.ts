/**
 * HTTP 402 Payment Required Middleware
 * 
 * Implements micropayment protocol for API endpoints
 * Requires USDC payment on Arc Network before serving data
 */

import { Request, Response, NextFunction } from 'express';
import { verifyPayment, PaymentCache } from '../services/payment';
import { PAYMENT_RECEIVER_ADDRESS } from '../config/networks';

// Initialize payment cache
const paymentCache = new PaymentCache();

/**
 * Extended Request interface with payment info
 */
export interface PaymentRequest extends Request {
  paymentVerified?: boolean;
  paymentAmount?: string;
  paymentTxHash?: string;
}

/**
 * Middleware: Require payment for endpoint access
 * 
 * Usage: router.get('/data', requirePayment(0.001), handler)
 * 
 * @param requiredAmount - Amount in USDC required to access endpoint
 */
export function requirePayment(requiredAmount: number) {
  return async (req: PaymentRequest, res: Response, next: NextFunction) => {
    try {
      // Get payment transaction hash from header
      const txHash = req.headers['x-payment-tx'] as string;
      
      if (!txHash) {
        return send402Response(res, requiredAmount, 'Missing payment transaction');
      }

      // Check if payment was already verified (cached)
      if (paymentCache.isPaymentVerified(txHash)) {
        req.paymentVerified = true;
        req.paymentTxHash = txHash;
        return next();
      }

      // Verify payment on Arc Network
      const receiverAddress = PAYMENT_RECEIVER_ADDRESS;
      if (!receiverAddress || receiverAddress === '0x0000000000000000000000000000000000000000') {
        return res.status(500).json({
          success: false,
          error: 'Payment receiver address not configured',
        });
      }

      const verification = await verifyPayment(
        txHash,
        requiredAmount.toString(),
        receiverAddress
      );

      if (!verification.verified) {
        return send402Response(res, requiredAmount, verification.error || 'Payment verification failed');
      }

      // Cache verified payment
      paymentCache.addVerifiedPayment(txHash, requiredAmount.toString());

      req.paymentVerified = true;
      req.paymentAmount = verification.actualAmount;
      req.paymentTxHash = txHash;

      next();
    } catch (error: any) {
      console.error('Payment verification error:', error);
      return send402Response(res, requiredAmount, `Error: ${error.message}`);
    }
  };
}

/**
 * Send HTTP 402 Payment Required response with payment instructions
 */
function send402Response(res: Response, amount: number, reason: string) {
  const receiverAddress = PAYMENT_RECEIVER_ADDRESS;
  
  return res.status(402).json({
    error: 'Payment Required',
    code: 402,
    message: reason,
    payment: {
      required: true,
      amount: amount.toString(),
      currency: 'USDC',
      network: 'ARC-TESTNET',
      blockchain: 'Arc Network',
      receiver: receiverAddress,
      instructions: {
        step1: `Send ${amount} USDC to ${receiverAddress} on Arc Network`,
        step2: 'Include the transaction hash in X-Payment-Tx header',
        step3: 'Retry the request with the payment proof',
      },
      example: {
        header: 'X-Payment-Tx: 0x1234...abcd',
        curl: `curl -H "X-Payment-Tx: YOUR_TX_HASH" -H "X-API-Key: YOUR_API_KEY" ${getEndpointUrl(res)}`,
      },
    },
  });
}

/**
 * Helper: Get current endpoint URL
 */
function getEndpointUrl(res: Response): string {
  const req = res.req;
  const protocol = req.protocol;
  const host = req.get('host');
  const path = req.originalUrl;
  return `${protocol}://${host}${path}`;
}

/**
 * Optional: Middleware to check if payment was made (non-blocking)
 * Useful for analytics/logging without blocking access
 */
export function optionalPayment(expectedAmount: number) {
  return async (req: PaymentRequest, res: Response, next: NextFunction) => {
    const txHash = req.headers['x-payment-tx'] as string;
    
    if (txHash && PAYMENT_RECEIVER_ADDRESS) {
      try {
        const verification = await verifyPayment(
          txHash,
          expectedAmount.toString(),
          PAYMENT_RECEIVER_ADDRESS
        );
        
        if (verification.verified) {
          req.paymentVerified = true;
          req.paymentAmount = verification.actualAmount;
          req.paymentTxHash = txHash;
          paymentCache.addVerifiedPayment(txHash, expectedAmount.toString());
        }
      } catch (error) {
        console.error('Optional payment check failed:', error);
      }
    }
    
    next();
  };
}

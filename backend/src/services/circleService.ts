/**
 * Circle Wallet Service - Arc Network Integration
 * 
 * Extended wallet service with Arc Network support
 */

import * as walletManager from '../wallet/walletManager';
import { ARC_TESTNET, CIRCLE_BLOCKCHAIN } from '../config/networks';
import { ethers } from 'ethers';

/**
 * Get Arc Network provider
 */
export function getArcProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(ARC_TESTNET.rpcUrl);
}

/**
 * Verify USDC transaction on Arc Network
 * @param txHash - Transaction hash to verify
 * @param expectedAmount - Expected USDC amount (as string, e.g., "0.001")
 * @param toAddress - Expected recipient address
 */
export async function verifyUSDCTransaction(
  txHash: string,
  expectedAmount: string,
  toAddress: string
): Promise<{ verified: boolean; actualAmount?: string; error?: string }> {
  try {
    const provider = getArcProvider();
    
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    
    if (!receipt) {
      return { verified: false, error: 'Transaction not found or pending' };
    }

    if (receipt.status !== 1) {
      return { verified: false, error: 'Transaction failed' };
    }

    // Parse USDC transfer from logs
    // USDC Transfer event: Transfer(address indexed from, address indexed to, uint256 value)
    const transferTopic = ethers.id('Transfer(address,address,uint256)');
    
    const transferLog = receipt.logs.find(
      (log) => log.topics[0] === transferTopic && 
               log.address.toLowerCase() === ARC_TESTNET.usdcAddress.toLowerCase()
    );

    if (!transferLog) {
      return { verified: false, error: 'No USDC transfer found in transaction' };
    }

    // Decode transfer amount (USDC has 6 decimals)
    const amount = ethers.formatUnits(transferLog.topics[2], 6);
    const recipient = ethers.getAddress('0x' + transferLog.topics[2].slice(26));

    // Verify recipient and amount
    if (recipient.toLowerCase() !== toAddress.toLowerCase()) {
      return { verified: false, error: 'Recipient address mismatch' };
    }

    const expectedAmountNum = parseFloat(expectedAmount);
    const actualAmountNum = parseFloat(amount);

    if (actualAmountNum < expectedAmountNum) {
      return { 
        verified: false, 
        actualAmount: amount,
        error: `Insufficient payment: expected ${expectedAmount}, got ${amount}` 
      };
    }

    return { verified: true, actualAmount: amount };
  } catch (error: any) {
    return { 
      verified: false, 
      error: `Verification error: ${error.message}` 
    };
  }
}

/**
 * Create wallets on Arc Network
 */
export async function createArcWallets(walletSetId: string, count: number = 1) {
  return walletManager.createWallets(
    walletSetId,
    [CIRCLE_BLOCKCHAIN],
    count,
    'SCA'
  );
}

/**
 * Get wallet balance on Arc Network
 */
export async function getArcWalletBalance(walletId: string) {
  return walletManager.getWalletBalance(walletId, ARC_TESTNET.usdcAddress);
}

/**
 * Transfer USDC on Arc Network
 */
export async function transferUSDCOnArc(
  walletId: string,
  tokenId: string,
  destinationAddress: string,
  amount: string,
  feeLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM'
) {
  return walletManager.transferTokens(
    walletId,
    tokenId,
    destinationAddress,
    amount,
    feeLevel
  );
}

/**
 * Arc Network Configuration
 * 
 * Network settings and USDC contract addresses for Arc Network
 */

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  usdcAddress: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

/**
 * Arc Testnet Configuration
 * Note: Update USDC address from Arc Network documentation
 */
export const ARC_TESTNET: NetworkConfig = {
  chainId: 1234567, // Arc Testnet Chain ID - Update with actual
  name: 'Arc Testnet',
  rpcUrl: process.env.ARC_RPC_URL || 'https://rpc-testnet.arc.network',
  blockExplorer: 'https://testnet.arcscan.app',
  usdcAddress: process.env.USDC_ADDRESS_ARC || '0x0000000000000000000000000000000000000000', // Update with actual USDC address
  nativeCurrency: {
    name: 'Arc',
    symbol: 'ARC',
    decimals: 18,
  },
};

/**
 * Get network config by name
 */
export function getNetworkConfig(network: 'arc-testnet' = 'arc-testnet'): NetworkConfig {
  switch (network) {
    case 'arc-testnet':
      return ARC_TESTNET;
    default:
      return ARC_TESTNET;
  }
}

/**
 * Payment receiver wallet address (marketplace)
 * Set via PAYMENT_RECEIVER_ADDRESS environment variable
 */
export const PAYMENT_RECEIVER_ADDRESS = process.env.PAYMENT_RECEIVER_ADDRESS || process.env.MARKETPLACE_WALLET_ADDRESS;

/**
 * Supported blockchain for Circle SDK
 */
export const CIRCLE_BLOCKCHAIN = 'ARC-TESTNET';

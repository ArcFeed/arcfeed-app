/**
 * DeFi Data Products Catalog
 * 
 * High-frequency data feeds for AI agents
 * Micropayment pricing: 0.001-0.005 USDC per request
 */

export interface DataProduct {
  id: string;
  name: string;
  description: string;
  category: 'yields' | 'prices' | 'tvl' | 'volume' | 'analytics';
  price: number; // Price in USDC per request
  protocol?: string;
  endpoint: string;
  updateFrequency: string;
  dataFields: string[];
}

export const DATA_CATALOG: DataProduct[] = [
  // Yield Data Products
  {
    id: 'aave-yields',
    name: 'Aave Lending Yields',
    description: 'Real-time APY data for all Aave lending pools across multiple chains',
    category: 'yields',
    protocol: 'Aave',
    price: 0.002,
    endpoint: '/api/data/yields/aave',
    updateFrequency: '5 minutes',
    dataFields: ['asset', 'supplyAPY', 'borrowAPY', 'totalSupply', 'totalBorrow', 'utilizationRate'],
  },
  {
    id: 'compound-yields',
    name: 'Compound Lending Yields',
    description: 'Current supply and borrow rates for Compound Finance markets',
    category: 'yields',
    protocol: 'Compound',
    price: 0.002,
    endpoint: '/api/data/yields/compound',
    updateFrequency: '5 minutes',
    dataFields: ['asset', 'supplyAPY', 'borrowAPY', 'totalSupply', 'totalBorrow', 'compRewards'],
  },
  {
    id: 'uniswap-yields',
    name: 'Uniswap V3 Pool Yields',
    description: 'Fee APRs and liquidity data for top Uniswap V3 pools',
    category: 'yields',
    protocol: 'Uniswap',
    price: 0.003,
    endpoint: '/api/data/yields/uniswap',
    updateFrequency: '10 minutes',
    dataFields: ['pool', 'token0', 'token1', 'feeAPR', 'tvl', 'volume24h', 'feeTier'],
  },
  {
    id: 'curve-yields',
    name: 'Curve Pool Yields',
    description: 'Base APY and CRV rewards for Curve stable pools',
    category: 'yields',
    protocol: 'Curve',
    price: 0.002,
    endpoint: '/api/data/yields/curve',
    updateFrequency: '10 minutes',
    dataFields: ['pool', 'baseAPY', 'crvAPY', 'tvl', 'volume', 'assets'],
  },

  // Price Data Products
  {
    id: 'dex-prices',
    name: 'DEX Token Prices',
    description: 'Real-time token prices aggregated from top DEXes',
    category: 'prices',
    price: 0.001,
    endpoint: '/api/data/prices/dex',
    updateFrequency: '1 minute',
    dataFields: ['token', 'price', 'priceChange24h', 'volume24h', 'liquidity', 'sources'],
  },
  {
    id: 'stablecoin-pegs',
    name: 'Stablecoin Peg Data',
    description: 'Current peg deviation and liquidity for major stablecoins',
    category: 'prices',
    price: 0.001,
    endpoint: '/api/data/prices/stablecoins',
    updateFrequency: '2 minutes',
    dataFields: ['stablecoin', 'price', 'deviation', 'marketCap', 'liquidity', 'pegRisk'],
  },

  // TVL Data Products
  {
    id: 'protocol-tvl',
    name: 'Protocol TVL Rankings',
    description: 'Total Value Locked across top 100 DeFi protocols',
    category: 'tvl',
    price: 0.003,
    endpoint: '/api/data/tvl/protocols',
    updateFrequency: '30 minutes',
    dataFields: ['protocol', 'tvl', 'tvlChange24h', 'category', 'chains', 'mcapToTvl'],
  },
  {
    id: 'chain-tvl',
    name: 'Chain TVL Distribution',
    description: 'TVL breakdown by blockchain with historical trends',
    category: 'tvl',
    price: 0.002,
    endpoint: '/api/data/tvl/chains',
    updateFrequency: '30 minutes',
    dataFields: ['chain', 'tvl', 'dominance', 'change7d', 'protocols', 'categories'],
  },

  // Volume Data Products
  {
    id: 'dex-volume',
    name: 'DEX Volume Analytics',
    description: '24h trading volume across major decentralized exchanges',
    category: 'volume',
    price: 0.002,
    endpoint: '/api/data/volume/dex',
    updateFrequency: '15 minutes',
    dataFields: ['dex', 'volume24h', 'volumeChange', 'trades', 'uniqueUsers', 'topPairs'],
  },
  {
    id: 'lending-volume',
    name: 'Lending Protocol Activity',
    description: 'Borrow/lend volume for major lending protocols',
    category: 'volume',
    price: 0.002,
    endpoint: '/api/data/volume/lending',
    updateFrequency: '15 minutes',
    dataFields: ['protocol', 'borrowVolume', 'lendVolume', 'liquidations', 'activeUsers'],
  },

  // Advanced Analytics
  {
    id: 'yield-aggregator',
    name: 'Cross-Protocol Yield Optimizer',
    description: 'Best yield opportunities across all major DeFi protocols',
    category: 'analytics',
    price: 0.005,
    endpoint: '/api/data/analytics/best-yields',
    updateFrequency: '5 minutes',
    dataFields: ['strategy', 'apy', 'tvl', 'risk', 'protocol', 'asset', 'minDeposit'],
  },
  {
    id: 'arbitrage-opportunities',
    name: 'Cross-DEX Arbitrage Scanner',
    description: 'Real-time arbitrage opportunities across DEXes',
    category: 'analytics',
    price: 0.005,
    endpoint: '/api/data/analytics/arbitrage',
    updateFrequency: '1 minute',
    dataFields: ['tokenPair', 'buyDex', 'sellDex', 'profit', 'gasEstimate', 'netProfit'],
  },
  {
    id: 'impermanent-loss',
    name: 'Impermanent Loss Calculator',
    description: 'IL tracking for Uniswap/Curve LP positions',
    category: 'analytics',
    price: 0.003,
    endpoint: '/api/data/analytics/impermanent-loss',
    updateFrequency: '10 minutes',
    dataFields: ['pool', 'il24h', 'il7d', 'feeCompensation', 'netReturn', 'hodlComparison'],
  },
];

/**
 * Get all data products
 */
export function getAllDataProducts(): DataProduct[] {
  return DATA_CATALOG;
}

/**
 * Find data product by ID
 */
export function findDataProductById(id: string): DataProduct | undefined {
  return DATA_CATALOG.find((product) => product.id === id);
}

/**
 * Search data products
 */
export function searchDataProducts(query: string): DataProduct[] {
  const lowerQuery = query.toLowerCase();
  return DATA_CATALOG.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      (product.protocol && product.protocol.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get data products by category
 */
export function getDataProductsByCategory(category: string): DataProduct[] {
  return DATA_CATALOG.filter((product) => product.category === category);
}

/**
 * Get data product price
 */
export function getDataProductPrice(id: string): number | null {
  const product = findDataProductById(id);
  return product ? product.price : null;
}

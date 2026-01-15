/**
 * DeFi Data Service
 * 
 * Integrates with DeFiLlama API and other data sources
 * Provides real DeFi data for the marketplace
 */

import axios from 'axios';

const DEFILLAMA_BASE_URL = 'https://api.llama.fi';
const YIELDS_API_URL = 'https://yields.llama.fi';

/**
 * Fetch Aave yields data
 */
export async function getAaveYields() {
  try {
    const response = await axios.get(`${YIELDS_API_URL}/pools`);
    const allPools = response.data.data;

    // Filter for Aave pools only
    const aavePools = allPools
      .filter((pool: any) => pool.project === 'aave-v3' || pool.project === 'aave-v2')
      .slice(0, 20) // Top 20 pools
      .map((pool: any) => ({
        asset: pool.symbol,
        chain: pool.chain,
        supplyAPY: pool.apyBase || 0,
        borrowAPY: pool.apyBaseBorrow || 0,
        totalSupply: pool.tvlUsd || 0,
        totalBorrow: pool.totalBorrowUsd || 0,
        utilizationRate: pool.utilization || 0,
        pool: pool.pool,
      }));

    return {
      success: true,
      data: aavePools,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching Aave yields:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Fetch Compound yields data
 */
export async function getCompoundYields() {
  try {
    const response = await axios.get(`${YIELDS_API_URL}/pools`);
    const allPools = response.data.data;

    const compoundPools = allPools
      .filter((pool: any) => pool.project === 'compound-v3' || pool.project === 'compound-v2')
      .slice(0, 20)
      .map((pool: any) => ({
        asset: pool.symbol,
        chain: pool.chain,
        supplyAPY: pool.apyBase || 0,
        borrowAPY: pool.apyBaseBorrow || 0,
        totalSupply: pool.tvlUsd || 0,
        totalBorrow: pool.totalBorrowUsd || 0,
        compRewards: pool.apyReward || 0,
        pool: pool.pool,
      }));

    return {
      success: true,
      data: compoundPools,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching Compound yields:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Fetch Uniswap V3 yields data
 */
export async function getUniswapYields() {
  try {
    const response = await axios.get(`${YIELDS_API_URL}/pools`);
    const allPools = response.data.data;

    const uniswapPools = allPools
      .filter((pool: any) => pool.project === 'uniswap-v3')
      .slice(0, 20)
      .map((pool: any) => ({
        pool: pool.symbol,
        token0: pool.symbol.split('-')[0],
        token1: pool.symbol.split('-')[1],
        chain: pool.chain,
        feeAPR: pool.apyBase || 0,
        tvl: pool.tvlUsd || 0,
        volume24h: pool.volumeUsd1d || 0,
        feeTier: pool.poolMeta || 'unknown',
      }));

    return {
      success: true,
      data: uniswapPools,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching Uniswap yields:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Fetch Curve yields data
 */
export async function getCurveYields() {
  try {
    const response = await axios.get(`${YIELDS_API_URL}/pools`);
    const allPools = response.data.data;

    const curvePools = allPools
      .filter((pool: any) => pool.project === 'curve')
      .slice(0, 20)
      .map((pool: any) => ({
        pool: pool.symbol,
        baseAPY: pool.apyBase || 0,
        crvAPY: pool.apyReward || 0,
        tvl: pool.tvlUsd || 0,
        volume: pool.volumeUsd1d || 0,
        assets: pool.underlyingTokens || [],
        chain: pool.chain,
      }));

    return {
      success: true,
      data: curvePools,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching Curve yields:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Fetch protocol TVL data
 */
export async function getProtocolTVL() {
  try {
    const response = await axios.get(`${DEFILLAMA_BASE_URL}/protocols`);
    const protocols = response.data;

    const topProtocols = protocols
      .slice(0, 100)
      .map((protocol: any) => ({
        protocol: protocol.name,
        tvl: protocol.tvl || 0,
        tvlChange24h: protocol.change_1d || 0,
        category: protocol.category || 'unknown',
        chains: protocol.chains || [],
        mcapToTvl: protocol.mcaptvl || 0,
        slug: protocol.slug,
      }));

    return {
      success: true,
      data: topProtocols,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching protocol TVL:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Fetch chain TVL distribution
 */
export async function getChainTVL() {
  try {
    const response = await axios.get(`${DEFILLAMA_BASE_URL}/v2/chains`);
    const chains = response.data;

    const chainData = chains.map((chain: any) => ({
      chain: chain.name,
      tvl: chain.tvl || 0,
      tvlChange24h: chain.tvlChange || 0,
      protocols: chain.protocols || 0,
      tokenSymbol: chain.tokenSymbol || 'N/A',
    }));

    return {
      success: true,
      data: chainData,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching chain TVL:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

/**
 * Get best yield opportunities across protocols
 */
export async function getBestYields() {
  try {
    const response = await axios.get(`${YIELDS_API_URL}/pools`);
    const allPools = response.data.data;

    // Sort by APY and filter for stable strategies
    const bestYields = allPools
      .filter((pool: any) => pool.stablecoin && pool.tvlUsd > 1000000) // Only stable, liquid pools
      .sort((a: any, b: any) => (b.apy || 0) - (a.apy || 0))
      .slice(0, 20)
      .map((pool: any) => ({
        strategy: pool.symbol,
        apy: pool.apy || 0,
        tvl: pool.tvlUsd || 0,
        risk: pool.stablecoin ? 'Low' : 'Medium',
        protocol: pool.project,
        asset: pool.symbol,
        chain: pool.chain,
        minDeposit: 'No minimum',
      }));

    return {
      success: true,
      data: bestYields,
      timestamp: new Date().toISOString(),
      source: 'DeFiLlama',
    };
  } catch (error: any) {
    console.error('Error fetching best yields:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

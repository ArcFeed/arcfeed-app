/**
 * Data Tools for the AI Agent
 * 
 * Tools for purchasing and accessing DeFi data
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllDataProducts, findDataProductById, searchDataProducts } from "../../marketplace/data";
import * as defiData from "../../services/defiData";
import * as walletManager from "../../wallet/walletManager";
import { PAYMENT_RECEIVER_ADDRESS } from "../../config/networks";

/**
 * Tool to browse available data products
 */
export const browseDataProductsTool = new DynamicStructuredTool({
  name: "browse_data_products",
  description: "List all available DeFi data products with prices and descriptions. Use this when users ask to see available data feeds or what data they can purchase.",
  schema: z.object({}),
  func: async () => {
    try {
      const products = getAllDataProducts();
      
      if (products.length === 0) {
        return "No data products available.";
      }

      const productList = products.map((product, index) => {
        return `${index + 1}. ${product.name} [${product.id}]
   Category: ${product.category}
   ${product.protocol ? `Protocol: ${product.protocol}` : ''}
   Price: ${product.price} USDC per request
   Update Frequency: ${product.updateFrequency}
   Description: ${product.description}
   Endpoint: ${product.endpoint}
   Data Fields: ${product.dataFields.join(', ')}`;
      }).join("\n\n");

      return `Available DeFi Data Products (${products.length}):\n\n${productList}`;
    } catch (error: any) {
      return `Error browsing data products: ${error.message || "Unknown error"}`;
    }
  },
});

/**
 * Tool to search for data products
 */
export const searchDataProductsTool = new DynamicStructuredTool({
  name: "search_data_products",
  description: "Search for DeFi data products by name, protocol, category, or keywords.",
  schema: z.object({
    query: z.string().describe("Search query (protocol name, category, or keywords)"),
  }),
  func: async ({ query }) => {
    try {
      const results = searchDataProducts(query);
      
      if (results.length === 0) {
        return `No data products found matching "${query}". Try browsing all products or use different search terms.`;
      }

      const resultList = results.map((product, index) => {
        return `${index + 1}. ${product.name} [${product.id}]
   Price: ${product.price} USDC
   ${product.protocol ? `Protocol: ${product.protocol}` : ''}
   Description: ${product.description}`;
      }).join("\n\n");

      return `Search Results (${results.length} found):\n\n${resultList}`;
    } catch (error: any) {
      return `Error searching data products: ${error.message || "Unknown error"}`;
    }
  },
});

/**
 * Tool to purchase and retrieve DeFi data
 */
export const purchaseDataTool = new DynamicStructuredTool({
  name: "purchase_data",
  description: "Purchase and immediately retrieve DeFi data. Automatically sends USDC payment and returns the data. Always check wallet balance first to get the token ID.",
  schema: z.object({
    walletId: z.string().describe("The wallet ID to use for payment"),
    dataProductId: z.string().describe("The data product ID (e.g., 'aave-yields', 'compound-yields')"),
    tokenId: z.string().describe("The token ID for USDC (get this from check_wallet_balance tool)"),
  }),
  func: async ({ walletId, dataProductId, tokenId }) => {
    try {
      // 1. Find data product
      const product = findDataProductById(dataProductId);
      if (!product) {
        return `Data product "${dataProductId}" not found. Use browse_data_products to see available products.`;
      }

      // 2. Check wallet balance
      const balances = await walletManager.getWalletBalance(walletId);
      const usdcBalance = balances?.find((b: any) => b.token.id === tokenId);

      if (!usdcBalance) {
        return `Token ID ${tokenId} not found in wallet. Please check wallet balance first.`;
      }

      const balanceAmount = parseFloat(usdcBalance.amount);
      if (balanceAmount < product.price) {
        return `Insufficient balance. Required: ${product.price} USDC, Available: ${balanceAmount} USDC`;
      }

      // 3. Send payment to data marketplace
      const receiverAddress = PAYMENT_RECEIVER_ADDRESS;
      if (!receiverAddress || receiverAddress === '0x0000000000000000000000000000000000000000') {
        return 'Data marketplace address not configured. Please set PAYMENT_RECEIVER_ADDRESS in .env';
      }

      const transferResult = await walletManager.transferTokens(
        walletId,
        tokenId,
        receiverAddress,
        product.price.toString(),
        'MEDIUM'
      );

      const transactionId = transferResult?.id || 'Unknown';

      // 4. Fetch the data based on product ID
      let dataResult;
      switch (dataProductId) {
        case 'aave-yields':
          dataResult = await defiData.getAaveYields();
          break;
        case 'compound-yields':
          dataResult = await defiData.getCompoundYields();
          break;
        case 'uniswap-yields':
          dataResult = await defiData.getUniswapYields();
          break;
        case 'curve-yields':
          dataResult = await defiData.getCurveYields();
          break;
        case 'protocol-tvl':
          dataResult = await defiData.getProtocolTVL();
          break;
        case 'chain-tvl':
          dataResult = await defiData.getChainTVL();
          break;
        case 'yield-aggregator':
          dataResult = await defiData.getBestYields();
          break;
        default:
          return `Data product "${dataProductId}" is not yet implemented. Available: aave-yields, compound-yields, uniswap-yields, curve-yields, protocol-tvl, chain-tvl, yield-aggregator`;
      }

      // 5. Return success with data
      if (!dataResult.success) {
        return `Payment successful (${product.price} USDC, TX: ${transactionId}) but data fetch failed: ${dataResult.error}`;
      }

      // Format data for display
      const dataPreview = formatDataPreview(dataResult.data, product.name);

      return `✅ Payment Successful!
Purchased: ${product.name}
Amount Paid: ${product.price} USDC
Transaction ID: ${transactionId}
Network: Arc Network

${dataPreview}

Source: ${dataResult.source}
Timestamp: ${dataResult.timestamp}
Total Records: ${dataResult.data.length}`;

    } catch (error: any) {
      return `Error purchasing data: ${error.message || "Unknown error"}`;
    }
  },
});

/**
 * Helper function to format data preview
 */
function formatDataPreview(data: any[], productName: string): string {
  if (!data || data.length === 0) {
    return "No data available.";
  }

  // Show first 5 records
  const preview = data.slice(0, 5);
  const hasMore = data.length > 5;

  const formatted = preview.map((item, index) => {
    const fields = Object.entries(item)
      .filter(([key]) => !key.includes('pool') && !key.includes('slug'))
      .slice(0, 6) // Show first 6 fields
      .map(([key, value]) => {
        if (typeof value === 'number') {
          return `${key}: ${value.toFixed(2)}`;
        }
        return `${key}: ${value}`;
      })
      .join('\n   ');
    
    return `${index + 1}. ${fields}`;
  }).join('\n\n');

  const moreInfo = hasMore ? `\n\n... and ${data.length - 5} more records` : '';

  return `📊 ${productName} Data:\n\n${formatted}${moreInfo}`;
}

// Export all data tools
export const dataTools = [
  browseDataProductsTool,
  searchDataProductsTool,
  purchaseDataTool,
];

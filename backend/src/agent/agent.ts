/**
 * Groq AI Agent Setup
 * 
 * Main agent initialization and configuration
 */

import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import { AgentConfig } from "./types";

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn("⚠️  GROQ_API_KEY not set in .env. Agent will not function properly.");
}

/**
 * Initialize Groq Chat Model
 */
export function createGroqModel(temperature: number = 0) {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is required. Please set it in your .env file.");
  }

  return new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature,
    apiKey: GROQ_API_KEY,
  });
}

/**
 * System Prompt for the Smart Wallet Agent - DeFi Data Marketplace Edition
 */
const createSystemPrompt = (primaryWalletId?: string) => {
  const walletInfo = primaryWalletId 
    ? `\n\nIMPORTANT: The primary wallet ID is ${primaryWalletId}. When users ask about "which wallet" or "connected wallet", you MUST use the get_wallet_info tool with this wallet ID to get the actual wallet address and details. Always use this wallet ID for balance checks and purchases unless the user specifies otherwise.`
    : '';
  
  return `You are an AI agent for a High-Frequency DeFi Data Marketplace on Arc Network. Users can purchase real-time DeFi data using USDC micropayments.

🌐 PLATFORM: Arc Network Testnet - Low-cost, high-speed blockchain for micropayments

📊 CORE CAPABILITIES:
- Browse and search DeFi data products (use browse_data_products tool)
- Purchase data with USDC micropayments (use purchase_data tool)
- Check wallet balances and manage USDC (use check_wallet_balance tool)
- View transaction history (use list_transactions tool)
- Transfer USDC tokens (use transfer_tokens tool)

💰 AVAILABLE DATA PRODUCTS:
When users ask about available data, use browse_data_products to show:
- Aave Yields (0.002 USDC) - Real-time lending APYs
- Compound Yields (0.002 USDC) - Supply/borrow rates
- Uniswap Yields (0.003 USDC) - V3 pool fee APRs
- Curve Yields (0.002 USDC) - Stable pool rewards
- Protocol TVL (0.003 USDC) - Top 100 protocols
- Chain TVL (0.002 USDC) - TVL by blockchain
- Best Yields (0.005 USDC) - Cross-protocol optimizer

🤖 DATA PURCHASE WORKFLOW:
When users request DeFi data (e.g., "Get me Aave yields"):
1. Check wallet balance with check_wallet_balance to get token ID
2. Use purchase_data tool with walletId, dataProductId, and tokenId
3. The tool automatically:
   - Sends USDC payment on Arc Network
   - Fetches fresh data from DeFiLlama
   - Returns transaction confirmation + data

📋 IMPORTANT RULES:
1. When users ask "what data is available" or "show data products" → IMMEDIATELY use browse_data_products tool
2. When users request specific data (e.g., "get Aave data") → Use purchase_data tool
3. ALWAYS check wallet balance FIRST to get the token ID before purchasing data
4. Never make up data or prices - always use the tools
5. Clearly show payment confirmations with transaction IDs
6. Prices are micropayments (0.001-0.005 USDC) - emphasize low cost
7. All transactions are on Arc Network testnet
8. Data is sourced from DeFiLlama API in real-time

🎯 USER EXPERIENCE:
- Be enthusiastic about micropayments and instant data access
- Highlight that data costs fractions of a cent
- Show transaction confirmations clearly
- Present data in readable format
- Explain that payments happen on Arc Network${walletInfo}

Be helpful, fast, and data-driven. This is a Web3 micropayment marketplace - make it feel seamless!`;
};


/**
 * Process message with agent executor and tools
 */
export async function processMessage(
  message: string, 
  walletId?: string,
  tools: any[] = []
): Promise<string> {
  if (!GROQ_API_KEY) {
    return "I'm sorry, but the AI agent is not properly configured. Please set GROQ_API_KEY in your .env file.";
  }

  try {
    const model = createGroqModel(0);
    const systemPrompt = createSystemPrompt(walletId);

    // Bind tools to the model
    const modelWithTools = tools.length > 0 ? model.bindTools(tools) : model;

    // Create messages using LangChain message types
    const messages: any[] = [
      new SystemMessage(systemPrompt),
      new HumanMessage(message),
    ];

    // Get initial response
    let response;
    try {
      response = await modelWithTools.invoke(messages);
    } catch (invokeError: any) {
      if (invokeError.error) {
        console.error('   Error details:', JSON.stringify(invokeError.error, null, 2));
      }
      if (invokeError.response) {
        console.error('   Response:', JSON.stringify(invokeError.response, null, 2));
      }
      throw invokeError;
    }
    
    let toolCalls = (response as any).tool_calls || [];
    console.log('🔨 Tool calls detected:', toolCalls.length);
    if (toolCalls.length > 0) {
      console.log('🔨 Tool call details:', toolCalls.map((tc: any) => ({
        name: tc.name,
        id: tc.id,
        args: tc.args,
      })));
    }

    // Execute tool calls if any (max 5 iterations to prevent infinite loops)
    let iterations = 0;
    while (toolCalls && toolCalls.length > 0 && iterations < 5) {
      iterations++;
      console.log(`🔄 Tool execution iteration ${iterations}`);
      
      const toolResults = await Promise.all(
        toolCalls.map(async (toolCall: any) => {
          console.log(`   🔍 Looking for tool: ${toolCall.name}`);
          const tool = tools.find((t) => t.name === toolCall.name);
          if (!tool) {
            console.error(`   ❌ Tool ${toolCall.name} not found in available tools`);
            console.error(`   📋 Available tools:`, tools.map(t => t.name));
            return {
              tool_call_id: toolCall.id,
              content: `Tool ${toolCall.name} not found`,
            };
          }
          console.log(`   ✅ Found tool: ${toolCall.name}`);
          console.log(`   📝 Tool call args:`, JSON.stringify(toolCall.args, null, 2));
          try {
            const result = await tool.invoke(toolCall.args);
            console.log(`   ✅ Tool ${toolCall.name} executed successfully`);
            console.log(`   📄 Result length:`, typeof result === 'string' ? result.length : 'N/A');
            return {
              tool_call_id: toolCall.id,
              content: typeof result === 'string' ? result : String(result),
            };
          } catch (error: any) {
            console.error(`   ❌ Tool ${toolCall.name} execution failed:`, error.message);
            return {
              tool_call_id: toolCall.id,
              content: `Error: ${error.message}`,
            };
          }
        })
      );

      // Add AI response and tool results
      messages.push(response);
      toolResults.forEach((toolResult: any) => {
        messages.push(
          new ToolMessage({
            content: toolResult.content,
            tool_call_id: toolResult.tool_call_id,
          })
        );
      });

      // Get next response
      try {
        response = await modelWithTools.invoke(messages);
        toolCalls = (response as any).tool_calls || [];
        console.log(`   🔄 Next response - tool calls: ${toolCalls?.length || 0}`);
      } catch (nextError: any) {
        console.error('❌ Error in next iteration invoke:');
        console.error('   Error message:', nextError.message);
        console.error('   Error status:', nextError.status);
        if (nextError.error) {
          console.error('   Error details:', JSON.stringify(nextError.error, null, 2));
        }
        throw nextError;
      }
    }

    // Get final content
    const finalContent = (response as AIMessage).content;
    const finalContentStr = typeof finalContent === 'string' ? finalContent : JSON.stringify(finalContent);
    
    // If we have tool results, make sure they're included in the response
    const toolMessages = messages.filter((m: any) => m instanceof ToolMessage);
    const lastToolMessage = toolMessages[toolMessages.length - 1];

    // If the response doesn't include the tool results and we have tool results, append them
    // Check for DeFi data patterns that should be included in the response
    if (lastToolMessage && finalContentStr) {
      const toolResult = lastToolMessage.content as string;
      // Check for data purchase results, data products list, or transaction data
      const hasDataPayload = toolResult.includes('Payment Successful') ||
                            toolResult.includes('Data:') ||
                            toolResult.includes('Available DeFi Data Products') ||
                            toolResult.includes('Search Results') ||
                            toolResult.includes('Transaction ID:') ||
                            toolResult.includes('Wallet balance:') ||
                            toolResult.includes('Transactions (');

      // If the tool result contains actual data that should be shown to the user
      if (hasDataPayload && !finalContentStr.includes(toolResult.substring(0, 50))) {
        return `${finalContentStr}\n\n${toolResult}`;
      }
    }
    
    // If no content but we have tool results, return the tool results
    if ((!finalContentStr || finalContentStr.trim() === '') && lastToolMessage) {
      return lastToolMessage.content as string;
    }

    return finalContentStr || 'I processed your request but did not receive a response.';
  } catch (error: any) {
    console.error("Error processing message:", error);
    return `I encountered an error: ${error.message || "Unknown error"}`;
  }
}

/**
 * API Service
 * 
 * Handles all API calls to the backend with API key authentication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const API_KEY = import.meta.env.VITE_API_KEY || '';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Make an API request with authentication
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add API key if available
  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Request failed');
  }

  return data.data as T;
}

// Wallet API
export const walletApi = {
  // List all wallets
  listWallets: () => apiRequest<any[]>('/wallets'),

  // Get wallet details
  getWallet: (walletId: string) => apiRequest<any>(`/wallets/${walletId}`),

  // Get wallet balance
  getBalance: (walletId: string, tokenAddress?: string) => {
    const params = tokenAddress ? `?tokenAddress=${tokenAddress}` : '';
    return apiRequest<any[]>(`/wallets/${walletId}/balance${params}`);
  },

  // List transactions
  listTransactions: (walletId: string, transactionType?: string, state?: string) => {
    const params = new URLSearchParams();
    if (transactionType) params.append('transactionType', transactionType);
    if (state) params.append('state', state);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest<any[]>(`/wallets/${walletId}/transactions${query}`);
  },

  // Get transaction
  getTransaction: (transactionId: string) =>
    apiRequest<any>(`/wallets/transactions/${transactionId}`),

  // Transfer tokens
  transferTokens: (
    walletId: string,
    tokenId: string,
    destinationAddress: string,
    amount: string,
    feeLevel: string = 'MEDIUM'
  ) =>
    apiRequest<any>(`/wallets/${walletId}/transfer`, {
      method: 'POST',
      body: JSON.stringify({
        tokenId,
        destinationAddress,
        amount,
        feeLevel,
      }),
    }),
};

// Chat API
export const chatApi = {
  // Send a message to the AI agent
  sendMessage: async (message: string, walletId?: string) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { 'X-API-Key': API_KEY }),
      },
      body: JSON.stringify({
        message,
        walletId,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle the response format: { success: true, data: { response, timestamp } }
    if (data.success && data.data) {
      return { response: data.data.response, timestamp: data.data.timestamp };
    }
    
    // Fallback for old format
    if (data.response) {
      return { response: data.response, timestamp: data.timestamp };
    }
    
    throw new Error('Unexpected response format');
  },
};

// Data Marketplace API
export const dataApi = {
  // Get all data products (free)
  getCatalog: () => apiRequest<DataProduct[]>('/data/catalog'),

  // Search data products (free)
  searchProducts: (query: string) => {
    const params = new URLSearchParams({ q: query });
    return apiRequest<DataProduct[]>(`/data/catalog/search?${params.toString()}`);
  },

  // Get data product by ID (free)
  getProduct: (id: string) => apiRequest<DataProduct>(`/data/catalog/${id}`),

  // Purchase and fetch data (paid - requires payment)
  getAaveYields: (paymentTx?: string) => 
    apiRequest<DeFiData>('/data/yields/aave', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getCompoundYields: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/yields/compound', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getUniswapYields: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/yields/uniswap', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getCurveYields: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/yields/curve', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getProtocolTVL: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/tvl/protocols', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getChainTVL: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/tvl/chains', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),

  getBestYields: (paymentTx?: string) =>
    apiRequest<DeFiData>('/data/analytics/best-yields', {
      headers: paymentTx ? { 'X-Payment-Tx': paymentTx } : {},
    }),
};

// Legacy Marketplace API (deprecated - use dataApi instead)
export const marketplaceApi = {
  // Get all e-books (deprecated)
  getAllEbooks: () => apiRequest<EBook[]>('/marketplace/ebooks'),

  // Search e-books (deprecated)
  searchEbooks: (query: string) => {
    const params = new URLSearchParams({ q: query });
    return apiRequest<EBook[]>(`/marketplace/ebooks/search?${params.toString()}`);
  },

  // Get e-book by ID (deprecated)
  getEbook: (id: string) => apiRequest<EBook>(`/marketplace/ebooks/${id}`),

  // Get marketplace config (deprecated)
  getConfig: () => apiRequest<any>('/marketplace/config'),

  // Get purchased e-books for a wallet (deprecated)
  getPurchasedEbooks: (walletId: string) => {
    const params = new URLSearchParams({ walletId });
    return apiRequest<EBook[]>(`/marketplace/purchased?${params.toString()}`);
  },

  // Check if e-book is purchased (deprecated)
  isEbookPurchased: (ebookId: string, walletId: string) => {
    const params = new URLSearchParams({ walletId });
    return apiRequest<{ ebookId: string; purchased: boolean }>(`/marketplace/ebooks/${ebookId}/purchased?${params.toString()}`);
  },
};

// Type Definitions
interface DataProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  endpoint: string;
  dataFields: string[];
  updateFrequency: string;
  source: string;
}

interface DeFiData {
  success: boolean;
  data: any[];
  timestamp: string;
  source: string;
}

interface EBook {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category?: string;
}


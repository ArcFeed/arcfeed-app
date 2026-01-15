# HTTP 402 Payment Protocol Documentation

## Overview

This marketplace implements the **HTTP 402 Payment Required** status code for micropayment-gated API endpoints. This is a rarely-used but powerful HTTP standard for pay-per-use web services.

## Why HTTP 402?

HTTP 402 was reserved in the original HTTP specification for future payment systems. While historically unused, it's perfect for blockchain micropayments:

- **Standard protocol** - No custom headers or auth schemes
- **Self-documenting** - Response includes payment instructions
- **Stateless** - No session management needed
- **Idempotent** - Same payment works for multiple identical requests (within cache TTL)

## How It Works

### Request Flow

```
Client                    Server                   Arc Network
  |                         |                           |
  |---(1) GET /api/data---->|                           |
  |                         |                           |
  |<--(2) 402 Payment ------|                           |
  |        Required         |                           |
  |                         |                           |
  |--------(3) Send USDC---------------------------->|
  |                         |                           |
  |<-------(4) TX Hash---------------------------- ---|
  |                         |                           |
  |---(5) GET /api/data---->|                           |
  |     + X-Payment-Tx      |                           |
  |                         |---(6) Verify TX--------->|
  |                         |<---(7) Confirmed---------|
  |<--(8) 200 OK + Data-----|                           |
```

### Step-by-Step

1. **Initial Request** - Client makes request without payment
2. **402 Response** - Server returns payment requirements
3. **Payment** - Client sends USDC on Arc Network
4. **Transaction Hash** - Blockchain returns TX hash
5. **Retry Request** - Client repeats request with `X-Payment-Tx` header
6. **Verification** - Server checks transaction on Arc Network
7. **Confirmation** - Blockchain confirms valid payment
8. **Data Delivery** - Server returns requested data

## Implementation

### Middleware

Located at `/backend/src/middleware/x402.ts`:

```typescript
export function requirePayment(amount: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const txHash = req.headers['x-payment-tx'] as string;
    
    if (!txHash) {
      return send402Response(res, amount);
    }
    
    try {
      const isValid = await paymentService.verifyPayment(txHash, amount);
      if (isValid) {
        next();
      } else {
        return send402Response(res, amount);
      }
    } catch (error) {
      return send402Response(res, amount);
    }
  };
}
```

### 402 Response Format

```json
{
  "error": "Payment Required",
  "message": "This endpoint requires payment of 0.002 USDC",
  "payment": {
    "amount": "0.002",
    "currency": "USDC",
    "receiver": "0x1234567890abcdef1234567890abcdef12345678",
    "network": "ARC-TESTNET",
    "rpc": "https://rpc-testnet.arc.network",
    "explorer": "https://testnet.arcscan.app"
  },
  "instructions": "Send 0.002 USDC to the receiver address, then retry this request with the X-Payment-Tx header containing your transaction hash"
}
```

## Payment Verification

### Blockchain Verification

The payment service verifies three conditions:

1. **Transaction exists** on Arc Network
2. **Recipient matches** payment receiver address
3. **Amount is exact or greater** than required

Implementation in `/backend/src/services/circleService.ts`:

```typescript
async verifyUSDCTransaction(
  txHash: string, 
  expectedAmount: string
): Promise<boolean> {
  const provider = getArcProvider();
  const receipt = await provider.getTransactionReceipt(txHash);
  
  if (!receipt || receipt.status !== 1) {
    return false; // Transaction failed or doesn't exist
  }
  
  // Parse Transfer event
  const transferEvent = receipt.logs.find(log => 
    log.topics[0] === TRANSFER_EVENT_SIGNATURE
  );
  
  if (!transferEvent) {
    return false; // No USDC transfer in transaction
  }
  
  const recipient = '0x' + transferEvent.topics[2].slice(26);
  const amount = parseFloat(
    ethers.formatUnits(transferEvent.data, 6)
  );
  
  // Verify recipient and amount
  return (
    recipient.toLowerCase() === PAYMENT_RECEIVER.toLowerCase() &&
    amount >= parseFloat(expectedAmount)
  );
}
```

### Payment Caching

To prevent re-verification overhead and double-spending:

```typescript
class PaymentCache {
  private cache: NodeCache;
  
  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: 3600 // 1 hour
    });
  }
  
  isUsed(txHash: string): boolean {
    return this.cache.get(txHash) !== undefined;
  }
  
  markUsed(txHash: string, amount: string): void {
    this.cache.set(txHash, { 
      amount, 
      timestamp: Date.now() 
    });
  }
}
```

**Cache Benefits:**
- Prevents double-spending attacks
- Reduces RPC calls to Arc Network
- Allows re-fetching data within 1-hour window
- Improves response time for cached payments

## Usage Examples

### Using cURL

#### Step 1: Request Data

```bash
curl -X GET \
  -H "X-API-Key: your_api_key" \
  http://localhost:3001/api/data/yields/aave
```

**Response (402):**
```json
{
  "error": "Payment Required",
  "payment": {
    "amount": "0.002",
    "currency": "USDC",
    "receiver": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "network": "ARC-TESTNET"
  }
}
```

#### Step 2: Send Payment

Use Circle SDK, Metamask, or any wallet to send 0.002 USDC to the receiver address on Arc Network.

Transaction hash: `0xabcd1234...`

#### Step 3: Retry with Payment Proof

```bash
curl -X GET \
  -H "X-API-Key: your_api_key" \
  -H "X-Payment-Tx: 0xabcd1234..." \
  http://localhost:3001/api/data/yields/aave
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "pool": "USDC",
      "apyBase": 3.45,
      "apyReward": 1.23,
      "tvlUsd": 1234567890
    }
  ],
  "timestamp": "2026-01-15T10:30:00Z",
  "source": "DeFiLlama"
}
```

### Using JavaScript/TypeScript

```typescript
import axios from 'axios';

async function purchaseData(endpoint: string, amount: string) {
  const baseURL = 'http://localhost:3001';
  const apiKey = process.env.API_KEY;
  
  try {
    // Try request first (might have cached payment)
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: { 'X-API-Key': apiKey }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 402) {
      console.log('Payment required:', error.response.data.payment);
      
      // Send payment (using your wallet service)
      const txHash = await sendPayment(
        error.response.data.payment.receiver,
        error.response.data.payment.amount
      );
      
      // Retry with payment proof
      const retryResponse = await axios.get(`${baseURL}${endpoint}`, {
        headers: {
          'X-API-Key': apiKey,
          'X-Payment-Tx': txHash
        }
      });
      
      return retryResponse.data;
    }
    throw error;
  }
}

// Usage
const aaveYields = await purchaseData('/api/data/yields/aave', '0.002');
```

### Using Python

```python
import requests
import os

def purchase_data(endpoint: str, amount: str):
    base_url = 'http://localhost:3001'
    api_key = os.getenv('API_KEY')
    headers = {'X-API-Key': api_key}
    
    # Try request first
    response = requests.get(f'{base_url}{endpoint}', headers=headers)
    
    if response.status_code == 402:
        payment_info = response.json()['payment']
        print(f"Payment required: {payment_info['amount']} {payment_info['currency']}")
        
        # Send payment (using your wallet)
        tx_hash = send_payment(
            payment_info['receiver'],
            payment_info['amount']
        )
        
        # Retry with payment proof
        headers['X-Payment-Tx'] = tx_hash
        response = requests.get(f'{base_url}{endpoint}', headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Request failed: {response.status_code}")

# Usage
aave_yields = purchase_data('/api/data/yields/aave', '0.002')
```

## Protected Endpoints

All endpoints under `/api/data/` (except catalog) are protected:

| Endpoint | Price (USDC) | Data Source |
|----------|--------------|-------------|
| `GET /api/data/yields/aave` | 0.002 | DeFiLlama |
| `GET /api/data/yields/compound` | 0.002 | DeFiLlama |
| `GET /api/data/yields/uniswap` | 0.003 | DeFiLlama |
| `GET /api/data/yields/curve` | 0.002 | DeFiLlama |
| `GET /api/data/tvl/protocols` | 0.003 | DeFiLlama |
| `GET /api/data/tvl/chains` | 0.002 | DeFiLlama |
| `GET /api/data/analytics/best-yields` | 0.005 | DeFiLlama |
| `GET /api/data/analytics/arbitrage` | 0.005 | Multiple DEXs |
| `GET /api/data/analytics/impermanent-loss` | 0.004 | Calculated |

## Security Considerations

### Double-Spending Prevention

The payment cache ensures each transaction hash can only be used once:

```typescript
if (paymentCache.isUsed(txHash)) {
  return res.status(400).json({ 
    error: 'Payment already used' 
  });
}
```

### Amount Validation

Payments must be exact or greater (allows for user error/overpayment):

```typescript
if (amount >= parseFloat(expectedAmount)) {
  // Accept payment
} else {
  // Reject - insufficient payment
}
```

### Blockchain Finality

We only accept transactions with `status: 1` (successful):

```typescript
if (!receipt || receipt.status !== 1) {
  return false;
}
```

### Recipient Verification

All payments must go to the configured receiver:

```typescript
if (recipient.toLowerCase() !== PAYMENT_RECEIVER.toLowerCase()) {
  return false;
}
```

## Error Handling

### Common Error Responses

**402 - Payment Required**
```json
{
  "error": "Payment Required",
  "message": "This endpoint requires payment of X USDC"
}
```

**400 - Invalid Transaction**
```json
{
  "error": "Invalid payment transaction",
  "message": "Transaction not found or amount insufficient"
}
```

**400 - Payment Already Used**
```json
{
  "error": "Payment already used",
  "message": "This transaction hash has already been used"
}
```

**500 - Verification Error**
```json
{
  "error": "Payment verification failed",
  "message": "Could not verify transaction on Arc Network"
}
```

## Performance Optimization

### Caching Strategy

1. **Payment Cache** - 1 hour TTL
   - Stores verified transaction hashes
   - Prevents re-verification
   - Allows re-fetching data

2. **Data Cache** - 5 minutes TTL (in defiData service)
   - Reduces DeFiLlama API calls
   - Improves response time
   - Still provides fresh data

### RPC Optimization

To reduce RPC calls to Arc Network:

- Check payment cache BEFORE blockchain verification
- Use batch RPC requests for multiple verifications
- Cache provider instances

```typescript
// Good - cache hit avoids RPC call
if (paymentCache.isUsed(txHash)) {
  return false;
}

// Only call RPC if not cached
const isValid = await circleService.verifyUSDCTransaction(txHash, amount);
```

## Testing

### Manual Testing

```bash
# Get payment requirements
curl -H "X-API-Key: YOUR_KEY" \
  http://localhost:3001/api/data/yields/aave

# Send payment using Circle CLI or wallet

# Verify payment works
curl -H "X-API-Key: YOUR_KEY" \
     -H "X-Payment-Tx: 0x..." \
  http://localhost:3001/api/data/yields/aave

# Test cache - should work instantly
curl -H "X-API-Key: YOUR_KEY" \
     -H "X-Payment-Tx: 0x..." \
  http://localhost:3001/api/data/yields/aave
```

### Automated Testing

Test scenarios:

1. ✅ **No payment header** → 402 response
2. ✅ **Invalid TX hash** → 402 response
3. ✅ **Insufficient amount** → 402 response
4. ✅ **Wrong recipient** → 402 response
5. ✅ **Valid payment** → 200 + data
6. ✅ **Cached payment** → 200 + data (no RPC call)
7. ✅ **Double-spend attempt** → 400 error

## Future Enhancements

### Subscriptions

Allow monthly unlimited access:

```typescript
if (req.user.hasSubscription) {
  next(); // Skip payment check
} else {
  requirePayment(amount);
}
```

### Payment Channels

For high-frequency users, implement state channels:

- Open channel with deposit
- Sign off-chain payment proofs
- Only verify on-chain when closing channel
- Reduces transaction costs

### Multi-Currency Support

Accept multiple tokens:

```json
{
  "payment": {
    "options": [
      { "amount": "0.002", "currency": "USDC" },
      { "amount": "0.0000005", "currency": "ETH" },
      { "amount": "0.00005", "currency": "ARC" }
    ]
  }
}
```

## References

- [HTTP 402 Specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
- [Arc Network Documentation](https://docs.arc.network)
- [Circle Wallets SDK](https://developers.circle.com)
- [Ethereum JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)

---

**Built with Arc Network for instant, low-cost micropayments** ⚡

import { useState, useEffect } from 'react';

interface DataProduct {
  id: string;
  name: string;
  description: string;
  category: 'yields' | 'prices' | 'tvl' | 'volume' | 'analytics';
  price: number;
  protocol?: string;
  endpoint: string;
  updateFrequency: string;
  dataFields: string[];
}

interface MarketplaceProps {
  walletId?: string;
}

export function Marketplace({ walletId }: MarketplaceProps) {
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get wallet ID from env or prop
  const activeWalletId = walletId || import.meta.env.VITE_PRIMARY_WALLET_ID;

  useEffect(() => {
    loadProducts();
    if (activeWalletId) {
      loadPurchasedProducts();
    }
  }, [activeWalletId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/data/catalog', {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY || '',
        },
      });
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to load data products');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data products');
    } finally {
      setLoading(false);
    }
  };

  const loadPurchasedProducts = async () => {
    if (!activeWalletId) return;

    try {
      // Note: This endpoint may need to be updated on the backend
      const response = await fetch(`/api/data/purchased/${activeWalletId}`, {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY || '',
        },
      });
      const result = await response.json();
      if (result.success) {
        setPurchasedIds(new Set(result.data.map((product: DataProduct) => product.id)));
      }
    } catch (err: any) {
      console.error('Failed to load purchased data products:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/data/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'X-API-Key': import.meta.env.VITE_API_KEY || '',
        },
      });
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to search data products');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search data products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products;

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Loading data products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: 'var(--secondary)', opacity: 0.8 }}>Error: {error}</p>
        <button onClick={loadProducts} style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>DeFi Data Products</h2>
            <p style={{ color: 'var(--secondary)', opacity: 0.7, fontSize: '0.875rem', margin: 0 }}>
              Browse {products.length} available data feeds
            </p>
          </div>
          <button
            onClick={() => {
              loadProducts();
              if (activeWalletId) {
                loadPurchasedProducts();
              }
            }}
            style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by name, protocol, or category..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '6px',
              fontSize: '0.875rem',
              outline: 'none',
              color: 'var(--secondary)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.1)';
            }}
          />
          <button
            onClick={handleSearch}
            style={{ width: 'auto', padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
          >
            Search
          </button>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                loadProducts();
              }}
              style={{
                width: 'auto',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                background: 'transparent',
                color: 'var(--secondary)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Data Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)', opacity: 0.7 }}>
            <p>No data products found. Try a different search term.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid var(--accent-dark)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = 'var(--accent-dark)';
                }}
              >
                <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {purchasedIds.has(product.id) && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
                      }}
                    >
                      ✓ Purchased
                    </span>
                  )}
                  {product.category && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent)',
                        color: 'var(--secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid var(--accent-dark)',
                      }}
                    >
                      {product.category}
                    </span>
                  )}
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--secondary)',
                    marginBottom: '0.5rem',
                    marginTop: 0,
                  }}
                >
                  {product.name}
                </h3>
                {product.protocol && (
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--primary)',
                      opacity: 0.9,
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                    }}
                  >
                    Protocol: {product.protocol}
                  </p>
                )}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--secondary)',
                    opacity: 0.8,
                    marginBottom: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--primary)',
                      }}
                    >
                      {product.price} USDC
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--secondary)',
                        opacity: 0.6,
                      }}
                    >
                      Updates: {product.updateFrequency}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


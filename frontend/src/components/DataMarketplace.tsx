/**
 * Data Marketplace Component
 * 
 * Browse and access DeFi data products with micropayments
 */

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

interface DataMarketplaceProps {
  walletId?: string;
}

const categoryColors: Record<string, string> = {
  yields: '#10b981',
  prices: '#3b82f6',
  tvl: '#8b5cf6',
  volume: '#f59e0b',
  analytics: '#ec4899',
};

const categoryEmojis: Record<string, string> = {
  yields: '📈',
  prices: '💰',
  tvl: '🔒',
  volume: '📊',
  analytics: '🤖',
};

export function DataMarketplace({ walletId }: DataMarketplaceProps) {
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

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

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const categories = Array.from(new Set(products.map(p => p.category)));

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
      {/* Header */}
      <div className="card" style={{
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem', color: 'white' }}>📊 DeFi Data Marketplace</h2>
            <p style={{ opacity: 0.9, fontSize: '0.875rem', margin: 0 }}>
              High-frequency data feeds • Powered by Arc Network
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{products.length}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Data Products</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              background: selectedCategory === null ? 'var(--primary)' : 'transparent',
              color: selectedCategory === null ? 'white' : 'var(--secondary)',
              border: '1px solid rgba(0,0,0,0.1)',
              width: 'auto',
            }}
          >
            All ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                background: selectedCategory === cat ? categoryColors[cat] : 'transparent',
                color: selectedCategory === cat ? 'white' : 'var(--secondary)',
                border: `1px solid ${selectedCategory === cat ? categoryColors[cat] : 'rgba(0,0,0,0.1)'}`,
                width: 'auto',
              }}
            >
              {categoryEmojis[cat]} {cat} ({products.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            {/* Category Badge */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: categoryColors[product.category],
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              fontSize: '0.75rem',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}>
              {categoryEmojis[product.category]} {product.category}
            </div>

            {/* Product Info */}
            <div style={{ marginBottom: '1rem', paddingRight: '80px' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>{product.name}</h3>
              {product.protocol && (
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  Protocol: {product.protocol}
                </div>
              )}
              <p style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: '1.5', margin: '0.5rem 0' }}>
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              border: '1px solid rgba(102, 126, 234, 0.15)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.25rem' }}>
                    Micropayment Price
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {product.price} USDC
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Updates</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{product.updateFrequency}</div>
                </div>
              </div>
            </div>

            {/* Data Fields */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                📋 Data Fields:
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {product.dataFields.slice(0, 5).map((field, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(0,0,0,0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    {field}
                  </span>
                ))}
                {product.dataFields.length > 5 && (
                  <span style={{ fontSize: '0.75rem', opacity: 0.6, padding: '0.25rem 0.5rem' }}>
                    +{product.dataFields.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  background: 'var(--primary)',
                  color: 'white',
                }}
                onClick={() => {
                  // This will be handled by the chat interface
                  alert(`Use the chat to purchase: "Get ${product.name}"`);
                }}
              >
                💬 Buy via Chat
              </button>
              <button
                style={{
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  background: 'transparent',
                  color: 'var(--secondary)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  width: 'auto',
                }}
                onClick={() => {
                  window.open(`https://testnet.arcscan.app`, '_blank');
                }}
                title="View on Arc Network Explorer"
              >
                🌐
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ opacity: 0.6 }}>No data products found in this category.</p>
        </div>
      )}

      {/* Arc Network Badge */}
      <div className="card" style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        textAlign: 'center',
        border: 'none',
        boxShadow: '0 8px 24px rgba(30, 58, 138, 0.25)',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
        <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Powered by Arc Network</h3>
        <p style={{ opacity: 0.9, fontSize: '0.875rem', marginBottom: '1rem' }}>
          Ultra-low fees • High-speed transactions • Perfect for micropayments
        </p>
        <button
          onClick={() => window.open('https://arc.network', '_blank')}
          style={{
            background: 'white',
            color: '#1e3a8a',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            width: 'auto',
          }}
        >
          Learn More About Arc Network →
        </button>
      </div>
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (view: string) => void;
  currentView: string;
  selectedWalletId: string | null;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onNavigate, currentView, selectedWalletId, isMobile = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{
          position: 'fixed',
          left: isMobile ? (isOpen ? 0 : '-260px') : 0,
          top: 0,
          height: '100vh',
          width: '260px',
          backgroundColor: '#1e293b',
          color: 'white',
          overflowY: 'auto',
          zIndex: 1000,
          borderRight: '1px solid rgba(255,255,255,0.1)',
          transition: 'left 0.3s ease',
        }}
      >
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, lineHeight: 1.4 }}>
                Arc Network
              </div>
              <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, lineHeight: 1.4 }}>
                Data
              </div>
              <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, lineHeight: 1.4 }}>
                Marketplace
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: '0.5rem 0 0 0', fontWeight: 400 }}>
              {currentView === 'chat' ? 'AI-powered DeFi data access' : currentView === 'marketplace' ? 'Browse data feeds' : 'Dashboard'}
            </p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => onNavigate('chat')}
              className={`nav-button ${currentView === 'chat' ? 'nav-active' : ''}`}
              style={{
                padding: '0.75rem 1rem',
                background: currentView === 'chat' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: currentView === 'chat' ? 'white' : 'rgba(255,255,255,0.8)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: currentView === 'chat' ? 600 : 400,
                width: '100%',
                boxShadow: currentView === 'chat' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
              }}
            >
              Chat
            </button>

            <button
              onClick={() => onNavigate('marketplace')}
              className={`nav-button ${currentView === 'marketplace' ? 'nav-active' : ''}`}
              style={{
                padding: '0.75rem 1rem',
                background: currentView === 'marketplace' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: currentView === 'marketplace' ? 'white' : 'rgba(255,255,255,0.8)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: currentView === 'marketplace' ? 600 : 400,
                width: '100%',
                boxShadow: currentView === 'marketplace' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
              }}
            >
              📊 Data Products
            </button>

            <button
              onClick={() => onNavigate('wallets')}
              className={`nav-button ${currentView === 'wallets' ? 'nav-active' : ''}`}
              style={{
                padding: '0.75rem 1rem',
                background: currentView === 'wallets' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: currentView === 'wallets' ? 'white' : 'rgba(255,255,255,0.8)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: currentView === 'wallets' ? 600 : 400,
                width: '100%',
                boxShadow: currentView === 'wallets' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
              }}
            >
              Wallets
            </button>

            {selectedWalletId && (
              <>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                    Wallet Details
                  </div>
                  
                  <button
                    onClick={() => onNavigate('balance')}
                    className={`nav-button ${currentView === 'balance' ? 'nav-active' : ''}`}
                    style={{
                      padding: '0.75rem 1rem',
                      background: currentView === 'balance' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      color: currentView === 'balance' ? 'white' : 'rgba(255,255,255,0.8)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.875rem',
                      fontWeight: currentView === 'balance' ? 600 : 400,
                      width: '100%',
                      boxShadow: currentView === 'balance' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                    }}
                  >
                    Balance
                  </button>

                  <button
                    onClick={() => onNavigate('transactions')}
                    className={`nav-button ${currentView === 'transactions' ? 'nav-active' : ''}`}
                    style={{
                      padding: '0.75rem 1rem',
                      background: currentView === 'transactions' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      color: currentView === 'transactions' ? 'white' : 'rgba(255,255,255,0.8)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.875rem',
                      fontWeight: currentView === 'transactions' ? 600 : 400,
                      width: '100%',
                      boxShadow: currentView === 'transactions' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                    }}
                  >
                    Transactions
                  </button>

                  <button
                    onClick={() => onNavigate('transfer')}
                    className={`nav-button ${currentView === 'transfer' ? 'nav-active' : ''}`}
                    style={{
                      padding: '0.75rem 1rem',
                      background: currentView === 'transfer' ? 'linear-gradient(135deg, #667eea 0%, #4f46e5 100%)' : 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      color: currentView === 'transfer' ? 'white' : 'rgba(255,255,255,0.8)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.875rem',
                      fontWeight: currentView === 'transfer' ? 600 : 400,
                      width: '100%',
                      boxShadow: currentView === 'transfer' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                    }}
                  >
                    Transfer
                  </button>
                </div>
              </>
            )}
          </nav>

          {selectedWalletId && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Wallet</div>
              <div style={{ wordBreak: 'break-all', fontSize: '0.7rem', color: 'rgba(255,255,255,0.95)', fontFamily: 'monospace' }}>{selectedWalletId.substring(0, 24)}...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
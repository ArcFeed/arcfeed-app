import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { DashboardView } from './components/DashboardView';
import { Marketplace } from './components/Marketplace';
import { DataMarketplace } from './components/DataMarketplace';

function App() {
  const [currentView, setCurrentView] = useState('chat');
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransferComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Sidebar
        isOpen={true}
        onNavigate={handleNavigate}
        currentView={currentView}
        selectedWalletId={selectedWalletId}
      />

      <main
        className="app-main"
        style={{
          marginLeft: '260px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <header
          className="app-header"
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderBottom: '1px solid var(--accent-dark)',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0
              }}>
                ArcFeed
              </h1>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--secondary)',
                opacity: 0.7,
                fontWeight: 500
              }}>
                {currentView === 'chat' ? 'AI Assistant' :
                 currentView === 'marketplace' ? 'Data Marketplace' :
                 currentView === 'wallets' ? 'Wallet Management' : 'Dashboard'}
              </span>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(102, 126, 234, 0.08)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              color: 'var(--primary)',
              fontWeight: 600,
              border: '1px solid rgba(102, 126, 234, 0.15)'
            }}>
              ⚡ Arc Network
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            background: currentView === 'chat' ? '#ffffff' : 'var(--accent)',
            padding: currentView === 'chat' ? '0' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {currentView === 'chat' ? (
            <ChatInterface />
          ) : currentView === 'marketplace' ? (
            <DataMarketplace walletId={selectedWalletId || undefined} />
          ) : currentView === 'legacy-marketplace' ? (
            <Marketplace walletId={selectedWalletId || undefined} />
          ) : (
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              <DashboardView
                view={currentView}
                selectedWalletId={selectedWalletId}
                onSelectWallet={setSelectedWalletId}
                refreshKey={refreshKey}
                onTransferComplete={handleTransferComplete}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
import { useState, useRef, useEffect } from 'react';
import { chatApi } from '../services/api';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: 'Hello! I\'m your ArcFeed assistant. I can help you access DeFi data feeds through micropayments on Arc Network. Ask me about yield data, token prices, TVL metrics, or any DeFi analytics. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setLoading(true);

    try {
      console.log('Sending message to API:', messageToSend);
      // Call the chat API
      const response = await chatApi.sendMessage(messageToSend);
      console.log('Received response from API:', response);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', minHeight: 0, background: '#ffffff' }}>
      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: '2rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '768px',
            width: '100%',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {messages.length === 1 && messages[0].role === 'agent' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--secondary)',
                  marginBottom: '0.5rem',
                  margin: 0,
                }}
              >
                ArcFeed Data Marketplace
              </h1>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--secondary)',
                  opacity: 0.7,
                  marginTop: '0.5rem',
                }}
              >
                Access DeFi data with Arc Network micropayments
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
            >
              {message.role === 'agent' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  AI
                </div>
              )}
              <div
                className="fade-in"
                style={{
                  maxWidth: window.innerWidth < 768 ? '90%' : '85%',
                  padding: message.role === 'user' ? '0.75rem 1rem' : '1rem 1.25rem',
                  borderRadius: message.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  backgroundColor: message.role === 'user' ? 'var(--primary)' : '#f8f9fa',
                  color: message.role === 'user' ? 'white' : 'var(--secondary)',
                  wordWrap: 'break-word',
                  fontSize: '0.9375rem',
                  lineHeight: '1.5',
                  boxShadow: message.role === 'user'
                    ? '0 2px 8px rgba(99, 102, 241, 0.25)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
              </div>
              {message.role === 'user' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  U
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                AI
              </div>
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '18px 18px 18px 4px',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', opacity: 0.4, animation: 'typing 1.4s infinite' }}></span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', opacity: 0.4, animation: 'typing 1.4s infinite 0.2s' }}></span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', opacity: 0.4, animation: 'typing 1.4s infinite 0.4s' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          padding: window.innerWidth < 768 ? '1rem' : '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '768px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: '#f8f9fa',
                borderRadius: '28px',
                border: '2px solid transparent',
                padding: '0.75rem 1.25rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(99, 102, 241, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about DeFi data feeds..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  color: 'var(--secondary)',
                  padding: 0,
                }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  padding: '0.5rem',
                  background: loading || !input.trim() ? 'transparent' : 'var(--primary)',
                  color: loading || !input.trim() ? 'var(--secondary)' : 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  opacity: loading || !input.trim() ? 0.5 : 1,
                }}
                title="Send message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1.5L14.5 8L1.5 14.5L4 8L1.5 1.5Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--secondary)',
              opacity: 0.6,
              textAlign: 'center',
              marginTop: '0.75rem',
              marginBottom: 0,
            }}
          >
            ArcFeed AI can make mistakes. Verify important transaction details.
          </p>
        </div>
      </div>
    </div>
  );
}
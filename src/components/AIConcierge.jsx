import { t } from '../i18n';
import { useState, useRef, useEffect } from 'react';

const SUGGESTED = [
  { icon: '📈', text: 'Best areas to invest in Dubai' },
  { icon: '⚡', text: 'What is the Market Score?' },
  { icon: '🏢', text: 'New launches in JVC' },
  { icon: '⏰', text: 'My portfolio' },
  { icon: '⚡', text: 'Upgrade to Portfolio Pro' },
];

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 16,
    }}>
      {!isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '72%',
        background: isUser ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'var(--surface)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: isUser ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
        padding: '12px 16px',
      }}>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {msg.content}
        </div>
        <div style={{ fontSize: 11, color: isUser ? 'rgba(255,255,255,0.5)' : '#475569', marginTop: 6 }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

export default function AIConcierge() {
  const lang = localStorage.getItem('lang') || 'en';
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: lang === 'ar' ? 'مرحباً! أنا مساعدك الذكي في PropSight. كيف يمكنني مساعدتك في استثماراتك العقارية في دبي اليوم؟' : "Hello! I'm your PropSight AI Concierge. How can I assist you with your Dubai property investments today?",
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { role: 'user', content: msg, time }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1000,
          system: `You are PropSight AI Concierge, an expert Dubai real estate investment advisor. 
You have deep knowledge of Dubai property market, DLD data, ROI calculations, and investment strategies.
Be concise, data-driven, and professional. Format responses clearly with bullet points when listing items.
Key Dubai market facts: Average price/sqft AED 1,200-4,500 depending on area, rental yields 5-9%, 
top areas: JVC, Business Bay, Dubai Marina, Downtown, Dubai Hills, Palm Jumeirah.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'I apologize, I could not process your request right now.';

      setMessages(prev => [...prev, {
        role: 'assistant', content: reply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. Please check your connection and try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      flex: 1, display: 'flex', background: 'var(--bg)',
      fontFamily: 'system-ui', height: '100vh', overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 260, flexShrink: 0, background: 'var(--bg-alt)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', padding: '16px',
      }}>
        <button style={{
          width: '100%', padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#16A34A,#22C55E)',
          color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
        }}>
          <span style={{ fontSize: 16 }}>+</span> New Chat
        </button>
        <div style={{ fontSize: 12, color: '#475569', textAlign: 'center', marginTop: 20 }}>
          No conversations yet
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => {}} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: 13, padding: '8px 0',
        }}>
          ← Back
        </button>
      </div>

      {/* Main chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, position: 'relative',
            }}>
              🤖
              <div style={{
                position: 'absolute', bottom: 1, right: 1,
                width: 10, height: 10, borderRadius: '50%',
                background: '#22C55E', border: '2px solid #070E1B',
              }}/>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{t('AI Concierge title',lang)}</div>
              <div style={{ fontSize: 12, color: '#22C55E' }}>
                Online • <span style={{ color: 'var(--text-muted)' }}>Ready to assist</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['🗑️', '⬇️'].map((icon, i) => (
              <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#475569' }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>🤖</div>
              <div style={{
                background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px 14px 14px 14px', padding: '14px 18px',
                display: 'flex', gap: 6, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#38BDF8',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested + Input */}
        <div style={{ padding: '0 24px 24px' }}>
          {messages.length <= 1 && (
            <>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
                {SUGGESTED.slice(0, 4).map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s.text)} style={{
                    padding: '8px 14px', borderRadius: 20,
                    background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontFamily: 'system-ui',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span>{s.icon}</span> {s.text}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <button onClick={() => sendMessage(SUGGESTED[4].text)} style={{
                  padding: '8px 14px', borderRadius: 20,
                  background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontFamily: 'system-ui',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>{SUGGESTED[4].icon}</span> {SUGGESTED[4].text}
                </button>
              </div>
              <div style={{ textAlign: 'center', fontSize: 12, color: '#334155', marginBottom: 12 }}>
                Type @ for projects, / for commands
              </div>
            </>
          )}

          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '10px 14px',
          }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: 18 }}>
              📎
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Message PropSight AI..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 14, fontFamily: 'system-ui',
              }}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
              width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: input.trim() ? 'linear-gradient(135deg,#16A34A,#22C55E)' : 'rgba(34,197,94,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 16,
            }}>→</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

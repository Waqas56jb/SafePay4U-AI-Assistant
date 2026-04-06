import React from 'react';

const formatMessage = (text) => {
  if (!text) return '';
  
  // 1. Handle code blocks first
  let formatted = text.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:12px">$1</code>');
  
  // 2. Handle bold and italic
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // 3. Handle bullet points and lists robustly
  const lines = formatted.split('\n');
  let inList = false;
  let listItems = [];
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('• ') || line.startsWith('- ') || /^\d+\. /.test(line)) {
      if (!inList) inList = true;
      listItems.push(`<li>${line.replace(/^(•|-|\d+\.)\s+/, '')}</li>`);
    } else {
      if (inList) {
        processedLines.push(`<ul>${listItems.join('')}</ul>`);
        listItems = [];
        inList = false;
      }
      if (line !== '') {
        processedLines.push(line);
      }
    }
  }
  if (inList) {
    processedLines.push(`<ul>${listItems.join('')}</ul>`);
  }

  return processedLines.join('<br>');
};

function BrandMark({ className, size = 40 }) {
  return (
    <img
      src="/logo.png"
      alt=""
      className={className}
      width={size}
      height={size}
      decoding="async"
    />
  );
}

const MessagesContainer = ({ messages, isLoading, onSendChip, onOpenFeeCalculator, messagesEndRef, showHome, onContinue }) => {
  const hasMessages = messages.length > 0;
  const showWelcome = !hasMessages || showHome;

  return (
    <div className="messages-container" id="messagesContainer">
      {showWelcome && (
        <div className="welcome-screen" id="welcomeScreen">
          <div className="welcome-avatar">
            <BrandMark className="welcome-logo-img" size={112} />
          </div>
          <h2>Hi, I'm SafePay AI</h2>
          <p>
            Your intelligent escrow assistant for <strong>SafePay4U</strong> — the trusted neutral escrow platform
            protecting buyers and sellers in high-value transactions. Ask me anything about escrow, fees, disputes, or how
            to start — in <strong>any language</strong>.
          </p>
          <div className="welcome-chips">
            <div className="welcome-chip" onClick={() => onSendChip('How does SafePay4U escrow work step by step?')}>🔄 How escrow works</div>
            <div className="welcome-chip" onClick={() => onSendChip('What are the exact escrow fees for a $25,000 transaction?')}>💰 Calculate fees</div>
            <div className="welcome-chip" onClick={onOpenFeeCalculator}>📊 Fee table</div>
            <div className="welcome-chip" onClick={() => onSendChip('What is the dispute resolution process?')}>⚖️ Dispute process</div>
            <div className="welcome-chip" onClick={() => onSendChip('What are the verification tiers?')}>✅ Verification tiers</div>
            <div className="welcome-chip" onClick={() => onSendChip('How does vehicle escrow work with VIN and title?')}>🚗 Vehicle escrow</div>
            <div className="welcome-chip" onClick={() => onSendChip('¿Cómo funciona el escrow con SafePay4U?')}>🇪🇸 Español</div>
            <div className="welcome-chip" onClick={() => onSendChip('Comment fonctionne SafePay4U?')}>🇫🇷 Français</div>
          </div>
          {hasMessages && showHome && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '16px' }}>
              <button
                type="button"
                onClick={onContinue}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'linear-gradient(135deg,#00b4d8,#0077b6)',
                  border: 'none', borderRadius: '10px', padding: '11px 22px',
                  fontSize: '14px', fontWeight: '600', color: '#fff', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,119,182,0.3)', transition: 'all 0.2s'
                }}
              >
                💬 Continue Conversation →
              </button>
            </div>
          )}
        </div>
      )}

      {!showWelcome && messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
          <div className={`msg-avatar ${msg.role === 'user' ? 'user-av' : 'bot'}`}>
            {msg.role === 'user' ? '👤' : <BrandMark className="msg-bot-logo" size={64} />}
          </div>
          <div className="msg-content">
            <div 
              className={`msg-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
              dangerouslySetInnerHTML={{ __html: msg.isEscalation ? '' : formatMessage(msg.content) }}
            />
            {msg.isEscalation && (
               <div className="escalation-banner show">
                 📞 <strong>Want to speak with our team?</strong><br />
                 Call <a href="tel:7863571224">786-357-1224</a> · Email <a href="mailto:info@safepay4u.com">info@safepay4u.com</a> · <a href="javascript:void(0)" onClick={() => onOpenLeadModal && onOpenLeadModal()}>Submit a request</a>
               </div>
            )}
            <div className="msg-time">{msg.time}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="message bot" id="typingIndicator">
          <div className="msg-avatar bot">
            <BrandMark className="msg-bot-logo" size={64} />
          </div>
          <div className="msg-content">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;

import React from 'react';

const ChatHeader = ({ langBadge, onClearChat, hasMessages, showHome, onGoHome }) => {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        {hasMessages && !showHome && (
          <button type="button" className="back-home-btn" onClick={onGoHome} title="Back to Home">
            ← Home
          </button>
        )}
        <div className="chat-header-titles">
          <h1>SafePay4U — AI Escrow Assistant</h1>
          <p>Online · Powered by GPT-4o · safepay4u.com</p>
        </div>
      </div>
      <div className="header-actions">
        <span className="lang-badge" id="langBadge">{langBadge}</span>
        <button className="clear-btn" onClick={onClearChat}>🗑 Clear</button>
        <button className="start-btn" onClick={() => window.open('https://safepay4u.com/user/register', '_blank')}>🚀 Start Escrow</button>
      </div>
    </header>
  );
};

export default ChatHeader;

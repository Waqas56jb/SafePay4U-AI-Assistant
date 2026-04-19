import React, { useRef, useEffect, useState } from 'react';
import { VoiceAgent } from './VoiceAgent';

const ChatInput = ({ inputText, setInputText, onSendMessage, isLoading, onVoiceTranscript }) => {
  const textareaRef = useRef(null);
  const [voiceActive, setVoiceActive] = useState(false);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  };

  useEffect(() => { autoResize(); }, [inputText]);

  useEffect(() => {
    if (voiceActive) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [voiceActive]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <>
      {voiceActive && (
        <VoiceAgent onClose={(transcript) => {
          setVoiceActive(false);
          if (onVoiceTranscript && transcript && transcript.length > 0) onVoiceTranscript(transcript);
        }} />
      )}
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            id="userInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="1"
            placeholder="Ask about escrow, fees, disputes, verification... in any language"
            disabled={isLoading}
          />
          <button
            type="button"
            className={`voice-btn${voiceActive ? ' voice-btn--active' : ''}`}
            onClick={() => setVoiceActive(true)}
            title="Start voice input"
            aria-label="Start voice input"
          >
            <svg className="voice-btn__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor"/>
              <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className="send-btn"
            onClick={onSendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            ➤
          </button>
        </div>
        <div className="input-hints">
          <span>Enter to send · Shift+Enter for new line · Responds in your language</span>
          <span>safepay4u.com | 786-357-1224</span>
        </div>
      </div>
    </>
  );
};

export default ChatInput;

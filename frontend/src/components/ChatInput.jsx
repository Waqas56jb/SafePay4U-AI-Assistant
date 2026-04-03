import React, { useRef, useEffect } from 'react';

const ChatInput = ({ inputText, setInputText, onSendMessage, isLoading }) => {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [inputText]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
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
  );
};

export default ChatInput;

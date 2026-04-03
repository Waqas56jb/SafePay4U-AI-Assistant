import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import QuickChips from './components/QuickChips';
import MessagesContainer from './components/MessagesContainer';
import ChatInput from './components/ChatInput';
import FeeCalculator from './components/FeeCalculator';
import LeadForm from './components/LeadForm';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeePanel, setShowFeePanel] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [langBadge, setLangBadge] = useState('🌐 AUTO');
  const [sessionId] = useState('sp4u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textOverride) => {
    const text = textOverride || inputText.trim();
    if (!text || isLoading) return;

    setIsLoading(true);
    setInputText('');

    // Language detection logic
    const langMap = { 'es': '🇪🇸 ES', 'fr': '🇫🇷 FR', 'ar': '🇸🇦 AR', 'de': '🇩🇪 DE', 'zh': '🇨🇳 ZH', 'pt': '🇧🇷 PT', 'hi': '🇮🇳 HI', 'ur': '🇵🇰 UR' };
    for (const [code, label] of Object.entries(langMap)) {
      if (/[\u0600-\u06FF]/.test(text) && code === 'ar') { setLangBadge(label); break; }
      if (/[\u0900-\u097F]/.test(text) && code === 'hi') { setLangBadge(label); break; }
    }

    const newUserMsg = { role: 'user', content: text, time: getTime() };
    setMessages(prev => [...prev, newUserMsg]);

    try {
      const history = messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : m.role, content: m.content }));
      // Filter out any messages with empty content which would cause OpenAI API errors
      const validHistory = history.filter(m => m.content && m.content.trim() !== '');
      validHistory.push({ role: 'user', content: text });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: validHistory, sessionId })
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: `⚠️ **Error:** ${data.error}\n\nPlease ensure your OpenAI API key is configured.\n\nFor direct assistance: **info@safepay4u.com** | **786-357-1224**`, 
          time: getTime() 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: data.reply, time: getTime() }]);
        
        // Show escalation banner if user wants human
        if (/human|agent|person|speak|call|talk|support/i.test(text)) {
           setMessages(prev => [...prev, { 
             role: 'bot', 
             isEscalation: true,
             content: '',
             time: getTime() 
           }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `⚠️ **Connection Error**\n\nUnable to connect to the AI server. Please check that the server is running.\n\nFor immediate help: **786-357-1224** | **info@safepay4u.com**`, 
        time: getTime() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([]);
    setLangBadge('🌐 AUTO');
  };

  return (
    <div className="app-container" style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <Sidebar 
        onSendChip={(text) => sendMessage(text)} 
        onOpenFeeCalculator={() => setShowFeePanel(true)}
        onOpenLeadModal={() => setShowLeadModal(true)}
      />
      
      <main className="main">
        <ChatHeader 
          langBadge={langBadge} 
          onClearChat={clearChat} 
        />
        
        <QuickChips 
          onSendChip={(text) => sendMessage(text)}
          onOpenFeeCalculator={() => setShowFeePanel(true)}
          onOpenLeadModal={() => setShowLeadModal(true)}
        />
        
        <MessagesContainer 
          messages={messages} 
          isLoading={isLoading}
          onSendChip={(text) => sendMessage(text)}
          onOpenFeeCalculator={() => setShowFeePanel(true)}
          onOpenLeadModal={() => setShowLeadModal(true)}
          messagesEndRef={messagesEndRef}
        />
        
        <ChatInput 
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={() => sendMessage()}
          isLoading={isLoading}
        />
      </main>

      {showFeePanel && (
        <FeeCalculator 
          onClose={() => setShowFeePanel(false)} 
        />
      )}

      {showLeadModal && (
        <LeadForm 
          onClose={() => setShowLeadModal(false)}
          onSuccess={(botMsg) => {
            setMessages(prev => [...prev, { role: 'bot', content: botMsg, time: getTime() }]);
          }}
          sessionId={sessionId}
        />
      )}
    </div>
  );
};

export default App;

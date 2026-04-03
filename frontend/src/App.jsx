import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  calcFeeHtml,
  formatMsg,
  getChips,
  getFallbackLocal,
  INPUT_PLACEHOLDERS,
  nowTime,
  WELCOME_MESSAGES
} from './chatEngine.js';

const API = typeof window !== 'undefined' ? window.location.origin : '';

function App() {
  const sessionIdRef = useRef(
    'sp_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  );
  const msgCountRef = useRef(0);
  const historyRef = useRef([]);
  const openRef = useRef(false);
  const messagesElRef = useRef(null);
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState(1);
  const [lang, setLang] = useState('auto');
  const [inputPlaceholder, setInputPlaceholder] = useState(
    'Ask me about fees, how escrow works, transactions...'
  );
  const [activeTab, setActiveTab] = useState('chat');
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcAmount, setCalcAmount] = useState('');
  const [calcResultHtml, setCalcResultHtml] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [escalation, setEscalation] = useState(false);
  const leadCapturedRef = useRef(false);
  const [leadSheetOpen, setLeadSheetOpen] = useState(false);
  const [lfTitle, setLfTitle] = useState('Start a Secure Transaction');
  const [lfSubtitle, setLfSubtitle] = useState(
    'Our escrow specialists will contact you within 1 business hour to set up your transaction.'
  );
  const [lfName, setLfName] = useState('');
  const [lfEmail, setLfEmail] = useState('');
  const [lfPhone, setLfPhone] = useState('');
  const [lfType, setLfType] = useState('general');
  const [lfAmount, setLfAmount] = useState('');
  const [lfNotes, setLfNotes] = useState('');
  const [analyticsView, setAnalyticsView] = useState(null);
  const [leadsView, setLeadsView] = useState(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!openRef.current) setBadge(1);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const appendMsg = useCallback((role, content) => {
    msgCountRef.current += 1;
    setMessages((prev) => [
      ...prev,
      { role, content, time: nowTime(), key: `${Date.now()}-${prev.length}` }
    ]);
  }, []);

  useLayoutEffect(() => {
    const el = messagesElRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const autoGrow = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px';
  }, []);

  const toggleChat = useCallback(() => {
    setOpen((wasOpen) => {
      if (wasOpen) return false;
      setBadge(0);
      if (msgCountRef.current === 0) {
        const l = lang === 'auto' ? 'en' : lang;
        setTimeout(
          () => appendMsg('bot', WELCOME_MESSAGES[l] || WELCOME_MESSAGES.en),
          500
        );
      }
      setTimeout(() => inputRef.current?.focus(), 350);
      return true;
    });
  }, [appendMsg, lang]);

  const setLangFromSelect = (l) => {
    setLang(l);
    const ph = INPUT_PLACEHOLDERS;
    setInputPlaceholder(ph[l] || ph.en);
  };

  const showTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'analytics') loadAnalytics();
    if (tab === 'leads') loadLeads();
  };

  const toggleCalc = () => setCalcOpen((c) => !c);

  const runCalcFee = () => {
    setCalcResultHtml(calcFeeHtml(calcAmount));
  };

  const loadAnalytics = async () => {
    setAnalyticsView(null);
    try {
      const r = await fetch(`${API}/api/analytics`);
      const d = await r.json();
      setAnalyticsView(d);
    } catch {
      setAnalyticsView(false);
    }
  };

  const loadLeads = async () => {
    setLeadsView(null);
    try {
      const r = await fetch(`${API}/api/analytics`);
      const d = await r.json();
      setLeadsView(d);
    } catch {
      setLeadsView(false);
    }
  };

  const exportLeads = () => {
    window.open(`${API}/api/leads/export`, '_blank');
  };

  const sendMsg = async (overrideEncoded) => {
    const inp = inputRef.current;
    const text =
      overrideEncoded !== undefined && overrideEncoded !== null
        ? decodeURIComponent(overrideEncoded)
        : (inp?.value || '').trim();
    if (!text || busy) return;
    if (inp) {
      inp.value = '';
      inp.style.height = 'auto';
    }
    setBusy(true);
    appendMsg('user', text);
    setTyping(true);
    historyRef.current.push({ role: 'user', content: text });

    try {
      const resp = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current,
          conversationHistory: historyRef.current.slice(-12),
          leadInfo: {}
        })
      });
      const data = await resp.json();
      setTyping(false);
      const reply =
        data.response ||
        'I apologize — please try again or contact us at 786-357-1224.';
      appendMsg('bot', reply);
      historyRef.current.push({ role: 'assistant', content: reply });
      if (data.shouldEscalate) setEscalation(true);
      if (data.needsLead && msgCountRef.current > 3 && !leadCapturedRef.current) {
        setTimeout(() => openLead(), 1800);
      }
    } catch {
      setTyping(false);
      appendMsg('bot', getFallbackLocal(text));
    }
    setBusy(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  const openLead = (type) => {
    if (type === 'partner') {
      setLfTitle('🤝 Partnership Inquiry');
      setLfSubtitle('Tell us about your business and integration needs.');
      setLfType('partnership');
    } else {
      setLfTitle('Start a Secure Transaction');
      setLfSubtitle('Our escrow specialists will contact you within 1 business hour.');
    }
    setLeadSheetOpen(true);
  };

  const closeLead = () => setLeadSheetOpen(false);

  const submitLead = async () => {
    const name = lfName.trim();
    const email = lfEmail.trim();
    const phone = lfPhone.trim();
    const type = lfType;
    const amount = lfAmount.trim();
    const notes = lfNotes.trim();
    if (!email && !phone) {
      alert('Please provide an email or phone number.');
      return;
    }
    try {
      await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          transactionType: type,
          amount,
          notes,
          sessionId: sessionIdRef.current,
          lang
        })
      });
    } catch {
      console.log('Lead saved offline');
    }
    leadCapturedRef.current = true;
    setLeadSheetOpen(false);
    const confirmMsg =
      lang === 'es'
        ? `🛡️ <span class="badge-green">¡Gracias${name ? ', ' + name : ''}!</span> Sus datos han sido recibidos de forma segura.<br><br>Nuestro equipo de especialistas en escrow le contactará pronto.<br><br>📞 <strong>786-357-1224</strong><br>✉️ <strong>info@safepay4u.com</strong><br>🌐 safepay4u.com`
        : `🛡️ <span class="badge-green">Thank you${name ? ', ' + name : ''}!</span> Your details have been received securely.<br><br>Our escrow specialists will contact you shortly to assist with your transaction.<br><br>📞 <strong>786-357-1224</strong><br>✉️ <strong>info@safepay4u.com</strong><br>🌐 safepay4u.com`;
    appendMsg('bot', confirmMsg);
    setActiveTab('chat');
  };

  const chips = getChips(lang);

  const renderAnalyticsInner = () => {
    if (analyticsView === null) {
      return (
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Loading analytics...</p>
      );
    }
    if (analyticsView === false) {
      return (
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
          Connect the server to view analytics.
          <br />
          Run: <code>node backend/server.js</code>
        </p>
      );
    }
    const d = analyticsView;
    const maxI = d.topIntents?.[0]?.[1] || 1;
    const langHTML = (d.languages || []).map(([l, c]) => (
      <span key={l} className="lang-pill">
        {l.toUpperCase()} ({c})
      </span>
    ));
    return (
      <>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-val">{d.totalMessages || 0}</div>
            <div className="stat-lbl">Messages</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">{d.totalSessions || 0}</div>
            <div className="stat-lbl">Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">{d.totalLeads || 0}</div>
            <div className="stat-lbl">Leads</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">{d.totalConvos || 0}</div>
            <div className="stat-lbl">Conversations</div>
          </div>
        </div>
        <div className="sec-title">Languages Used</div>
        <div className="lang-pills">
          {langHTML.length > 0 ? (
            langHTML
          ) : (
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>No data yet</span>
          )}
        </div>
        <div className="sec-title">Top User Intents</div>
        {(d.topIntents || []).map(([k, v]) => (
          <div key={k} className="intent-row">
            <div className="intent-name">{k.replace(/_/g, ' ')}</div>
            <div className="intent-track">
              <div
                className="intent-bar"
                style={{ width: `${Math.round((v / maxI) * 100)}%` }}
              />
            </div>
            <div className="intent-num">{v}</div>
          </div>
        ))}
        <div className="sec-title" style={{ marginTop: '14px' }}>
          Recent Conversations
        </div>
        {(d.conversations || []).map((c) => (
          <div key={c.id} className="lead-item">
            <div>
              <div className="lead-name">{c.id}</div>
              <div className="lead-sub">
                {c.messages} msgs · {c.lang || 'en'}
              </div>
            </div>
            <span className="lead-badge">{c.lang || 'en'}</span>
          </div>
        ))}
        <button type="button" className="export-btn" onClick={exportLeads}>
          ⬇ Export Leads CSV
        </button>
      </>
    );
  };

  const renderLeadsInner = () => {
    if (leadsView === null) {
      return (
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Loading leads data...</p>
      );
    }
    if (leadsView === false) {
      return (
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No leads yet.</p>
      );
    }
    if (!leadsView.recentLeads?.length) {
      return (
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
          No leads yet. Engage visitors to generate leads.
        </p>
      );
    }
    const d = leadsView;
    return (
      <>
        <div className="sec-title">
          Recent Leads ({d.totalLeads} total)
        </div>
        {d.recentLeads.map((l, idx) => (
          <div key={idx} className="lead-item">
            <div>
              <div className="lead-name">{l.name || 'Unknown'}</div>
              <div className="lead-sub">
                {l.email || ''} {l.phone ? '· ' + l.phone : ''}
              </div>
              <div className="lead-sub">
                {l.transactionType || 'general'}{' '}
                {l.amount ? '· $' + l.amount : ''}
              </div>
              <div className="lead-sub">{new Date(l.timestamp).toLocaleDateString()}</div>
            </div>
            <span className="lead-badge">{l.lang || 'en'}</span>
          </div>
        ))}
        <button type="button" className="export-btn" onClick={exportLeads}>
          ⬇ Export All Leads CSV
        </button>
      </>
    );
  };

  return (
    <>
      <button
        type="button"
        id="sp-fab"
        onClick={toggleChat}
        title="Chat with SafePay4U AI"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 15h-1v-6h1v6zm0-8h-1V6h1v2z" />
        </svg>
        <span
          id="sp-notif"
          style={{ display: badge > 0 ? 'flex' : 'none' }}
        >
          {badge}
        </span>
      </button>

      <div id="sp-container" className={open ? 'open' : ''}>
        <div id="sp-header">
          <div className="hdr-logo">SP</div>
          <div className="hdr-text">
            <div className="hdr-name">SafePay4U AI Assistant</div>
            <div className="hdr-status">
              <span className="hdr-dot" />
              <span id="status-text">Online · Secure Escrow Platform</span>
            </div>
          </div>
          <div className="hdr-actions">
            <select
              id="lang-sel"
              value={lang}
              onChange={(e) => setLangFromSelect(e.target.value)}
              title="Language"
            >
              <option value="auto">🌐</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="pt">PT</option>
              <option value="de">DE</option>
              <option value="ar">AR</option>
              <option value="zh">ZH</option>
              <option value="ru">RU</option>
            </select>
            <button type="button" className="hdr-btn" onClick={toggleCalc} title="Fee Calculator">
              💰
            </button>
            <button type="button" className="hdr-btn" onClick={toggleChat} title="Close">
              ✕
            </button>
          </div>
        </div>

        <div id="sp-tabs">
          <button
            type="button"
            className={`sp-tab${activeTab === 'chat' ? ' active' : ''}`}
            onClick={() => showTab('chat')}
            id="t-chat"
          >
            💬 Chat
          </button>
          <button
            type="button"
            className={`sp-tab${activeTab === 'analytics' ? ' active' : ''}`}
            onClick={() => showTab('analytics')}
            id="t-analytics"
          >
            📊 Analytics
          </button>
          <button
            type="button"
            className={`sp-tab${activeTab === 'leads' ? ' active' : ''}`}
            onClick={() => showTab('leads')}
            id="t-leads"
          >
            👥 Leads
          </button>
        </div>

        <div id="sp-chips" style={{ display: activeTab === 'chat' ? 'block' : 'none' }}>
          <div className="chips-scroll" id="chips-wrap">
            {chips.map((c, i) => (
              <button
                key={i}
                type="button"
                className="chip"
                onClick={() => sendMsg(encodeURIComponent(c.q))}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>

        <div id="sp-calc" className={calcOpen ? 'show' : ''}>
          <div className="calc-title">💰 Instant Fee Calculator</div>
          <div className="calc-row">
            <input
              type="number"
              id="calc-amount"
              placeholder="Transaction amount (USD)"
              min="0"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
            />
            <button type="button" id="calc-btn" onClick={runCalcFee}>
              Calculate
            </button>
          </div>
          {calcResultHtml ? (
            <div id="calc-result" dangerouslySetInnerHTML={{ __html: calcResultHtml }} />
          ) : (
            <div id="calc-result" />
          )}
        </div>

        <div id="sp-escalation" className={escalation ? 'show' : ''}>
          <div className="esc-title">🙋 Connect with our team</div>
          <div className="esc-body">Our escrow specialists are ready to assist you directly.</div>
          <div className="esc-row">
            <button
              type="button"
              className="esc-cta esc-call"
              onClick={() => window.open('tel:7863571224')}
            >
              📞 786-357-1224
            </button>
            <button
              type="button"
              className="esc-cta esc-email"
              onClick={() => window.open('mailto:info@safepay4u.com')}
            >
              ✉️ Email Us
            </button>
          </div>
        </div>

        <div
          id="panel-chat"
          style={{ display: activeTab === 'chat' ? 'flex' : 'none' }}
        >
          <div id="sp-messages" ref={messagesElRef}>
            {messages.map((m) => (
              <div
                key={m.key}
                className={'msg-row' + (m.role === 'user' ? ' user' : '')}
              >
                <div className={m.role === 'user' ? 'msg-av user-av' : 'msg-av bot-av'}>
                  {m.role === 'user' ? 'U' : 'SP'}
                </div>
                <div className="msg-body">
                  <div
                    className={m.role === 'user' ? 'bubble user' : 'bubble bot'}
                    dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }}
                  />
                  <div className="msg-time">{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="msg-row" id="typing-indicator">
                <div className="msg-av bot-av">SP</div>
                <div className="msg-body">
                  <div className="bubble bot typing-bubble">
                    <div className="typing-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          id="panel-analytics"
          style={{ display: activeTab === 'analytics' ? 'block' : 'none' }}
        >
          <div id="analytics-content">{renderAnalyticsInner()}</div>
        </div>

        <div id="panel-leads" style={{ display: activeTab === 'leads' ? 'block' : 'none' }}>
          <div id="leads-content">{renderLeadsInner()}</div>
        </div>

        <div
          id="sp-lead-sheet"
          style={{ display: leadSheetOpen ? 'flex' : 'none' }}
        >
          <div className="lead-card">
            <div className="lead-card-header">
              <div className="lead-icon">🛡️</div>
              <div>
                <h3 id="lf-title">{lfTitle}</h3>
              </div>
            </div>
            <p id="lf-subtitle">{lfSubtitle}</p>
            <div className="lf-grid">
              <div className="lf-field">
                <label>Full Name</label>
                <input
                  type="text"
                  id="lf-name"
                  placeholder="Your full name"
                  value={lfName}
                  onChange={(e) => setLfName(e.target.value)}
                />
              </div>
              <div className="lf-field">
                <label>Transaction Type</label>
                <select
                  id="lf-type"
                  value={lfType}
                  onChange={(e) => setLfType(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="vehicle">Vehicle / Car</option>
                  <option value="domain">Domain / Website</option>
                  <option value="equipment">Equipment / Machinery</option>
                  <option value="milestone">Milestone Service</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="ip">Intellectual Property</option>
                  <option value="international">International Deal</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>
              <div className="lf-field">
                <label>Email Address</label>
                <input
                  type="email"
                  id="lf-email"
                  placeholder="your@email.com"
                  value={lfEmail}
                  onChange={(e) => setLfEmail(e.target.value)}
                />
              </div>
              <div className="lf-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  id="lf-phone"
                  placeholder="+1 (000) 000-0000"
                  value={lfPhone}
                  onChange={(e) => setLfPhone(e.target.value)}
                />
              </div>
              <div className="lf-field lf-full">
                <label>Transaction Amount (USD)</label>
                <input
                  type="text"
                  id="lf-amount"
                  placeholder="Approximate amount e.g. $50,000"
                  value={lfAmount}
                  onChange={(e) => setLfAmount(e.target.value)}
                />
              </div>
              <div className="lf-field lf-full">
                <label>Additional Notes</label>
                <textarea
                  id="lf-notes"
                  rows={2}
                  placeholder="Describe your transaction briefly..."
                  value={lfNotes}
                  onChange={(e) => setLfNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="lf-actions">
              <button type="button" id="lf-cancel" onClick={closeLead}>
                Cancel
              </button>
              <button type="button" id="lf-submit" onClick={submitLead}>
                🛡️ Submit Securely
              </button>
            </div>
          </div>
        </div>

        <div
          id="sp-input-wrap"
          style={{ display: activeTab === 'chat' ? 'block' : 'none' }}
        >
          <div className="input-row">
            <textarea
              id="sp-input"
              ref={inputRef}
              placeholder={inputPlaceholder}
              rows={1}
              onKeyDown={handleKeyDown}
              onInput={autoGrow}
            />
            <div className="input-actions">
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => openLead()}
                title="Start Transaction"
              >
                🛡️
              </button>
              <button type="button" id="sp-send" onClick={() => sendMsg()} title="Send">
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="input-hint">Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </>
  );
}

export default App;

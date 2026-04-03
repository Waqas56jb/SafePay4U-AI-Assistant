require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ============================================================
// SAFEPAY4U COMPLETE KNOWLEDGE BASE
// ============================================================
const KNOWLEDGE_BASE = `
=== SAFEPAY4U COMPLETE KNOWLEDGE BASE FOR AI TRAINING ===

COMPANY IDENTITY:
- Name: SafePay4U (safepay4u.com)
- Type: Premier online escrow and milestone payment platform — neutral third-party escrow service
- Tagline: "Your Reliable Escrow Partner — Protecting Buyers and Sellers Alike"
- Address: 5901 NW 151st ST Miami Lakes FL 33014
- Email: info@safepay4u.com
- Phone: 786-357-1224
- Hours: Monday–Friday 8:00 AM – 4:00 PM Pacific Time
- Website: https://safepay4u.com
- Stats: 20 years of experience, 41 million happy clients, 18,000 transactions completed
- Metrics: 95% Escrow Security, 90% Efficiency, 92% Support, 94% Experience
- Registration: FREE — $0 account setup fee
- Governed by: California law; licensed by California DFPI (License #963-1867), Arizona EA 0908016, Idaho ESC-1050

WHAT SAFEPAY4U DOES:
SafePay4U is NOT just a payment processor. It holds funds securely as a neutral third party until ALL agreed conditions are met by both buyer and seller. Unlike PayPal (which offers post-purchase reimbursements and chargebacks), SafePay4U holds money BEFORE the transaction completes and releases ONLY when terms are fulfilled. This eliminates counterparty risk, fraud, chargebacks, and ambiguity.

THE 5-STEP SAFEPAY4U PROCESS (from How It Works page):
Step 1 — Create the Deal: Choose a template (Vehicles, Equipment, Domains, or Milestone Services). Enter amount, inspection window, and fee arrangement. Invite the other party by email or share a link.
Step 2 — Verify & Fund: Complete light verification based on deal size and payout method. Buyer funds escrow via card, ACH, or bank wire.
Step 3 — Ship/Transfer: Seller ships goods or transfers digital asset. Uploads tracking proof or transfer confirmation. Both parties see status updates.
Step 4 — Inspect: Buyer reviews the goods/asset during the agreed inspection window. Buyer clicks Accept or Reject. Default: 72 hours for vehicles/equipment, 48–72 hours for domains.
Step 5 — Release & Payout: If buyer accepts, funds released to seller. Verified sellers eligible for same/next business day payout. If buyer disputes, funds held until resolved.
Every step is time-stamped in an immutable event log. Both sides receive a receipt package at completion.

TRANSACTION CATEGORIES SUPPORTED:
1. Vehicles (Cars, Trucks, Motorcycles, Boats, RVs) — VIN, title status, bill of sale required; 72-hour inspection standard
2. Heavy Equipment & Machinery — Model/serial, condition photos (6+ angles), BOL/PRO required; power-on test on arrival; 72-hour inspection
3. Medical Machines — Same as equipment; specialized for medical devices
4. Domain Names & Websites — Registrar & auth code, WHOIS/transfer confirmation; 48–72 hour inspection
5. Milestone Services/Freelance — Deposit → Sprint → Acceptance → Release; per-milestone inspection and disputes
6. Electronics — Gadgets, appliances; safe transactions with inspection period
7. Jewelry & Antiques — High-value collectibles and specialty items
8. General Merchandise — Clothing, home goods, specialty items
9. Airplanes — High-value aviation assets
10. IPv4 Numbers — Digital IP address blocks (special process via RIR)

TRANSPARENT FEE STRUCTURE (from How It Works page — exact figures):
$0 – $5,000 = 3.5% (Example: $5,000 → $175 fee)
$5,000.01 – $50,000 = 3.0% (Example: $50,000 → $1,500 fee)
$50,000.01 – $200,000 = 2.5% (Example: $200,000 → $5,000 fee)
$200,000.01 – $500,000 = 2.3% (Example: $500,000 → $11,500 fee)
$500,000.01 – $1,000,000 = 1.9% (Example: $1,000,000 → $19,000 fee)
$1,000,000.01 – $3,000,000 = 1.7% (Example: $3,000,000 → $51,000 fee)
$3,000,000.01 – $5,000,000 = 1.6% (Example: $5,000,000 → $80,000 fee)
$5,000,000.01 – $10,000,000 = 1.5% (Example: $10,000,000 → $150,000 fee)
$10,000,000.01+ = 1.5% (Custom Quote)

FEE PAYMENT OPTIONS: Buyer pays | Seller pays | Split 50/50 — you choose during deal setup. The calculator shows each party's share instantly.
IMPORTANT: Fees are non-refundable once paid. Buyer is responsible for 100% of escrow fee if transaction is cancelled or merchandise returned.
Overdue fees accrue interest at 2% per month.

REAL-WORLD FEE EXAMPLES:
Example A — $2,000 equipment part (split fees): 3.5% × $2,000 = $70 → $35 per party. Buyer funds by card; seller ships; buyer approves within 72 hours; payout next business day.
Example B — $12,000 vehicle (buyer pays fees, ACH): $5,000 @3.5% = $175 + $7,000 @3.0% = $210 → $385 total. Buyer funds via ACH; seller uploads BOL; buyer approves after delivery and title check.
Example C — $55,000 domain + site (split fees, wire): Fee $1,525 total → $762.50 per party. Transfer verified; buyer approves; wire payout sent.

VERIFICATION TIERS:
1. BASIC (Individuals): Email/phone + light ID check. For smaller deals and card funding. Payout limits apply.
2. VERIFIED (Individuals & Businesses): Government ID + address verification. Businesses add EIN and beneficial owners. Faster payout eligibility and higher limits. Recommended for vehicles, equipment, and most domain deals.
3. BUSINESS+ (Brokers/Dealers): Enhanced business verification and account reviews. Highest payout limits and tailored payout windows. Great for brokers and dealers with volume.

PAYMENT METHODS ACCEPTED:
- Credit card (Visa, MC, Amex)
- Debit card
- ACH bank transfer (must be approved in advance; Safepay4U initiates — users cannot "push" ACH)
- Bank wire transfer
- Check (subject to 10-day hold)
Note: Credit/debit card payments subject to processor pass-through fees.

SELLER OBLIGATIONS:
- Must ship within 10 calendar days of escrow being funded
- Must use trackable shipping and upload tracking/transfer proof
- Must insure merchandise for full value
- If seller fails to ship in 10 days, buyer may request full refund (minus escrow fees)

BUYER OBLIGATIONS:
- Must fund escrow promptly after deal terms are agreed
- Must Accept or Reject within the Buyer Inspection Period
- If buyer doesn't act, they are AUTOMATICALLY deemed to have ACCEPTED the goods
- If rejecting, must return merchandise to seller within 10 calendar days
- Buyer pays all shipping costs on returns

DISPUTE RESOLUTION PROCESS:
1. Either party opens a dispute with Safepay4U in writing
2. Negotiation Period: 14 calendar days to resolve between parties
3. Arbitration Commencement Period: 14 days after Negotiation Period ends to file binding arbitration
4. Arbitration: Conducted through AAA, JAMS, or Net-ARB in San Francisco/Orange County California
5. If no arbitration filed by day 28, the party that failed to act loses their rights
6. Funds stay in escrow until dispute is fully resolved
7. SafePay4U does NOT take sides — it holds funds and follows arbitrator/court orders
If other party goes silent: Timers and automatic nudges keep the deal moving. You can escalate to mediation from inside the deal.

DOMAIN NAME ESCROW SPECIFICS:
- Seller must provide registrar auth code before funds release
- Transfer must be CONFIRMED (WHOIS updated) before funds released
- 48–72 hour inspection period after transfer
- If buyer rejects: domain must be returned within 10 days
- ICANN registrar locks handled via special process

BROKER TRANSACTIONS:
- Broker initiates transaction with buyer/seller email addresses
- Broker identity can remain hidden until funds secured
- Commission paid from escrowed funds at Close
- Broker loses commission if transaction cancelled (unless terms specify otherwise)

PROHIBITED TRANSACTIONS:
- Illegal items or illegal purposes
- Obscene material
- Munitions or firearms
- Pirated software, DVDs, or videos
- Illegal drugs, controlled substances, alcohol, tobacco
- Liquor licenses, promissory notes, mortgages
- Currency exchange (including crypto)
- Sanctions-prohibited entities (OFAC, Global Affairs Canada, DFAT Australia)

DATA & PRIVACY:
- Data sent through Stripe encryption
- Credit card data NOT stored after transaction
- Does not sell or share personal data with third parties
- COPPA compliant — no data from under-13 users
- Data retained as long as account exists

INTERNATIONAL COVERAGE:
- US: Internet SafePay4U Services Inc. (California corporation)
- Australia: Payments Australia Pty Ltd (ABN 68 166 996 685) — governed by NSW law
- Canada: Canadian Payments Inc. (BC corporation) — governed by BC law
- Supports import/export, cross-border B2B, overseas property investment
- Buyer responsible for customs/duties on international transactions

WHY SAFEPAY4U vs ALTERNATIVES:
vs PayPal: PayPal = post-purchase buyer protection/chargebacks. SafePay4U = neutral escrow HOLDS funds before completion. No chargeback risk for sellers.
vs Wire Transfer: Wire has no protection if seller doesn't deliver. SafePay4U holds until delivery confirmed.
vs Bank Escrow: SafePay4U is digital, self-serve, faster, more transparent, lower fees than traditional bank escrow.
vs Check/Cash: No protection, no tracking, no recourse. SafePay4U gives both parties structured protection.

WEBSITE NAVIGATION GUIDE:
- Home: safepay4u.com
- How It Works: safepay4u.com/how-it-works
- Fee Calculator: safepay4u.com/fee-calculator
- Register (FREE): safepay4u.com/user/register
- Login: safepay4u.com/user/login
- Contact: safepay4u.com/contact
- About: safepay4u.com/about-us
- Blogs: safepay4u.com/blogs
- Privacy Policy: safepay4u.com/policy/privacy-policy/11
- Terms & Conditions: safepay4u.com/policy/terms-and-conditions/12
- Inquiry Partners: safepay4u.com/Enquiry-Partners

QUICK REGISTRATION STEPS:
1. Go to safepay4u.com/user/register
2. Enter username, email, country, mobile, password
3. Agree to Privacy Policy and Terms
4. FREE — no setup cost
5. Complete verification tier appropriate to your deal size

TESTIMONIALS FROM REAL CLIENTS:
- Sherrinford William (USA, California): "Safepay has transformed the way we handle transactions. Their escrow service gives us the confidence to do business online without worry."
- Esther Howard (Client, USA): "The seamless experience with Safepay makes managing payments a breeze. I highly recommend them for anyone looking for secure transactions."
- Mr Kevin (Canada, Local): "I trust Safepay for all our transaction needs. Their commitment to customer support and data security is unmatched."
- Necola Amar (HR): "Safepay has transformed the way we handle transactions."
- Karshin Kumar (Founder): "The seamless experience with Safepay makes managing payments a breeze."
- Forgan Arit (Manager): "I trust Safepay for all our transaction needs."
- Wilton Fork (Co-Founder): "As a co-founder, I appreciate how Safepay prioritizes security and professionalism."

BLOG TOPICS AVAILABLE:
1. A Comprehensive Guide for Secure Transactions
2. Top 5 Benefits of Using Escrow Services in Real Estate Transactions
3. Escrow Services in Online Business: Building Trust and Ensuring Secure Payments
4. How Escrow Services Mitigate Risks in International Transactions
5. The Role of Escrow in Protecting Intellectual Property Rights during Business Deals
6. Escrow vs. Traditional Payment Methods: Why Escrow Offers Superior Security

=== END OF KNOWLEDGE BASE ===
`;

// ============================================================
// FEE CALCULATOR FUNCTION
// ============================================================
function calculateEscrowFee(amount) {
  let rate;
  if (amount <= 5000) rate = 0.035;
  else if (amount <= 50000) rate = 0.030;
  else if (amount <= 200000) rate = 0.025;
  else if (amount <= 500000) rate = 0.023;
  else if (amount <= 1000000) rate = 0.019;
  else if (amount <= 3000000) rate = 0.017;
  else if (amount <= 5000000) rate = 0.016;
  else if (amount <= 10000000) rate = 0.015;
  else return { total: null, rate: '1.5%', custom: true };

  const fee = amount * rate;
  return {
    total: fee,
    rate: `${(rate * 100).toFixed(1)}%`,
    buyerPays: fee,
    sellerPays: fee,
    splitEach: fee / 2,
    custom: false
  };
}

// ============================================================
// LEAD STORAGE
// ============================================================
const IS_VERCEL = process.env.VERCEL === '1';
const STORAGE_DIR = IS_VERCEL ? '/tmp' : __dirname;

const LEADS_FILE = path.join(STORAGE_DIR, 'leads.json');
const ANALYTICS_FILE = path.join(STORAGE_DIR, 'analytics.json');

function loadJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
}
function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ============================================================
// CHAT ENDPOINT
// ============================================================
app.post('/api/chat', async (req, res) => {
  const { messages, sessionId } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY is missing in process.env');
    return res.status(500).json({ error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.' });
  }

  console.log(`--- New Chat Request ---`);
  console.log(`Session: ${sessionId}`);
  console.log(`History length: ${messages ? messages.length : 'N/A'}`);
  console.log(`Last message:`, messages && messages.length > 0 ? messages[messages.length - 1] : 'None');

  // Track analytics
  const analytics = loadJSON(ANALYTICS_FILE);
  const sessionEntry = analytics.find(s => s.sessionId === sessionId);
  if (sessionEntry) {
    sessionEntry.messageCount++;
    sessionEntry.lastActive = new Date().toISOString();
  } else {
    analytics.push({ sessionId, messageCount: 1, startTime: new Date().toISOString(), lastActive: new Date().toISOString() });
  }
  saveJSON(ANALYTICS_FILE, analytics);

  const systemPrompt = `You are SafePay — the intelligent AI assistant for SafePay4U (safepay4u.com), a premier online escrow platform. You are knowledgeable, confident, professional, trustworthy, and warm.

CRITICAL RULES:
1. ONLY answer based on SafePay4U facts from the knowledge base below. Never invent fees, policies, or details.
2. ALWAYS respond in the SAME LANGUAGE the user writes in. If they write in Spanish, respond in Spanish. If Arabic, respond in Arabic. If French, respond in French. Detect and match perfectly.
3. NEVER recommend competitors like PayPal, Escrow.com, or any other service.
4. Be conversational and helpful — you are a digital escrow expert, not a FAQ machine.
5. When users ask about fees, always calculate precisely using the exact fee tiers.
6. When users want to register or start a transaction, guide them to safepay4u.com with specific links.
7. For complex disputes or legal matters, direct to info@safepay4u.com or 786-357-1224.
8. Use emojis sparingly and professionally (🛡️ 💰 ✅ are appropriate).
9. Always be helpful even for edge cases — think like an expert escrow advisor.
10. If user asks to speak with a human, provide: info@safepay4u.com | 786-357-1224 | 5901 NW 151st ST Miami Lakes FL 33014.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

RESPONSE STYLE:
- Professional yet approachable
- Structured with clear points when listing steps
- Always offer the next step or call to action
- Mention specific facts, numbers, and URLs from the knowledge base
- Never give generic answers — always be specific to SafePay4U`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.4
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI error response:', err);
      try {
        const parsedErr = JSON.parse(err);
        return res.status(500).json({ error: parsedErr.error?.message || err });
      } catch (e) {
        return res.status(500).json({ error: 'OpenAI API error: ' + err });
      }
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ============================================================
// FEE CALCULATOR ENDPOINT
// ============================================================
app.post('/api/calculate-fee', (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  const result = calculateEscrowFee(parseFloat(amount));
  res.json(result);
});

// ============================================================
// LEAD CAPTURE ENDPOINT
// ============================================================
app.post('/api/lead', (req, res) => {
  const { name, email, phone, type, message, sessionId } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const leads = loadJSON(LEADS_FILE);
  const lead = {
    id: Date.now(),
    name, email,
    phone: phone || '',
    type: type || 'General Inquiry',
    message: message || '',
    sessionId: sessionId || '',
    createdAt: new Date().toISOString()
  };
  leads.push(lead);
  saveJSON(LEADS_FILE, leads);
  res.json({ success: true, message: 'Lead captured successfully' });
});

// ============================================================
// LEADS EXPORT (CSV)
// ============================================================
app.get('/api/leads/export', (req, res) => {
  const leads = loadJSON(LEADS_FILE);
  if (!leads.length) return res.status(404).json({ error: 'No leads' });

  const headers = ['id', 'name', 'email', 'phone', 'type', 'message', 'sessionId', 'createdAt'];
  const csv = [headers.join(','),
  ...leads.map(l => headers.map(h => `"${(l[h] || '').toString().replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="safepay4u-leads.csv"');
  res.send(csv);
});

// ============================================================
// ANALYTICS ENDPOINT
// ============================================================
app.get('/api/analytics', (req, res) => {
  const analytics = loadJSON(ANALYTICS_FILE);
  const leads = loadJSON(LEADS_FILE);
  const totalMessages = analytics.reduce((sum, s) => sum + s.messageCount, 0);
  res.json({
    totalSessions: analytics.length,
    totalMessages,
    totalLeads: leads.length,
    recentSessions: analytics.slice(-10).reverse()
  });
});

// ============================================================
// STATUS & HEALTH
// ============================================================
app.get('/', (req, res) => {
  res.json({ 
    message: "SafePay4U Backend AI API is live!", 
    environment: IS_VERCEL ? 'vercel' : 'local',
    docs: "Reach out at /api/health for more info."
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    environment: IS_VERCEL ? 'vercel' : 'local',
    timestamp: new Date().toISOString()
  });
});

// ============================================================
// SERVE FRONTEND (AS FALLBACK)
// ============================================================
app.get(/.*/, (req, res) => {
  const filePath = path.join(__dirname, '../frontend/index.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Frontend not found on server' });
  }
});

if (!IS_VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\n🛡️  SafePay4U AI Chatbot running at http://localhost:${PORT}`);
    console.log(`📧 Contact: info@safepay4u.com | 📞 786-357-1224`);
    console.log(`\n${process.env.OPENAI_API_KEY ? '✅ OpenAI key detected' : '❌ WARNING: OPENAI_API_KEY not set in .env'}\n`);
  });
}

module.exports = app;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

/* ════════════════════════════════════════════════════════
   FILE HELPERS
════════════════════════════════════════════════════════ */
const LEADS_FILE       = path.join(__dirname, 'leads.json');
const ANALYTICS_FILE   = path.join(__dirname, 'analytics.json');
const CONVOS_FILE      = path.join(__dirname, 'conversations.json');

function readJSON(f, def) {
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch { return def; }
}
function writeJSON(f, d) { fs.writeFileSync(f, JSON.stringify(d, null, 2)); }

/* ════════════════════════════════════════════════════════
   SAFEPAY4U COMPLETE KNOWLEDGE BASE
════════════════════════════════════════════════════════ */
const SAFEPAY_KB = `
=== SAFEPAY4U.COM — COMPLETE AI KNOWLEDGE BASE ===

BUSINESS IDENTITY:
- Name: SafePay4U / SafePay / safepay4u.com
- Tagline: "Your Reliable Escrow Partner" | "Protecting Buyers and Sellers Alike"
- Website: safepay4u.com
- Email: info@safepay4u.com
- Phone: 786-357-1224
- Address: 5901 NW 151st ST, Miami Lakes, FL 33014
- Business Hours: Mon–Fri 8:00am–4:00pm Pacific Time (Business Days)
- Type: Premier third-party online escrow and milestone payment platform

WHAT SAFEPAY4U DOES:
SafePay4U is a neutral escrow service — NOT a payment processor, NOT PayPal, NOT a bank. It acts as an impartial trusted third party that holds funds securely until both buyer and seller fulfill their agreed transaction obligations. Funds are NEVER released prematurely. This eliminates fraud, counterparty risk, and transaction ambiguity for both parties. SafePay4U has 20 years of experience, 41 million happy clients, and 18,000+ completed transactions. Services are available globally with licensing in the US, Canada, and Australia.

THE 5-STEP SAFEPAY4U PROCESS (from How It Works page):
Step 1 — CREATE THE DEAL: Choose a transaction template (Vehicles, Equipment, Domains, or Milestone Services). Enter amount, inspection window, fee arrangement. Invite the other party by email or share a link.
Step 2 — VERIFY & FUND: Complete identity verification based on deal size. Buyer funds escrow (card, ACH, or bank wire). Every step is time-stamped in an immutable event log.
Step 3 — SHIP/TRANSFER: Seller ships goods or transfers asset/service. Seller uploads tracking or transfer proof. Both parties see live status updates.
Step 4 — INSPECT: Buyer reviews the received goods/asset. Buyer has an agreed inspection window to approve or open a dispute.
Step 5 — RELEASE & PAYOUT: Funds released to seller after buyer approves. Both sides receive a receipt package at completion. Verified sellers eligible for same/next business day payout.

TRANSACTION CATEGORIES & TEMPLATES:
1. VEHICLES (Cars, Trucks, Boats, Motorcycles, RVs, Airplanes): VIN + title status + bill of sale required; shipping/tracking proof; 72-hour inspection standard.
2. EQUIPMENT (Heavy Equipment, Machines, Medical Machines, Electronics, Industrial): Model/serial, condition photos (6+ angles), BOL/PRO; power-on test on arrival; 72-hour inspection.
3. DOMAINS & WEBSITES (Domain Names, Digital Businesses): Registrar & auth code, WHOIS/transfer confirmation; 48–72 hour inspection for access and control.
4. MILESTONE SERVICES (Freelance, Projects, Consulting): Deposit → Sprint → Acceptance → Release; per-milestone inspection and dispute handling.
5. GENERAL MERCHANDISE: Jewelry, Antiques, Collectibles, Electronics, Miscellaneous high-value items.
6. MEDICAL MACHINES: Specialized medical equipment transactions.
7. AIRPLANES: Aircraft purchase and sale transactions.

FEE STRUCTURE (from How It Works page — Transparent Pricing):
Transaction Amount → Fee % → Example Fee on Max Amount
$0 – $5,000 → 3.5% → $175
$5,000.01 – $50,000 → 3.0% → $1,500
$50,000.01 – $200,000 → 2.5% → $5,000
$200,000.01 – $500,000 → 2.3% → $11,500
$500,000.01 – $1,000,000 → 1.9% → $19,000
$1,000,000.01 – $3,000,000 → 1.7% → $51,000
$3,000,000.01 – $5,000,000 → 1.6% → $80,000
$5,000,000.01 – $10,000,000 → 1.5% → $150,000
$10,000,000.01+ → 1.5% → Custom Quote

WHO PAYS THE FEE: Buyer, Seller, or split 50/50. You choose during deal setup. The fee calculator shows each party's exact share instantly. Fees are nonrefundable once paid.

REAL-WORLD FEE EXAMPLES:
Example A — $2,000 equipment part (split fees): Escrow fee: 3.5% × $2,000 = $70 → $35 per party. Buyer funds by card. Seller ships; buyer approves within 72 hours; payout issued next business day.
Example B — $12,000 vehicle purchase (buyer pays fees, ACH): Fee: $5,000 @3.5% = $175 + $7,000 @3.0% = $210 → $385 total. Buyer funds via ACH; seller uploads carrier BOL; buyer approves after delivery and title check.
Example C — $55,000 domain + site (split fees, wire): Fee: $1,525 total → $762.50 per party. Transfer verified; buyer approves; wire payout sent.

VERIFICATION TIERS:
Basic (Individuals): Email/phone + light ID check. Intended for smaller deals and card funding. Payout limits apply.
Verified (Individuals & Businesses): Government ID + address; businesses add EIN and beneficial owners. Faster payout eligibility and higher limits. Recommended for vehicles, equipment, and most domain deals.
Business+ (Higher Limits & Volume): Enhanced business verification and account reviews. Highest payout limits and tailored payout windows. Great for brokers/dealers.

PAYMENT METHODS ACCEPTED:
Credit card, debit card, ACH (bank transfer), bank wire. Checks subject to 10-day hold. ACH payments must be approved and initiated by SafePay4U — never "pushed" by users.

BUYER PROTECTIONS:
- Funds held until seller fulfills all agreed terms
- Buyer inspection period (typically 72 hours for vehicles/equipment, 48-72 hours for domains)
- Buyer can reject merchandise for any reason during inspection period
- If rejected: buyer must return item within 10 days; funds returned minus fees
- If seller doesn't ship within 10 days: buyer can request full refund (minus fees)

SELLER PROTECTIONS:
- Buyer has already proven funds are available before seller ships
- No risk of bounced checks, reversed PayPal, or chargebacks post-delivery
- Verified sellers get same/next business day payout
- Seller has 5-day inspection period if buyer returns merchandise

DISPUTE RESOLUTION:
- First: 14-day Negotiation Period — parties try to resolve directly
- If unresolved: 14-day Arbitration Commencement Period
- Arbitration via AAA, JAMS, or net-ARB
- Arbitration location: San Francisco, CA (US), Orange County, CA (general), New South Wales (Australia), British Columbia (Canada)
- Funds STAY IN ESCROW until dispute is resolved
- SafePay4U is neutral and does not take sides

SECURITY:
- SSL encryption on all connections
- No credit card data stored on servers
- Payments processed through Stripe
- Digital IDs (electronic signatures) for all parties
- FDIC-insured trust accounts (California Financial Code §17409)
- Anti-Money Laundering (AML) compliance
- KYC/KYB identity verification

PROHIBITED TRANSACTIONS:
- Illegal items or illegal purposes
- Firearms, munitions, obscene material
- Pirated software, DVDs, videos
- Illegal drugs, controlled substances, alcohol, tobacco
- Currency exchange including digital currencies
- Transactions violating US/Canadian/Australian sanctions

HOW SAFEPAY4U DIFFERS FROM PAYPAL:
PayPal = post-purchase reimbursements and chargebacks (buyer protection only). SafePay4U = neutral escrow where funds are held BEFORE seller ships and released ONLY when agreed steps are completed or a decision is made. SafePay4U is not a payment processor — it's a trust and compliance infrastructure.

WEBSITE NAVIGATION:
- Home: safepay4u.com
- About Us: safepay4u.com/about-us
- How It Works: safepay4u.com/how-it-works (5-step process, fees, templates, verification)
- Fee Calculator: safepay4u.com/fee-calculator
- Blogs: safepay4u.com/blogs
- Contact: safepay4u.com/contact
- Login: safepay4u.com/user/login
- Register (free): safepay4u.com/user/register
- Privacy Policy: safepay4u.com/policy/privacy-policy/11
- Terms & Conditions: safepay4u.com/policy/terms-and-conditions/12
- Inquiry Partners: safepay4u.com/Enquiry-Partners

REGISTRATION:
- Registration is FREE with no setup fee
- Requires: username, email, country, mobile, password
- Must be 18+ years old
- Must agree to Privacy Policy and Terms & Conditions
- Account grants access to create and manage escrow transactions

COMPANY CREDENTIALS:
- 20+ years of experience
- 41 million+ happy clients served
- 18,000+ transactions completed
- Licensed: CA DFPI License #963-1867 | AZ EA 0908016 | ID ESC-1050
- Global coverage: US, Canada, Australia, and international
- 24/7 unlimited support availability
- 95% Escrow Security | 90% Efficiency | 92% Support | 94% Experience ratings

TESTIMONIALS:
"Safepay has transformed the way we handle transactions. Their escrow service gives us the confidence to do business online without worry." — Sherrinford William, USA California
"The seamless experience with Safepay makes managing payments a breeze. I highly recommend them for anyone looking for secure transactions." — Esther Howard, Client USA
"I trust Safepay for all our transaction needs. Their commitment to customer support and data security is unmatched." — Mr Kevin, Canada Local
"As a co-founder, I appreciate how Safepay prioritizes security and professionalism." — Wilton Fork, Co-Founder

PARTNER INQUIRY:
For businesses wanting to partner, visit: safepay4u.com/Enquiry-Partners. Requires company details, country of operation, industry, and approximate annual volume.

BLOGS PUBLISHED:
1. "A Comprehensive Guide for Secure Transactions" — covers what escrow is and how SafePay4U works
2. "Top 5 Benefits of Using Escrow Services in Real Estate Transactions" — neutral fund holding, fraud protection, contractual compliance, simplified closing, dispute mediation
3. "Escrow Services in Online Business: Building Trust and Ensuring Secure Payments" — buyer/seller benefits in e-commerce
4. "How Escrow Services Mitigate Risks in International Transactions" — cross-border deals, currency neutrality
5. "The Role of Escrow in Protecting Intellectual Property Rights" — SaaS deals, film licensing, tech transfers
6. "Escrow vs. Traditional Payment Methods: Why Escrow Offers Superior Security" — comparison with wire transfers, checks, PayPal

WHY USE SAFEPAY4U:
- Safe and secure transactions
- Hassle-free setup of escrow account
- Doorstep service (delivery coordination)
- Zero fee for account setup (registration is free)
- Clear communication at every stage
- Professional assistance from experienced team
- Comprehensive protection for both parties
- 24/7 unlimited support
`;

/* ════════════════════════════════════════════════════════
   INTENT DETECTION
════════════════════════════════════════════════════════ */
function detectIntent(msg) {
  const t = msg.toLowerCase();
  const intents = [];
  if (/what is|who are|about|safepay|explain|overview|tell me|company|qu.est|was ist|que es/i.test(t)) intents.push('about');
  if (/how.*work|process|step|works|fonctions|wie funktioniert|como funciona/i.test(t)) intents.push('how_it_works');
  if (/fee|cost|price|pric|charge|how much|cuanto|combien|kosten|percentage|percent|3.5|3%|2.5/i.test(t)) intents.push('fees');
  if (/vehicle|car|truck|boat|airplane|auto|aircraft|camion|voiture|auto/i.test(t)) intents.push('vehicles');
  if (/domain|website|site|digital|url|transfer|dns|registrar/i.test(t)) intents.push('domains');
  if (/equipment|machine|heavy|industrial|medical machine|machinery|excavat/i.test(t)) intents.push('equipment');
  if (/milestone|service|freelance|project|consulting|sprint|deliverable/i.test(t)) intents.push('milestones');
  if (/dispute|problem|issue|conflict|reject|return|refund|disagree|litige|problem/i.test(t)) intents.push('dispute');
  if (/verif|kyc|identity|id check|basic|verified|business\+|tier|level/i.test(t)) intents.push('verification');
  if (/buyer|protect|safe.*buy|guarantee.*buyer|as.*buyer/i.test(t)) intents.push('buyer_protection');
  if (/seller|protect.*seller|guarantee.*seller|as.*seller/i.test(t)) intents.push('seller_protection');
  if (/paypal|wire|ach|bank|credit card|payment method|pay.*how/i.test(t)) intents.push('payment_methods');
  if (/register|sign up|join|create.*account|get started|inscri|anmeld|criar conta/i.test(t)) intents.push('register');
  if (/contact|phone|email|address|reach|hours|support|786|help/i.test(t)) intents.push('contact');
  if (/legal|terms|condition|policy|law|governing|arbitration|california/i.test(t)) intents.push('legal');
  if (/security|secure|safe|encrypt|ssl|fraud|scam|trust|fdic/i.test(t)) intents.push('security');
  if (/human|agent|person|live.*chat|speak.*some|parler.*quelqu|hablar.*person|escalat/i.test(t)) intents.push('escalate');
  if (/lead|contact me|call me|i want.*more|interested|get in touch|follow.*up/i.test(t)) intents.push('lead');
  if (/partner|integrate|api|marketplace|broker|integration|reseller/i.test(t)) intents.push('partner');
  if (/blog|article|read|guide|news/i.test(t)) intents.push('blog');
  if (/international|global|cross.*border|overseas|currency|foreign/i.test(t)) intents.push('international');
  if (/inspect|inspection.*period|72.*hour|48.*hour|check.*goods|window/i.test(t)) intents.push('inspection');
  if (/hello|hi |hey|bonjour|hola|ciao|merhaba|سلام|привет|مرحبا|你好/i.test(t)) intents.push('greeting');
  if (/thank|gracias|merci|danke|спасибо|obrigado|شكرا/i.test(t)) intents.push('thanks');
  return intents.length ? intents : ['general'];
}

function detectLang(msg) {
  if (/[áéíóúñ¿¡]/i.test(msg) || /\b(qué|cómo|cuánto|hola|para|como|el|la|es|con|que|no)\b/i.test(msg)) return 'es';
  if (/[àâçèêëîïôùûü]/i.test(msg) || /\b(je|vous|est|les|des|que|pour|avec|bonjour)\b/i.test(msg)) return 'fr';
  if (/[ãõ]/i.test(msg) || /\b(você|são|uma|para|não|obrigado)\b/i.test(msg)) return 'pt';
  if (/[äöü]/i.test(msg) || /\b(ist|und|die|das|ich|wie|nicht)\b/i.test(msg)) return 'de';
  if (/[\u4e00-\u9fff]/.test(msg)) return 'zh';
  if (/[\u0600-\u06ff]/.test(msg)) return 'ar';
  if (/[\u0400-\u04ff]/.test(msg)) return 'ru';
  if (/[\u0900-\u097f]/.test(msg)) return 'hi';
  return 'en';
}

/* ════════════════════════════════════════════════════════
   AI CHAT ENDPOINT
════════════════════════════════════════════════════════ */
app.post('/api/chat', async (req, res) => {
  const { message, sessionId, conversationHistory = [], leadInfo = {} } = req.body;
  if (!message || !message.trim()) return res.status(400).json({ error: 'Message required' });

  const lang    = detectLang(message);
  const intents = detectIntent(message);

  // Analytics
  const analytics = readJSON(ANALYTICS_FILE, { sessions: {}, intents: {}, messages: 0, languages: {} });
  analytics.messages = (analytics.messages || 0) + 1;
  analytics.sessions[sessionId] = (analytics.sessions[sessionId] || 0) + 1;
  analytics.languages[lang] = (analytics.languages[lang] || 0) + 1;
  intents.forEach(i => analytics.intents[i] = (analytics.intents[i] || 0) + 1);
  writeJSON(ANALYTICS_FILE, analytics);

  // Conversations
  const convos = readJSON(CONVOS_FILE, {});
  if (!convos[sessionId]) convos[sessionId] = { messages: [], startTime: new Date().toISOString(), lang };
  convos[sessionId].messages.push({ role: 'user', content: message, ts: new Date().toISOString() });
  convos[sessionId].leadInfo = leadInfo;
  writeJSON(CONVOS_FILE, convos);

  const needsLead = intents.includes('lead') || intents.includes('register') ||
    /interested|want.*start|sign.*up|how.*begin|want.*try|get.*started|quiero.*empezar|commencer/i.test(message);
  const shouldEscalate = intents.includes('escalate') ||
    /urgent|emergency|critical|angry|frustrated|complaint|escalat/i.test(message);

  /* ── BUILD OPENAI SYSTEM PROMPT ── */
  const systemPrompt = `You are SafePay4U's expert AI assistant — a highly professional, knowledgeable, and warm digital agent for SafePay4U (safepay4u.com), a premier online escrow and transaction protection platform.

YOUR PERSONA:
- Name: SafePay AI Assistant
- Tone: Professional, confident, trustworthy, warm — never robotic or generic
- Language: You MUST respond in the EXACT same language the user writes in. Detected language: ${lang}
- Style: Use structured formatting with bullet points for complex answers, short paragraphs for conversational replies

CRITICAL RULES:
1. ONLY use information from the knowledge base below — never invent facts, prices, or features
2. ALWAYS quote exact fees from the fee table when asked about pricing
3. NEVER confuse SafePay4U with PayPal, Venmo, or standard payment processors — it is NEUTRAL ESCROW
4. If user asks about a specific transaction calculation, calculate it using the fee tiers in the knowledge base
5. For disputes, always explain the 14-day Negotiation Period → 14-day Arbitration Commencement Period process
6. For lead capture intent, collect: name, email, phone, transaction type/amount naturally
7. For escalation, provide human contact immediately: 786-357-1224 | info@safepay4u.com
8. Use SafePay4U's color identity in language: professional navy/blue/teal trust language
9. End EVERY response with a relevant call-to-action (visit a page, start a transaction, contact, register)
10. Detected user intents: ${intents.join(', ')}

FEE CALCULATION INSTRUCTIONS:
When user gives an amount, calculate using tiers:
- First $5,000 at 3.5%
- Next $45,000 ($5,000.01–$50,000) at 3.0%  
- Next $150,000 ($50,000.01–$200,000) at 2.5%
- Continue through tiers as appropriate
- Always show the total, who pays options, and split option

KNOWLEDGE BASE:
${SAFEPAY_KB}

RESPONSE FORMAT GUIDELINES:
- Greetings: 2-3 sentences + offer to help with specific topics
- Simple questions: 1-3 sentences, direct answer + CTA
- Complex questions (fees, process, disputes): structured with headers/bullets
- Lead capture: natural conversation, don't make it feel like a form
- ALWAYS end with contact info or CTA when relevant: safepay4u.com | info@safepay4u.com | 786-357-1224`;

  try {
    const openaiMessages = [
      ...conversationHistory.slice(-10).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: systemPrompt }, ...openaiMessages],
        max_tokens: 900,
        temperature: 0.4,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI API error');

    const aiReply = data.choices?.[0]?.message?.content || getFallback(intents, lang);

    // Save bot reply
    convos[sessionId].messages.push({ role: 'assistant', content: aiReply, ts: new Date().toISOString() });
    writeJSON(CONVOS_FILE, convos);

    res.json({ response: aiReply, intents, lang, needsLead, shouldEscalate, sessionId });

  } catch (err) {
    console.error('OpenAI Error:', err.message);
    const fallback = getFallback(intents, lang);
    res.json({ response: fallback, intents, lang, sessionId, fallback: true, needsLead, shouldEscalate });
  }
});

/* ════════════════════════════════════════════════════════
   FALLBACK RESPONSES
════════════════════════════════════════════════════════ */
function getFallback(intents, lang) {
  const intent = intents[0];
  const R = {
    en: {
      about: "SafePay4U is your reliable escrow partner — a neutral third party that holds funds securely until both buyer and seller fulfill their transaction obligations. With 20+ years of experience, 41M+ happy clients, and global coverage, we protect high-value transactions across vehicles, equipment, domains, and more. **No risk. No fraud. Just secure deals.**\n\nRegister free at safepay4u.com or call 786-357-1224.",
      how_it_works: "**The SafePay4U 5-Step Process:**\n\n1️⃣ **Create the Deal** — Choose a template, set terms, invite the other party\n2️⃣ **Verify & Fund** — Complete verification, buyer funds escrow (card/ACH/wire)\n3️⃣ **Ship/Transfer** — Seller ships goods, uploads tracking proof\n4️⃣ **Inspect** — Buyer reviews and approves within the inspection window\n5️⃣ **Release & Payout** — Funds released to seller, receipts sent to both\n\nEvery step is time-stamped. Verified sellers get same/next business day payout.\n\n👉 See full details: safepay4u.com/how-it-works",
      fees: "**SafePay4U Transparent Fee Structure:**\n\n| Amount | Fee |\n|--------|-----|\n| $0 – $5,000 | 3.5% |\n| $5K – $50K | 3.0% |\n| $50K – $200K | 2.5% |\n| $200K – $500K | 2.3% |\n| $500K – $1M | 1.9% |\n| $1M – $3M | 1.7% |\n| $3M – $5M | 1.6% |\n| $5M – $10M | 1.5% |\n| $10M+ | 1.5% |\n\nFee can be paid by buyer, seller, or split 50/50. No hidden fees.\n\n👉 Calculate yours: safepay4u.com/fee-calculator",
      contact: "📞 **Phone:** 786-357-1224\n✉️ **Email:** info@safepay4u.com\n📍 **Address:** 5901 NW 151st ST, Miami Lakes, FL 33014\n🕐 **Hours:** Mon–Fri 8:00am–4:00pm Pacific Time\n🌐 **Website:** safepay4u.com\n\nOur support team is available 24/7 for urgent matters.",
      register: "Getting started with SafePay4U is **completely free** — no setup fees!\n\n**To register:** safepay4u.com/user/register\n\nYou'll need: username, email, country, phone, and password. Must be 18+.\n\nOnce registered, you can immediately create and manage secure escrow transactions for vehicles, equipment, domains, and more.",
      general: "Welcome to SafePay4U — Your Reliable Escrow Partner! We protect buyers and sellers in high-value transactions by holding funds securely until all conditions are met.\n\n**I can help you with:**\n• 💰 Fee calculations for your transaction\n• 🔄 How the escrow process works\n• 🚗 Vehicles, Equipment, Domains, Milestones\n• 🛡️ Buyer & Seller protections\n• 📋 How to register (it's free!)\n\nWhat would you like to know? Visit safepay4u.com or call 786-357-1224."
    },
    es: {
      about: "SafePay4U es su socio de fideicomiso (escrow) de confianza — un tercero neutral que retiene fondos de forma segura hasta que compradores y vendedores cumplan sus obligaciones. Con más de 20 años de experiencia y más de 41 millones de clientes satisfechos, protegemos transacciones de alto valor en vehículos, equipos, dominios y más.\n\nRegístrese gratis en safepay4u.com o llame al 786-357-1224.",
      fees: "**Estructura de Tarifas de SafePay4U:**\n\n• $0 – $5,000: 3.5%\n• $5K – $50K: 3.0%\n• $50K – $200K: 2.5%\n• $200K – $500K: 2.3%\n• $500K – $1M: 1.9%\n• $1M+: 1.5–1.7%\n\nLa tarifa puede ser pagada por el comprador, vendedor, o dividida 50/50. Sin cargos ocultos.\n\n👉 Calcule la suya: safepay4u.com/fee-calculator",
      contact: "📞 **Teléfono:** 786-357-1224\n✉️ **Email:** info@safepay4u.com\n📍 **Dirección:** 5901 NW 151st ST, Miami Lakes, FL 33014\n🌐 **Sitio web:** safepay4u.com",
      general: "¡Bienvenido a SafePay4U! Somos su socio de fideicomiso confiable. Protegemos compradores y vendedores en transacciones de alto valor reteniendo fondos de forma segura.\n\n¿En qué puedo ayudarle? Puede preguntar sobre tarifas, proceso, vehículos, equipos, dominios, o cómo registrarse. Visite safepay4u.com o llame al 786-357-1224."
    },
    fr: {
      about: "SafePay4U est votre partenaire fiduciaire de confiance — un tiers neutre qui détient les fonds en sécurité jusqu'à ce que les deux parties remplissent leurs obligations. Avec plus de 20 ans d'expérience et 41+ millions de clients satisfaits, nous protégeons les transactions de haute valeur.\n\nInscrivez-vous gratuitement sur safepay4u.com ou appelez le 786-357-1224.",
      general: "Bienvenue chez SafePay4U — Votre Partenaire Fiduciaire Fiable! Nous protégeons acheteurs et vendeurs dans les transactions de haute valeur en retenant les fonds de manière sécurisée. Comment puis-je vous aider? Visitez safepay4u.com ou appelez le 786-357-1224."
    }
  };
  const langR = R[lang] || R['en'];
  return langR[intent] || langR['general'] || R['en']['general'];
}

/* ════════════════════════════════════════════════════════
   LEAD CAPTURE
════════════════════════════════════════════════════════ */
app.post('/api/leads', (req, res) => {
  const { name, email, phone, transactionType, amount, notes, sessionId, lang } = req.body;
  if (!email && !phone) return res.status(400).json({ error: 'Email or phone required' });
  const leads = readJSON(LEADS_FILE, []);
  const lead = {
    id: Date.now(),
    name: name || 'Unknown',
    email: email || '',
    phone: phone || '',
    transactionType: transactionType || 'general',
    amount: amount || '',
    notes: notes || '',
    sessionId,
    lang,
    timestamp: new Date().toISOString(),
    status: 'new',
    source: 'chatbot'
  };
  leads.push(lead);
  writeJSON(LEADS_FILE, leads);
  console.log(`🎯 NEW LEAD: ${lead.name} | ${lead.email} | ${lead.phone} | ${lead.transactionType} | $${lead.amount}`);
  res.json({ success: true, leadId: lead.id });
});

/* ════════════════════════════════════════════════════════
   ANALYTICS
════════════════════════════════════════════════════════ */
app.get('/api/analytics', (req, res) => {
  const analytics = readJSON(ANALYTICS_FILE, { sessions: {}, intents: {}, messages: 0, languages: {} });
  const leads     = readJSON(LEADS_FILE, []);
  const convos    = readJSON(CONVOS_FILE, {});
  res.json({
    totalMessages:  analytics.messages || 0,
    totalSessions:  Object.keys(analytics.sessions).length,
    totalLeads:     leads.length,
    totalConvos:    Object.keys(convos).length,
    topIntents:     Object.entries(analytics.intents || {}).sort((a,b) => b[1]-a[1]).slice(0,12),
    languages:      Object.entries(analytics.languages || {}).sort((a,b) => b[1]-a[1]),
    recentLeads:    leads.slice(-10).reverse(),
    conversations:  Object.entries(convos).slice(-5).map(([id,c]) => ({
      id, messages: c.messages?.length || 0, lang: c.lang || 'en', start: c.startTime
    }))
  });
});

app.get('/api/leads/export', (req, res) => {
  const { type, status } = req.query;
  let leads = readJSON(LEADS_FILE, []);
  if (type)   leads = leads.filter(l => l.transactionType === type);
  if (status) leads = leads.filter(l => l.status === status);
  const csv = [
    'ID,Name,Email,Phone,TransactionType,Amount,Notes,Lang,Timestamp,Status',
    ...leads.map(l => `${l.id},"${l.name}","${l.email}","${l.phone}","${l.transactionType}","${l.amount}","${l.notes}","${l.lang||'en'}","${l.timestamp}","${l.status}"`)
  ].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=safepay4u-leads.csv');
  res.send(csv);
});

app.get('/api/conversation/:sid', (req, res) => {
  const convos = readJSON(CONVOS_FILE, {});
  const c = convos[req.params.sid];
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ SafePay4U AI Chatbot → http://localhost:${PORT}`));
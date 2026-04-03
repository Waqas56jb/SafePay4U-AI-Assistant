/* SafePay4U AI Chatbot — shared message/formatting logic (parity with index.html) */

export const CHIPS = {
  en: [
    { l: 'How It Works', q: 'How does SafePay4U escrow work?' },
    { l: 'Fee Calculator', q: 'Calculate fee for $10,000 transaction' },
    { l: 'Vehicle Escrow', q: 'How does vehicle purchase escrow work?' },
    { l: 'Domain Transfer', q: 'How does domain name escrow work?' },
    { l: 'Buyer Protection', q: 'How is the buyer protected?' },
    { l: 'Seller Protection', q: 'How is the seller protected?' },
    { l: 'Verification Tiers', q: 'What are the verification tiers?' },
    { l: 'Disputes', q: 'What happens if there is a dispute?' },
    { l: 'Get Started', q: 'How do I register and get started?' },
    { l: 'Contact', q: 'What is the contact information?' }
  ],
  es: [
    { l: 'Cómo funciona', q: '¿Cómo funciona el fideicomiso de SafePay4U?' },
    { l: 'Calcular tarifa', q: '¿Cuánto cuesta una transacción de $10,000?' },
    { l: 'Vehículos', q: '¿Cómo funciona el fideicomiso para vehículos?' },
    { l: 'Dominios', q: '¿Cómo funciona el fideicomiso para dominios?' },
    { l: 'Disputas', q: '¿Qué pasa si hay una disputa?' },
    { l: 'Registrarse', q: '¿Cómo me registro?' },
    { l: 'Contacto', q: '¿Cuál es la información de contacto?' }
  ],
  fr: [
    { l: 'Comment ça marche', q: "Comment fonctionne l'entiercement SafePay4U?" },
    { l: 'Calculer les frais', q: 'Calculer les frais pour $10,000' },
    { l: 'Véhicules', q: "Comment fonctionne l'entiercement pour les véhicules?" },
    { l: 'Litiges', q: 'Que se passe-t-il en cas de litige?' },
    { l: "S'inscrire", q: "Comment s'inscrire gratuitement?" }
  ]
};

export function getChips(lang) {
  const l = lang === 'auto' ? 'en' : lang;
  return CHIPS[l] || CHIPS.en;
}

export const INPUT_PLACEHOLDERS = {
  en: 'Ask about fees, escrow process, transactions...',
  es: 'Pregunte sobre tarifas, proceso, transacciones...',
  fr: 'Posez des questions sur les frais, le processus...',
  de: 'Fragen Sie über Gebühren, Prozess...',
  pt: 'Pergunte sobre taxas, processo...',
  auto: 'Ask about fees, escrow process, transactions...'
};

export const WELCOME_MESSAGES = {
  en: `🛡️ <strong>Welcome to SafePay4U — Your Reliable Escrow Partner!</strong><br><br>I'm your AI assistant, here to help with all your escrow and transaction questions. SafePay4U is a <strong>neutral third-party escrow platform</strong> that holds funds securely until both parties fulfill their obligations — protecting buyers and sellers in high-value transactions.<br><br>⚡ <strong>What I can help with:</strong><br>• Fee calculations for any transaction amount<br>• How escrow works step-by-step<br>• Vehicles, Equipment, Domains, Milestones<br>• Buyer & Seller protections<br>• Dispute resolution process<br>• Getting started (registration is <span class="badge-green">FREE</span>)<br><br>Use the quick buttons above or ask me anything! 📞 786-357-1224 | safepay4u.com`,
  es: `🛡️ <strong>¡Bienvenido a SafePay4U — Su Socio Escrow de Confianza!</strong><br><br>Soy su asistente de IA para todas sus preguntas sobre fideicomiso y transacciones. SafePay4U es una <strong>plataforma de fideicomiso neutral</strong> que retiene fondos de forma segura hasta que ambas partes cumplan sus obligaciones.<br><br>⚡ <strong>Puedo ayudarle con:</strong><br>• Cálculo de tarifas para cualquier monto<br>• Cómo funciona el proceso escrow paso a paso<br>• Vehículos, Equipos, Dominios, Hitos<br>• Protecciones para comprador y vendedor<br>• Resolución de disputas<br><br>¡Use los botones rápidos o pregúnteme lo que necesite! 📞 786-357-1224 | safepay4u.com`,
  fr: `🛡️ <strong>Bienvenue chez SafePay4U — Votre Partenaire Fiduciaire!</strong><br><br>Je suis votre assistant IA pour toutes vos questions sur les transactions en fideicommis. SafePay4U est une <strong>plateforme d'entiercement neutre</strong> qui détient les fonds en sécurité jusqu'à ce que les deux parties remplissent leurs obligations.<br><br>Utilisez les boutons rapides ou posez-moi vos questions! 📞 786-357-1224 | safepay4u.com`
};

export function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatMsg(txt) {
  let t = txt
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/### (.*)/g, '<h4>$1</h4>')
    .replace(/## (.*)/g, '<h3>$1</h3>')
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (match, header, body) => {
      const ths = header
        .split('|')
        .filter((s) => s.trim())
        .map((s) => `<th>${s.trim()}</th>`)
        .join('');
      const trs = body
        .trim()
        .split('\n')
        .map((row) => {
          const tds = row
            .split('|')
            .filter((s) => s.trim())
            .map((s) => `<td>${s.trim()}</td>`)
            .join('');
          return `<tr>${tds}</tr>`;
        })
        .join('');
      return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    })
    .replace(/\$[\d,]+(\.\d+)?/g, (m) => `<span class="price-pill">${m}</span>`)
    .replace(/\[SECURE\]|✅/g, () => `<span class="badge-teal">✅ Secure</span>`)
    .replace(/\[FREE\]/g, () => `<span class="badge-green">FREE</span>`)
    .replace(/^[•●]\s(.+)/gm, '<li>$1</li>')
    .replace(/^[-]\s(.+)/gm, '<li>$1</li>')
    .replace(/<li>(.+)<\/li>/g, (match) => {
      return (
        '<ul style="list-style:none;padding-left:4px;">' +
        match
          .replace(/<li>/g, '<li style="display:flex;gap:6px;"><span style="color:var(--teal)">▸</span><span>')
          .replace(/<\/li>/g, '</span></li>') +
        '</ul>'
      );
    })
    .replace(/^(\d+️⃣)\s(.+)/gm, '<div style="display:flex;gap:8px;margin:4px 0;"><span>$1</span><span>$2</span></div>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/(\d+%)/g, '<strong>$1</strong>');
  return t;
}

export function getFallbackLocal(msg) {
  const t = msg.toLowerCase();
  if (/fee|cost|price|how much|\$|\d+,\d+/i.test(t))
    return '💰 <strong>SafePay4U Fee Structure:</strong><br><br>• $0–$5K: <span class="price-pill">3.5%</span><br>• $5K–$50K: <span class="price-pill">3.0%</span><br>• $50K–$200K: <span class="price-pill">2.5%</span><br>• $200K–$500K: <span class="price-pill">2.3%</span><br>• $500K–$1M: <span class="price-pill">1.9%</span><br>• $1M+: <span class="price-pill">1.5–1.7%</span><br><br>Fee paid by buyer, seller, or split 50/50. No hidden fees.<br>👉 safepay4u.com/fee-calculator';
  if (/how.*work|process|step/i.test(t))
    return '🔄 <strong>The 5-Step SafePay4U Process:</strong><br><br>1️⃣ <strong>Create the Deal</strong> — Choose template, set terms, invite party<br>2️⃣ <strong>Verify & Fund</strong> — Complete verification, buyer funds escrow<br>3️⃣ <strong>Ship/Transfer</strong> — Seller ships, uploads tracking proof<br>4️⃣ <strong>Inspect</strong> — Buyer reviews, approves or disputes<br>5️⃣ <strong>Release & Payout</strong> — Funds released, receipts sent<br><br>👉 safepay4u.com/how-it-works';
  if (/vehicle|car|truck|auto/i.test(t))
    return '🚗 <strong>Vehicle Escrow:</strong><br>SafePay4U holds funds while VIN, title status, and bill of sale are verified. Seller ships with tracking proof. Buyer has a <strong>72-hour inspection window</strong> to approve. Verified sellers get same/next business day payout.<br>Payment: card, ACH, or bank wire.';
  if (/domain|website/i.test(t))
    return '🌐 <strong>Domain/Website Escrow:</strong><br>Registrar auth code and WHOIS confirmation required. Buyer funds escrow → seller transfers domain → buyer verifies access and control within <strong>48–72 hour inspection window</strong> → funds released.<br>👉 safepay4u.com/how-it-works';
  if (/dispute|problem|reject|return/i.test(t))
    return '⚖️ <strong>SafePay4U Dispute Resolution:</strong><br>1. <strong>14-day Negotiation Period</strong> — parties resolve directly<br>2. <strong>14-day Arbitration Commencement Period</strong> — if unresolved<br>3. Binding arbitration via AAA, JAMS, or net-ARB<br><br>Funds stay in escrow until resolved. SafePay4U remains neutral.';
  if (/contact|phone|email|address/i.test(t))
    return '📞 <strong>Contact SafePay4U:</strong><br><br>Phone: <strong>786-357-1224</strong><br>Email: <strong>info@safepay4u.com</strong><br>Address: 5901 NW 151st ST, Miami Lakes, FL 33014<br>Hours: Mon–Fri 8am–4pm Pacific Time<br>Website: safepay4u.com';
  if (/register|sign up|join|free/i.test(t))
    return '🛡️ <strong>Registration is FREE!</strong><br>Visit safepay4u.com/user/register<br>You\'ll need: username, email, country, phone, password (must be 18+).<br>Once registered, you can create escrow transactions immediately.';
  return '🛡️ Welcome to <strong>SafePay4U</strong> — Your Reliable Escrow Partner!<br><br>We protect buyers and sellers in high-value transactions by holding funds securely until all conditions are met. Fees start at <span class="price-pill">3.5%</span> with no hidden charges.<br><br>Ask me about fees, the escrow process, vehicles, domains, equipment, disputes, or how to get started!<br><br>📞 786-357-1224 | safepay4u.com';
}

/** Returns innerHTML for #calc-result; invalid amount returns error span like original */
export function calcFeeHtml(amountStr) {
  const amt = parseFloat(amountStr);
  if (!amt || amt <= 0) {
    return '<span style="color:var(--red)">Please enter a valid amount.</span>';
  }
  const tiers = [
    [0, 5000, 3.5],
    [5000, 50000, 3.0],
    [50000, 200000, 2.5],
    [200000, 500000, 2.3],
    [500000, 1000000, 1.9],
    [1000000, 3000000, 1.7],
    [3000000, 5000000, 1.6],
    [5000000, 10000000, 1.5],
    [10000000, Infinity, 1.5]
  ];
  let fee = 0;
  let tier = null;
  for (const [min, max, pct] of tiers) {
    if (amt > min) {
      tier = pct;
    }
    if (amt >= min && amt <= max) {
      fee = (amt * pct) / 100;
      tier = pct;
      break;
    }
    if (amt > max && max === Infinity) {
      fee = (amt * 1.5) / 100;
      tier = 1.5;
      break;
    }
  }
  if (fee === 0) fee = (amt * tiers[tiers.length - 1][2]) / 100;
  const split = (fee / 2).toFixed(2);
  return (
    `<strong>Transaction:</strong> $${amt.toLocaleString()} &nbsp;|&nbsp; <strong>Rate:</strong> ${tier}%<br>` +
    `<strong>Total Fee:</strong> <span class="price-pill">$${fee.toFixed(2)}</span><br>` +
    `<strong>If split 50/50:</strong> $${split} per party<br>` +
    `<span style="font-size:11px;color:var(--muted)">Buyer pays, seller pays, or split — your choice during setup.</span>`
  );
}

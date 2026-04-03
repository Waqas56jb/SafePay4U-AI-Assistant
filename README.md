# SafePay4U AI Chatbot

Industry-standard AI escrow assistant for safepay4u.com — powered by OpenAI GPT-4o.

## Setup (3 steps)

```bash
# 1. Install dependencies
npm install

# 2. Add your OpenAI API key to .env
# Edit .env → replace "here_will_i_add" with your actual key (sk-...)

# 3. Start the server
npm start
# → Open http://localhost:3000
```

## File Structure

```
safepay4u/
├── frontend/
│   └── index.html          # Complete chatbot UI
├── backend/
│   ├── server.js           # Express server + OpenAI integration
│   ├── leads.json          # Lead captures (auto-created)
│   └── analytics.json      # Session analytics (auto-created)
├── .env                    # API keys (add OPENAI_API_KEY here)
├── package.json
└── README.md
```

## Features

- ✅ GPT-4o powered with full SafePay4U knowledge base
- ✅ Multilingual — responds in user's language automatically
- ✅ Live fee calculator (all 9 tiers with split options)
- ✅ Lead capture form → saved to leads.json
- ✅ CSV export: GET /api/leads/export
- ✅ Analytics: GET /api/analytics
- ✅ Navy/teal/gold UI matching SafePay4U brand
- ✅ 16 sidebar quick-action categories
- ✅ Human escalation detection
- ✅ Mobile responsive

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat | Send message to AI |
| POST | /api/calculate-fee | Calculate escrow fee |
| POST | /api/lead | Save lead |
| GET | /api/leads/export | Download leads as CSV |
| GET | /api/analytics | View session stats |

## Contact
info@safepay4u.com | 786-357-1224 | 5901 NW 151st ST Miami Lakes FL 33014
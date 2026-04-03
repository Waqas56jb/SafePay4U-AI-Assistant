import React, { useState } from 'react';

const FeeCalculator = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const calculateFee = async () => {
    const amt = parseFloat(amount.replace(/,/g, ''));
    if (!amt || amt <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const res = await fetch('/api/calculate-fee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt })
      });
      const data = await res.json();

      const fmt = n => n != null ? '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Custom Quote';

      setResult({
        amt: '$' + amt.toLocaleString(),
        rate: data.rate,
        total: fmt(data.total),
        buyerPays: fmt(data.buyerPays),
        sellerPays: fmt(data.sellerPays),
        splitEach: fmt(data.splitEach)
      });
    } catch (e) {
      // Calculate locally if server unavailable
      let rate, fee;
      if (amt <= 5000) rate = 0.035;
      else if (amt <= 50000) rate = 0.030;
      else if (amt <= 200000) rate = 0.025;
      else if (amt <= 500000) rate = 0.023;
      else if (amt <= 1000000) rate = 0.019;
      else if (amt <= 3000000) rate = 0.017;
      else if (amt <= 5000000) rate = 0.016;
      else rate = 0.015;
      
      fee = amt * rate;
      const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      setResult({
        amt: fmt(amt),
        rate: (rate * 100).toFixed(1) + '%',
        total: fmt(fee),
        buyerPays: fmt(fee),
        sellerPays: fmt(fee),
        splitEach: fmt(fee / 2)
      });
    }
  };

  return (
    <div className="fee-panel show" id="feePanel">
      <button className="close-fee-btn" onClick={onClose}>✕</button>
      <h3>💰 Escrow Fee Calculator</h3>
      <div className="fee-input-row">
        <input 
          type="number" 
          id="feeAmount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && calculateFee()}
          placeholder="Transaction amount ($)" 
          min="1" 
        />
        <button className="calc-btn" onClick={calculateFee}>Calculate</button>
      </div>
      
      {result && (
        <div className="fee-result show" id="feeResult">
          <div className="fee-card">
            <h4>Fee Breakdown</h4>
            <div className="fee-row">
              <span className="fee-label">Transaction Amount</span>
              <span className="fee-value" id="feeAmtDisplay">{result.amt}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">Rate Applied</span>
              <span className="fee-value" id="feeRateDisplay">{result.rate}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">Total Escrow Fee</span>
              <span className="fee-value highlight" id="feeTotalDisplay">{result.total}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">If Buyer Pays</span>
              <span className="fee-value" id="feeBuyerDisplay">{result.buyerPays}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">If Seller Pays</span>
              <span className="fee-value" id="feeSellerDisplay">{result.sellerPays}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">If Split 50/50 Each</span>
              <span className="fee-value" id="feeSplitDisplay">{result.splitEach}</span>
            </div>
          </div>
        </div>
      )}

      <table className="fee-tier-table">
        <thead>
          <tr>
            <th>Amount Range</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>$0 – $5,000</td><td>3.5%</td></tr>
          <tr><td>$5K – $50K</td><td>3.0%</td></tr>
          <tr><td>$50K – $200K</td><td>2.5%</td></tr>
          <tr><td>$200K – $500K</td><td>2.3%</td></tr>
          <tr><td>$500K – $1M</td><td>1.9%</td></tr>
          <tr><td>$1M – $3M</td><td>1.7%</td></tr>
          <tr><td>$3M – $5M</td><td>1.6%</td></tr>
          <tr><td>$5M – $10M</td><td>1.5%</td></tr>
          <tr><td>$10M+</td><td>1.5% (Custom)</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeCalculator;

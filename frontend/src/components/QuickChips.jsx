import React from 'react';

const QuickChips = ({ onSendChip, onOpenFeeCalculator, onOpenLeadModal }) => {
  return (
    <div className="quick-chips">
      <div className="chip" onClick={() => onSendChip('How does escrow work?')}>🔄 How It Works</div>
      <div className="chip" onClick={onOpenFeeCalculator}>💰 Fee Calculator</div>
      <div className="chip" onClick={() => onSendChip('How do I buy a car using SafePay4U?')}>🚗 Vehicle Escrow</div>
      <div className="chip" onClick={() => onSendChip('How does domain name escrow work?')}>🌐 Domain Transfer</div>
      <div className="chip" onClick={() => onSendChip('What buyer protections do I have?')}>🛡️ Buyer Protection</div>
      <div className="chip" onClick={() => onSendChip('How is dispute resolution handled?')}>⚖️ Disputes</div>
      <div className="chip" onClick={() => onSendChip('How do I get started? What are the steps to register?')}>🚀 Get Started</div>
      <div className="chip" onClick={onOpenLeadModal}>💬 Contact Support</div>
    </div>
  );
};

export default QuickChips;

import React from 'react';

const Sidebar = ({ onSendChip, onOpenFeeCalculator, onOpenLeadModal }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">
            <img src="/logo.png" alt="" className="brand-logo-img" width={40} height={40} decoding="async" />
          </div>
          <div>
            <div className="logo-text">SafePay4U</div>
            <div className="logo-sub">Secure Escrow Platform</div>
          </div>
        </div>
        <span className="status-badge">
          <span className="status-dot"></span>
          AI Assistant Online
        </span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Quick Actions</div>
        <div className="nav-item active" onClick={() => onSendChip('How does SafePay4U escrow work?')}>
          <span className="nav-icon">🔄</span> How It Works
        </div>
        <div className="nav-item" onClick={onOpenFeeCalculator}>
          <span className="nav-icon">💰</span> Fee Calculator
        </div>
        <div className="nav-item" onClick={() => onSendChip('How do I buy a vehicle using SafePay4U escrow?')}>
          <span className="nav-icon">🚗</span> Vehicle Escrow
        </div>
        <div className="nav-item" onClick={() => onSendChip('How does domain name transfer escrow work on SafePay4U?')}>
          <span className="nav-icon">🌐</span> Domain Transfer
        </div>
        <div className="nav-item" onClick={() => onSendChip('What buyer protections does SafePay4U offer?')}>
          <span className="nav-icon">🛒</span> Buyer Protection
        </div>
        <div className="nav-item" onClick={() => onSendChip('What seller protections does SafePay4U offer?')}>
          <span className="nav-icon">💼</span> Seller Protection
        </div>
        <div className="nav-item" onClick={() => onSendChip('What are the verification tiers on SafePay4U?')}>
          <span className="nav-icon">✅</span> Verification Tiers
        </div>
        <div className="nav-item" onClick={() => onSendChip('How does the dispute resolution process work?')}>
          <span className="nav-icon">⚖️</span> Disputes
        </div>
        <div className="nav-item" onClick={() => onSendChip('How do I register and get started on SafePay4U?')}>
          <span className="nav-icon">🚀</span> Get Started
        </div>
        <div className="nav-item" onClick={() => onSendChip('What is the contact information for SafePay4U?')}>
          <span className="nav-icon">📞</span> Contact
        </div>

        <div className="nav-section-label" style={{ marginTop: '16px' }}>Learn More</div>
        <div className="nav-item" onClick={() => onSendChip('What types of transactions does SafePay4U support?')}>
          <span className="nav-icon">📋</span> All Transaction Types
        </div>
        <div className="nav-item" onClick={() => onSendChip('How is SafePay4U different from PayPal?')}>
          <span className="nav-icon">🔍</span> Why SafePay4U?
        </div>
        <div className="nav-item" onClick={() => onSendChip('What are the escrow fees for a $50,000 transaction?')}>
          <span className="nav-icon">📊</span> Fee Examples
        </div>
        <div className="nav-item" onClick={() => onSendChip('How does milestone payment escrow work for services?')}>
          <span className="nav-icon">🎯</span> Milestone Services
        </div>
        <div className="nav-item" onClick={() => onSendChip('Can SafePay4U handle international transactions?')}>
          <span className="nav-icon">🌍</span> International
        </div>
        <div className="nav-item" onClick={onOpenLeadModal}>
          <span className="nav-icon">💬</span> Talk to Support
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="consult-btn" onClick={onOpenLeadModal}>
          📞 Get Free Consultation
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

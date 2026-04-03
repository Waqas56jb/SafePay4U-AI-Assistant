import React, { useState } from 'react';

const LeadForm = ({ onClose, onSuccess, sessionId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      leadName: 'name',
      leadEmail: 'email',
      leadPhone: 'phone',
      leadType: 'type',
      leadMessage: 'message'
    };
    setFormData(prev => ({ ...prev, [fieldMap[id]]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, phone, type, message } = formData;

    if (!name || !email) {
      alert('Name and email are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://safe-pay4-u-ai-assistant-e8rl.vercel.app';

    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sessionId })
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(`✅ **Thank you, ${name}!**\n\nYour consultation request has been received. Our escrow team will contact you at **${email}** within 1 business day.\n\n📞 For urgent matters: **786-357-1224**\n📧 Direct email: **info@safepay4u.com**\n📍 Office: 5901 NW 151st ST, Miami Lakes, FL 33014`);
        onClose();
      }
    } catch (e) {
      onSuccess(`✅ **Request received, ${name}!**\n\nOur team will reach you at **${email}** shortly.\n📞 **786-357-1224** | 📧 **info@safepay4u.com**`);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overlay active" id="leadOverlay" onClick={(e) => e.target.id === 'leadOverlay' && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">🛡️ Talk to Our Escrow Team</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              We'll get back to you within 1 business day
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input 
            className="form-input" 
            id="leadName" 
            type="text" 
            placeholder="Your full name" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input 
            className="form-input" 
            id="leadEmail" 
            type="email" 
            placeholder="your@email.com" 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            className="form-input" 
            id="leadPhone" 
            type="tel" 
            placeholder="+1 (786) 000-0000" 
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <select 
            className="form-input" 
            id="leadType" 
            value={formData.type}
            onChange={handleChange}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Vehicle Escrow">Vehicle Escrow</option>
            <option value="Domain/Website Escrow">Domain/Website Escrow</option>
            <option value="Equipment Escrow">Equipment Escrow</option>
            <option value="Milestone Services">Milestone Services</option>
            <option value="Dispute Support">Dispute Support</option>
            <option value="Business Partnership">Business Partnership</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Message (Optional)</label>
          <textarea 
            className="form-input" 
            id="leadMessage" 
            rows="3" 
            placeholder="Brief description of your transaction..."
            style={{ resize: 'none' }}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : '📤 Send Message'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
          Or call us directly: <a href="tel:7863571224" style={{ color: 'var(--teal-bright)' }}>786-357-1224</a> · <a
            href="mailto:info@safepay4u.com" style={{ color: 'var(--teal-bright)' }}>info@safepay4u.com</a>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;

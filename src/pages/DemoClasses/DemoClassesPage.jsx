import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import SEO from '../../components/SEO/SEO';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';

const DemoClassesPage = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    mobileNumber: '',
    batch: '',
    address: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isBatchDropdownOpen, setIsBatchDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBatchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'demoRequests'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Send to Google Sheets / Telegram via Apps Script Webhook
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({ type: 'demo', ...formData }),
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            }
          });
        } catch (webhookError) {
          console.error("Webhook notification failed:", webhookError);
          // We don't block the user success if notification fails
        }
      }

      setSuccess(true);
      setFormData({
        studentName: '',
        mobileNumber: '',
        batch: '',
        address: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting demo request:', err);
      setError('Failed to submit your request. Please try again later.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      paddingTop: '72px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative'
    }}>
      <SEO 
        title="Book Demo Class | Abhishi Commerce Classes"
        description="Book a free demo class at Abhishi Commerce Classes in Bhagalpur. Experience the best commerce education."
        url="/demo-classes"
      />
      
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '600px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'linear-gradient(180deg, black 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 100%)'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '60px 20px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#1E293B', fontWeight: '800', marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}>
          Request a <span style={{ color: '#F59E0B' }}>Demo Class</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Experience our teaching methodology before committing. Fill out the form below to schedule your demo session.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 20px 60px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '600px'
        }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#10B981' }}>
                <CheckCircle2 size={64} />
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#1E293B', marginBottom: '10px' }}>Request Submitted!</h3>
              <p style={{ color: '#64748B', marginBottom: '24px' }}>We have received your demo request and will contact you shortly to confirm the timings.</p>
              <button 
                onClick={() => setSuccess(false)}
                style={{
                  background: '#1E293B',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#3B82F6'}
                onMouseOut={(e) => e.target.style.background = '#1E293B'}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {error && <div style={{ background: '#FEE2E2', color: '#EF4444', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500' }}>Student Name *</label>
                <input 
                  type="text" 
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500' }}>Mobile Number *</label>
                <input 
                  type="tel" 
                  name="mobileNumber"
                  required
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  pattern="[0-9]{10}"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>

              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500' }}>Select Batch *</label>
                <div 
                  onClick={() => setIsBatchDropdownOpen(!isBatchDropdownOpen)}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '8px', 
                    border: `1px solid ${isBatchDropdownOpen ? '#3B82F6' : '#CBD5E1'}`, 
                    fontSize: '1rem', backgroundColor: 'white', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    boxSizing: 'border-box', color: formData.batch ? '#1E293B' : '#94A3B8',
                    transition: 'border-color 0.2s', userSelect: 'none'
                  }}
                >
                  {formData.batch || 'Choose a batch'}
                  <ChevronDown size={20} style={{ transition: 'transform 0.2s', transform: isBatchDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#64748B' }} />
                </div>
                
                {isBatchDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px',
                    background: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #E2E8F0', zIndex: 50, overflow: 'hidden'
                  }}>
                    {['Class 11th', 'Class 12th', 'CA Foundation', 'B.Com'].map((batch) => (
                      <div 
                        key={batch}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, batch }));
                          setIsBatchDropdownOpen(false);
                        }}
                        style={{
                          padding: '14px 16px', cursor: 'pointer', fontSize: '1rem',
                          background: formData.batch === batch ? '#F1F5F9' : 'transparent',
                          color: formData.batch === batch ? '#3B82F6' : '#1E293B',
                          transition: 'background 0.2s',
                          fontWeight: formData.batch === batch ? '500' : '400'
                        }}
                        onMouseOver={(e) => { if(formData.batch !== batch) e.target.style.background = '#F8FAFC' }}
                        onMouseOut={(e) => { if(formData.batch !== batch) e.target.style.background = 'transparent' }}
                      >
                        {batch}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500' }}>Address *</label>
                <textarea 
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  rows={3}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box', resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                ></textarea>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500' }}>Any Question, message or Doubts (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box', resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  background: '#F59E0B',
                  color: '#fff',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.3s',
                  marginTop: '10px'
                }}
                onMouseOver={(e) => { if(!loading) e.currentTarget.style.background = '#D97706' }}
                onMouseOut={(e) => { if(!loading) e.currentTarget.style.background = '#F59E0B' }}
              >
                {loading ? 'Sending...' : (
                  <>
                    Send <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoClassesPage;

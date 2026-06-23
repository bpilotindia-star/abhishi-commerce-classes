import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ 
      paddingTop: '72px', 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative'
    }}>
      {/* Fading Grid Pattern */}
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
        padding: '80px 20px 40px', 
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', color: '#1E293B', fontWeight: '800', marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>
          Privacy <span style={{ color: '#F59E0B' }}>Policy</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
          Learn how we handle and protect your personal information at Abhishi Commerce Classes.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px', color: '#475569', lineHeight: '1.8', fontSize: '1.05rem' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '24px' }}>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or when you contact us.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: '24px' }}>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>3. Will Your Information Be Shared With Anyone?</h2>
          <p style={{ marginBottom: '24px' }}>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>4. How Long Do We Keep Your Information?</h2>
          <p style={{ marginBottom: '24px' }}>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>5. How Do We Keep Your Information Safe?</h2>
          <p style={{ marginBottom: '24px' }}>We aim to protect your personal information through a system of organizational and technical security measures.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>Contact Us</h2>
          <p>If you have questions or comments about this notice, you may email us at <strong>abhishicommerce2010@gmail.com</strong> or by post to our office located at Parbatti Chowk, Bihar 812002.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';

const TermsCondition = () => {
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
          Terms & <span style={{ color: '#F59E0B' }}>Condition</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px', color: '#475569', lineHeight: '1.8', fontSize: '1.05rem' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: '24px' }}>By accessing our website and utilizing our educational services, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>2. Use License</h2>
          <p style={{ marginBottom: '24px' }}>Permission is granted to temporarily download one copy of the materials (information or software) on Abhishi Commerce Classes's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>3. Disclaimer</h2>
          <p style={{ marginBottom: '24px' }}>The materials on Abhishi Commerce Classes's website are provided on an 'as is' basis. Abhishi Commerce Classes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>4. Limitations</h2>
          <p style={{ marginBottom: '24px' }}>In no event shall Abhishi Commerce Classes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Abhishi Commerce Classes's website.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>5. Revisions and Errata</h2>
          <p style={{ marginBottom: '24px' }}>The materials appearing on Abhishi Commerce Classes's website could include technical, typographical, or photographic errors. Abhishi Commerce Classes does not warrant that any of the materials on its website are accurate, complete, or current.</p>
          
          <h2 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '16px' }}>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at <strong>abhishicommerce2010@gmail.com</strong> or call us at 09570392665.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;

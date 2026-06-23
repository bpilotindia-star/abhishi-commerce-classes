import React, { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage = () => {
  const [isMapLoading, setIsMapLoading] = useState(true);

  return (
    <div style={{
      paddingTop: '72px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative'
    }}>
      <SEO 
        title="Contact Us | Abhishi Commerce Classes Bhagalpur"
        description="Reach out to Abhishi Commerce Classes in Parbatti Chowk, Bhagalpur for inquiries about our commerce batches."
        url="/contact"
      />
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

      {/* Premium Header Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 20px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', color: '#1E293B', fontWeight: '800', marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>
          Contact <span style={{ color: '#F59E0B' }}>Us</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
          Have questions or need assistance? We're here to help you on your educational journey. Reach out to us anytime.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '0 auto 60px', flexWrap: 'wrap', maxWidth: '1000px' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', flex: '1', minWidth: '250px', transition: 'transform 0.3s ease' }} className="contact-card">
            <div style={{ color: '#3B82F6', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <MapPin size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1E293B', marginBottom: '10px' }}>Visit Us</h3>
            <p style={{ color: '#64748B', lineHeight: '1.6' }}>Parbatti Chowk, Bhagalpur<br />Bihar 812002</p>
          </div>

          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', flex: '1', minWidth: '250px', transition: 'transform 0.3s ease' }} className="contact-card">
            <div style={{ color: '#3B82F6', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Phone size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1E293B', marginBottom: '10px' }}>Call Us</h3>
            <p style={{ color: '#64748B', lineHeight: '1.6' }}>09570392665<br />Mon-Sat, 9am - 6pm</p>
          </div>

          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', flex: '1', minWidth: '250px', transition: 'transform 0.3s ease' }} className="contact-card">
            <div style={{ color: '#3B82F6', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Mail size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1E293B', marginBottom: '10px' }}>Email Us</h3>
            <p style={{ color: '#64748B', lineHeight: '1.6' }}>abhishicommerce2010@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative', height: '450px', backgroundColor: '#F8FAFC' }}>
          
          {/* Loading Overlay */}
          {isMapLoading && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTop: '3px solid #3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ marginTop: '16px', color: '#64748B', fontWeight: '500' }}>Loading Map...</p>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          )}

          <iframe
            src="https://maps.google.com/maps?q=Abhishi+Commerce+Classes&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, opacity: isMapLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            onLoad={() => setIsMapLoading(false)}
          ></iframe>
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="https://maps.app.goo.gl/Qet75XAAJ534Jqw89" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1E293B', color: 'white', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.3s, transform 0.2s', boxShadow: '0 10px 20px rgba(30,41,59,0.2)' }} onMouseOver={(e) => { e.currentTarget.style.background = '#3B82F6'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseOut={(e) => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <MapPin size={20} /> Open Map in App
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

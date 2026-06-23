import React from 'react';
import SEO from '../../components/SEO/SEO';

const OurCoaching = () => {
  return (
    <div style={{ 
      paddingTop: '72px', 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative'
    }}>
      <SEO 
        title="About Us | Best Commerce Coaching in Bhagalpur"
        description="Discover the journey of Abhishi Commerce Classes and our commitment to student success since 2010."
        url="/our-coaching"
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

      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        padding: '80px 20px 40px', 
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', color: '#1E293B', fontWeight: '800', marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>
          Our <span style={{ color: '#F59E0B' }}>Story</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
          Discover the journey of Abhishi Commerce Classes and our commitment to student success.
        </p>
      </div>

      <style>
        {`
          .coaching-card {
            background: #fff;
            padding: 50px;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.04);
            display: flex;
            gap: 50px;
            align-items: center;
            flex-wrap: wrap-reverse;
          }
          .coaching-text {
            flex: 1.5;
            min-width: 250px;
            text-align: justify;
          }
          @media (max-width: 768px) {
            .coaching-card {
              padding: 30px 20px;
              gap: 30px;
            }
            .coaching-text {
              text-align: left;
            }
          }
        `}
      </style>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px', color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>
        <div className="coaching-card">
          
          <div className="coaching-text">
            <p style={{ marginBottom: '24px' }}>
              Founded in <strong>2010</strong>, Abhishi Commerce Classes began its journey with just <strong>two students</strong>. Over the years, fueled by the outstanding high performance and success of those we taught, our coaching center has grown and evolved significantly to become a trusted name in commerce education.
            </p>
            <p style={{ marginBottom: '24px' }}>
              With over <strong>15 years of teaching experience</strong>, our approach goes beyond textbooks. We believe in making learning engaging and practical by connecting complex concepts to <strong>real-life examples</strong> in a friendly and supportive environment. During our classes, we ensure that every single student receives the personal attention they need, making sure no one is left behind.
            </p>
            <p>
              Today, even as we have grown, we continue to teach with the exact same dedication, passion, and hard work that we started with. Our ultimate goal remains unchanged: to educate, empower, and thoroughly prepare our students for a bright and successful future.
            </p>
          </div>

          <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)', 
              borderRadius: '24px', 
              padding: '20px 20px 0 20px', 
              width: '100%', 
              maxWidth: '350px',
              display: 'flex', 
              justifyContent: 'center',
              boxShadow: '0 15px 30px rgba(245, 158, 11, 0.2)',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <img 
                src="/Teacher.webp" 
                alt="Abhishek Singh - Director" 
                style={{ 
                  width: '100%', 
                  objectFit: 'contain', 
                  display: 'block', 
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }} 
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: '700', color: '#1E293B', fontSize: '1.25rem' }}>Abhishek Singh</p>
              <p style={{ margin: '4px 0 0 0', color: '#F59E0B', fontWeight: '600', fontSize: '1rem' }}>The Director and Commerce Educator</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurCoaching;

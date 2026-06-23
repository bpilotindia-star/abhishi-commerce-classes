import React from 'react';
import SEO from '../../components/SEO/SEO';
import ResultsTicker from '../../components/ResultsTicker/ResultsTicker';
import Access from '../../components/Access/Access';

const Achievement = () => {
  return (
    <div style={{ 
      paddingTop: '72px', 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <SEO 
        title="Student Achievements | Abhishi Commerce Classes"
        description="Celebrating the hard work, dedication, and outstanding success of our students in commerce board and university exams."
        url="/achievement"
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

      <style>
        {`
          .achievement-hero {
            position: relative;
            width: 100%;
            height: 500px;
            z-index: 1;
          }
          .achievement-title {
            color: #fff;
            font-size: 3.5rem;
            font-weight: 800;
            margin: 0 0 10px 0;
            font-family: 'Poppins', sans-serif;
          }
          .achievement-subtitle {
            color: #E2E8F0;
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
          }
          @media (max-width: 768px) {
            .achievement-hero {
              height: 350px;
            }
            .achievement-title {
              font-size: 2.5rem;
            }
          }
          @media (max-width: 480px) {
            .achievement-hero {
              height: 280px;
            }
            .achievement-title {
              font-size: 2rem;
            }
            .achievement-subtitle {
              font-size: 1rem;
            }
          }
        `}
      </style>

      {/* Full Width Hero Image */}
      <div className="achievement-hero">
        <img 
          src="/Group Photo.webp" 
          alt="Abhishi Commerce Classes Group Photo" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block'
          }}
        />
        {/* Dark overlay for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <h1 className="achievement-title">
            Our <span style={{ color: '#F59E0B' }}>Achievements</span>
          </h1>
          <p className="achievement-subtitle">
            Celebrating the hard work, dedication, and outstanding success of our students.
          </p>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 0' }}>
        {/* Reuse the Access Component (Recent Achievement) */}
        <Access />
        
        {/* Reuse the Results Ticker */}
        <div style={{ marginTop: '40px' }}>
          <ResultsTicker />
        </div>
      </div>

    </div>
  );
};

export default Achievement;

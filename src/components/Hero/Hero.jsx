import { Check, ArrowRight, BookOpen, GraduationCap, Landmark, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Master Your<br />
              <span className="highlight">Commerce Subjects</span>
            </h1>
            <p className="hero-subtitle">
              Expert guidance for Class 11th, 12th, CA Foundation & CUET and Bcom.
              Unlock your true potential with our specialized commerce classes.
            </p>
            <div className="hero-cta-group">
              <Link to="/signup" className="hero-cta">
                Get Started <span className="arrow"><ArrowRight size={18} /></span>
              </Link>
              <Link to="/demo-classes" className="hero-cta hero-cta-secondary">
                Free Demo Class
              </Link>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <span className="check-icon"><Check size={12} strokeWidth={4} /></span>
                Experienced Mentor
              </div>
              <div className="hero-feature">
                <span className="check-icon"><Check size={12} strokeWidth={4} /></span>
                Quality Resources
              </div>
              <div className="hero-feature">
                <span className="check-icon"><Check size={12} strokeWidth={4} /></span>
                Affordable Prices
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-illustration">
              <div className="hero-illustration-placeholder">
                <div className="hero-girl-container">
                  <img
                    src="/Teacher.webp"
                    alt="Teacher"
                    fetchPriority="high"
                    loading="eager"
                    style={{
                      width: '80%', /* good size inside the circle */
                      height: 'auto', 
                      maxHeight: '95%', /* prevent it from being too tall and hitting the top edge hard */
                      objectFit: 'contain',
                      objectPosition: 'bottom',
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners">
        <div className="partners-container">
          <div className="partner-logo">
            <span className="partner-icon"><BookOpen size={26} /></span> CBSE Board
          </div>
          <div className="partner-logo">
            <span className="partner-icon"><GraduationCap size={26} /></span> ICSE Board
          </div>
          <div className="partner-logo">
            <span className="partner-icon"><Landmark size={26} /></span> State Boards
          </div>
          <div className="partner-logo">
            <span className="partner-icon"><TrendingUp size={26} /></span> CA Foundation
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

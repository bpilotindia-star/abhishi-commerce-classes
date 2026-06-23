import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-banner">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Explore our featured batches and find the perfect course for your academic goals.
          </p>
          <div className="newsletter-photo-gallery">
            <div className="photo-card card-behind">
              <img src="/Girls%20Group.webp" loading="lazy" alt="Girls Group" />
            </div>
            <div className="photo-card card-front">
              <img src="/Group%20Photo.webp" loading="lazy" alt="Group Photo" />
            </div>
          </div>
          <Link 
            to="/demo-classes" 
            className="modern-cta-btn"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            Continue with Free Demo Class <span className="arrow"><ArrowRight size={20} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

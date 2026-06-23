import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

const FacebookIcon = ({ size = 18, color = "currentColor", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.6l.4-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Abhishi Commerce Classes" className="logo-img" />
              <div className="footer-logo-text">
                <span className="logo-dark">Abhishi</span>
                <span className="logo-accent">
                  <span>Commerce</span>
                  <span>Classes</span>
                </span>
              </div>
            </div>
            <p>
              You don't need to figure out commerce alone. I’m here to guide your journey from confusion to clarity.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <FacebookIcon size={18} strokeWidth={2} />
              </a>
              <a href="mailto:abhishicommerce2010@gmail.com" className="footer-social-link" aria-label="Email-Id">
                <Mail size={18} strokeWidth={2} />
              </a>
              <a href="https://wa.me/9109570392665" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Whatsapp">
                <MessageCircle size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Programs Column */}
          <div className="footer-column">
            <h4>Programs</h4>
            <ul>
              <li><a href="/courses">Class 11</a></li>
              <li><a href="/courses">Class 12</a></li>
              <li><a href="/courses">B.Com</a></li>
            </ul>
          </div>

          {/* About Column */}
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><Link to="/our-coaching">Our Coaching</Link></li>
              <li><Link to="/achievement">Achievement</Link></li>
            </ul>
          </div>

          {/* Legal Info Column */}
          <div className="footer-column">
            <h4>Legal Info</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-condition">Terms & Condition</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Abhishi commerce Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { BarChart3, Video, FileText, Trophy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Access.css';

const Access = () => {
  return (
    <section className="access">
      <div className="access-container">
        <div className="access-image">
          <div className="access-illustration">
            {/* Center decorative circle */}
            <div className="access-center-wrapper">
              <div className="access-center-circle-bg"></div>
              <div className="access-img-clipper">
                <img src="/Rank%202%20Holder.webp" loading="lazy" alt="Rank 2 Holder" className="access-center-img-pop" />
              </div>
            </div>

            {/* Floating cards */}
            <div className="access-float-card">
              <div className="float-card-icon yellow-bg"><Trophy size={20} color="#F59E0B" /></div>
              <div className="float-card-text">
                <strong>Rank</strong>
                2nd Position
              </div>
            </div>

            <div className="access-float-card">
              <div className="float-card-icon blue-bg"><Trophy size={20} color="#3B82F6" /></div>
              <div className="float-card-text">
                <strong>Bhagalpur</strong>
                District Topper
              </div>
            </div>

            <div className="access-float-card">
              <div className="float-card-icon green-bg"><FileText size={20} color="#10B981" /></div>
              <div className="float-card-text">
                <strong>Marks</strong>
                432/500
              </div>
            </div>

            <div className="access-float-card">
              <div className="float-card-icon purple-bg"><BarChart3 size={20} color="#8B5CF6" /></div>
              <div className="float-card-text">
                <strong>Session</strong>
                2025-26
              </div>
            </div>
          </div>
        </div>

        <div className="access-content">
          <h2>
            Recent Achievement
          </h2>
          <p className="access-description">
            In the recent 2025-26 academic session, under our expert guidance, she achieved the outstanding milestone of becoming the Bhagalpur District Topper (Rank 2 Holder).
          </p>

          <div className="access-features">
            <div className="access-feature-item">
              <span className="access-feature-check"><Check size={14} strokeWidth={3} /></span>
              Expert Guidance
            </div>
            <div className="access-feature-item">
              <span className="access-feature-check"><Check size={14} strokeWidth={3} /></span>
              Regular Weekly Tests
            </div>
            <div className="access-feature-item">
              <span className="access-feature-check"><Check size={14} strokeWidth={3} /></span>
              Doubt Clearing Sessions
            </div>
            <div className="access-feature-item">
              <span className="access-feature-check"><Check size={14} strokeWidth={3} /></span>
              Comprehensive Material
            </div>
          </div>

          <Link to="/signup" className="access-cta">
            Get Started →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Access;

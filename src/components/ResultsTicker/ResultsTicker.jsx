import React from 'react';
import './ResultsTicker.css';
import { Trophy, Star } from 'lucide-react';

const dummyResults = [
  { id: 1, name: "MD. RAJIN", score: "90.6%", marks: "453", rank: "Rank 1" },
  { id: 2, name: "ADITYA", score: "90.2%", marks: "451", rank: "Rank 2" },
  { id: 3, name: "HARSH", score: "89.8%", marks: "449", rank: "Rank 3" },
  { id: 4, name: "JUHI GUPTA", score: "89.6%", marks: "448", rank: "Rank 4" },
  { id: 5, name: "ALOK", score: "89.0%", marks: "445", rank: "Rank 5" },
  { id: 6, name: "MD. JAHID", score: "87.6%", marks: "438", rank: "Rank 6" },
  { id: 7, name: "MADHUKAR", score: "86.8%", marks: "434", rank: "Rank 7" },
  { id: 8, name: "SAFALI", score: "86.0%", marks: "430", rank: "Rank 8" },
  { id: 9, name: "ARIBA KAUSAR", score: "85.8%", marks: "429", rank: "Rank 9" },
  { id: 10, name: "PRASHANT", score: "85.4%", marks: "427", rank: "Rank 10" },
  { id: 11, name: "NISHA", score: "85.2%", marks: "426", rank: "Rank 11" },
  { id: 12, name: "KHUSHI SINGH", score: "84.2%", marks: "421", rank: "Rank 12" },
];

const getAvatarGradient = (id) => {
  const gradients = [
    'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', // Blue
    'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // Amber
    'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Emerald
    'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', // Red
    'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', // Violet
    'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', // Pink
    'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'  // Cyan
  ];
  return gradients[id % gradients.length];
};

const ResultsTicker = () => {
  return (
    <section className="results-ticker-section">
      {/* Decorative Blobs */}
      <div className="ticker-blob blob-1"></div>
      <div className="ticker-blob blob-2"></div>

      <div className="ticker-header" style={{ position: 'relative', zIndex: 10 }}>
        <div className="ticker-badge">
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <span>Excellence in Commerce</span>
        </div>
        <h3>Our Proud <span className="highlight-text">Achievers</span></h3>
        <p>Celebrating the incredible success and hard work of our students</p>
      </div>
      
      <div className="ticker-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <div className="ticker-track">
          {/* Render the list twice to create a seamless infinite loop */}
          {[...dummyResults, ...dummyResults].map((student, index) => (
            <div key={`${student.id}-${index}`} className="ticker-card">
              <div 
                className="ticker-avatar" 
                style={{ background: getAvatarGradient(student.id) }}
              >
                {student.name.charAt(0)}
              </div>
              <div className="ticker-info">
                <h4>{student.name}</h4>
                <div className="ticker-stats">
                  <span className="ticker-score">{student.marks}/500</span>
                  <span className="ticker-percentage">({student.score})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsTicker;

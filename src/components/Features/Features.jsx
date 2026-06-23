import React from 'react';
import './Features.css';
import { 
  Radio, 
  ClipboardList, 
  Clapperboard, 
  FileText, 
  MessageCircleQuestion, 
  LineChart,
  Award,
  Smile
} from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: 'Best Teaching Faculty',
      description: 'Learn from highly experienced and top-rated educators who are dedicated to your academic success.',
      icon: <Award className="feature-icon text-red" />,
      iconBg: 'bg-red-light'
    },
    {
      id: 2,
      title: 'Structured Test Series',
      description: 'Chapter-wise and full-length mock tests designed exactly like board exam pattern.',
      icon: <ClipboardList className="feature-icon text-blue" />,
      iconBg: 'bg-blue-light'
    },
    {
      id: 3,
      title: 'Friendly Teaching',
      description: 'Experience a supportive and interactive learning environment where you can ask anything without hesitation.',
      icon: <Smile className="feature-icon text-yellow" />,
      iconBg: 'bg-yellow-light'
    },
    {
      id: 4,
      title: 'Notes & Study Material',
      description: 'Comprehensive PDF notes, formula sheets, and revision material for every chapter.',
      icon: <FileText className="feature-icon text-yellow" />,
      iconBg: 'bg-yellow-light'
    },
    {
      id: 5,
      title: 'Doubt Support',
      description: 'Get your doubts resolved within minutes. Our expert faculty is always available to help.',
      icon: <MessageCircleQuestion className="feature-icon text-green" />,
      iconBg: 'bg-green-light'
    },
    {
      id: 6,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics. Know your strengths and areas of improvement.',
      icon: <LineChart className="feature-icon text-purple" />,
      iconBg: 'bg-purple-light'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <h2>Everything You Need to <span className="highlight-yellow">Excel</span></h2>
          <p>A complete learning ecosystem designed for board exam success</p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className={`icon-container ${feature.iconBg}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from 'react';
import './WhyChooseUs.css';
import { GraduationCap, BookOpen, Users, ShieldCheck } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      title: 'Learn in Your Language',
      description: 'All courses available in Hindi and regional languages. No language barrier in your learning journey.',
      icon: <GraduationCap className="why-icon text-blue" />,
      iconBg: 'bg-blue-light'
    },
    {
      id: 2,
      title: 'Board-Specific Content',
      description: 'Courses designed specifically for your state board syllabus — Bihar Board, UP Board, CBSE and more.',
      icon: <BookOpen className="why-icon text-green" />,
      iconBg: 'bg-green-light'
    },
    {
      id: 3,
      title: 'Personal Doubt Support',
      description: 'Get your doubts resolved within minutes through dedicated doubt-clearing sessions and chat support.',
      icon: <Users className="why-icon text-purple" />,
      iconBg: 'bg-purple-light'
    },
    {
      id: 4,
      title: 'Trusted by Toppers',
      description: 'Students who studied with us secured top ranks in board exams. 94% pass rate speaks for itself.',
      icon: <ShieldCheck className="why-icon text-yellow" />,
      iconBg: 'bg-yellow-light'
    }
  ];

  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="why-header">
          <h2>Why Learn on <span className="highlight-yellow">Abhishi Commerce Classes?</span></h2>
          <p>Everything you need to crack your board exams, all in one place</p>
        </div>

        <div className="why-grid">
          {reasons.map((reason) => (
            <div className="why-card" key={reason.id}>
              <div className={`why-icon-wrapper ${reason.iconBg}`}>
                {reason.icon}
              </div>
              <div className="why-card-content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

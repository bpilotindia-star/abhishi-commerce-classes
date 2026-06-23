import React from 'react';
import SEO from '../../components/SEO/SEO';
import Courses from '../../components/Courses/Courses';

const CoursesPage = () => {
  return (
    <div style={{ 
      paddingTop: '72px', 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #FFF9EB 0%, #FAFBFF 500px)',
      position: 'relative'
    }}>
      <SEO 
        title="Our Courses | Commerce Coaching in Bhagalpur"
        description="Explore our comprehensive batches for Class 11th, 12th, CA Foundation, and B.Com in Bhagalpur."
        url="/courses"
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
          Our <span style={{ color: '#F59E0B' }}>Courses</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8' }}>
          Explore our comprehensive batches designed by expert faculty to help you ace your board and university exams. Join the best commerce coaching platform today!
        </p>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
        <Courses />
      </div>
    </div>
  );
};

export default CoursesPage;

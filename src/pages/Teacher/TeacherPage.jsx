import React from 'react';

const TeacherPage = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '70vh', textAlign: 'center', padding: '100px 20px', backgroundColor: '#FAFBFF' }}>
      <h1 style={{ fontSize: '3rem', color: '#1E293B', marginBottom: '20px' }}>Our Expert Teachers</h1>
      <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
        Learn from the best educators in the field of commerce. Our teachers bring years of experience and a passion for student success.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '60px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: '280px', padding: '30px 20px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }} className="teacher-card">
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#F1F5F9', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#CBD5E1' }}>
              👤
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1E293B', fontSize: '1.4rem' }}>Teacher {i}</h3>
            <p style={{ margin: 0, color: '#F59E0B', fontSize: '1rem', fontWeight: '600' }}>Senior Faculty</p>
            <p style={{ marginTop: '15px', color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6' }}>Expert in accounting and business studies with 10+ years of teaching experience.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherPage;

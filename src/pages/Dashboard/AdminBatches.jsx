import React, { useState } from 'react';
import { IndianRupee, Book, Settings } from 'lucide-react';
import '../../components/Courses/Courses.css';
import AdminBatchManager from './AdminBatchManager';

const initialCoursesData = [
  {
    id: 1,
    imgSrc: '/1.webp',
    tag: 'Class 11',
    category: 'Commerce Core',
    title: 'Class 11th 2026-27',
    price: '10000/-',
    lessons: 'Exam Focused Prep',
  },
  {
    id: 2,
    imgSrc: '/2.webp',
    tag: 'Class 12',
    category: 'Board Exams',
    title: 'Class 12th 2026-27',
    price: '15000/-',
    lessons: 'Exam Focused Prep',
  },
  {
    id: 3,
    imgSrc: '/3.webp',
    tag: 'B.Com',
    category: 'Graduation',
    title: 'B.com All Semesters',
    price: '8000/- per semester',
    lessons: 'Exam Focused Prep',
  },
];

const AdminBatches = () => {
  const [courses] = useState(initialCoursesData);
  const [selectedBatch, setSelectedBatch] = useState(null);

  if (selectedBatch) {
    return <AdminBatchManager batch={selectedBatch} onBack={() => setSelectedBatch(null)} />;
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>Manage Batch Materials</h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Select a batch to upload or manage study materials.</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id} style={{ position: 'relative', cursor: 'pointer' }}>
            <div className="course-image">
              <img src={course.imgSrc} loading="lazy" alt={course.title} className="course-img-actual" />
              <div className="course-tag">{course.tag}</div>
            </div>
            <div className="course-body" style={{ paddingBottom: '16px' }}>
              <p className="course-category">{course.category}</p>
              <h3>{course.title}</h3>
              <div className="course-meta" style={{ marginBottom: '16px' }}>
                <div className="course-meta-item">
                  <span className="course-meta-icon"><IndianRupee size={14} /></span>
                  {course.price}
                </div>
                <div className="course-meta-item">
                  <span className="course-meta-icon"><Book size={14} /></span>
                  {course.lessons}
                </div>
              </div>
              <button 
                onClick={() => setSelectedBatch(course)}
                style={{
                  width: '100%',
                  background: '#f1f5f9',
                  color: '#3b82f6',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                <Settings size={18} /> Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBatches;

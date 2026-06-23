import React from 'react';
import { IndianRupee, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../components/Courses/Courses.css'; // Reusing the same CSS for styling

const studentBatchesData = [
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

const StudentBatches = () => {
  const navigate = useNavigate();

  return (
    <div className="student-batches-section" style={{ padding: '0' }}>
      <div className="courses-header" style={{ marginBottom: '24px' }}>
        <div className="courses-header-left">
          <h2>Available Batches</h2>
          <p>
            Explore and enroll in our comprehensive coaching programs designed specifically
            for your success.
          </p>
        </div>
      </div>

      <div className="courses-grid">
        {studentBatchesData.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-image">
              <img src={course.imgSrc} loading="lazy" alt={course.title} className="course-img-actual" />
            </div>
            <div className="course-body">
              <p className="course-category">{course.category}</p>
              <h3>{course.title}</h3>
              <div className="course-meta">
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
                onClick={() => navigate('/enroll', { state: { batch: course } })}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentBatches;

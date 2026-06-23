import { Calculator, TrendingUp, BookOpen, IndianRupee, Book } from 'lucide-react';
import './Courses.css';

const coursesData = [
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

const Courses = () => {
  return (
    <section className="courses" id="courses">
      <div className="courses-container">
        <div className="courses-header">
          <div className="courses-header-left">
            <h2>Our Featured Batches</h2>
            <p>
              Join our comprehensive coaching programs designed specifically
              for commerce students to ace their board and competitive exams.
            </p>
          </div>
        </div>

        <div className="courses-grid">
          {coursesData.map((course) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

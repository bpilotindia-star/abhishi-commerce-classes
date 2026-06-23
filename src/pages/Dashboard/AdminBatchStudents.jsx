import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, Phone } from 'lucide-react';
import './AdminBatchStudents.css';

const AdminBatchStudents = ({ batch }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatchStudents = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'admission_requests'),
          where('status', '==', 'approved'),
          where('batchTitle', '==', batch.title)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort alphabetically by name
        data.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(data);
      } catch (error) {
        console.error('Error fetching batch students:', error);
      }
      setLoading(false);
    };

    if (batch?.title) {
      fetchBatchStudents();
    }
  }, [batch]);

  if (loading) {
    return <div className="loading-state">Loading students...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <User size={48} color="#cbd5e1" />
        <p>No approved students found for {batch.title}.</p>
      </div>
    );
  }

  return (
    <div className="batch-students-container">
      <div className="students-header-bar">
        <h3>Enrolled Students ({students.length})</h3>
      </div>
      
      <div className="students-list-grid">
        {students.map((student, index) => (
          <div key={student.id} className="student-profile-card">
            <div className="student-avatar">
              {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="student-info">
              <h4>{student.name}</h4>
              <div className="student-contact">
                <Phone size={14} />
                <span>{student.mobileNumber || 'No number provided'}</span>
              </div>
            </div>
            <div className="student-badge">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBatchStudents;

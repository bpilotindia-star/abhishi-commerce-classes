import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserMinus, Search, Mail, Phone } from 'lucide-react';
import './AdminUncategorizedStudents.css';

const AdminUncategorizedStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUncategorizedStudents();
  }, []);

  const fetchUncategorizedStudents = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'Student'),
        where('enrollmentStatus', '==', 'none')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(data);
    } catch (error) {
      console.error('Error fetching uncategorized students:', error);
    }
    setLoading(false);
  };

  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.mobileNumber?.includes(searchTerm)
  );

  return (
    <div className="uncategorized-container">
      <div className="uncategorized-header">
        <div className="header-title">
          <UserMinus className="header-icon" />
          <div>
            <h2>Uncategorized Students</h2>
            <p>Students who have signed up but haven't enrolled or requested a demo.</p>
          </div>
        </div>
        
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="uncategorized-content">
        {loading ? (
          <div className="loading-state">Loading students...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <UserMinus size={48} color="#cbd5e1" />
            <p>{searchTerm ? 'No matching students found.' : 'No uncategorized students found.'}</p>
          </div>
        ) : (
          <div className="students-table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-name-cell">
                        <div className="avatar-circle">
                          {student.name?.charAt(0).toUpperCase() || 'S'}
                        </div>
                        <span className="student-name">{student.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <Mail size={14} /> {student.email}
                        </div>
                        <div className="contact-item">
                          <Phone size={14} /> {student.mobileNumber || 'Not provided'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge uncategorized">Not Enrolled</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUncategorizedStudents;

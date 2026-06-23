import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Clock, BookOpen, Calendar } from 'lucide-react';
import './StudentTimeTable.css';

const StudentTimeTable = () => {
  const { currentUser } = useAuth();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentBatch, setStudentBatch] = useState('');

  useEffect(() => {
    const fetchTimetableData = async () => {
      if (!currentUser?.uid) return;
      
      setLoading(true);
      try {
        // 1. Fetch Student's Batch
        const admissionQuery = query(
          collection(db, 'admission_requests'), 
          where('userId', '==', currentUser.uid),
          where('status', '==', 'approved')
        );
        const admissionSnap = await getDocs(admissionQuery);
        
        let batchTitle = '';
        if (!admissionSnap.empty) {
          batchTitle = admissionSnap.docs[0].data().batchTitle;
          setStudentBatch(batchTitle);
        }

        // 2. Fetch Timetable for the specific batch
        if (batchTitle) {
          const timetableQuery = query(
            collection(db, 'batch_timetable'),
            where('batchTitle', '==', batchTitle)
          );
          const ttSnap = await getDocs(timetableQuery);
          const ttData = ttSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          ttData.sort((a, b) => a.startTime.localeCompare(b.startTime));
          setTimetable(ttData);
        }

      } catch (error) {
        console.error("Error fetching timetable:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetableData();
  }, [currentUser]);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="student-tt-container">
      <div className="tt-header-panel">
        <div className="tt-header-text">
          <h2>Class Routine</h2>
          <p>Your daily schedule for <strong>{studentBatch || 'your active batch'}</strong>.</p>
        </div>
        <div className="tt-header-icon">
          <Calendar size={32} color="#3b82f6" />
        </div>
      </div>

      <div className="tt-content-panel">
        {loading ? (
          <div className="loading-state">Loading your schedule...</div>
        ) : !studentBatch ? (
          <div className="empty-state">
            <BookOpen size={48} color="#cbd5e1" />
            <p>You need to be enrolled in a batch to view the time table.</p>
          </div>
        ) : timetable.length === 0 ? (
          <div className="empty-state">
            <Clock size={48} color="#cbd5e1" />
            <p>No classes scheduled for your batch yet. Check back later.</p>
          </div>
        ) : (
          <div className="tt-list">
            {timetable.map((session, index) => (
              <div key={session.id} className="tt-card">
                <div className="tt-time-column">
                  <span className="tt-start-time">{formatTime(session.startTime)}</span>
                  <div className="tt-time-divider"></div>
                  <span className="tt-end-time">{formatTime(session.endTime)}</span>
                </div>
                
                <div className="tt-details-column">
                  <div className="tt-subject-icon">
                    <BookOpen size={20} color="#2563eb" />
                  </div>
                  <div className="tt-subject-info">
                    <span className="tt-session-label">Session {index + 1}</span>
                    <h3>{session.subject}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTimeTable;

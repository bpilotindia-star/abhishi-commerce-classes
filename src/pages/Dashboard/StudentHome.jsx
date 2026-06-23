import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Bell, Calendar, Clock, BookOpen } from 'lucide-react';
import './StudentHome.css';

const StudentHome = () => {
  const { currentUser } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentBatch, setStudentBatch] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser?.uid) return;
      
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

        // 2. Fetch Announcements
        const announcementsQuery = query(
          collection(db, 'announcements'),
          orderBy('createdAt', 'desc')
        );
        const annSnap = await getDocs(announcementsQuery);
        const allAnnouncements = annSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const relevantAnnouncements = allAnnouncements.filter(a => {
          if (a.batch === 'All') return true;
          if (batchTitle && batchTitle.includes(a.batch)) return true;
          return false;
        });
        setAnnouncements(relevantAnnouncements);

        // 3. Fetch Timetable for the specific batch
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
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
    <div className="student-home-container">
      <div className="dashboard-content">
        
        {/* Left Column: Announcements */}
        <div className="announcements-section">
          <div className="section-header">
            <Bell size={20} className="header-icon" />
            <h3>Recent Announcements</h3>
          </div>

          <div className="announcements-list">
            {loading ? (
              <div className="loading-state">Loading announcements...</div>
            ) : announcements.length === 0 ? (
              <div className="empty-state">
                <p>No new announcements for your batch.</p>
              </div>
            ) : (
              announcements.map((ann) => (
                <div key={ann.id} className="announcement-card">
                  <div className="announcement-meta">
                    <span className={`batch-badge ${ann.batch === 'All' ? 'badge-all' : 'badge-specific'}`}>
                      {ann.batch}
                    </span>
                    <span className="ann-date">
                      <Calendar size={14} />
                      {ann.createdAt?.toDate ? ann.createdAt.toDate().toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) : 'Just now'}
                    </span>
                  </div>
                  <p className="announcement-message">{ann.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Timetable */}
        <div className="timetable-section">
          <div className="section-header">
            <Clock size={20} className="header-icon" />
            <h3>Daily Routine</h3>
          </div>

          <div className="timetable-list">
            {loading ? (
              <div className="loading-state">Loading routine...</div>
            ) : timetable.length === 0 ? (
              <div className="empty-state">
                <p>No daily routine scheduled yet.</p>
              </div>
            ) : (
              <div className="student-timeline">
                {timetable.map((session, index) => (
                  <div key={session.id} className="student-timeline-item">
                    <div className="student-time-range">
                      <span className="s-start-time">{formatTime(session.startTime)}</span>
                      <span className="s-end-time">{formatTime(session.endTime)}</span>
                    </div>
                    <div className="student-session-card">
                      <div className="s-session-icon">
                        <BookOpen size={18} />
                      </div>
                      <div className="s-session-details">
                        <span className="s-session-num">Session {index + 1}</span>
                        <h4>{session.subject}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentHome;

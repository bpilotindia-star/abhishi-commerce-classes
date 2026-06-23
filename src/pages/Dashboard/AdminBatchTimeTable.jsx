import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { Clock, Plus, Trash2, BookOpen, X } from 'lucide-react';
import './AdminBatchTimeTable.css';

const AdminBatchTimeTable = ({ batch }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ subject: '', startTime: '', endTime: '' });
  const [saving, setSaving] = useState(false);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'batch_timetable'), where('batchTitle', '==', batch.title));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort sessions by start time (assuming HH:mm format like '09:00')
      data.sort((a, b) => a.startTime.localeCompare(b.startTime));
      setSessions(data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (batch?.title) {
      fetchSessions();
    }
  }, [batch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, 'batch_timetable'), {
        batchTitle: batch.title,
        subject: formData.subject,
        startTime: formData.startTime,
        endTime: formData.endTime,
        createdAt: serverTimestamp()
      });
      setIsPopupOpen(false);
      setFormData({ subject: '', startTime: '', endTime: '' });
      fetchSessions();
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Failed to save session.");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this study session?")) return;
    try {
      await deleteDoc(doc(db, 'batch_timetable', id));
      setSessions(sessions.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete.");
    }
  };

  // Helper to format time (e.g., "14:30" to "02:30 PM")
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="batch-timetable-container">
      <div className="timetable-header-bar">
        <div>
          <h3>Daily Routine</h3>
          <p>Manage the daily class schedule for {batch.title}</p>
        </div>
        <button className="btn-add-session" onClick={() => setIsPopupOpen(true)}>
          <Plus size={16} /> Add Study Session
        </button>
      </div>

      <div className="timetable-content">
        {loading ? (
          <div className="loading-state">Loading routine...</div>
        ) : sessions.length === 0 ? (
          <div className="empty-state">
            <Clock size={48} color="#cbd5e1" />
            <p>No study sessions added yet. Click 'Add Study Session' to create a routine.</p>
          </div>
        ) : (
          <div className="timeline-container">
            {sessions.map((session, index) => (
              <div key={session.id} className="timeline-item">
                <div className="timeline-time">
                  <div className="time-badge">{formatTime(session.startTime)}</div>
                  <div className="time-connector"></div>
                  <div className="time-badge end-time">{formatTime(session.endTime)}</div>
                </div>
                
                <div className="timeline-card">
                  <div className="timeline-card-content">
                    <div className="session-icon">
                      <BookOpen size={20} />
                    </div>
                    <div className="session-details">
                      <span className="session-label">Session {index + 1}</span>
                      <h4>{session.subject}</h4>
                    </div>
                  </div>
                  <button className="btn-delete-session" onClick={() => handleDelete(session.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content tt-modal">
            <div className="modal-header">
              <h3>Add Study Session</h3>
              <button className="btn-close" onClick={() => setIsPopupOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject / Topic Name</label>
                <input 
                  type="text" 
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                  placeholder="E.g., Accountancy Part 1"
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input 
                    type="time" 
                    value={formData.startTime} 
                    onChange={e => setFormData({...formData, startTime: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input 
                    type="time" 
                    value={formData.endTime} 
                    onChange={e => setFormData({...formData, endTime: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatchTimeTable;

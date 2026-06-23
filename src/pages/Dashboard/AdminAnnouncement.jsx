import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Bell, Plus, Trash2, X } from 'lucide-react';
import './AdminAnnouncement.css';

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [batch, setBatch] = useState('All');
  const [message, setMessage] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setPosting(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        batch: batch,
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      
      setIsModalOpen(false);
      setMessage('');
      setBatch('All');
      fetchAnnouncements();
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteDoc(doc(db, 'announcements', id));
      setAnnouncements(announcements.filter(a => a.id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-announcement-container">
      <div className="announcement-header">
        <div>
          <h2>Manage Announcements</h2>
          <p>Post updates and notifications for students.</p>
        </div>
        <button className="btn-new-post" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Announcement
        </button>
      </div>

      <div className="announcement-sheet">
        {loading ? (
          <div className="loading-state">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="empty-state">
            <Bell size={48} color="#cbd5e1" />
            <p>No announcements yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Target Batch</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td>
                      <span className={`batch-badge ${item.batch === 'All' ? 'badge-all' : 'badge-specific'}`}>
                        {item.batch}
                      </span>
                    </td>
                    <td className="message-cell">{item.message}</td>
                    <td>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(item.id)}
                        title="Delete Announcement"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Announcement Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Announcement</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePost}>
              <div className="form-group">
                <label>Select Target Batch</label>
                <select value={batch} onChange={(e) => setBatch(e.target.value)} required>
                  <option value="All">All Students</option>
                  <option value="Class 11th">Class 11th</option>
                  <option value="Class 12th">Class 12th</option>
                  <option value="B.Com">B.Com</option>
                </select>
              </div>
              <div className="form-group">
                <label>Announcement Message</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={posting}>
                  {posting ? 'Posting...' : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncement;

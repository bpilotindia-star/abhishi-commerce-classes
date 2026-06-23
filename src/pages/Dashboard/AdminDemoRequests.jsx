import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Loader, Trash2, CheckCircle, Clock } from 'lucide-react';

const AdminDemoRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'demoRequests'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(reqData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching demo requests: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'demoRequests', id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this demo request?')) {
      try {
        await deleteDoc(doc(db, 'demoRequests', id));
      } catch (error) {
        console.error("Error deleting request: ", error);
      }
    }
  };

  const filteredRequests = requests.filter(req => 
    (req.studentName && req.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (req.mobileNumber && req.mobileNumber.includes(searchTerm)) ||
    (req.batch && req.batch.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader className="spin" size={40} />
        <p>Loading demo requests...</p>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <h2 className="admin-card-title">Demo Class Requests</h2>
        
        <div className="admin-search-bar" style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', flex: '1', maxWidth: '300px' }}>
          <Search size={18} color="#64748B" />
          <input
            type="text"
            placeholder="Search by name, phone or batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '10px', width: '100%', fontSize: '0.95rem' }}
          />
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Student Name</th>
              <th>Contact Info</th>
              <th>Batch</th>
              <th>Message/Doubts</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                      {formatDate(req.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: '#1E293B' }}>{req.studentName}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem' }}>
                      <a href={`tel:${req.mobileNumber}`} style={{ color: '#3B82F6', textDecoration: 'none' }}>{req.mobileNumber}</a>
                      <br/>
                      <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{req.address}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      background: '#F1F5F9', color: '#475569', padding: '4px 10px', 
                      borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' 
                    }}>
                      {req.batch}
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={req.message}>
                      {req.message || <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>No message</span>}
                    </p>
                  </td>
                  <td>
                    <select
                      value={req.status || 'pending'}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        background: req.status === 'contacted' ? '#D1FAE5' : '#FEF3C7',
                        color: req.status === 'contacted' ? '#059669' : '#D97706'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(req.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '5px' }}
                      title="Delete Request"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  No demo requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDemoRequests;

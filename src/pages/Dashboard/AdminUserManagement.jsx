import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminUserManagement = () => {
  const [requests, setRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isApprovedOpen, setIsApprovedOpen] = useState(true);
  
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const qPending = query(collection(db, "admission_requests"), where("status", "==", "pending"));
      const querySnapshotPending = await getDocs(qPending);
      const pendingData = [];
      querySnapshotPending.forEach((doc) => {
        pendingData.push({ id: doc.id, ...doc.data() });
      });
      setRequests(pendingData);

      const qApproved = query(collection(db, "admission_requests"), where("status", "==", "approved"));
      const querySnapshotApproved = await getDocs(qApproved);
      const approvedData = [];
      querySnapshotApproved.forEach((doc) => {
        approvedData.push({ id: doc.id, ...doc.data() });
      });
      setApprovedRequests(approvedData);

    } catch (error) {
      console.error("Error fetching admission requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (request) => {
    try {
      // Update request status
      await updateDoc(doc(db, "admission_requests", request.id), {
        status: 'approved'
      });
      
      // Update user's enrollment status
      await updateDoc(doc(db, "users", request.userId), {
        enrollmentStatus: 'approved'
      });

      // Remove from UI
      setRequests(requests.filter(r => r.id !== request.id));
      setApprovedRequests([{ ...request, status: 'approved' }, ...approvedRequests]);
      showToast({ type: 'success', text: `Admission approved for ${request.name}` });
    } catch (error) {
      console.error("Error approving admission:", error);
      showToast({ type: 'error', text: "Failed to approve admission" });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: toastMessage.type === 'success' ? '#10B981' : '#EF4444',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: '500',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {toastMessage.type === 'success' ? '✅' : '❌'} {toastMessage.text}
        </div>
      )}

      {/* Pending Requests Section */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setIsPendingOpen(!isPendingOpen)}
        >
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', color: '#1E293B', margin: 0 }}>
            Admission Requests <span style={{ background: '#FEF2F2', color: '#EF4444', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', marginLeft: '10px' }}>{requests.length} Pending</span>
          </h2>
          {isPendingOpen ? <ChevronUp color="#64748B" /> : <ChevronDown color="#64748B" />}
        </div>

        {isPendingOpen && (
          <div style={{ marginTop: '20px' }}>
            {loading ? (
              <p>Loading requests...</p>
            ) : requests.length === 0 ? (
              <div className="admin-placeholder" style={{ padding: '40px' }}>
                <p>No pending admission requests at the moment.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#64748B', fontSize: '13px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Student Name</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Batch</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Mobile</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Payment Mode</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Date</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '14px', color: '#1E293B' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <strong>{req.name}</strong><br/>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>{req.email || req.userEmail}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>{req.batchTitle}</td>
                        <td style={{ padding: '12px 16px' }}>{req.mobileNumber}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ 
                            background: req.paymentMethod === 'UPI' ? '#DEF7EC' : '#FEF3C7', 
                            color: req.paymentMethod === 'UPI' ? '#03543F' : '#92400E', 
                            padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' 
                          }}>
                            {req.paymentMethod}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {req.createdAt?.toDate().toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => navigate('/admin/print-form', { state: { request: req } })}
                            style={{
                              background: '#F1F5F9', color: '#64748B', border: 'none', 
                              padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s'
                            }}
                            title="View Printable Form"
                            onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0'; e.currentTarget.style.color = '#1E293B'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
                          >
                            <FileText size={18} />
                          </button>
                          <button 
                            onClick={() => handleApprove(req)}
                            style={{
                              background: '#10B981', color: 'white', border: 'none', 
                              padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                              fontWeight: '500', transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#059669'}
                            onMouseOut={(e) => e.target.style.background = '#10B981'}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approved Students Section */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setIsApprovedOpen(!isApprovedOpen)}
        >
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', color: '#1E293B', margin: 0 }}>
            Approved Students <span style={{ background: '#DEF7EC', color: '#03543F', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', marginLeft: '10px' }}>{approvedRequests.length} Approved</span>
          </h2>
          {isApprovedOpen ? <ChevronUp color="#64748B" /> : <ChevronDown color="#64748B" />}
        </div>

        {isApprovedOpen && (
          <div style={{ marginTop: '20px' }}>
            {loading ? (
              <p>Loading requests...</p>
            ) : approvedRequests.length === 0 ? (
              <div className="admin-placeholder" style={{ padding: '40px' }}>
                <p>No approved students yet.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#64748B', fontSize: '13px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Student Name</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Batch</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Mobile</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Date Approved</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedRequests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '14px', color: '#1E293B' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <strong>{req.name}</strong><br/>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>{req.email || req.userEmail}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>{req.batchTitle}</td>
                        <td style={{ padding: '12px 16px' }}>{req.mobileNumber}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {req.createdAt?.toDate().toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => navigate('/admin/print-form', { state: { request: req } })}
                            style={{
                              background: '#F1F5F9', color: '#64748B', border: 'none', 
                              padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s'
                            }}
                            title="View Printable Form"
                            onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0'; e.currentTarget.style.color = '#1E293B'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
                          >
                            <FileText size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;

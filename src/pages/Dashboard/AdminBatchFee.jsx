import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { Receipt, Search, CheckCircle, IndianRupee, X } from 'lucide-react';
import './AdminBatchFee.css';

const AdminBatchFee = ({ batch }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Batch Fee state
  const [batchFee, setBatchFee] = useState('');
  const [savingFee, setSavingFee] = useState(false);
  const [currentFeeInfo, setCurrentFeeInfo] = useState(null);
  const [isEditingFee, setIsEditingFee] = useState(false);

  // Payment Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [receivedAmount, setReceivedAmount] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  // Fetch Batch Fee Settings and Students
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Batch Fee details from `batch_details` collection
      const feeDocRef = doc(db, 'batch_details', batch.title);
      const feeDocSnap = await getDoc(feeDocRef);
      let totalFee = 0;
      if (feeDocSnap.exists()) {
        totalFee = feeDocSnap.data().totalFee;
        setBatchFee(totalFee.toString());
        setCurrentFeeInfo(totalFee);
        setIsEditingFee(false);
      } else {
        setCurrentFeeInfo(0);
        setIsEditingFee(true);
      }

      // 2. Fetch approved students for this batch
      const q = query(
        collection(db, 'admission_requests'),
        where('status', '==', 'approved'),
        where('batchTitle', '==', batch.title)
      );
      const snap = await getDocs(q);
      const studentsData = snap.docs.map(d => ({ 
        id: d.id, 
        ...d.data(),
        paidAmount: d.data().paidAmount || 0 
      }));
      
      // Calculate due for each
      const processedStudents = studentsData.map(st => ({
        ...st,
        totalDue: Math.max(0, totalFee - (st.paidAmount || 0))
      }));
      
      processedStudents.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(processedStudents);

    } catch (error) {
      console.error("Error fetching fee details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (batch?.title) {
      fetchData();
    }
  }, [batch]);

  // Save Batch Fee
  const handleSaveBatchFee = async () => {
    if (!batchFee || isNaN(batchFee)) return;
    setSavingFee(true);
    try {
      const feeNum = Number(batchFee);
      await setDoc(doc(db, 'batch_details', batch.title), {
        totalFee: feeNum,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      setIsEditingFee(false);
      fetchData(); // Refresh everything to recalculate dues
    } catch (error) {
      console.error("Error saving batch fee:", error);
      alert("Failed to save batch fee");
    }
    setSavingFee(false);
  };

  // Open Payment Modal
  const openPaymentModal = (student) => {
    setSelectedStudent(student);
    setReceivedAmount('');
    setIsPopupOpen(true);
  };

  // Process Payment
  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!receivedAmount || isNaN(receivedAmount) || Number(receivedAmount) <= 0) return;
    
    setProcessingPayment(true);
    try {
      const amountNum = Number(receivedAmount);
      const newPaidAmount = (selectedStudent.paidAmount || 0) + amountNum;

      // 1. Update Student Record
      const studentRef = doc(db, 'admission_requests', selectedStudent.id);
      await updateDoc(studentRef, {
        paidAmount: newPaidAmount
      });

      // 2. Add to Global Transactions (Income)
      await addDoc(collection(db, 'transactions'), {
        type: 'income',
        amount: amountNum,
        note: `Fee received from ${selectedStudent.name} (${batch.title})`,
        createdAt: serverTimestamp()
      });

      alert(`Payment of ₹${amountNum} received successfully!`);
      setIsPopupOpen(false);
      fetchData(); // Refresh list

    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment");
    }
    setProcessingPayment(false);
  };

  return (
    <div className="admin-batch-fee-container">
      {/* Top Header: Set Batch Fee */}
      <div className="fee-header-panel">
        <div className="fee-title-info">
          <h3>Batch Cost Configuration</h3>
          <p>Set the total fee for this batch. This applies to all students.</p>
        </div>
        <div className="fee-input-group">
          <div className="input-wrapper">
            <IndianRupee size={16} className="rupee-icon" />
            <input 
              type="number" 
              value={batchFee} 
              onChange={(e) => setBatchFee(e.target.value)} 
              placeholder="Enter Total Fee"
              min="0"
              disabled={!isEditingFee}
              style={{ background: !isEditingFee ? '#f8fafc' : 'white', cursor: !isEditingFee ? 'not-allowed' : 'text' }}
            />
          </div>
          {isEditingFee ? (
            <button 
              className="btn-save-fee" 
              onClick={handleSaveBatchFee}
              disabled={savingFee || batchFee === ''}
            >
              {savingFee ? 'Saving...' : 'Save Cost'}
            </button>
          ) : (
            <button 
              className="btn-save-fee" 
              onClick={() => setIsEditingFee(true)}
            >
              Edit Cost
            </button>
          )}
        </div>
      </div>

      {/* Student List */}
      <div className="fee-sheet-container">
        <div className="sheet-header">
          <h3>Student Fee Records</h3>
          {currentFeeInfo > 0 && <span className="batch-fee-badge">Total Fee: ₹{currentFeeInfo.toLocaleString('en-IN')}</span>}
        </div>

        {loading ? (
          <div className="loading-state">Loading records...</div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <Receipt size={48} color="#cbd5e1" />
            <p>No students enrolled in this batch yet.</p>
          </div>
        ) : currentFeeInfo === 0 || currentFeeInfo === null ? (
          <div className="empty-state">
            <p>Please configure the Batch Cost above to see fee details.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Mobile</th>
                  <th>Total Paid</th>
                  <th>Total Due</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(st => (
                  <tr key={st.id}>
                    <td>
                      <div className="st-name-cell">
                        <div className="st-avatar">{st.name.charAt(0).toUpperCase()}</div>
                        <strong>{st.name}</strong>
                      </div>
                    </td>
                    <td>{st.mobileNumber || 'N/A'}</td>
                    <td className="text-green font-medium">₹{st.paidAmount.toLocaleString('en-IN')}</td>
                    <td className={`font-medium ${st.totalDue > 0 ? 'text-red' : 'text-gray'}`}>
                      ₹{st.totalDue.toLocaleString('en-IN')}
                    </td>
                    <td>
                      {st.totalDue > 0 ? (
                        <button className="btn-receive" onClick={() => openPaymentModal(st)}>
                          Receive Payment
                        </button>
                      ) : (
                        <span className="badge-cleared"><CheckCircle size={14} /> Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Popup */}
      {isPopupOpen && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content fee-modal">
            <div className="modal-header">
              <h3>Receive Payment</h3>
              <button className="btn-close" onClick={() => setIsPopupOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="payment-student-info">
              <p><strong>Student:</strong> {selectedStudent.name}</p>
              <p><strong>Total Due:</strong> <span className="text-red">₹{selectedStudent.totalDue.toLocaleString('en-IN')}</span></p>
            </div>

            <form onSubmit={handleConfirmPayment}>
              <div className="form-group">
                <label>Money Received (₹)</label>
                <input 
                  type="number" 
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  min="1"
                  max={selectedStudent.totalDue}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit bg-green" disabled={processingPayment}>
                  {processingPayment ? 'Processing...' : 'Confirm Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBatchFee;

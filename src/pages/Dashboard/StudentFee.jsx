import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { IndianRupee, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import './StudentFee.css';

const StudentFee = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [feeData, setFeeData] = useState({
    totalFee: 0,
    paidAmount: 0,
    totalDue: 0,
    batchTitle: ''
  });

  useEffect(() => {
    const fetchFeeData = async () => {
      if (!currentUser?.uid) return;
      
      setLoading(true);
      try {
        // 1. Fetch Student's Admission Request to get batchTitle and paidAmount
        const admissionQuery = query(
          collection(db, 'admission_requests'), 
          where('userId', '==', currentUser.uid),
          where('status', '==', 'approved')
        );
        const admissionSnap = await getDocs(admissionQuery);
        
        if (admissionSnap.empty) {
          setLoading(false);
          return;
        }

        const studentData = admissionSnap.docs[0].data();
        const batchTitle = studentData.batchTitle;
        const paidAmount = studentData.paidAmount || 0;

        // 2. Fetch Batch Total Fee from batch_details
        let totalFee = 0;
        if (batchTitle) {
          const feeDocRef = doc(db, 'batch_details', batchTitle);
          const feeDocSnap = await getDoc(feeDocRef);
          if (feeDocSnap.exists()) {
            totalFee = feeDocSnap.data().totalFee || 0;
          }
        }

        const totalDue = Math.max(0, totalFee - paidAmount);

        setFeeData({
          batchTitle,
          totalFee,
          paidAmount,
          totalDue
        });

      } catch (error) {
        console.error("Error fetching fee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeData();
  }, [currentUser]);

  if (loading) {
    return <div className="loading-state">Loading fee details...</div>;
  }

  if (!feeData.batchTitle) {
    return (
      <div className="empty-state">
        <p>No active batch found to display fee details.</p>
      </div>
    );
  }

  const progressPercentage = feeData.totalFee > 0 
    ? Math.min(100, Math.round((feeData.paidAmount / feeData.totalFee) * 100))
    : 0;

  return (
    <div className="student-fee-container">
      <div className="fee-summary-header">
        <div className="fee-header-text">
          <h2>Fee Overview</h2>
          <p>Track your payments for <strong>{feeData.batchTitle}</strong></p>
        </div>
        
        {feeData.totalDue === 0 && feeData.totalFee > 0 ? (
          <div className="status-badge cleared">
            <CheckCircle size={18} /> Fully Paid
          </div>
        ) : (
          <div className="status-badge pending">
            <Clock size={18} /> Payment Pending
          </div>
        )}
      </div>

      <div className="fee-cards-grid">
        <div className="fee-card total-card">
          <div className="f-card-icon"><IndianRupee size={24} /></div>
          <div className="f-card-info">
            <span>Total Batch Fee</span>
            <h3>₹{feeData.totalFee.toLocaleString('en-IN')}</h3>
          </div>
        </div>
        
        <div className="fee-card paid-card">
          <div className="f-card-icon"><CheckCircle size={24} /></div>
          <div className="f-card-info">
            <span>Amount Paid</span>
            <h3>₹{feeData.paidAmount.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        <div className="fee-card due-card">
          <div className="f-card-icon"><AlertCircle size={24} /></div>
          <div className="f-card-info">
            <span>Total Due</span>
            <h3>₹{feeData.totalDue.toLocaleString('en-IN')}</h3>
          </div>
        </div>
      </div>

      {feeData.totalFee > 0 && (
        <div className="fee-progress-section">
          <div className="progress-header">
            <span>Payment Progress</span>
            <span>{progressPercentage}% Completed</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%`, background: progressPercentage === 100 ? '#10b981' : '#3b82f6' }}
            ></div>
          </div>
        </div>
      )}

      {feeData.totalDue > 0 && (
        <div className="fee-instruction-box">
          <h4>How to pay your dues?</h4>
          <p>Please contact the administration desk at the institute to clear your remaining dues. Online payment options will be available soon.</p>
        </div>
      )}
    </div>
  );
};

export default StudentFee;

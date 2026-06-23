import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import './EnrollmentForm.css';

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: state.isFocused ? '#FFFFFF' : '#F8FAFC',
    borderColor: state.isFocused ? '#F59E0B' : 'transparent',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: state.isFocused ? '0 0 0 4px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      background: '#F1F5F9',
      borderColor: state.isFocused ? '#F59E0B' : 'transparent',
    },
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#F59E0B' : state.isFocused ? '#FEF3C7' : 'white',
    color: state.isSelected ? 'white' : '#1E293B',
    cursor: 'pointer',
    padding: '10px 18px',
    '&:active': {
      backgroundColor: '#F59E0B',
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    zIndex: 100,
    border: '1px solid #E2E8F0'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#1E293B',
    fontFamily: "'Inter', sans-serif",
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748B'
  })
};

const EnrollmentForm = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const batch = location.state?.batch;
  
  if (!batch) {
    navigate('/dashboard');
    return null;
  }

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    dob: '',
    caste: '',
    aadharNumber: '',
    fatherName: '',
    motherName: '',
    guardianMobile: '',
    mobileNumber: '',
    address: '',
    wardNumber: '',
    policeStation: '',
    district: '',
    pinCode: '',
    schoolCollege: '',
    paymentMethod: 'UPI'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setLoading(true);
    try {
      // Add admission request
      await addDoc(collection(db, 'admission_requests'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        batchId: batch.id,
        batchTitle: batch.title,
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Update user document
      await updateDoc(doc(db, 'users', currentUser.uid), {
        enrollmentStatus: 'pending'
      });

      // Also set local storage to not show setup popup anymore
      localStorage.setItem(`profileSetupDone_${currentUser.uid}`, 'true');

      // Send to Google Sheets / Telegram via Apps Script Webhook
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({ 
              type: 'enrollment', 
              name: formData.name,
              batchTitle: batch.title,
              mobileNumber: formData.mobileNumber,
              guardianMobile: formData.guardianMobile,
              address: formData.address,
              schoolCollege: formData.schoolCollege,
              paymentMethod: formData.paymentMethod
            }),
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            }
          });
        } catch (webhookError) {
          console.error("Webhook notification failed:", webhookError);
        }
      }

      setShowSuccess(true);
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate('/dashboard');
        // We force reload to ensure auth context gets new enrollmentStatus
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit enrollment request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="page-layout">
        <div className="enrollment-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F8FAFC' }}>
          <div className="form-modal success-modal">
            <div className="success-icon">✔️</div>
            <h3>Admission Request Sent</h3>
            <p>Your request has been sent for approval. You will have access once admin approves it.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="enrollment-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F8FAFC' }}>
        <div className="form-modal" style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
          <div className="modal-header">
            <h2>Enroll in {batch?.title}</h2>
            <button className="close-btn" onClick={() => navigate('/dashboard')}>&times;</button>
          </div>
        
        <div className="form-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
        </div>

        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
          {step === 1 && (
            <div className="form-step">
              <h3>Personal Details</h3>
              <div className="input-group">
                <label>Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <DatePicker 
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={(date) => setFormData({ ...formData, dob: date ? date.toISOString() : '' })}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                  className="custom-datepicker"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  required
                />
              </div>
              <div className="input-group">
                <label>Caste Category</label>
                <Select
                  styles={customSelectStyles}
                  options={[
                    { value: 'General', label: 'General' },
                    { value: 'OBC', label: 'OBC' },
                    { value: 'SC', label: 'SC' },
                    { value: 'ST', label: 'ST' }
                  ]}
                  value={formData.caste ? { value: formData.caste, label: formData.caste } : null}
                  onChange={(option) => setFormData({ ...formData, caste: option.value })}
                  placeholder="Select Category"
                  isSearchable={false}
                  required
                />
              </div>
              <div className="input-group">
                <label>Aadhar Number</label>
                <input required type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Parent Details</h3>
              <div className="input-group">
                <label>Father's Name</label>
                <input required type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Mother's Name</label>
                <input required type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Guardian Mobile Number</label>
                <input required type="tel" name="guardianMobile" value={formData.guardianMobile} onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Contact & Address</h3>
              <div className="input-group">
                <label>Student Mobile Number</label>
                <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Full Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Ward Number</label>
                  <input required type="text" name="wardNumber" value={formData.wardNumber} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Pin Code</label>
                  <input required type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Police Station</label>
                  <input required type="text" name="policeStation" value={formData.policeStation} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>District</label>
                  <input required type="text" name="district" value={formData.district} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h3>Academic & Payment Details</h3>
              <div className="input-group">
                <label>School / College Name</label>
                <input required type="text" name="schoolCollege" value={formData.schoolCollege} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Preferred Payment Method</label>
                <Select
                  styles={customSelectStyles}
                  options={[
                    { value: 'UPI', label: 'UPI' },
                    { value: 'Cash', label: 'Cash' }
                  ]}
                  value={formData.paymentMethod ? { value: formData.paymentMethod, label: formData.paymentMethod } : null}
                  onChange={(option) => setFormData({ ...formData, paymentMethod: option.value })}
                  isSearchable={false}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="btn-secondary" onClick={prevStep} disabled={loading}>
                Back
              </button>
            )}
            {step < 4 ? (
              <button type="submit" className="btn-primary">
                Next
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;

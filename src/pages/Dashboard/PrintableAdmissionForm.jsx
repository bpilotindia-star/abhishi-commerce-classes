import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PrintableAdmissionForm.css';

const PrintableAdmissionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state?.request;

  if (!request) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No data provided to print.</h2>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Go Back</button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Convert DOB from string/timestamp to Date
  let dobStr = '';
  if (request.dob) {
    dobStr = new Date(request.dob).toLocaleDateString('en-IN');
  }

  return (
    <div className="printable-wrapper">
      <div className="no-print print-actions">
        <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
        <button className="btn-print" onClick={handlePrint}>Print Form</button>
      </div>
      
      <div className="a4-sheet premium-form">
        
        {/* Header Section */}
        <header className="premium-header">
          <div className="logo-section">
            <img src="/logo.png" alt="Abhishi Commerce Classes Logo" className="institute-logo" />
          </div>
          <div className="institute-info">
            <div className="est-badge">ESTD. 2010</div>
            <h1>ABHISHI COMMERCE CLASSES</h1>
            <p className="tagline">"Sabse kam fees mein sampoorn taiyari"</p>
            <p className="address">Parbatti Chowk, Bhagalpur, Bihar</p>
          </div>
          <div className="form-meta">
            <div className="meta-item">Form No: <span className="underline"></span></div>
            <div className="meta-item">Date: <span className="underline">{new Date().toLocaleDateString('en-IN')}</span></div>
          </div>
        </header>

        <div className="form-title-bar">
          <h2>APPLICATION FOR ADMISSION</h2>
          <span>Academic Session: 2026-2027</span>
        </div>

        <div className="form-body">
          <div className="top-section">
            <div className="course-details-box">
              <div className="section-title">A. COURSE DETAILS</div>
              <div className="grid-2">
                <div className="data-field">
                  <label>Course Applied For:</label>
                  <div className="data-value">{request.batchTitle}</div>
                </div>
                <div className="data-field">
                  <label>Preferred Batch Time:</label>
                  <div className="data-value check-boxes">
                    <span><span className="box"></span> AM</span>
                    <span><span className="box"></span> PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="photo-box">
              <div className="photo-inner">
                Affix Recent<br/>Passport Size<br/>Photograph
              </div>
            </div>
          </div>

          <div className="section-title">B. APPLICANT DETAILS</div>
          <div className="grid-3">
            <div className="data-field span-3">
              <label>Full Name of Applicant (in block letters):</label>
              <div className="data-value uppercase">{request.name}</div>
            </div>
            <div className="data-field">
              <label>Date of Birth:</label>
              <div className="data-value">{dobStr}</div>
            </div>
            <div className="data-field">
              <label>Aadhar Number:</label>
              <div className="data-value">{request.aadharNumber}</div>
            </div>
            <div className="data-field">
              <label>Caste Category:</label>
              <div className="data-value">{request.caste}</div>
            </div>
            <div className="data-field span-3">
              <label>Name of Current/Last School & College:</label>
              <div className="data-value uppercase">{request.schoolCollege}</div>
            </div>
            <div className="data-field span-2">
              <label>Medium of Instruction:</label>
              <div className="data-value"></div>
            </div>
          </div>

          <div className="section-title">C. FAMILY DETAILS</div>
          <div className="grid-2">
            <div className="data-field">
              <label>Father's / Guardian's Name:</label>
              <div className="data-value uppercase">{request.fatherName}</div>
            </div>
            <div className="data-field">
              <label>Mother's Name:</label>
              <div className="data-value uppercase">{request.motherName}</div>
            </div>
            <div className="data-field">
              <label>Applicant Mobile No.:</label>
              <div className="data-value">{request.mobileNumber}</div>
            </div>
            <div className="data-field">
              <label>Guardian Mobile No.:</label>
              <div className="data-value">{request.guardianMobile}</div>
            </div>
          </div>

          <div className="section-title">D. CORRESPONDENCE ADDRESS</div>
          <div className="grid-3">
            <div className="data-field span-3">
              <label>Full Address:</label>
              <div className="data-value uppercase">{request.address}</div>
            </div>
            <div className="data-field">
              <label>Ward Number:</label>
              <div className="data-value">{request.wardNumber}</div>
            </div>
            <div className="data-field">
              <label>Police Station:</label>
              <div className="data-value uppercase">{request.policeStation}</div>
            </div>
            <div className="data-field">
              <label>District:</label>
              <div className="data-value uppercase">{request.district}</div>
            </div>
            <div className="data-field">
              <label>Pin Code:</label>
              <div className="data-value">{request.pinCode}</div>
            </div>
            <div className="data-field span-2">
              <label>Email ID:</label>
              <div className="data-value">{request.userEmail}</div>
            </div>
          </div>

          <div className="declaration-box">
            <div className="section-title">E. DECLARATION BY STUDENT & PARENT</div>
            <p>I hereby declare that the information provided above is true to the best of my knowledge. I have read and understood the rules and regulations of Abhishi Commerce Classes and agree to abide by them. I understand that the fee once paid is non-refundable under any circumstances.</p>
            
            <div className="signature-area">
              <div className="sig-block">
                <div className="sig-line"></div>
                <label>Signature of Applicant</label>
              </div>
              <div className="sig-block">
                <div className="sig-line"></div>
                <label>Signature of Parent / Guardian</label>
              </div>
            </div>
          </div>

          <div className="office-use">
            <div className="section-title">FOR OFFICE USE ONLY</div>
            <div className="grid-4">
              <div className="data-field">
                <label>Admission Status:</label>
                <div className="data-value">GRANTED / REJECTED</div>
              </div>
              <div className="data-field">
                <label>Roll Number:</label>
                <div className="data-value"></div>
              </div>
              <div className="data-field">
                <label>Fee Receipt No:</label>
                <div className="data-value"></div>
              </div>
              <div className="data-field">
                <label>Authorized Signatory:</label>
                <div className="data-value"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrintableAdmissionForm;

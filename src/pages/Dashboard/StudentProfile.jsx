import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, Mail, Phone, MapPin, BookOpen, Calendar, Shield, CreditCard } from 'lucide-react';
import './StudentProfile.css';

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.uid) return;
      try {
        const q = query(
          collection(db, 'admission_requests'), 
          where('userId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          // If a student applied multiple times, just take the most recent/relevant one
          // For now, take the first document found
          setProfileData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-empty">
        <User size={48} color="#cbd5e1" />
        <h2>Profile Not Found</h2>
        <p>We couldn't find your admission details. Have you enrolled yet?</p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="student-profile-container">
      
      {/* Profile Header */}
      <div className="profile-header-card">
        <div className="profile-avatar-large">
          {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'S'}
        </div>
        <div className="profile-header-info">
          <h2>{profileData.name}</h2>
          <p className="profile-batch-tag">
            <BookOpen size={14} />
            {profileData.batchTitle}
          </p>
          <div className="profile-quick-stats">
            <span><Shield size={14} /> Status: <strong style={{color: profileData.status === 'approved' ? '#10b981' : '#f59e0b', textTransform: 'capitalize'}}>{profileData.status}</strong></span>
            <span><CreditCard size={14} /> Payment: <strong>{profileData.paymentMethod}</strong></span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        
        {/* Personal Details */}
        <div className="profile-section-card">
          <div className="section-header">
            <User size={18} />
            <h3>Personal Information</h3>
          </div>
          <div className="info-list">
            <div className="info-item">
              <label>Full Name</label>
              <p>{profileData.name}</p>
            </div>
            <div className="info-item">
              <label>Date of Birth</label>
              <p>{formatDate(profileData.dob)}</p>
            </div>
            <div className="info-item">
              <label>Aadhar Number</label>
              <p>{profileData.aadharNumber || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Caste Category</label>
              <p>{profileData.caste}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="profile-section-card">
          <div className="section-header">
            <Phone size={18} />
            <h3>Contact Details</h3>
          </div>
          <div className="info-list">
            <div className="info-item">
              <label>Mobile Number</label>
              <p>{profileData.mobileNumber}</p>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <p>{profileData.userEmail}</p>
            </div>
            <div className="info-item full-width">
              <label>Address</label>
              <p className="address-text">
                {profileData.address}<br />
                Ward No: {profileData.wardNumber}, PS: {profileData.policeStation}<br />
                {profileData.district} - {profileData.pinCode}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="profile-section-card">
          <div className="section-header">
            <BookOpen size={18} />
            <h3>Academic Information</h3>
          </div>
          <div className="info-list">
            <div className="info-item">
              <label>School / College</label>
              <p>{profileData.schoolCollege}</p>
            </div>
            <div className="info-item">
              <label>Enrolled Batch</label>
              <p>{profileData.batchTitle}</p>
            </div>
            <div className="info-item">
              <label>Enrollment Date</label>
              <p>{profileData.createdAt?.toDate ? formatDate(profileData.createdAt.toDate()) : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Guardian Details */}
        <div className="profile-section-card">
          <div className="section-header">
            <Shield size={18} />
            <h3>Guardian Information</h3>
          </div>
          <div className="info-list">
            <div className="info-item">
              <label>Father's Name</label>
              <p>{profileData.fatherName}</p>
            </div>
            <div className="info-item">
              <label>Mother's Name</label>
              <p>{profileData.motherName}</p>
            </div>
            <div className="info-item">
              <label>Guardian Mobile</label>
              <p>{profileData.guardianMobile}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;

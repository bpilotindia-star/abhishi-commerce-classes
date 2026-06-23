import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Receipt, 
  Calendar, 
  User, 
  LogOut,
  Package,
  BookOpen,
  Rocket
} from 'lucide-react';
import './SidebarLayout.css';

import StudentBatches from './StudentBatches';
import StudentHome from './StudentHome';
import StudentProfile from './StudentProfile';
import StudentFee from './StudentFee';
import StudentResources from './StudentResources';
import StudentTimeTable from './StudentTimeTable';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'resources', label: 'Resources', icon: FolderOpen },
  { id: 'fee-details', label: 'Fee Details', icon: Receipt },
  { id: 'time-table', label: 'Time Table', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'batches', label: 'Batches', icon: BookOpen },
];

const StudentDashboard = () => {
  const { currentUser, userRole, enrollmentStatus, logout } = useAuth();
  const navigate = useNavigate();
  // Default to batches if enrollment is not approved
  const [activeMenu, setActiveMenu] = useState(
    enrollmentStatus === 'approved' ? 'dashboard' : 'batches'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSetupPopup, setShowSetupPopup] = useState(false);
  const [showPendingPopup, setShowPendingPopup] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      if (enrollmentStatus === 'none') {
        setShowSetupPopup(true);
      }
    }
  }, [currentUser, enrollmentStatus]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  const handleSetupProfile = () => {
    setShowSetupPopup(false);
    setActiveMenu('batches');
  };

  if (!currentUser) return null;

  const userName = currentUser.name || currentUser.email;
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  const handleMenuClick = (menuId) => {
    if (enrollmentStatus !== 'approved' && menuId !== 'batches') {
      setShowPendingPopup(true);
      setSidebarOpen(false);
      return;
    }
    setActiveMenu(menuId);
    setSidebarOpen(false);
  };

  const activeItem = menuItems.find(item => item.id === activeMenu);
  const pageTitle = activeItem ? activeItem.label : 'Dashboard';

  const renderContent = () => {
    if (activeMenu === 'dashboard') {
      return <StudentHome />;
    }
    if (activeMenu === 'profile') {
      return <StudentProfile />;
    }
    if (activeMenu === 'batches') {
      return <StudentBatches />;
    }
    if (activeMenu === 'fee-details') {
      return <StudentFee />;
    }
    if (activeMenu === 'resources') {
      return <StudentResources />;
    }
    if (activeMenu === 'time-table') {
      return <StudentTimeTable />;
    }

    const ActiveIcon = activeItem?.icon || Package;
    return (
      <div className="admin-placeholder">
        <div className="admin-placeholder-icon">
          <ActiveIcon size={28} />
        </div>
        <h3>{pageTitle}</h3>
        <p>This section is being set up. Content for {pageTitle} will be available here soon.</p>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      {/* Setup Profile Popup */}
      {showSetupPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white', padding: '40px', borderRadius: '24px',
            maxWidth: '400px', width: '90%', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              width: '80px', height: '80px', background: '#FFF7ED', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 20px', color: '#F59E0B' 
            }}>
              <Rocket size={40} />
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '22px', color: '#1E293B', marginBottom: '12px' }}>
              Welcome to Your Dashboard!
            </h2>
            <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              To get started with Abhishi Commerce Classes, please set up your profile and activate a batch.
            </p>
            <button 
              onClick={handleSetupProfile}
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                color: 'white', border: 'none', padding: '14px 32px',
                borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                cursor: 'pointer', width: '100%',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
            >
              Setup profile
            </button>
          </div>
        </div>
      )}

      {/* Pending Approval Popup */}
      {showPendingPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white', padding: '40px', borderRadius: '24px',
            maxWidth: '400px', width: '90%', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              width: '80px', height: '80px', background: '#FEF2F2', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 20px', color: '#EF4444' 
            }}>
              <BookOpen size={40} />
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '22px', color: '#1E293B', marginBottom: '12px' }}>
              Pending Approval
            </h2>
            <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              Your admission request is currently pending. You will gain access to this section once an admin approves it.
            </p>
            <button 
              onClick={() => setShowPendingPopup(false)}
              style={{
                background: '#F1F5F9',
                color: '#475569', border: 'none', padding: '14px 32px',
                borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                cursor: 'pointer', width: '100%'
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">Abhishi</span>
            <span className="sidebar-brand-sub">Commerce Classes</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="sidebar-nav-icon"><Icon size={18} /></span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{userInitial}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-role">{userRole || 'Student'}</div>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Log Out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button 
              className="admin-hamburger" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1 className="admin-page-title">{pageTitle}</h1>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-greeting">
              Welcome, <strong>{userName}</strong>
            </span>
          </div>
        </header>

        <div className="admin-body">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

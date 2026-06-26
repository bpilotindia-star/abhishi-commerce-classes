import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Bell, 
  LogOut,
  Package,
  UserMinus
} from 'lucide-react';
import './SidebarLayout.css';
import AdminUserManagement from './AdminUserManagement';
import AdminAnnouncement from './AdminAnnouncement';
import AdminTransactions from './AdminTransactions';
import AdminBatches from './AdminBatches';
import AdminHome from './AdminHome';
import AdminDemoRequests from './AdminDemoRequests';
import AdminUncategorizedStudents from './AdminUncategorizedStudents';
import { BookOpen } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'batches', label: 'Batches', icon: Package },
  { id: 'demo-requests', label: 'Demo Requests', icon: BookOpen },
  { id: 'transactions', label: 'Recent Transaction', icon: CreditCard },
  { id: 'announcements', label: 'Announcement', icon: Bell },
  { id: 'user-management', label: 'User Management', icon: Users },
  { id: 'uncategorized', label: 'Uncategorized Students', icon: UserMinus },
];

const AdminDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  if (!currentUser) return null;

  const userName = currentUser.name || currentUser.email;
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'A';

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setSidebarOpen(false); // Close sidebar on mobile after click
  };

  const activeItem = menuItems.find(item => item.id === activeMenu);
  const pageTitle = activeItem ? activeItem.label : 'Dashboard';

  const renderContent = () => {
    if (activeMenu === 'dashboard') {
      return <AdminHome setActiveMenu={setActiveMenu} />;
    }
    if (activeMenu === 'user-management') {
      return <AdminUserManagement />;
    }
    if (activeMenu === 'announcements') {
      return <AdminAnnouncement />;
    }
    if (activeMenu === 'transactions') {
      return <AdminTransactions />;
    }
    if (activeMenu === 'batches') {
      return <AdminBatches />;
    }
    if (activeMenu === 'demo-requests') {
      return <AdminDemoRequests />;
    }
    if (activeMenu === 'uncategorized') {
      return <AdminUncategorizedStudents />;
    }

    return null;
  };

  return (
    <div className="admin-layout">
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
            <div className="sidebar-user-role">{userRole || 'Admin'}</div>
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

export default AdminDashboard;

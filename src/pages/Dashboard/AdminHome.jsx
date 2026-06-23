import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { 
  Users, 
  CreditCard, 
  Bell, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import './AdminHome.css';

// Using the same batches source for the active batches count
const initialCoursesData = [
  { id: 1, title: 'Class 11th 2026-27' },
  { id: 2, title: 'Class 12th 2026-27' },
  { id: 3, title: 'B.Com 2026' }
];

const AdminHome = ({ setActiveMenu }) => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Pending Admissions
        const qPending = query(
          collection(db, 'admission_requests'),
          where('status', '==', 'pending')
        );
        const pendingSnap = await getDocs(qPending);
        setPendingCount(pendingSnap.size);

        // 2. Fetch Recent 5 Transactions
        const qTrans = query(
          collection(db, 'transactions'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const transSnap = await getDocs(qTrans);
        const transData = transSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentTransactions(transData);

      } catch (error) {
        console.error("Error fetching admin home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const shortcuts = [
    { id: 'batches', label: 'Manage Batches', desc: 'Create and edit batches', icon: Package, color: '#3b82f6', bg: '#eff6ff' },
    { id: 'user-management', label: 'Approve Students', desc: `${pendingCount} pending requests`, icon: Users, color: '#f59e0b', bg: '#fef3c7' },
    { id: 'announcements', label: 'Post Announcement', desc: 'Send updates to students', icon: Bell, color: '#8b5cf6', bg: '#f5f3ff' },
    { id: 'transactions', label: 'All Transactions', desc: 'View income & expenses', icon: CreditCard, color: '#10b981', bg: '#dcfce7' },
  ];

  return (
    <div className="admin-home-container">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="banner-text">
          <h2>Welcome back to the Control Room!</h2>
          <p>Here is an overview of what's happening in your classes today.</p>
        </div>
      </div>

      {/* Widgets Row */}
      <div className="admin-widgets-row">
        <div className="widget-card">
          <div className="widget-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Users size={24} />
          </div>
          <div className="widget-info">
            <span className="widget-title">Pending Admissions</span>
            <h3 className="widget-value">{pendingCount}</h3>
          </div>
        </div>
        
        <div className="widget-card">
          <div className="widget-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Package size={24} />
          </div>
          <div className="widget-info">
            <span className="widget-title">Active Batches</span>
            <h3 className="widget-value">{initialCoursesData.length}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Shortcuts & Recent Transactions */}
      <div className="admin-home-grid">
        
        {/* Quick Shortcuts */}
        <div className="shortcuts-section">
          <div className="section-header-simple">
            <h3>Quick Actions</h3>
          </div>
          <div className="shortcuts-grid">
            {shortcuts.map(item => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="shortcut-card" 
                  onClick={() => setActiveMenu(item.id)}
                >
                  <div className="sc-icon-wrapper" style={{ background: item.bg, color: item.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="sc-details">
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="sc-arrow">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="recent-trans-section">
          <div className="section-header-simple">
            <h3>Recent Transactions</h3>
            <button className="btn-view-all" onClick={() => setActiveMenu('transactions')}>
              View All
            </button>
          </div>
          <div className="recent-trans-list">
            {loading ? (
              <div className="loading-state">Loading transactions...</div>
            ) : recentTransactions.length === 0 ? (
              <div className="empty-state-small">
                <CreditCard size={32} color="#cbd5e1" />
                <p>No transactions yet.</p>
              </div>
            ) : (
              recentTransactions.map(trans => (
                <div key={trans.id} className="mini-trans-card">
                  <div className={`mini-trans-icon ${trans.type === 'income' ? 'bg-green-light text-green' : 'bg-red-light text-red'}`}>
                    {trans.type === 'income' ? <TrendingUp size={16} /> : <ArrowDownRight size={16} />}
                  </div>
                  <div className="mini-trans-details">
                    <h4>{trans.note}</h4>
                    <span>
                      {trans.createdAt?.toDate ? trans.createdAt.toDate().toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short'
                      }) : 'Just now'}
                    </span>
                  </div>
                  <div className={`mini-trans-amount ${trans.type === 'income' ? 'text-green' : 'text-red'}`}>
                    {trans.type === 'income' ? '+' : '-'} ₹{trans.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminHome;

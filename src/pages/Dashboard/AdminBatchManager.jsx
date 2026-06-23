import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Calendar, Receipt } from 'lucide-react';
import AdminBatchResources from './AdminBatchResources';
import AdminBatchStudents from './AdminBatchStudents';
import AdminBatchTimeTable from './AdminBatchTimeTable';
import AdminBatchFee from './AdminBatchFee';
import './AdminBatchManager.css';

const AdminBatchManager = ({ batch, onBack }) => {
  const [activeTab, setActiveTab] = useState('resources');

  const tabs = [
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'timetable', label: 'Time Table', icon: Calendar },
    { id: 'feedetails', label: 'Fee Details', icon: Receipt },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return <AdminBatchResources batchId={batch.id} />;
      case 'students':
        return <AdminBatchStudents batch={batch} />;
      case 'timetable':
        return <AdminBatchTimeTable batch={batch} />;
      case 'feedetails':
        return <AdminBatchFee batch={batch} />;
      default:
        return null;
    }
  };

  return (
    <div className="batch-manager-container">
      
      {/* Header section */}
      <div className="batch-manager-header">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Batches
        </button>
        <div className="batch-header-info">
          <h2>{batch.title}</h2>
          <span className="batch-category-badge">{batch.category}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="batch-manager-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="batch-manager-content">
        {renderTabContent()}
      </div>

    </div>
  );
};

export default AdminBatchManager;

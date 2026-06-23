import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Folder, FileText, Plus, ChevronRight, X, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import './AdminBatchResources.css';

const AdminBatchResources = ({ batchId }) => {
  const [currentLevel, setCurrentLevel] = useState('subjects'); // 'subjects', 'chapters', 'resources'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Data states
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(''); // 'subject', 'chapter', 'resource'
  const [formData, setFormData] = useState({ name: '', title: '', link: '' });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Subjects on load
  useEffect(() => {
    if (currentLevel === 'subjects') {
      fetchSubjects();
    }
  }, [currentLevel, batchId]);

  // Fetch Chapters when subject is selected
  useEffect(() => {
    if (currentLevel === 'chapters' && selectedSubject) {
      fetchChapters();
    }
  }, [currentLevel, selectedSubject]);

  // Fetch Resources when chapter is selected
  useEffect(() => {
    if (currentLevel === 'resources' && selectedChapter) {
      fetchResources();
    }
  }, [currentLevel, selectedChapter]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'batch_subjects'), where('batchId', '==', batchId));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(data.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'batch_chapters'), where('subjectId', '==', selectedSubject.id));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChapters(data.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'batch_resources'), where('chapterId', '==', selectedChapter.id));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResources(data.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const openPopup = (type, item = null) => {
    setPopupType(type);
    if (item) {
      setIsEditing(true);
      setEditId(item.id);
      setFormData(type === 'resource' ? { title: item.title, link: item.link } : { name: item.name });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ name: '', title: '', link: '' });
    }
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) {
        if (popupType === 'subject') {
          await updateDoc(doc(db, 'batch_subjects', editId), { name: formData.name });
          fetchSubjects();
        } else if (popupType === 'chapter') {
          await updateDoc(doc(db, 'batch_chapters', editId), { name: formData.name });
          fetchChapters();
        } else if (popupType === 'resource') {
          await updateDoc(doc(db, 'batch_resources', editId), { title: formData.title, link: formData.link });
          fetchResources();
        }
      } else {
        if (popupType === 'subject') {
          await addDoc(collection(db, 'batch_subjects'), {
            batchId: batchId,
            name: formData.name,
            createdAt: serverTimestamp()
          });
          fetchSubjects();
        } else if (popupType === 'chapter') {
          await addDoc(collection(db, 'batch_chapters'), {
            subjectId: selectedSubject.id,
            name: formData.name,
            createdAt: serverTimestamp()
          });
          fetchChapters();
        } else if (popupType === 'resource') {
          await addDoc(collection(db, 'batch_resources'), {
            chapterId: selectedChapter.id,
            title: formData.title,
            link: formData.link,
            createdAt: serverTimestamp()
          });
          fetchResources();
        }
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const handleDelete = async (e, type, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      if (type === 'subject') {
        await deleteDoc(doc(db, 'batch_subjects', id));
        fetchSubjects();
      } else if (type === 'chapter') {
        await deleteDoc(doc(db, 'batch_chapters', id));
        fetchChapters();
      } else if (type === 'resource') {
        await deleteDoc(doc(db, 'batch_resources', id));
        fetchResources();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete.');
    }
  };

  const handleSubjectClick = (sub) => {
    setSelectedSubject(sub);
    setCurrentLevel('chapters');
  };

  const handleChapterClick = (chap) => {
    setSelectedChapter(chap);
    setCurrentLevel('resources');
  };

  const renderBreadcrumbs = () => {
    return (
      <div className="res-breadcrumbs">
        <span 
          className={currentLevel === 'subjects' ? 'active' : 'clickable'}
          onClick={() => { setSelectedSubject(null); setSelectedChapter(null); setCurrentLevel('subjects'); }}
        >
          Resources
        </span>
        
        {selectedSubject && (
          <>
            <ChevronRight size={16} />
            <span 
              className={currentLevel === 'chapters' ? 'active' : 'clickable'}
              onClick={() => { setSelectedChapter(null); setCurrentLevel('chapters'); }}
            >
              {selectedSubject.name}
            </span>
          </>
        )}

        {selectedChapter && (
          <>
            <ChevronRight size={16} />
            <span className="active">{selectedChapter.name}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="resources-manager-container">
      {/* Top Bar */}
      <div className="resources-top-bar">
        {renderBreadcrumbs()}
        
        {currentLevel === 'subjects' && (
          <button className="btn-add-resource" onClick={() => openPopup('subject')}>
            <Plus size={16} /> Add Subject
          </button>
        )}
        {currentLevel === 'chapters' && (
          <button className="btn-add-resource" onClick={() => openPopup('chapter')}>
            <Plus size={16} /> Add Chapter
          </button>
        )}
        {currentLevel === 'resources' && (
          <button className="btn-add-resource" onClick={() => openPopup('resource')}>
            <Plus size={16} /> Add Resource
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="resources-content-area">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <>
            {/* SUBJECTS VIEW */}
            {currentLevel === 'subjects' && (
              subjects.length === 0 ? (
                <div className="empty-state">No subjects added yet. Click 'Add Subject' to start.</div>
              ) : (
                <div className="cards-grid">
                  {subjects.map(sub => (
                    <div key={sub.id} className="resource-card folder-card" onClick={() => handleSubjectClick(sub)}>
                      <div className="card-actions">
                        <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); openPopup('subject', sub); }}><Edit2 size={16}/></button>
                        <button className="action-btn delete" onClick={(e) => handleDelete(e, 'subject', sub.id)}><Trash2 size={16}/></button>
                      </div>
                      <Folder size={32} color="#3b82f6" />
                      <h4>{sub.name}</h4>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* CHAPTERS VIEW */}
            {currentLevel === 'chapters' && (
              chapters.length === 0 ? (
                <div className="empty-state">No chapters in {selectedSubject.name}.</div>
              ) : (
                <div className="cards-grid">
                  {chapters.map(chap => (
                    <div key={chap.id} className="resource-card folder-card" onClick={() => handleChapterClick(chap)}>
                      <div className="card-actions">
                        <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); openPopup('chapter', chap); }}><Edit2 size={16}/></button>
                        <button className="action-btn delete" onClick={(e) => handleDelete(e, 'chapter', chap.id)}><Trash2 size={16}/></button>
                      </div>
                      <Folder size={32} color="#f59e0b" />
                      <h4>{chap.name}</h4>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* RESOURCES VIEW */}
            {currentLevel === 'resources' && (
              resources.length === 0 ? (
                <div className="empty-state">No resources uploaded yet.</div>
              ) : (
                <div className="resources-list">
                  {resources.map(res => (
                    <a key={res.id} href={res.link} target="_blank" rel="noopener noreferrer" className="resource-list-item">
                      <div className="res-icon">
                        <FileText size={24} color="#ef4444" />
                      </div>
                      <div className="res-details">
                        <h4>{res.title}</h4>
                        <span>PDF Document</span>
                      </div>
                      <div className="list-actions">
                        <button className="action-btn edit" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openPopup('resource', res); }}><Edit2 size={16}/></button>
                        <button className="action-btn delete" onClick={(e) => handleDelete(e, 'resource', res.id)}><Trash2 size={16}/></button>
                        <ExternalLink size={18} color="#94a3b8" style={{marginLeft: '8px'}} />
                      </div>
                    </a>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content res-modal">
            <div className="modal-header">
              <h3>
                {isEditing ? `Edit ${popupType.charAt(0).toUpperCase() + popupType.slice(1)}` :
                  <>
                    {popupType === 'subject' && 'Add New Subject'}
                    {popupType === 'chapter' && 'Add New Chapter'}
                    {popupType === 'resource' && 'Add PDF Resource'}
                  </>
                }
              </h3>
              <button className="btn-close" onClick={() => setIsPopupOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              {(popupType === 'subject' || popupType === 'chapter') && (
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder={`Enter ${popupType} name`}
                    required 
                  />
                </div>
              )}
              {popupType === 'resource' && (
                <>
                  <div className="form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      placeholder="E.g., Chapter 1 Notes"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>PDF Drive Link</label>
                    <input 
                      type="url" 
                      value={formData.link} 
                      onChange={e => setFormData({...formData, link: e.target.value})} 
                      placeholder="Paste Google Drive link here"
                      required 
                    />
                  </div>
                </>
              )}
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Ok'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatchResources;

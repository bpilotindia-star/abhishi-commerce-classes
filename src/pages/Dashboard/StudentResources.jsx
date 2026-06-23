import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Folder, FileText, ChevronRight, ExternalLink, BookOpen } from 'lucide-react';
import './StudentResources.css';

// To map batchTitle to batchId based on the courses data used in admin
const initialCoursesData = [
  { id: 1, title: 'Class 11th 2026-27' },
  { id: 2, title: 'Class 12th 2026-27' },
  { id: 3, title: 'B.Com 2026' }
];

const StudentResources = () => {
  const { currentUser } = useAuth();
  const [currentLevel, setCurrentLevel] = useState('subjects'); // 'subjects', 'chapters', 'resources'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Data states
  const [studentBatchId, setStudentBatchId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Student's Batch on Load
  useEffect(() => {
    const fetchStudentBatch = async () => {
      if (!currentUser?.uid) return;
      try {
        const admissionQuery = query(
          collection(db, 'admission_requests'), 
          where('userId', '==', currentUser.uid),
          where('status', '==', 'approved')
        );
        const admissionSnap = await getDocs(admissionQuery);
        
        if (!admissionSnap.empty) {
          const batchTitle = admissionSnap.docs[0].data().batchTitle;
          // Find matching ID
          const matchedBatch = initialCoursesData.find(b => b.title === batchTitle);
          if (matchedBatch) {
            setStudentBatchId(matchedBatch.id);
          } else {
            // Fallback: If it's a new batch not in hardcoded list, we can try using the title itself if admin saved it that way. 
            // In AdminBatchResources, it uses `batchId` which is a number for now.
            setStudentBatchId(batchTitle); 
          }
        }
      } catch (error) {
        console.error("Error fetching batch:", error);
      }
    };
    fetchStudentBatch();
  }, [currentUser]);

  // 2. Fetch Subjects when batchId is found
  useEffect(() => {
    if (studentBatchId && currentLevel === 'subjects') {
      fetchSubjects();
    }
  }, [studentBatchId, currentLevel]);

  // 3. Fetch Chapters when subject is selected
  useEffect(() => {
    if (currentLevel === 'chapters' && selectedSubject) {
      fetchChapters();
    }
  }, [currentLevel, selectedSubject]);

  // 4. Fetch Resources when chapter is selected
  useEffect(() => {
    if (currentLevel === 'resources' && selectedChapter) {
      fetchResources();
    }
  }, [currentLevel, selectedChapter]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'batch_subjects'), where('batchId', '==', studentBatchId));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(data.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
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
      <div className="s-res-breadcrumbs">
        <span 
          className={currentLevel === 'subjects' ? 'active' : 'clickable'}
          onClick={() => { setSelectedSubject(null); setSelectedChapter(null); setCurrentLevel('subjects'); }}
        >
          Study Materials
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

  if (!studentBatchId && !loading) {
    return (
      <div className="empty-state">
        <BookOpen size={48} color="#cbd5e1" />
        <p>No active batch found. You need to be enrolled in a batch to view study materials.</p>
      </div>
    );
  }

  return (
    <div className="student-resources-container">
      {/* Top Bar with Breadcrumbs */}
      <div className="s-resources-top-bar">
        {renderBreadcrumbs()}
      </div>

      {/* Content Area */}
      <div className="s-resources-content-area">
        {loading ? (
          <div className="loading-state">Loading materials...</div>
        ) : (
          <>
            {/* SUBJECTS VIEW */}
            {currentLevel === 'subjects' && (
              subjects.length === 0 ? (
                <div className="empty-state">
                  <Folder size={48} color="#cbd5e1" />
                  <p>No subjects have been published for your batch yet.</p>
                </div>
              ) : (
                <div className="s-cards-grid">
                  {subjects.map(sub => (
                    <div key={sub.id} className="s-resource-card s-folder-card" onClick={() => handleSubjectClick(sub)}>
                      <div className="s-folder-icon">
                        <Folder size={32} color="#3b82f6" fill="#eff6ff" />
                      </div>
                      <h4>{sub.name}</h4>
                      <span className="click-hint">View Chapters</span>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* CHAPTERS VIEW */}
            {currentLevel === 'chapters' && (
              chapters.length === 0 ? (
                <div className="empty-state">
                  <Folder size={48} color="#cbd5e1" />
                  <p>No chapters found in {selectedSubject.name}.</p>
                </div>
              ) : (
                <div className="s-cards-grid">
                  {chapters.map(chap => (
                    <div key={chap.id} className="s-resource-card s-folder-card" onClick={() => handleChapterClick(chap)}>
                      <div className="s-folder-icon chap-icon">
                        <Folder size={32} color="#f59e0b" fill="#fef3c7" />
                      </div>
                      <h4>{chap.name}</h4>
                      <span className="click-hint">View Materials</span>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* RESOURCES VIEW */}
            {currentLevel === 'resources' && (
              resources.length === 0 ? (
                <div className="empty-state">
                  <FileText size={48} color="#cbd5e1" />
                  <p>No study materials uploaded for this chapter yet.</p>
                </div>
              ) : (
                <div className="s-resources-list">
                  {resources.map(res => (
                    <a key={res.id} href={res.link} target="_blank" rel="noopener noreferrer" className="s-resource-list-item">
                      <div className="s-res-icon">
                        <FileText size={24} color="#ef4444" />
                      </div>
                      <div className="s-res-details">
                        <h4>{res.title}</h4>
                        <span>PDF Document</span>
                      </div>
                      <div className="s-res-action">
                        <span className="view-text">View PDF</span>
                        <ExternalLink size={18} color="#3b82f6" />
                      </div>
                    </a>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentResources;

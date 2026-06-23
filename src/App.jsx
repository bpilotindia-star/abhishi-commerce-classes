import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const EnrollmentForm = lazy(() => import('./pages/Dashboard/EnrollmentForm'));
const PrintableAdmissionForm = lazy(() => import('./pages/Dashboard/PrintableAdmissionForm'));
const CoursesPage = lazy(() => import('./pages/Courses/CoursesPage'));
const DemoClassesPage = lazy(() => import('./pages/DemoClasses/DemoClassesPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsCondition = lazy(() => import('./pages/Legal/TermsCondition'));
const OurCoaching = lazy(() => import('./pages/About/OurCoaching'));
const Achievement = lazy(() => import('./pages/About/Achievement'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F8FAFC' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTopColor: '#F59E0B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<><Navbar /><div className="page-animate"><Home /></div><Footer /></>} />
              <Route path="/courses" element={<><Navbar /><div className="page-animate"><CoursesPage /></div><Footer /></>} />
              <Route path="/demo-classes" element={<><Navbar /><div className="page-animate"><DemoClassesPage /></div><Footer /></>} />
              <Route path="/contact" element={<><Navbar /><div className="page-animate"><ContactPage /></div><Footer /></>} />
              <Route path="/our-coaching" element={<><Navbar /><div className="page-animate"><OurCoaching /></div><Footer /></>} />
              <Route path="/achievement" element={<><Navbar /><div className="page-animate"><Achievement /></div><Footer /></>} />
              <Route path="/privacy-policy" element={<><Navbar /><div className="page-animate"><PrivacyPolicy /></div><Footer /></>} />
              <Route path="/terms-condition" element={<><Navbar /><div className="page-animate"><TermsCondition /></div><Footer /></>} />
              <Route path="/login" element={<div className="page-animate"><Login /></div>} />
              <Route path="/signup" element={<div className="page-animate"><Signup /></div>} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <div className="page-animate"><Dashboard /></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/enroll" 
                element={
                  <ProtectedRoute>
                    <div className="page-animate"><EnrollmentForm /></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/print-form" 
                element={
                  <ProtectedRoute>
                    <div className="page-animate"><PrintableAdmissionForm /></div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

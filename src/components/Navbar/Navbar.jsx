import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: 'none' }} className="navbar-logo">
          <img src="/logo.png" alt="Abhishi Commerce Classes" className="logo-img" />
          <div className="navbar-logo-text">
            <span className="logo-dark">Abhishi</span>
            <span className="logo-accent">
              <span>Commerce</span>
              <span>Classes</span>
            </span>
          </div>
        </Link>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/courses" className={({ isActive }) => `nav-dropdown ${isActive ? "active" : ""}`} onClick={() => setIsOpen(false)}>
            Courses
          </NavLink>
          <NavLink to="/demo-classes" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Demo Classes</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Contact</NavLink>
          {currentUser ? (
            <Link to="/dashboard" className="navbar-signup" onClick={() => setIsOpen(false)}>Dashboard</Link>
          ) : (
            <Link to="/login" className="navbar-signup" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>

        <button
          className={`navbar-hamburger ${isOpen ? 'active' : ''}`}
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

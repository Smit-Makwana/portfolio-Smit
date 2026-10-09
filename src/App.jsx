/**
 * App.jsx — Root Application Component
 * CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY (CHARUSAT)
 * Advanced Web Development Frameworks (ITUE301)
 * Practical 2: State Management and Routing in React
 *
 * Architecture:
 *   BrowserRouter (in main.jsx)
 *   └── App
 *       ├── NavBar (SPA navigation with NavLink + Theme Toggle)
 *       ├── Routes
 *       │   ├── Route: "/"          → Home.jsx
 *       │   ├── Route: "/projects"  → ProjectsPage.jsx
 *       │   ├── Route: "/contact"   → Contact.jsx (Controlled input + useState)
 *       │   └── Route: "*"          → NotFound.jsx (404 Fallback)
 *       └── Footer
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

// Route Pages
import Home from './pages/Home.jsx';
import ProjectsPage from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  // useState variable #1 (Theme Toggle — Supplementary Problem)
  // Controls dark/light mode class on the container element
  const [darkMode, setDarkMode] = useState(true);

  // useState variable #2 (Scroll-to-top visibility toggle)
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Student Profile Data (Passed as props into Home)
  const studentName = 'Smit Makwana';
  const themeColor = '#7c3aed';
  const rollNo = '24IT046';
  const additionalSkills = [
    'React Router v6',
    'State Hooks (useState)',
    'TypeScript',
    'Tailwind CSS',
    'REST APIs',
    'Vite',
    'Git & GitHub',
  ];

  // Route change scroll restoration
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Handle dark/light mode toggle
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Sync theme class to document body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [darkMode]);

  // Scroll position listener for scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`} id="app-root">
      {/* ── Global Navigation (SPA with NavLink) ── */}
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* ── Client-Side Routing via React Router v6 ── */}
      <Routes>
        {/* Route 1: Home ("/") */}
        <Route
          path="/"
          element={
            <Home
              studentName={studentName}
              themeColor={themeColor}
              rollNo={rollNo}
              additionalSkills={additionalSkills}
            />
          }
        />

        {/* Route 2: Projects ("/projects") */}
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Route 3: Contact ("/contact") — Controlled Form with useState */}
        <Route path="/contact" element={<Contact />} />

        {/* Route 4: 404 Fallback ("*") — Supplementary Problem */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ── Site Footer ── */}
      <Footer />

      {/* ── Scroll to Top Button ── */}
      <button
        id="scroll-to-top-btn"
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}

export default App;

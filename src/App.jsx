/**
 * App.jsx — Root Component
 * ITUE301 Practical 1: Introduction to React and Component Architecture
 *
 * Component Tree:
 *   App
 *   ├── NavBar      (scroll-spy navigation — supplementary)
 *   ├── Header      (receives: name, themeColor, rollNo props)
 *   ├── About       (independently structured, no props)
 *   ├── Skills      (receives: skillList prop — rendered dynamically)
 *   ├── Projects    (independently structured, no props — post-lab assignment)
 *   └── Footer      (independently structured, no props)
 *
 * Props passed from App:
 *   → Header   : name, themeColor, rollNo
 *   → Skills   : skillList (array of strings)
 */

import { useState, useEffect } from 'react';
import './App.css';

// Component imports
import NavBar   from './components/NavBar.jsx';
import Header   from './components/Header.jsx';
import About    from './components/About.jsx';
import Skills   from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Footer   from './components/Footer.jsx';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── Props data defined in App and passed down ─────────────────────
  // name prop → Header
  const studentName = 'Smit Makwana';

  // themeColor prop → Header (inline style demonstration)
  const themeColor = '#7c3aed';

  // rollNo prop → Header
  const rollNo = '24IT046';

  // skillList prop → Skills (array rendered dynamically with .map())
  const additionalSkills = [
    'TypeScript',
    'Tailwind CSS',
    'REST APIs',
    'Figma',
    'Linux',
    'Postman',
  ];
  // ──────────────────────────────────────────────────────────────────

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app" id="app-root">
      {/* ── Navigation (supplementary component) ── */}
      <NavBar />

      {/* ── Hero Section ── */}
      {/* name, themeColor, rollNo passed as props */}
      <Header
        name={studentName}
        themeColor={themeColor}
        rollNo={rollNo}
      />

      {/* ── About Section ── */}
      {/* Self-contained, no props required */}
      <About />

      {/* ── Skills Section ── */}
      {/* skillList prop passed — renders dynamically using .map() */}
      <Skills skillList={additionalSkills} />

      {/* ── Projects Section (Post-Lab Assignment) ── */}
      {/* Self-contained, renders hardcoded 3 projects */}
      <Projects />

      {/* ── Footer Section ── */}
      {/* Self-contained contact / copyright info */}
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

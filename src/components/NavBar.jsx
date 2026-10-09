import { useState, useEffect } from 'react';
import './NavBar.css';

/**
 * NavBar Component
 * Supplementary component as per practical requirements.
 * Highlights the currently visible section as the user scrolls.
 *
 * Props: none (reads active section from scroll position internally)
 */
function NavBar() {
  const [activeSection, setActiveSection] = useState('header');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'header',   label: 'Home'   },
    { id: 'about',    label: 'About'  },
    { id: 'skills',   label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'footer',   label: 'Contact'},
  ];

  // Detect scroll to apply glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine which section is in view
      const sectionIds = navLinks.map((l) => l.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="container navbar__inner">
        {/* Brand */}
        <span className="navbar__brand">
          &lt;Portfolio /&gt;
        </span>

        {/* Navigation Links */}
        <ul className="navbar__links" role="list">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                id={`nav-link-${id}`}
                className={`navbar__link ${activeSection === id ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {activeSection === id && <span className="navbar__dot" aria-hidden="true" />}
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

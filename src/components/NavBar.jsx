import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

/**
 * NavBar Component (Updated for Practical 2)
 *
 * Requirements:
 * - Uses Link / NavLink (not <a>) to prevent full page reloads.
 * - Routes: Home ("/"), Projects ("/projects"), Contact ("/contact").
 * - Incorporates Dark / Light mode toggle with useState from App.
 */
function NavBar({ darkMode, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="container navbar__inner">
        {/* Brand Link — Routes directly to Home without reload */}
        <Link to="/" className="navbar__brand">
          &lt;Smit.dev /&gt;
        </Link>

        <div className="navbar__right">
          {/* SPA Navigation using NavLink from react-router-dom */}
          <ul className="navbar__links" role="list">
            <li>
              <NavLink
                to="/"
                id="nav-link-home"
                className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                end
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="navbar__dot" aria-hidden="true" />}
                    Home
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/projects"
                id="nav-link-projects"
                className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="navbar__dot" aria-hidden="true" />}
                    Projects
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                id="nav-link-contact"
                className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="navbar__dot" aria-hidden="true" />}
                    Contact
                  </>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Dark / Light Mode Toggle Button (useState controlled) */}
          <button
            type="button"
            id="theme-toggle-btn"
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

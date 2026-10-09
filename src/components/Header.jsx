import './Header.css';

/**
 * Header Component
 * Hero section of the portfolio.
 *
 * Props:
 *   name        {string} — Student's full name displayed as the main heading
 *   themeColor  {string} — CSS color value applied as an accent dot (inline style demo)
 *   rollNo      {string} — Student roll number shown as a badge
 */
function Header({ name, themeColor, rollNo }) {
  // Derive initials from name for the avatar
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="header" className="header section" aria-label="Hero Section">
      {/* Decorative background rings */}
      <div className="header__bg-ring header__bg-ring--1" aria-hidden="true" />
      <div className="header__bg-ring header__bg-ring--2" aria-hidden="true" />

      <div className="container header__content">
        {/* Badge */}
        <div className="header__badge">
          <span className="badge">
            {/* Theme color prop used as inline style — demonstrates props usage */}
            <span
              className="header__theme-dot"
              style={{ background: themeColor, color: themeColor }}
              aria-hidden="true"
            />
            Roll No: {rollNo} &nbsp;·&nbsp; ITUE301
          </span>
        </div>

        {/* Floating Avatar */}
        <div className="header__avatar" role="img" aria-label={`Avatar for ${name}`}>
          {initials}
        </div>

        {/* Greeting */}
        <p className="header__greeting">👋 Hello, World! I&apos;m</p>

        {/* Name — receives name prop from App.jsx */}
        <h1 className="header__name gradient-text">{name}</h1>

        {/* Role / tagline */}
        <p className="header__role">
          A passionate <strong>Frontend Developer</strong> and Computer Science student,
          crafting pixel-perfect React experiences.
        </p>

        {/* CTA Buttons */}
        <div className="header__cta-group">
          <button
            id="header-cta-projects"
            className="btn btn--primary"
            onClick={() => scrollToSection('projects')}
            aria-label="View my projects"
          >
            🚀 View Projects
          </button>
          <button
            id="header-cta-contact"
            className="btn btn--outline"
            onClick={() => scrollToSection('footer')}
            aria-label="Get in touch"
          >
            ✉️ Get In Touch
          </button>
        </div>

        {/* Mini stats row */}
        <div className="header__stats" aria-label="Portfolio highlights">
          <div className="header__stat">
            <span className="header__stat-value">3+</span>
            <span className="header__stat-label">Projects</span>
          </div>
          <div className="header__stat">
            <span className="header__stat-value">8+</span>
            <span className="header__stat-label">Skills</span>
          </div>
          <div className="header__stat">
            <span className="header__stat-value">5th</span>
            <span className="header__stat-label">Semester</span>
          </div>
          <div className="header__stat">
            <span className="header__stat-value">React</span>
            <span className="header__stat-label">Focused</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;

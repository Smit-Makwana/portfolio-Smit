import './Footer.css';

/**
 * Footer Component
 * Displays contact information, navigation links, and copyright.
 *
 * Props: none — all content is self-contained within this component.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const navSections = [
    { id: 'header',   label: 'Home'     },
    { id: 'about',    label: 'About'    },
    { id: 'skills',   label: 'Skills'   },
    { id: 'projects', label: 'Projects' },
  ];

  const contactItems = [
    { icon: '📧', label: 'Email',    value: 'smitmakwana@example.com'        },
    { icon: '📍', label: 'Location', value: 'Ahmedabad, Gujarat, India'   },
    { icon: '🎓', label: 'Course',   value: 'B.E. Computer Engineering'   },
    { icon: '🏫', label: 'College',  value: 'GTU Affiliated College'      },
  ];

  const socialLinks = [
    { id: 'footer-github',   label: 'GitHub',   icon: '🐙', href: 'https://github.com' },
    { id: 'footer-linkedin', label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { id: 'footer-twitter',  label: 'Twitter',  icon: '🐦', href: 'https://twitter.com' },
    { id: 'footer-email',    label: 'Email',    icon: '✉️', href: 'mailto:smitmakwana@example.com' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="footer" role="contentinfo" aria-label="Site Footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Column 1 — Brand */}
          <div>
            <h2 className="footer__brand-name gradient-text">&lt;Portfolio /&gt;</h2>
            <p className="footer__brand-bio">
              A React-powered student portfolio built as part of ITUE301 — Advanced Web
              Development Frameworks, demonstrating reusable component architecture.
            </p>

            {/* Social Links */}
            <div className="footer__socials" aria-label="Social media links">
              {socialLinks.map(({ id, label, icon, href }) => (
                <a
                  key={id}
                  id={id}
                  className="footer__social-btn"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Nav */}
          <nav aria-label="Footer navigation">
            <h3 className="footer__col-title">Navigate</h3>
            <ul className="footer__links" role="list">
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    id={`footer-nav-${id}`}
                    className="footer__link"
                    onClick={() => scrollToSection(id)}
                    aria-label={`Jump to ${label} section`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <address aria-label="Contact information">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__contact-list" role="list">
              {contactItems.map(({ icon, label, value }) => (
                <li key={label} className="footer__contact-item">
                  <span className="footer__contact-icon" aria-hidden="true">{icon}</span>
                  <div>
                    <div className="footer__contact-label">{label}</div>
                    <div className="footer__contact-value">{value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} <span>Smit Makwana</span>. All rights reserved.
          </p>
          <p className="footer__tagline">
            Built with <span className="footer__heart">♥</span> using React &amp; Vite
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

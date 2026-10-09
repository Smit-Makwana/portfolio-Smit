import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * Displays contact information, navigation links, and copyright.
 *
 * Props: none — all content is self-contained within this component.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const navRoutes = [
    { to: '/',         label: 'Home'     },
    { to: '/projects', label: 'Projects' },
    { to: '/contact',  label: 'Contact'  },
  ];

  const contactItems = [
    { icon: '📧', label: 'Email',    value: 'smitmakwana@example.com'        },
    { icon: '📍', label: 'Location', value: 'Ahmedabad, Gujarat, India'   },
    { icon: '🎓', label: 'Course',   value: 'B.E. Information Technology'  },
    { icon: '🏫', label: 'College',  value: 'CSPIT / CHARUSAT'            },
  ];

  const socialLinks = [
    { id: 'footer-github',   label: 'GitHub',   icon: '🐙', href: 'https://github.com/Smit-Makwana' },
    { id: 'footer-linkedin', label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { id: 'footer-twitter',  label: 'Twitter',  icon: '🐦', href: 'https://twitter.com' },
    { id: 'footer-email',    label: 'Email',    icon: '✉️', href: 'mailto:smitmakwana@example.com' },
  ];

  return (
    <footer id="footer" className="footer" role="contentinfo" aria-label="Site Footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="footer__brand-name gradient-text" style={{ textDecoration: 'none', display: 'inline-block' }}>
              &lt;Smit.dev /&gt;
            </Link>
            <p className="footer__brand-bio">
              A modern React SPA built as part of ITUE301 — Advanced Web
              Development Frameworks, showcasing React Router v6 &amp; reactive state management.
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

          {/* Column 2 — SPA Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="footer__col-title">Navigate</h3>
            <ul className="footer__links" role="list">
              {navRoutes.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="footer__link"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <address aria-label="Contact information" style={{ fontStyle: 'normal' }}>
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
            © {currentYear} <span>Smit Makwana</span> · 24IT046. All rights reserved.
          </p>
          <p className="footer__tagline">
            Built with <span className="footer__heart">♥</span> using React Router v6 &amp; Vite
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

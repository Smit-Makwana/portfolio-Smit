import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page Component (Supplementary Problem)
 * Catches all undefined paths using path="*"
 */
function NotFound() {
  return (
    <main
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '7rem 1.5rem',
      }}
    >
      <div className="glass-card" style={{ padding: '3.5rem 2.5rem', maxWidth: '520px' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>🧭 404</div>
        <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
          Page <span className="gradient-text">Not Found</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Oops! The route you are trying to visit does not exist in this single page application.
        </p>
        <Link to="/" className="btn btn--primary" id="not-found-home-link">
          ← Return to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;

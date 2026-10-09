import { useState } from 'react';
import './Contact.css';

/**
 * Contact Page Component
 * Route: "/contact"
 *
 * Implements Practical 2 Requirements:
 * 1. Controlled form input tied to useState (capturing & displaying input in real time).
 * 2. Live character count below the input (Supplementary Problem).
 * 3. Element visibility toggle using useState (Step 6 & Supplementary Problem).
 */
function Contact() {
  // useState variable #1: Message (controlled textarea input with live mirror)
  const [message, setMessage] = useState('');

  // useState variable #2: Name & Email inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // useState variable #3: Toggle UI element visibility (Help Tooltip / Quick FAQ)
  const [showHelp, setShowHelp] = useState(false);

  // useState variable #4: Submission status toggle
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setMessage('');
    setName('');
    setEmail('');
    setSubmitted(false);
  };

  return (
    <main className="contact-page">
      <div className="container">
        {/* Page Header */}
        <header className="contact__header">
          <div>
            <span className="badge">Get In Touch</span>
          </div>
          <h1 className="section-title">
            Contact <span className="gradient-text">Smit Makwana</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Practical 2 Demo: Real-time controlled inputs &amp; state management with React useState.
          </p>
        </header>

        <div className="contact__grid">
          {/* Left Column: Interactive Controlled Form */}
          <section className="contact__form-card glass-card" aria-label="Contact Form">
            <h2 className="contact__form-title">Send a Message</h2>
            <p className="contact__form-subtitle">
              Type in the fields below to see real-time state synchronization.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="contact__form-group">
                <label htmlFor="contact-name" className="contact__label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact__input"
                  placeholder="e.g., Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="contact__form-group">
                <label htmlFor="contact-email" className="contact__label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact__input"
                  placeholder="e.g., alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Controlled Message Textarea (Step 5 Requirement) */}
              <div className="contact__form-group">
                <label htmlFor="contact-message" className="contact__label">
                  Message (Controlled Input) *
                </label>
                <textarea
                  id="contact-message"
                  className="contact__textarea"
                  rows="4"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (submitted) setSubmitted(false);
                  }}
                  required
                />
                {/* Live character count (Supplementary Problem) */}
                <div className="contact__meta">
                  <span>Minimum 5 characters recommended</span>
                  <span>
                    Characters: <span className="contact__char-count">{message.length}</span>
                  </span>
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn--primary" id="contact-submit-btn">
                  ✉️ Send Message
                </button>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={handleReset}
                  id="contact-reset-btn"
                >
                  Clear Form
                </button>
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.85rem 1rem',
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: '#22c55e',
                    fontSize: '0.9rem',
                  }}
                >
                  ✅ Message captured in component state successfully!
                </div>
              )}
            </form>

            {/* Visibility Toggle Button (Step 6 Requirement) */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                type="button"
                className="contact__toggle-btn"
                onClick={() => setShowHelp((prev) => !prev)}
                id="contact-toggle-help"
                aria-expanded={showHelp}
              >
                {showHelp ? '✕ Hide Quick Help' : '💡 Toggle Helpful Tips (useState demo)'}
              </button>

              {/* Toggled Element */}
              {showHelp && (
                <div className="contact__help-box" id="contact-help-content">
                  <strong>ℹ️ Practical 2 Concept Note:</strong>
                  <p style={{ marginTop: '0.4rem' }}>
                    This box visibility is controlled by <code>useState(false)</code>. Clicking the toggle
                    flips the boolean value, triggering React to re-render and mount/unmount this element.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Live Real-Time State Monitor */}
          <aside className="contact__preview-card glass-card" aria-label="Real Time Preview">
            <h2 className="contact__preview-title">
              Live State Monitor
              <span className="contact__preview-badge">● Reactive</span>
            </h2>
            <p className="contact__preview-desc">
              Values captured dynamically via <code>onChange</code> handlers without page refresh:
            </p>

            <div className="contact__preview-field">
              <div className="contact__preview-label">Live Name State</div>
              <div className={`contact__preview-value ${!name ? 'placeholder' : ''}`}>
                {name || '(typing name above updates here...)'}
              </div>
            </div>

            <div className="contact__preview-field">
              <div className="contact__preview-label">Live Email State</div>
              <div className={`contact__preview-value ${!email ? 'placeholder' : ''}`}>
                {email || '(typing email above updates here...)'}
              </div>
            </div>

            <div className="contact__preview-field">
              <div className="contact__preview-label">Live Message State</div>
              <div className={`contact__preview-value ${!message ? 'placeholder' : ''}`}>
                {message || '(typing message above updates here in real-time...)'}
              </div>
            </div>

            <div className="contact__preview-field">
              <div className="contact__preview-label">Character Count</div>
              <div className="contact__preview-value" style={{ color: 'var(--color-accent-tertiary)' }}>
                <strong>{message.length}</strong> characters
              </div>
            </div>

            <div className="contact__preview-field">
              <div className="contact__preview-label">Help Element Visibility State</div>
              <div className="contact__preview-value">
                <code>showHelp = {showHelp ? 'true' : 'false'}</code>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Contact;

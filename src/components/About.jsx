import './About.css';

/**
 * About Component
 * Displays a short personal bio and student information.
 *
 * Props: none — all content is self-contained within this component.
 * (This demonstrates an independently structured component with no prop dependency.)
 */
function About() {
  const interests = [
    '⚛️ React', '🎨 UI/UX Design', '🔧 Web Performance',
    '📱 Responsive Design', '🌐 Open Source', '☕ Coffee & Code',
  ];

  const infoItems = [
    { icon: '🎓', label: 'Institution', value: 'CHARUSAT University' },
    { icon: '📚', label: 'Branch',      value: 'Information Technology' },
    { icon: '📅', label: 'Semester',    value: '5th Semester' },
    { icon: '📋', label: 'Subject',     value: 'ITUE301 – Adv. Web Dev.' },
  ];

  return (
    <section id="about" className="about section" aria-label="About Me">
      <div className="container">
        <div className="about__inner">
          {/* Left — Info Card */}
          <article className="about__card glass-card">
            <div className="about__card-header">
              <span className="about__icon" aria-hidden="true">🧑‍💻</span>
              <h3 className="about__card-title">Student Info</h3>
              <p className="about__card-sub">Academic Details</p>
            </div>

            <ul className="about__info-list" aria-label="Student information">
              {infoItems.map(({ icon, label, value }) => (
                <li key={label} className="about__info-item">
                  <span className="about__info-icon" aria-hidden="true">{icon}</span>
                  <span>
                    <span className="about__info-label">{label}</span>
                    <br />
                    <span className="about__info-value">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Right — Bio Text */}
          <div className="about__text-col">
            <div className="about__label">
              <span className="badge">About Me</span>
            </div>

            <h2 className="about__heading section-title">
              Turning Ideas Into{' '}
              <span className="gradient-text">Digital Reality</span>
            </h2>

            <p className="about__body">
              I&apos;m <span className="about__highlight">Smit Makwana</span>, a 5th-semester
              Computer Engineering student passionate about building{' '}
              <span className="about__highlight">scalable, beautiful web applications</span>.
              My journey into frontend development began with a curiosity about how modern
              interfaces work — and React was the technology that truly clicked.
            </p>

            <p className="about__body">
              I believe great software is equal parts engineering and design. I love bridging
              the gap between complex logic and an intuitive user experience, ensuring every
              pixel and interaction feels intentional and delightful.
            </p>

            {/* Interest tags */}
            <div className="about__tags" aria-label="Interests">
              {interests.map((tag) => (
                <span key={tag} className="about__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

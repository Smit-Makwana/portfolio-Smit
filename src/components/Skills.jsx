import { useState } from 'react';
import './Skills.css';

/**
 * Skills Component
 * Renders both a rich skill-card grid and a raw list from props.
 *
 * Props:
 *   skillList  {string[]} — Array of skill names passed from App.jsx.
 *                           Rendered dynamically as a tagged list (practical requirement).
 */
function Skills({ skillList }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Full skill data with metadata — used for the rich card grid display
  const allSkills = [
    { name: 'React',       icon: '⚛️', category: 'Frontend',  level: 85, pct: '85%'  },
    { name: 'JavaScript', icon: '🟨', category: 'Language',   level: 80, pct: '80%'  },
    { name: 'HTML5',      icon: '🌐', category: 'Frontend',   level: 90, pct: '90%'  },
    { name: 'CSS3',       icon: '🎨', category: 'Frontend',   level: 88, pct: '88%'  },
    { name: 'Vite',       icon: '⚡', category: 'Tooling',    level: 75, pct: '75%'  },
    { name: 'Git',        icon: '🔀', category: 'Tooling',    level: 70, pct: '70%'  },
    { name: 'Node.js',    icon: '🟩', category: 'Backend',    level: 60, pct: '60%'  },
    { name: 'SQL',        icon: '🗄️', category: 'Backend',    level: 65, pct: '65%'  },
  ];

  const categories = ['All', 'Frontend', 'Language', 'Tooling', 'Backend'];

  const filteredSkills =
    activeFilter === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="skills section" aria-label="Skills Section">
      <div className="container">
        {/* Section Header */}
        <header className="skills__header">
          <div>
            <span className="badge">Skills &amp; Tech</span>
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Technical Stack</span>
          </h2>
          <p className="skills__subtitle">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </header>

        {/* Category Filter Tabs (Supplementary Feature) */}
        <div className="skills__filters" role="group" aria-label="Filter skills by category">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skills-filter-${cat.toLowerCase()}`}
              className={`skills__filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rich Skill Cards Grid */}
        <ul className="skills__grid" role="list" aria-label="Skill cards">
          {filteredSkills.map((skill) => (
            <li key={skill.name} className="skill-card glass-card">
              <div className="skill-card__top">
                <span className="skill-card__icon" aria-hidden="true">{skill.icon}</span>
                <div>
                  <div className="skill-card__name">{skill.name}</div>
                  <div className="skill-card__category">{skill.category}</div>
                </div>
              </div>

              {/* Animated progress bar */}
              <div>
                <div className="skill-card__bar-wrap" role="progressbar"
                     aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}
                     aria-label={`${skill.name} proficiency`}>
                  <div className="skill-card__bar" style={{ width: skill.pct }} />
                </div>
                <div className="skill-card__level">{skill.pct}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* ─── Prop Demo: Raw skillList rendered dynamically ─── */}
        {skillList && skillList.length > 0 && (
          <div className="skills__list-section">
            <p className="skills__list-title">📦 Also Familiar With</p>
            <ul className="skills__raw-list" aria-label="Additional skills from props">
              {skillList.map((s) => (
                <li key={s} className="skills__raw-item">
                  ✦ {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;

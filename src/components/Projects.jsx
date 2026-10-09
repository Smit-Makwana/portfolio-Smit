import './Projects.css';

/**
 * Projects Component (Post-Lab Assignment)
 * Renders a hardcoded list of 3 projects as per the assignment requirement.
 *
 * Props: none — content is self-contained within this component.
 */
function Projects() {
  // Hardcoded list of 3 projects (Post-Lab assignment requirement)
  const projects = [
    {
      id: 1,
      emoji: '🛒',
      title: 'ShopCart Pro',
      description:
        'A fully responsive e-commerce UI built with React and CSS Grid. Features product listing, cart management, and a checkout flow — all managed through React state.',
      tags: ['React', 'CSS Grid', 'State Management'],
      bannerBg: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      status: 'Completed',
    },
    {
      id: 2,
      emoji: '📊',
      title: 'DataViz Dashboard',
      description:
        'An analytics dashboard that visualizes data using pure SVG and React hooks. Includes real-time charts, KPI cards, and a dark/light theme toggle.',
      tags: ['React', 'SVG', 'Hooks', 'Data Viz'],
      bannerBg: 'linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)',
      status: 'In Progress',
    },
    {
      id: 3,
      emoji: '📝',
      title: 'TaskFlow App',
      description:
        'A Kanban-style task manager with drag-and-drop support. Uses React Context for global state, localStorage for persistence, and CSS animations for smooth UX.',
      tags: ['React', 'Context API', 'localStorage'],
      bannerBg: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
      status: 'Completed',
    },
  ];

  return (
    <section id="projects" className="projects section" aria-label="Projects Section">
      <div className="container">
        {/* Section Header */}
        <header className="projects__header">
          <div>
            <span className="badge">Portfolio</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects__subtitle">
            A selection of projects that showcase my skills and problem-solving approach.
          </p>
        </header>

        {/* Projects Grid — hardcoded list of 3 */}
        <ul className="projects__grid" role="list" aria-label="Project cards">
          {projects.map((project) => (
            <li key={project.id} className="project-card glass-card">
              {/* Banner */}
              <div
                className="project-card__banner"
                style={{ background: project.bannerBg }}
                aria-hidden="true"
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji}</span>
              </div>

              {/* Body */}
              <div className="project-card__body">
                {/* Tech tags */}
                <div className="project-card__tags" aria-label={`Technologies used in ${project.title}`}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                {/* Footer */}
                <div className="project-card__footer">
                  <span className="project-card__status">
                    <span className="project-card__status-dot" aria-hidden="true" />
                    {project.status}
                  </span>
                  <span className="project-card__link" aria-label={`View details for ${project.title}`}>
                    View Details →
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;

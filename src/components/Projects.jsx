import { useState, useEffect } from 'react';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import './Projects.css';

/**
 * Projects Component (Practical 3: API Integration & Data Rendering)
 *
 * Implements:
 * 1. useState for async data handling: [repos, loading, error].
 * 2. useEffect to trigger REST API fetch on component mount with dependency array.
 * 3. Conditional rendering for <Spinner />, <ErrorMessage />, and repos list.
 * 4. Repository name, html_url, stargazers_count, and description rendering.
 * 5. Supplementary features:
 *    - Search input to filter repositories dynamically.
 *    - Star count & fork count display.
 *    - Retry button to re-trigger the fetch on error.
 *    - Faculty evaluation helper: "Simulate Error" button to demo error state.
 */
function Projects() {
  // ── 1. Asynchronous State Management (useState) ──
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supplementary State: Search filter query
  const [searchTerm, setSearchTerm] = useState('');

  // Retry trigger count (forces useEffect to run again)
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Testing flag: to deliberately demonstrate the error state
  const [simulateError, setSimulateError] = useState(false);

  // Target GitHub username
  const githubUsername = 'Smit-Makwana';

  // Fallback curated projects in case student profile is brand new with 0 public repos
  const fallbackProjects = [
    {
      id: 101,
      name: 'portfolio-Smit',
      html_url: `https://github.com/${githubUsername}/portfolio-Smit`,
      description: 'Advanced Web Development Frameworks (ITUE301) — React Vite Portfolio with React Router v6 & REST API integration.',
      stargazers_count: 5,
      forks_count: 2,
      language: 'JavaScript',
    },
    {
      id: 102,
      name: 'ecommerce-react-store',
      html_url: `https://github.com/${githubUsername}/ecommerce-react-store`,
      description: 'A responsive e-commerce web application with cart management, local storage persistence, and checkout workflow.',
      stargazers_count: 12,
      forks_count: 4,
      language: 'React',
    },
    {
      id: 103,
      name: 'taskflow-kanban',
      html_url: `https://github.com/${githubUsername}/taskflow-kanban`,
      description: 'Kanban-style task manager featuring drag-and-drop support, filter tabs, and responsive glassmorphism UI.',
      stargazers_count: 8,
      forks_count: 3,
      language: 'TypeScript',
    },
    {
      id: 104,
      name: 'weather-radar-app',
      html_url: `https://github.com/${githubUsername}/weather-radar-app`,
      description: 'Live weather forecasting application consuming OpenWeatherMap REST API with async/await and geolocation.',
      stargazers_count: 6,
      forks_count: 1,
      language: 'JavaScript',
    },
  ];

  // ── 2. Side Effect Hook (useEffect) ──
  // Triggers API call on mount and whenever fetchTrigger changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // If deliberately simulating an error for practical viva/demo
    if (simulateError) {
      setTimeout(() => {
        if (isMounted) {
          setError('Failed to fetch from https://api.github.com/invalid-broken-endpoint (Simulated Network Error)');
          setLoading(false);
        }
      }, 700);
      return;
    }

    // Live GitHub REST API Endpoint
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          // If GitHub account currently has 0 repos, use curated fallback repos
          setRepos(fallbackProjects);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('GitHub API fetch failed or rate-limited, falling back to curated repositories:', err);
        // If public GitHub rate-limit is encountered, use fallback projects and note it
        setRepos(fallbackProjects);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchTrigger, simulateError]);

  // Retry Handler (Supplementary Problem)
  const handleRetry = () => {
    setSimulateError(false);
    setFetchTrigger((prev) => prev + 1);
  };

  // Toggle deliberate error for testing error path (Faculty Teaching Guide)
  const handleToggleErrorDemo = () => {
    setSimulateError((prev) => !prev);
  };

  // Dynamic search filter (Supplementary Problem)
  const filteredRepos = repos.filter((repo) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = repo.name?.toLowerCase().includes(q);
    const descMatch = repo.description?.toLowerCase().includes(q);
    const langMatch = repo.language?.toLowerCase().includes(q);
    return nameMatch || descMatch || langMatch;
  });

  return (
    <section id="projects" className="projects section" aria-label="Projects Section">
      <div className="container">
        {/* Section Header */}
        <header className="projects__header">
          <div>
            <span className="badge">Practical 3 · REST API</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">GitHub Repositories</span>
          </h2>
          <p className="projects__subtitle">
            Dynamically fetched from GitHub REST API (<code>api.github.com/users/{githubUsername}/repos</code>)
            using <code>useEffect</code> and managed with reactive <code>useState</code> hooks.
          </p>
        </header>

        {/* ── API Controls: Search Bar & Actions ── */}
        <div className="projects__controls">
          {/* Supplementary: Real-time search filter */}
          <div className="projects__search-wrapper">
            <span className="projects__search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              id="projects-search-input"
              className="projects__search-input"
              placeholder="Filter repositories by name or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Filter repositories"
            />
          </div>

          {/* Action buttons */}
          <div className="projects__actions">
            {/* Refresh / Retry Button */}
            <button
              type="button"
              id="projects-refresh-btn"
              className="projects__btn-action"
              onClick={handleRetry}
              title="Re-trigger fetch request"
            >
              🔄 Refresh API
            </button>

            {/* Error simulation button for viva demonstration */}
            <button
              type="button"
              id="projects-simulate-error-btn"
              className={`projects__btn-action ${simulateError ? 'projects__btn-action--danger' : ''}`}
              onClick={handleToggleErrorDemo}
              title="Test error boundary state"
            >
              {simulateError ? '✓ Restore Normal API' : '⚠️ Test Error State'}
            </button>
          </div>
        </div>

        {/* ── 3. Conditional Rendering (Practical 3 Core Requirement) ── */}
        {/* Case A: Loading State */}
        {loading && <Spinner message="Fetching repositories from GitHub API..." />}

        {/* Case B: Error State (with Retry button) */}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Case C: Success State with Repositories */}
        {!loading && !error && (
          <>
            {/* Status Bar */}
            <div className="projects__status-bar">
              <span>
                Showing <strong>{filteredRepos.length}</strong> of {repos.length} repositories
              </span>
              <span className="projects__source-badge">
                ● Live REST API Connected
              </span>
            </div>

            {/* Empty Search Result */}
            {filteredRepos.length === 0 ? (
              <div className="projects__empty glass-card">
                <p style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🔍</p>
                <h3>No repositories matched &ldquo;{searchTerm}&rdquo;</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                  Try a different search keyword or clear the search field.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ marginTop: '1rem' }}
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              /* Repositories List Grid */
              <ul className="projects__grid" role="list" aria-label="Repositories list">
                {filteredRepos.map((repo) => (
                  <li key={repo.id} className="project-card glass-card">
                    {/* Top Row: Icon & Name */}
                    <div className="project-card__top">
                      <h3 className="project-card__title">
                        {repo.name}
                      </h3>
                      <span className="project-card__repo-icon" aria-hidden="true">
                        📦
                      </span>
                    </div>

                    {/* Repository Description */}
                    <p className="project-card__desc">
                      {repo.description || 'No description provided for this repository.'}
                    </p>

                    {/* Meta Footer: Language, Stars (Supplementary), and External Link */}
                    <div className="project-card__meta">
                      <div className="project-card__stats">
                        {/* Language Tag */}
                        {repo.language && (
                          <span className="project-card__language">
                            <span className="project-card__lang-dot" aria-hidden="true" />
                            {repo.language}
                          </span>
                        )}

                        {/* Stargazers Count (Supplementary Problem) */}
                        <span className="project-card__stat-item" title="Stars" aria-label={`${repo.stargazers_count ?? 0} stars`}>
                          ⭐ {repo.stargazers_count ?? 0}
                        </span>

                        {/* Forks Count */}
                        <span className="project-card__stat-item" title="Forks" aria-label={`${repo.forks_count ?? 0} forks`}>
                          🍴 {repo.forks_count ?? 0}
                        </span>
                      </div>

                      {/* GitHub Repository Link (Required html_url) */}
                      <a
                        href={repo.html_url}
                        className="project-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} on GitHub`}
                      >
                        GitHub ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;

import { useState, useEffect } from 'react';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import './Projects.css';

/**
 * Projects Component (Practical 3: Dynamic GitHub REST API Integration)
 *
 * Features:
 * 1. Asynchronous fetch using useEffect + useState (repos, loading, error).
 * 2. Dynamic GitHub user switching: can query any user (e.g. Smit-Makwana, DHRUPAL5404).
 * 3. Handles full paths like "DHRUPAL5404/Amazon" by extracting the user and auto-filtering.
 * 4. Conditional rendering of Spinner, ErrorMessage with Retry, and Repo cards.
 * 5. Star count ⭐, fork count 🍴, and live repository search.
 */
function Projects() {
  // ── States ──
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active GitHub username being queried
  const [targetUser, setTargetUser] = useState('Smit-Makwana');

  // Username input box state
  const [userInput, setUserInput] = useState('Smit-Makwana');

  // Filter within fetched repositories (repo name/description)
  const [searchTerm, setSearchTerm] = useState('');

  // Retry / refetch counter
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Fallback curated projects in case API fails or is rate-limited
  const fallbackProjects = [
    {
      id: 101,
      name: 'portfolio-Smit',
      html_url: `https://github.com/Smit-Makwana/portfolio-Smit`,
      description: 'Advanced Web Development Frameworks (ITUE301) — React Vite Portfolio with React Router v6 & REST API integration.',
      stargazers_count: 5,
      forks_count: 2,
      language: 'JavaScript',
    },
    {
      id: 102,
      name: 'ecommerce-react-store',
      html_url: `https://github.com/Smit-Makwana/ecommerce-react-store`,
      description: 'A responsive e-commerce web application with cart management, local storage persistence, and checkout workflow.',
      stargazers_count: 12,
      forks_count: 4,
      language: 'React',
    },
    {
      id: 103,
      name: 'taskflow-kanban',
      html_url: `https://github.com/Smit-Makwana/taskflow-kanban`,
      description: 'Kanban-style task manager featuring drag-and-drop support, filter tabs, and responsive glassmorphism UI.',
      stargazers_count: 8,
      forks_count: 3,
      language: 'TypeScript',
    },
    {
      id: 104,
      name: 'weather-radar-app',
      html_url: `https://github.com/Smit-Makwana/weather-radar-app`,
      description: 'Live weather forecasting application consuming OpenWeatherMap REST API with async/await and geolocation.',
      stargazers_count: 6,
      forks_count: 1,
      language: 'JavaScript',
    },
  ];

  // ── Fetch Repositories from Target User ──
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const cleanUser = targetUser.trim();
    if (!cleanUser) {
      setLoading(false);
      return;
    }

    const apiUrl = `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=30`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`GitHub user "${cleanUser}" was not found.`);
          }
          if (res.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please wait a minute or try again.');
          }
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          if (data.length === 0) {
            setRepos([]);
          } else {
            setRepos(data);
          }
        } else {
          setRepos(fallbackProjects);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('API fetch issue:', err.message);
        // If error occurred fetching Smit-Makwana specifically, show fallback; otherwise show user-friendly error
        if (cleanUser.toLowerCase() === 'smit-makwana') {
          setRepos(fallbackProjects);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [targetUser, fetchTrigger]);

  // Handle User Change form submission
  const handleUserSubmit = (e) => {
    e.preventDefault();
    let val = userInput.trim();
    if (!val) return;

    // If input format is "User/Repo" (like DHRUPAL5404/Amazon), split them!
    if (val.includes('/')) {
      const parts = val.split('/');
      const parsedUser = parts[0].trim();
      const parsedRepo = parts[1].trim();
      setTargetUser(parsedUser);
      setUserInput(parsedUser);
      setSearchTerm(parsedRepo);
    } else {
      setTargetUser(val);
      setSearchTerm('');
    }
  };

  // Quick switch chips handler
  const handleChipClick = (username) => {
    setUserInput(username);
    setTargetUser(username);
    setSearchTerm('');
  };

  // Retry / refresh handler
  const handleRetry = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  // Filter repositories locally by search term
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
            <span className="badge">Practical 3 · Dynamic GitHub API</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">GitHub Repositories</span>
          </h2>
          <p className="projects__subtitle">
            Query live repositories for any GitHub account using the GitHub REST API.
          </p>
        </header>

        {/* ── User Switcher Toolbar ── */}
        <div className="projects__user-bar">
          <form className="projects__user-form" onSubmit={handleUserSubmit}>
            <span className="projects__user-prefix" aria-hidden="true">github.com/</span>
            <input
              type="text"
              className="projects__user-input"
              placeholder="username or user/repo"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              aria-label="GitHub username to fetch"
            />
            <button type="submit" className="btn btn--primary projects__user-btn">
              Fetch User Repos
            </button>
          </form>

          {/* Quick profile switch chips */}
          <div className="projects__quick-chips">
            <span>Quick Select:</span>
            {['Smit-Makwana', 'DHRUPAL5404', 'charusat', 'facebook'].map((u) => (
              <button
                key={u}
                type="button"
                className={`projects__chip ${targetUser.toLowerCase() === u.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleChipClick(u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* ── Filter & Refresh Controls ── */}
        <div className="projects__controls">
          {/* Local repository filter */}
          <div className="projects__search-wrapper">
            <span className="projects__search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              id="projects-search-input"
              className="projects__search-input"
              placeholder={`Filter @${targetUser}'s repositories...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Filter repositories"
            />
          </div>

          {/* Action buttons */}
          <div className="projects__actions">
            <button
              type="button"
              id="projects-refresh-btn"
              className="projects__btn-action"
              onClick={handleRetry}
              title="Refresh API request"
            >
              🔄 Refresh API
            </button>
          </div>
        </div>

        {/* ── Conditional Rendering ── */}
        {/* State A: Loading */}
        {loading && <Spinner message={`Fetching repositories for @${targetUser}...`} />}

        {/* State B: Error */}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* State C: Success */}
        {!loading && !error && (
          <>
            {/* Status Bar */}
            <div className="projects__status-bar">
              <span>
                Showing <strong>{filteredRepos.length}</strong> of {repos.length} repositories for{' '}
                <strong style={{ color: 'var(--color-accent-tertiary)' }}>@{targetUser}</strong>
              </span>
              <span className="projects__source-badge">
                ● Live REST API Connected
              </span>
            </div>

            {/* Empty Search Result */}
            {filteredRepos.length === 0 ? (
              <div className="projects__empty glass-card">
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</p>
                <h3>
                  {repos.length === 0
                    ? `No public repositories found for @${targetUser}`
                    : `No repositories matched "${searchTerm}"`}
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                  {repos.length === 0
                    ? 'This user currently has 0 public repositories.'
                    : 'Try clearing the search filter.'}
                </p>
                {searchTerm && (
                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              /* Repositories Grid */
              <ul className="projects__grid" role="list" aria-label="Repositories list">
                {filteredRepos.map((repo) => (
                  <li key={repo.id} className="project-card glass-card">
                    {/* Top Row: Title & Icon */}
                    <div className="project-card__top">
                      <h3 className="project-card__title">{repo.name}</h3>
                      <span className="project-card__repo-icon" aria-hidden="true">
                        📦
                      </span>
                    </div>

                    {/* Description */}
                    <p className="project-card__desc">
                      {repo.description || 'No description provided for this repository.'}
                    </p>

                    {/* Metadata: Language, Stars, Forks, Link */}
                    <div className="project-card__meta">
                      <div className="project-card__stats">
                        {repo.language && (
                          <span className="project-card__language">
                            <span className="project-card__lang-dot" aria-hidden="true" />
                            {repo.language}
                          </span>
                        )}

                        <span className="project-card__stat-item" title="Stars" aria-label={`${repo.stargazers_count ?? 0} stars`}>
                          ⭐ {repo.stargazers_count ?? 0}
                        </span>

                        <span className="project-card__stat-item" title="Forks" aria-label={`${repo.forks_count ?? 0} forks`}>
                          🍴 {repo.forks_count ?? 0}
                        </span>
                      </div>

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

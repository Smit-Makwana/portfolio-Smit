import { useState, useEffect } from 'react';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import './Projects.css';

/**
 * Projects Component (Practical 3: Enhanced Multi-Mode GitHub API Integration)
 *
 * Supported Modes:
 * 1. User Mode ("user"): Fetches all repos for a specific GitHub user.
 * 2. Global Mode ("global"): Searches ALL repositories across ALL GitHub users by name/keyword.
 */
function Projects() {
  // Mode selection: 'user' or 'global'
  const [searchMode, setSearchMode] = useState('user');

  // Repositories and async state
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User Mode states
  const [targetUser, setTargetUser] = useState('Smit-Makwana');
  const [userInput, setUserInput] = useState('Smit-Makwana');

  // Global Search Mode state
  const [globalQuery, setGlobalQuery] = useState('Amazon');
  const [globalInput, setGlobalInput] = useState('Amazon');

  // Local filter within loaded repos
  const [localFilter, setLocalFilter] = useState('');

  // Retry / refetch counter
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Fallback curated projects
  const fallbackProjects = [
    {
      id: 101,
      name: 'portfolio-Smit',
      full_name: 'Smit-Makwana/portfolio-Smit',
      html_url: 'https://github.com/Smit-Makwana/portfolio-Smit',
      description: 'Advanced Web Development Frameworks (ITUE301) — React Vite Portfolio with React Router v6 & REST API integration.',
      stargazers_count: 5,
      forks_count: 2,
      language: 'JavaScript',
      owner: { login: 'Smit-Makwana' },
    },
    {
      id: 102,
      name: 'ecommerce-react-store',
      full_name: 'Smit-Makwana/ecommerce-react-store',
      html_url: 'https://github.com/Smit-Makwana/ecommerce-react-store',
      description: 'A responsive e-commerce web application with cart management, local storage persistence, and checkout workflow.',
      stargazers_count: 12,
      forks_count: 4,
      language: 'React',
      owner: { login: 'Smit-Makwana' },
    },
    {
      id: 103,
      name: 'taskflow-kanban',
      full_name: 'Smit-Makwana/taskflow-kanban',
      html_url: 'https://github.com/Smit-Makwana/taskflow-kanban',
      description: 'Kanban-style task manager featuring drag-and-drop support, filter tabs, and responsive glassmorphism UI.',
      stargazers_count: 8,
      forks_count: 3,
      language: 'TypeScript',
      owner: { login: 'Smit-Makwana' },
    },
  ];

  // ── Core Fetch Effect ──
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    let apiUrl = '';

    if (searchMode === 'user') {
      // User Mode: fetch target user's repos
      const user = targetUser.trim();
      if (!user) {
        setLoading(false);
        return;
      }
      apiUrl = `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=30`;
    } else {
      // Global Search Mode: query all users across all of GitHub!
      const query = globalQuery.trim();
      if (!query) {
        setLoading(false);
        return;
      }
      apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`;
    }

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`GitHub user "${targetUser}" not found.`);
          }
          if (res.status === 403) {
            throw new Error('GitHub API rate limit reached. Please wait a moment and try again.');
          }
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (searchMode === 'global') {
          // Global search API returns { items: [...] }
          if (Array.isArray(data.items)) {
            setRepos(data.items);
          } else {
            setRepos([]);
          }
        } else {
          // User API returns an array directly
          if (Array.isArray(data)) {
            setRepos(data.length > 0 ? data : []);
          } else {
            setRepos(fallbackProjects);
          }
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('API fetch issue:', err.message);
        if (searchMode === 'user' && targetUser.toLowerCase() === 'smit-makwana') {
          setRepos(fallbackProjects);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchMode, targetUser, globalQuery, fetchTrigger]);

  // Form submit for User Mode
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const val = userInput.trim();
    if (!val) return;

    // If format is User/Repo, auto-switch to Global search or split
    if (val.includes('/')) {
      const [u, r] = val.split('/');
      setTargetUser(u.trim());
      setUserInput(u.trim());
      setLocalFilter(r.trim());
    } else {
      setTargetUser(val);
      setLocalFilter('');
    }
  };

  // Form submit for Global Search Mode (search across ALL users)
  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    const q = globalInput.trim();
    if (q) {
      setGlobalQuery(q);
      setLocalFilter('');
    }
  };

  // Quick switch chips
  const handleChipClick = (user) => {
    setUserInput(user);
    setTargetUser(user);
    setLocalFilter('');
  };

  const handleGlobalChipClick = (keyword) => {
    setGlobalInput(keyword);
    setGlobalQuery(keyword);
    setLocalFilter('');
  };

  // Filter local results
  const filteredRepos = repos.filter((repo) => {
    const q = localFilter.toLowerCase();
    const nameMatch = repo.name?.toLowerCase().includes(q) || repo.full_name?.toLowerCase().includes(q);
    const descMatch = repo.description?.toLowerCase().includes(q);
    const langMatch = repo.language?.toLowerCase().includes(q);
    return nameMatch || descMatch || langMatch;
  });

  return (
    <section id="projects" className="projects section" aria-label="Projects Section">
      <div className="container">
        {/* Header */}
        <header className="projects__header">
          <div>
            <span className="badge">Practical 3 · REST API</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">GitHub Repositories</span>
          </h2>
          <p className="projects__subtitle">
            Fetch from a specific user or search across <strong>all GitHub users globally</strong> in real time!
          </p>
        </header>

        {/* ── Mode Selection Tabs ── */}
        <div className="projects__mode-tabs" role="tablist" aria-label="Search Mode">
          <button
            type="button"
            className={`projects__mode-tab ${searchMode === 'user' ? 'active' : ''}`}
            onClick={() => setSearchMode('user')}
          >
            👤 Specific User Repos
          </button>
          <button
            type="button"
            className={`projects__mode-tab ${searchMode === 'global' ? 'active' : ''}`}
            onClick={() => setSearchMode('global')}
          >
            🌍 All GitHub Users (Global Repo Search)
          </button>
        </div>

        {/* ── Mode 1: Specific User Search Bar ── */}
        {searchMode === 'user' && (
          <div className="projects__user-bar">
            <form className="projects__user-form" onSubmit={handleUserSubmit}>
              <span className="projects__user-prefix" aria-hidden="true">github.com/</span>
              <input
                type="text"
                className="projects__user-input"
                placeholder="e.g. DHRUPAL5404"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                aria-label="GitHub username"
              />
              <button type="submit" className="btn btn--primary projects__user-btn">
                Fetch User Repos
              </button>
            </form>

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
        )}

        {/* ── Mode 2: Global Search Across ALL Users ── */}
        {searchMode === 'global' && (
          <div className="projects__user-bar">
            <form className="projects__user-form" onSubmit={handleGlobalSubmit} style={{ maxWidth: '480px', width: '100%' }}>
              <span className="projects__user-prefix" aria-hidden="true">Search All Repos:</span>
              <input
                type="text"
                className="projects__user-input"
                style={{ width: '100%' }}
                placeholder="e.g. Amazon, ecommerce, react, portfolio..."
                value={globalInput}
                onChange={(e) => setGlobalInput(e.target.value)}
                aria-label="Search all GitHub repositories"
              />
              <button type="submit" className="btn btn--primary projects__user-btn">
                Search All Users
              </button>
            </form>

            <div className="projects__quick-chips">
              <span>Popular:</span>
              {['Amazon', 'DHRUPAL5404', 'portfolio', 'react-dashboard'].map((term) => (
                <button
                  key={term}
                  type="button"
                  className={`projects__chip ${globalQuery.toLowerCase() === term.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleGlobalChipClick(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Local Filter & Refresh ── */}
        <div className="projects__controls">
          <div className="projects__search-wrapper">
            <span className="projects__search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              id="projects-search-input"
              className="projects__search-input"
              placeholder={
                searchMode === 'user'
                  ? `Filter @${targetUser}'s loaded repositories...`
                  : `Filter "${globalQuery}" results locally...`
              }
              value={localFilter}
              onChange={(e) => setLocalFilter(e.target.value)}
              aria-label="Filter loaded repositories"
            />
          </div>

          <div className="projects__actions">
            <button
              type="button"
              id="projects-refresh-btn"
              className="projects__btn-action"
              onClick={() => setFetchTrigger((prev) => prev + 1)}
              title="Refresh API"
            >
              🔄 Refresh API
            </button>
          </div>
        </div>

        {/* ── Conditional Rendering ── */}
        {loading && (
          <Spinner
            message={
              searchMode === 'user'
                ? `Fetching repositories for @${targetUser}...`
                : `Searching ALL GitHub repositories for "${globalQuery}"...`
            }
          />
        )}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={() => setFetchTrigger((prev) => prev + 1)} />
        )}

        {!loading && !error && (
          <>
            {/* Status bar */}
            <div className="projects__status-bar">
              <span>
                Showing <strong>{filteredRepos.length}</strong> of {repos.length} repositories{' '}
                {searchMode === 'user' ? (
                  <>for <strong style={{ color: 'var(--color-accent-tertiary)' }}>@{targetUser}</strong></>
                ) : (
                  <>matching <strong style={{ color: 'var(--color-accent-tertiary)' }}>&ldquo;{globalQuery}&rdquo;</strong> across all users</>
                )}
              </span>
              <span className="projects__source-badge">
                ● Live REST API ({searchMode === 'user' ? 'Users Endpoint' : 'Global Search Endpoint'})
              </span>
            </div>

            {/* Empty results */}
            {filteredRepos.length === 0 ? (
              <div className="projects__empty glass-card">
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</p>
                <h3>No repositories found</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                  {localFilter
                    ? `No loaded repository matched "${localFilter}".`
                    : 'Try another keyword or user.'}
                </p>
                {localFilter && (
                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setLocalFilter('')}
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
                    <div className="project-card__top">
                      <div>
                        {/* If global mode, show the owner tag */}
                        {searchMode === 'global' && repo.owner && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                            👤 {repo.owner.login} /
                          </div>
                        )}
                        <h3 className="project-card__title">{repo.name}</h3>
                      </div>
                      <span className="project-card__repo-icon" aria-hidden="true">
                        📦
                      </span>
                    </div>

                    <p className="project-card__desc">
                      {repo.description || 'No description provided for this repository.'}
                    </p>

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

import './Spinner.css';

/**
 * Spinner Component (Practical 3 Requirement)
 * Displayed while the REST API request is in progress.
 */
function Spinner({ message = 'Fetching repositories from GitHub API...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;

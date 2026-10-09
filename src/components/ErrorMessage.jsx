import './ErrorMessage.css';

/**
 * ErrorMessage Component (Practical 3 Requirement & Supplementary Problem)
 * Displayed when network/API call fails, complete with a Retry action.
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card glass-card" role="alert" aria-live="assertive">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h3 className="error-title">Failed to Fetch Repositories</h3>
      <p className="error-message">
        {message || 'An unexpected error occurred while communicating with GitHub API.'}
      </p>

      {onRetry && (
        <button
          type="button"
          className="btn btn--primary error-retry-btn"
          onClick={onRetry}
          id="error-retry-button"
        >
          🔄 Try Again (Retry Fetch)
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

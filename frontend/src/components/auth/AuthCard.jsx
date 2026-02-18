import { Link } from "react-router-dom";

export default function AuthCard({
  variant,
  title,
  subtitle,
  onSubmit,
  submitLabel,
  switchText,
  switchTo,
  switchLabel,
  message,
  children,
}) {
  const cardClassName = variant ? `auth-card auth-card--${variant}` : "auth-card";

  return (
    <article className={cardClassName}>
      <h1>{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>

      <form onSubmit={onSubmit} className="auth-form">
        {children}
        <button type="submit" className="auth-submit">
          {submitLabel}
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <p className="auth-switch">
        {switchText} <Link to={switchTo}>{switchLabel}</Link>
      </p>
    </article>
  );
}

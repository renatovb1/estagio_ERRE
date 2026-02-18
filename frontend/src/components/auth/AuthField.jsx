export default function AuthField({ label, ...inputProps }) {
  return (
    <label className="auth-label">
      {label}
      <input className="auth-input" {...inputProps} />
    </label>
  );
}

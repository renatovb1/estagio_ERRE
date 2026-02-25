import { Link, useLocation } from "react-router-dom";
import { getRole } from "../../utils/auth.js";
import "./AppHeader.css";

function getActions(pathname) {
  const role = getRole();
  const isAdmin = role === "admin";

  if (pathname === "/") {
    return [{ to: "/login", label: "Entrar", className: "app-header-login" }];
  }

  if (pathname === "/projects") {
    return [
      { to: "/", label: "Home", className: "app-header-login" },
      ...(isAdmin ? [{ to: "/admin", label: "Admin", className: "app-header-login" }] : []),
    ];
  }

  if (pathname === "/admin") {
    return [
      { to: "/projects", label: "Projetos", className: "app-header-login" },
      { to: "/", label: "Home", className: "app-header-login" },
    ];
  }

  return [{ to: "/", label: "Home", className: "app-header-login" }];
}

export default function AppHeader() {
  const { pathname } = useLocation();
  const actions = getActions(pathname);

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="app-header-brand">Portfolio</Link>
        <nav className="app-header-nav" aria-label="Navegacao principal">
          {actions.map((action) => (
            <Link key={`${action.to}-${action.label}`} to={action.to} className={action.className}>
              {action.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

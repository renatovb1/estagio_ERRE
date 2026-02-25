import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader.jsx";

export default function AppLayout({ showHeader = true }) {
  return (
    <>
      {showHeader ? <AppHeader /> : null}
      <Outlet />
    </>
  );
}

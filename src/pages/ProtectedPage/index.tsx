import { Outlet } from "react-router-dom";
import NAV_LINK from "../../constants/navLinks";

export function ProtectedPage() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = NAV_LINK.LOGIN;

  return <Outlet />;
}

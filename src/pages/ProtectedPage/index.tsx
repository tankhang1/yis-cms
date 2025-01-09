import { Outlet } from "react-router-dom";
import NAV_LINK from "../../constants/navLinks";
import { store } from "../../redux/store";

export function ProtectedPage() {
  const token = store.getState().app.token;
  if (!token) window.location.href = NAV_LINK.LOGIN;

  return <Outlet />;
}

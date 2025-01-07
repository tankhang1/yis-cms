import { RouteObject } from "react-router-dom";
import NAV_LINK from "./constants/navLinks";
import LoginPage from "./pages/Login";

const publicRoute: RouteObject[] = [
  {
    path: NAV_LINK.LOGIN,
    element: <LoginPage />,
  },
];

const privateRoute: RouteObject[] = [];
const routes = [...privateRoute, ...publicRoute];
export default routes;

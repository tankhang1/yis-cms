import { RouteObject } from "react-router-dom";
import NAV_LINK from "./constants/navLinks";
import LoginPage from "./pages/Login";
import { ProtectedPage } from "./pages/ProtectedPage";
import MainPage from "./pages/Main";
import DashboardPage from "./pages/Dashboard";

const publicRoute: RouteObject[] = [
  {
    path: NAV_LINK.LOGIN,
    element: <LoginPage />,
  },
];

const privateRoute: RouteObject[] = [
  {
    element: <ProtectedPage />,
    children: [
      {
        path: NAV_LINK.DASHBOARD,
        element: <MainPage />,
        children: [
          //Dashboard
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
];
const routes = [...privateRoute, ...publicRoute];
export default routes;

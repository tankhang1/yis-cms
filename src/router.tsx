import { RouteObject } from "react-router-dom";
import NAV_LINK from "./constants/navLinks";
import LoginPage from "./pages/Login";
import { ProtectedPage } from "./pages/ProtectedPage";
import MainPage from "./pages/Main";
import DashboardPage from "./pages/Dashboard";
import IqrConfirmTodayPage from "./pages/Iqr-Today/Confirm";
import IqrRejectTodayPage from "./pages/Iqr-Today/Reject";
import IqrUnknownTodayPage from "./pages/Iqr-Today/Unknown";
import IqrConfirmPage from "./pages/Iqr/Confirm";
import IqrUnknownPage from "./pages/Iqr/Unknown";
import IqrMissingParamsPage from "./pages/Iqr/Missing-Params";
import IqrRejectPage from "./pages/Iqr/Reject";
import IqrSearchPage from "./pages/Iqr/Search";
import ReportIqrPage from "./pages/Report/Iqr";
import ReportIqrMissingParamsPage from "./pages/Report/Iqr-Missing-Params";
import ReportTopupPage from "./pages/Report/Topup";
import ReportSMSBrandnamePage from "./pages/Report/SMS-Brandname";
import HistoryExportExcelPage from "./pages/History-Export-Excel";

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
        path: "",
        element: <MainPage />,
        children: [
          //Dashboard
          {
            path: NAV_LINK.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: NAV_LINK.IQR_TODAY.CONFIRM,
            element: <IqrConfirmTodayPage />,
          },
          {
            path: NAV_LINK.IQR_TODAY.REJECT,
            element: <IqrRejectTodayPage />,
          },
          {
            path: NAV_LINK.IQR_TODAY.UNKNOWN,
            element: <IqrUnknownTodayPage />,
          },
          {
            path: NAV_LINK.IQR.SEARCH,
            element: <IqrSearchPage />,
          },
          {
            path: NAV_LINK.IQR.CONFIRM,
            element: <IqrConfirmPage />,
          },
          {
            path: NAV_LINK.IQR.UNKNOWN,
            element: <IqrUnknownPage />,
          },
          {
            path: NAV_LINK.IQR.MISSING_PARAMS,
            element: <IqrMissingParamsPage />,
          },
          {
            path: NAV_LINK.IQR.REJECT,
            element: <IqrRejectPage />,
          },
          {
            path: NAV_LINK.REPORT.IQR,
            element: <ReportIqrPage />,
          },
          {
            path: NAV_LINK.REPORT.IQR_MISSING_PARAMS,
            element: <ReportIqrMissingParamsPage />,
          },
          {
            path: NAV_LINK.REPORT.TOPUP,
            element: <ReportTopupPage />,
          },
          {
            path: NAV_LINK.REPORT.SMS_BRANDNAME,
            element: <ReportSMSBrandnamePage />,
          },
          {
            path: NAV_LINK.HISTORY_EXPORT_EXCEL,
            element: <HistoryExportExcelPage />,
          },
        ],
      },
    ],
  },
];
const routes = [...privateRoute, ...publicRoute];
export default routes;

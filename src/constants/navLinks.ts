const NAV_LINK = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  IQR_TODAY: {
    CONFIRM: "/iqr-today/confirm",
    UNKNOWN: "/iqr-today/unknown",
    REJECT: "/iqr-today/reject",
  },
  IQR: {
    SEARCH: "/iqr/search",
    CONFIRM: "/iqr/confirm",
    UNKNOWN: "/iqr/unknown",
    REJECT: "/iqr/reject",
    MISSING_PARAMS: "/iqr/missing-params",
  },
  REPORT: {
    IQR: "/report/iqr",
    IQR_MISSING_PARAMS: "/report/iqr-missing-params",
    TOPUP: "/report/topup",
    SMS_BRANDNAME: "/report/sms-brandname",
  },
  HISTORY_EXPORT_EXCEL: "/history/export-excel",
};
export default NAV_LINK;

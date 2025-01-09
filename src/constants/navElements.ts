import {
  Icon,
  IconDeviceDesktopAnalytics,
  IconFileExcel,
  IconQrcode,
  IconReport,
} from "@tabler/icons-react";
import NAV_LINK from "./navLinks";
interface NavElement {
  label: string;
  link?: string;
  icon?: Icon;
  children?: NavElement[];
}

export const listElements = [
  {
    label: "Bảng điều khiển",
    link: NAV_LINK.DASHBOARD,
    icon: IconDeviceDesktopAnalytics,
  },
  {
    label: "Iqr hôm nay",
    icon: IconQrcode,
    children: [
      {
        label: "Đã duyệt",
        link: NAV_LINK.IQR_TODAY.CONFIRM,
      },
      {
        label: "Chưa xử lí",
        link: NAV_LINK.IQR_TODAY.UNKNOWN,
      },
      {
        label: "Từ chối",
        link: NAV_LINK.IQR_TODAY.REJECT,
      },
    ],
  },
  {
    label: "Danh sách Iqr",
    icon: IconQrcode,
    children: [
      {
        label: "Tìm kiếm",
        link: NAV_LINK.IQR.SEARCH,
      },
      {
        label: "Đã duyệt",
        link: NAV_LINK.IQR.CONFIRM,
      },
      {
        label: "Chưa xử lí",
        link: NAV_LINK.IQR.UNKNOWN,
      },
      {
        label: "Thiếu thông tin",
        link: NAV_LINK.IQR.MISSING_PARAMS,
      },
      {
        label: "Từ chối",
        link: NAV_LINK.IQR.REJECT,
      },
    ],
  },
  {
    label: "Báo cáo",
    icon: IconReport,
    children: [
      {
        label: "Iqr",
        link: NAV_LINK.REPORT.IQR,
      },
      {
        label: "Iqr thiếu thông tin",
        link: NAV_LINK.REPORT.IQR_MISSING_PARAMS,
      },
      {
        label: "Topup",
        link: NAV_LINK.REPORT.TOPUP,
      },
      {
        label: "SMS Brandname",
        link: NAV_LINK.REPORT.SMS_BRANDNAME,
      },
    ],
  },
  {
    label: "Lịch sử xuất Excel",
    icon: IconFileExcel,
    link: NAV_LINK.HISTORY_EXPORT_EXCEL,
  },
] as NavElement[];

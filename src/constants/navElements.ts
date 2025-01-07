import { Icon, IconDeviceDesktopAnalytics } from "@tabler/icons-react";
interface NavElement {
  label: string;
  link?: string;
  icon?: Icon;
  children?: NavElement[];
}

export const listElements = [
  {
    label: "Dashboard",
    link: "/",
    icon: IconDeviceDesktopAnalytics,
  },
] as NavElement[];

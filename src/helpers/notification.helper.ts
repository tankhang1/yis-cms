import { notifications } from "@mantine/notifications";
const NotificationHelper = {
  showInfo: (title: string, message: string) => {
    notifications.show({
      title: title,
      message: message,
      position: "bottom-right",
      autoClose: 2000,
      color: "blue",
    });
  },
  showSuccess: (title: string, message: string) => {
    notifications.show({
      title: title,
      message: message,
      position: "bottom-right",
      autoClose: 2000,
      color: "green",
    });
  },
  showError: (title: string, message: string) => {
    notifications.show({
      title: title,
      message: message,
      position: "bottom-right",
      autoClose: 2000,
      color: "red",
    });
  },
};

export default NotificationHelper;

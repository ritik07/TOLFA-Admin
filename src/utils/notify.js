import { NotificationManager } from "react-notifications";

export function createNotification(type, options = {}) {
  const { message, title, closeTimeout, callback } = options;

  switch (type) {
    case "info":
      NotificationManager.info(message || "Info message");
      break;
    case "success":
      NotificationManager.success(
        message || "Success message",
        title || "Title here"
      );
      break;
    case "warning":
      NotificationManager.warning(
        message || "Warning message",
        title || "Close after 3000ms",
        closeTimeout || 3000
      );
      break;
    case "error":
      NotificationManager.error(
        message,
        title || "Click me!",
        closeTimeout || 5000,
        callback || (() => alert("callback"))
      );
      break;
    default:
      break;
  }
}

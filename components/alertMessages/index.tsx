import {notification} from "antd";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationParams {
	message?: string;
	description?: string;
	type?: NotificationType;
	duration?: number;
}

export const useNotification = () => {
	const showNotification = ({
		message = "Bildirishnoma",
		description = "",
		type = "success",
		duration = 3,
	}: NotificationParams) => {
		switch (type) {
			case "success":
				notification.success({
					message,
					description,
					placement: "topRight",
					duration,
				});
				break;
			case "error":
				notification.error({
					message,
					description,
					placement: "topRight",
					duration,
				});
				break;
			case "warning":
				notification.warning({
					message,
					description,
					placement: "topRight",
					duration,
				});
				break;
			case "info":
				notification.info({
					message,
					description,
					placement: "topRight",
					duration,
				});
				break;
		}
	};

	return {showNotification};
};

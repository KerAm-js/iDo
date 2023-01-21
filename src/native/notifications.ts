import * as Notifications from "expo-notifications";

async function requestPermissionsAsync() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      const result = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
        android: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        }
      });
      if (result.status === "granted") {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log('requestPermissionsAsync', error);
  }
}

export const setNotification = async (
  title: string,
  subtitle: string,
  body: string,
  time: number
) => {
  try {
    const isNotifictaionAvailable = await requestPermissionsAsync();
    if (isNotifictaionAvailable && time && time > 1) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          subtitle,
          body,
          sound: '../../assets/notification-sound.wav',
          vibrate: [0, 250, 250, 250],
        },
        trigger: { seconds: time },
      });
      return identifier;
    }
  } catch (error) {
    console.log('setNotification', error);
  }
};

export const presentNotification = async (title: string, subtitle: string, body: string) => {
  try {
    const isNotifictaionAvailable = await requestPermissionsAsync();
    if (isNotifictaionAvailable) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });


      Notifications.scheduleNotificationAsync({
        content: {
          title,
          subtitle,
          body,
          sound: '../../assets/notification-sound.wav',
          vibrate: [0, 250, 250, 250],
        },
        trigger: null,
      });
    }
  } catch (error) {
    console.log('presentNotification', error);
  }
};

export const getAllNotifications = async () => {
  try {
    const result = await Notifications.getAllScheduledNotificationsAsync();
    return result;
  } catch (error) {
    console.log('getAllNotifications', error);
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.log('deleteNotification', error);
  }
};

export const deleteAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log('deleteAllNotifications', error);
  }
};

import * as Notifications from 'expo-notifications';

async function requestPermissionsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    const result = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    if (result.status === 'granted') {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

export const setNotification = async (title: string, body: string, time: number) => {
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
        body,
      },
      trigger: {seconds: time},
    });
    return identifier;
  }
} 

export const presentNotification = async (title: string, body: string) => {
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
        body,
      },
      trigger: null,
    });
  }
}

export const getAllNotifications = async () => {
  const result = await Notifications.getAllScheduledNotificationsAsync();
  return result;
}

export const deleteNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export const deleteAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
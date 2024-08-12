import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;
  if (true) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    return token;
  } else {
    Alert.alert("Must use physical device for Push Notifications");
    // Return a mock token for testing purposes
    token = "TEST_VIRTUAL_DEVICE_TOKEN";
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

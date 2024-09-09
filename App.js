import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

// Import your components
import LoginScreen from "./components/Login";
import MainScreen from "./components/MainScreen";
import Profile from "./components/Profile";
import ParkingPage from "./components/ParkingPage";
import ParkingReservationScreen from "./components/ParkingReservationScreen";
import Reservations from "./components/Reservations";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleLogin = () => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        //console.log("Notification received in listener:", notification);
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body
        );
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        // Handle the response to the notification (e.g., navigate to a specific screen)
      });
  };

  const handleLogout = () => {
    if (notificationListener.current) {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    }
    if (responseListener.current) {
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            header: () => <Header />, // Assuming Header is a component you want to render
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        >
          {(props) => <Profile {...props} onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen
          name="ParkingPage"
          component={ParkingPage}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ParkingReservationScreen"
          component={ParkingReservationScreen}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Reservations"
          component={Reservations}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

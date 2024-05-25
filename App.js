import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/Login";
import ParkingReservationScreen from "./components/ParkingReservationScreen";
import MainScreen from "./components/MainScreen";
import ParkingLot from "./components/ParkingLot";
import ParkingPage from "./components/ParkingPage";
import Reservations from "./components/Reservations";
import Profile from "./components/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reservations">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ParkingPage" component={ParkingPage} />

        <Stack.Screen
          name="ParkingReservationScreen"
          component={ParkingReservationScreen}
        />
        <Stack.Screen name="Reservations" component={Reservations} />

        <Stack.Screen name="ParkingLot" component={ParkingLot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

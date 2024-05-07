import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/Login";
import CreateParkingScreen from "./components/CreateParkingScreen";
import ParkingReservationScreen from "./components/ParkingReservationScreen";
import MainScreen from "./components/MainScreen";
import ParkingLot from "./components/ParkingLot";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ParkingLot">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateParking" component={CreateParkingScreen} />
        <Stack.Screen
          name="ParkingReservationScreen"
          component={ParkingReservationScreen}
        />
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

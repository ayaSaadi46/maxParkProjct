import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/Login";
import ParkingReservationScreen from "./components/ParkingReservationScreen";
import MainScreen from "./components/MainScreen";
import ParkingLot from "./components/ParkingLot";
import ParkingPage from "./components/ParkingPage";
import Reservations from "./components/Reservations";
import Profile from "./components/Profile";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
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
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
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
        <Stack.Screen
          name="ParkingLot"
          component={ParkingLot}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

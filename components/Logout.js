import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const logOut = async () => {
  try {
    await AsyncStorage.removeItem("userId"); // הסר את המזהה המשתמש מהאחסון

    const navigation = useNavigation();
    navigation.navigate("Login");
  } catch (error) {
    console.error("Failed to log out", error);
  }
};

export default logOut;

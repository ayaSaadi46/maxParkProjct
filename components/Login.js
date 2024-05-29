import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import icon from "../assets/icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const submitLogIn = async (email, password) => {
    const formData = {
      UserId: 0,
      UserEmail: email,
      UserPassword: password,
      UserName: "string",
      UserLastName: "string",
      UserCarNum: "string",
      UserPhone: "string",
      isAdmin: true,
      isManager: true,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const url = `https://proj.ruppin.ac.il/cgroup68/test2/tar1/api/Users/LogIn`;

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      AsyncStorage.setItem("userId", JSON.stringify(data.userId));
      AsyncStorage.setItem("userFirstName", JSON.stringify(data.userFirstName));
      switch (data.role) {
        case 1:
          console.log("Login Admin successful");
          break;
        case 2:
          console.log("Login Manager successful");
          break;
        case 3:
          console.log("Login User successful");
          navigation.navigate("MainScreen");
          break;
        default:
          alert("Email or Password incorrect");
          break;
      }
    } catch (error) {
      console.error("Error:", error, url);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />
      <Text style={styles.title}>כניסה משתמש</Text>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#000" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="אימייל"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#000" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="סיסמה"
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.rememberMeContainer}>
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={toggleCheckbox}
          color={"#007bff"}
        />
        <Text style={styles.rememberMeText}>תזכור אותי</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => submitLogIn(email, password)}
      >
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>שכחת סיסמה?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    alignItems: "center",
    position: "relative",
  },
  input: {
    writingDirection: "rtl",
    flex: 1,
    paddingLeft: 35,
  },
  icon: {
    position: "absolute",
    right: "26px",
    paddingBottom: "10px",
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  forgotPassword: {
    marginTop: 20,
    color: "#007bff",
  },
});

export default LoginScreen;

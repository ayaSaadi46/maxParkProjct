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
import { Button, Checkbox } from "react-native-paper";

import icon from "../assets/icon.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Image
        source={icon} // Replace with your logo image path
        style={styles.logo}
      />
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
          onPress={() => {
            setIsChecked(!isChecked);
          }}
          color={"#007bff"} // Optional: Customize the color
        />
        <Text style={styles.rememberMeText}>תזכור אותי</Text>
      </View>

      <TouchableOpacity style={styles.button}>
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
    position: "relative", // Positioned relative to place the icon inside
  },
  input: {
    direction: "rtl",
    flex: 1,
    paddingLeft: 35, // Make space for the icon inside the input
  },
  icon: {
    position: "absolute", // Positioned absolutely to float over the input field
    right: "26px",
    paddingBottom: "10px",
    zIndex: 1, // Ensures the icon is above the input field
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff", // Replace with your button color
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
    color: "#007bff", // Use same color as button for consistency
  },
});

export default LoginScreen;

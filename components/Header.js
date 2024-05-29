import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import icon from "../assets/icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../services/apiService";

const Header = () => {
  const [userData, setUserData] = useState({
    email: "jbowen@gmail.com",
    userFirstName: "James",
    userLastName: "Bowen",
    userCarNum: "1234-ABC",
    userPhone: "+67234567890",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        const user = await getUserById(userId);
        setUserData(user);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image source={icon} style={styles.logo} />
        <Text style={styles.username}>שלום, {userData.userFirstName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  username: {
    color: "#000",
    fontSize: 18,
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 50,
    marginTop: 16,
    resizeMode: "contain",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backIcon: {
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default Header;

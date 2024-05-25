import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const NavBar = () => {
  const navigation = useNavigation();

  const goToUserProfile = () => navigation.navigate("Profile");
  const goToHistory = () => console.log("MainScreen");
  const goToParking = () => {
    navigation.navigate("ParkingReservationScreen");
  };
  const goToPayments = () => navigation.navigate("Reservations");

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={goToUserProfile} style={styles.navItem}>
        <Icon name="user" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>פרופיל משתמש</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToPayments} style={styles.navItem}>
        <Icon name="credit-card" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>הזמנות שלי </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToHistory} style={styles.navItem}>
        <Icon name="home" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>עמוד הבית</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToParking} style={styles.navItem}>
        <Icon name="home" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>הזמנת חניה</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#e6f0fa",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e6f0fa",
    paddingVertical: 10,

    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#4F8EF7",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});

export default NavBar;

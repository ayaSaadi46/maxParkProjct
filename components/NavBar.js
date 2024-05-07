import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Make sure to install this package
import { useNavigation } from "@react-navigation/native";
const NavBar = () => {
  const navigation = useNavigation();
  // You would replace these placeholder functions with actual navigation logic
  const goToUserProfile = () => console.log("Go to User Profile");
  const goToHistory = () => console.log("Go to History");
  const goToParking = () => {
    navigation.navigate("ParkingReservationScreen");
  };
  const goToPayments = () => console.log("Go to Payments");

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
    position: "absolute", // Position it absolutely
    bottom: 0, // Stick it to the bottom
    left: 0, // Align to the left
    right: 0, // Align to the right to stretch across
    backgroundColor: "#e6f0fa",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#e6f0fa",
    paddingVertical: 10,
    // Add elevation and shadow for Android and iOS respectively
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

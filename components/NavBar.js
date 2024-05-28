import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();
  const [parkingActive, setParkingActive] = useState(false); // State to track if parking is active

  const goToUserProfile = () => navigation.navigate("Profile");
  const goToHistory = () => navigation.navigate("MainScreen");
  const goToParking = () => navigation.navigate("ParkingReservationScreen");
  const goToPayments = () => navigation.navigate("Reservations");
  const goToActiveParking = () => {
    if (parkingActive) {
      navigation.navigate("ParkingPage");
    }
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={goToHistory} style={styles.navItem}>
        <Icon name="home" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>עמוד הבית</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToPayments}
        style={[styles.navItem, styles.navItemLeftMargin]}
      >
        <Icon name="inbox" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>הזמנות שלי</Text>
      </TouchableOpacity>

      <View style={styles.circularButtonWrapper}>
        <View style={styles.outerCircle}>
          <TouchableOpacity onPress={goToParking} style={styles.circularButton}>
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={goToActiveParking}
        style={[styles.navItem, styles.navItemRightMargin]}
        disabled={!parkingActive}
      >
        <Icon
          name="car"
          size={24}
          color={parkingActive ? "#4F8EF7" : "#a1a1a1"}
        />
        <Text style={styles.navText}>חניון פעיל</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToUserProfile} style={styles.navItem}>
        <Icon name="user" size={24} color="#4F8EF7" />
        <Text style={styles.navText}>פרופיל משתמש</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20, // Increased padding for larger height
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
    flex: 1,
  },
  navItemLeftMargin: {
    marginRight: 40, // Adding space to the right of the left icon
  },
  navItemRightMargin: {
    marginLeft: 40, // Adding space to the left of the right icon
  },
  navText: {
    color: "#4F8EF7",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  circularButtonWrapper: {
    position: "absolute",
    bottom: 30, // Moved higher than previously
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 10,
  },
  outerCircle: {
    width: 100, // Larger outer circle
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6f0fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 15, // Padding to fit inner circle
  },
  circularButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4F8EF7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
});

export default NavBar;

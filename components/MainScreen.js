import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import NavBar from "./NavBar";
import icon from "../assets/icon.png";

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={icon} // Replace with your image path
              style={styles.logo}
            />
          </View>

          <View style={styles.reservationSection}>
            <Text style={styles.reservationTitle}>מסך בית</Text>
            <View style={styles.reservationCard}>
              <View style={styles.reservationDetails}>
                <Text>הזמנה שלי היום</Text>
                <Text>9:00שעת התחלה: </Text>
                <Text>13:00שעת סיום: </Text>
                <Text>AO1: עירוב</Text>
                <Text>23/04/24:תאריך</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>צפייה בהזמנה</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Fills the entire screen space
    backgroundColor: "#f5f5f5",
    // or your desired background color for the safe area
  },
  container: {
    flex: 1, // Ensures that the container takes up all available space
  },
  scrollView: {
    flex: 1, // Ensures that the ScrollView takes up all available space
    // Your other styles for the ScrollView
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain", // or 'cover'
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  reservationSection: {
    paddingHorizontal: 20,
  },
  reservationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  reservationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  reservationDetails: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default MainScreen;

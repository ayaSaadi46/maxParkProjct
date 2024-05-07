import React, { useEffect, useState } from "react";
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
import { Icon } from "react-native-elements";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all"); // Default filter

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const getFilterButtonStyle = (filter) => {
    return filter === selectedFilter
      ? styles.selectedFilterButton
      : styles.filterButton;
  };

  const getStatusStyle = (status) => {
    return status === "pending" ? "orange" : "green";
  };

  useEffect(() => {
    if (reservations.length === 0) return;

    console.log("filter change to ", selectedFilter);
    if (selectedFilter === "all") {
      setFilteredReservations(reservations);
      return;
    }
    const tempFilter = reservations.filter(
      (reservation) => reservation.reservationStatus === selectedFilter
    );
    console.log(tempFilter);
    setFilteredReservations(tempFilter);
  }, [selectedFilter]);

  useEffect(() => {
    const tempRes = [
      {
        reservationDate: new Date("2024-05-08 00:00:00.000"),
        reservation_STime: "08:00:00.0000000",
        reservation_ETime: "16:00:00.0000000",
        reservationStatus: "confirmed",
        parkName: "חניון רופין",
        markName: "A01",
      },
      {
        reservationDate: new Date("2024-05-09 00:00:00.000"),
        reservation_STime: "10:00:00.0000000",
        reservation_ETime: "12:00:00.0000000",
        reservationStatus: "pending",
        parkName: "חניון רופין",
      },
    ];

    setReservations(tempRes);
    setFilteredReservations(tempRes);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Image
                source={icon} // Replace with your image path
                style={styles.logo}
              />
            </View>

            <View style={styles.header}>
              <TouchableOpacity>
                <Icon
                  name="arrow-back"
                  type="ionicon"
                  color="#007AFF"
                  onPress={() => navigation.goBack()}
                  style={styles.backIcon}
                />{" "}
              </TouchableOpacity>
              <Text style={styles.headerTitle}>ההזמנות שלי</Text>
            </View>

            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={getFilterButtonStyle("confirmed")}
                onPress={() => handleFilterSelect("confirmed")}
              >
                <Text style={styles.filterText}>אושרו</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getFilterButtonStyle("pending")}
                onPress={() => handleFilterSelect("pending")}
              >
                <Text style={styles.filterText}>בהמתנה</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getFilterButtonStyle("all")}
                onPress={() => handleFilterSelect("all")}
              >
                <Text style={styles.filterText}>כולם</Text>
              </TouchableOpacity>
            </View>

            {filteredReservations.map((filteredReservation) => (
              <View style={styles.reservationCard}>
                <View style={styles.reservationDetails}>
                  <View style={styles.statusIcon}>
                    <Icon
                      name={
                        filteredReservation.reservationStatus !== "pending"
                          ? "checkmark-circle-outline"
                          : "help-circle-outline"
                      }
                      type="ionicon"
                      color={getStatusStyle(
                        filteredReservation.reservationStatus
                      )}
                    />
                  </View>
                  <Text style={styles.parkingNameHeader}>
                    {filteredReservation.parkName}
                  </Text>
                  {filteredReservation.markName && (
                    <Text style={styles.markNameHeader}>
                      חניון מס':{filteredReservation.markName}
                    </Text>
                  )}
                  <Text>
                    {filteredReservation.reservation_STime} שעת התחלה:{" "}
                  </Text>
                  <Text>
                    {filteredReservation.reservation_ETime} שעת סיום:{" "}
                  </Text>
                  <Text>{filteredReservation.reservationDate.toString()}</Text>
                </View>
                {filteredReservation.reservationStatus === "pending" ? (
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ביטול חנייה</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.buttons}>
                    <TouchableOpacity style={styles.blockedParkBtn}>
                      <Text style={styles.buttonText}>חנייה תפוסה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startParkBtn}>
                      <Text style={styles.buttonText}>התחל חנייה</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <NavBar />
        </View>
      </SafeAreaView>
    </>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  startParkBtn: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  parkingNameHeader: {
    fontSize: "x-large",
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
  },
  markNameHeader: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: "smaller",
    margin: "7px",
  },
  blockedParkBtn: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    border: "solid 2px #0056b3",
    color: "#0056b3",
    borderRadius: 20,
  },
  confirmedStatus: {
    color: "green !important",
  },
  selectedFilterButton: {
    padding: 10,
    border: "solid 2px #0056b3",
    backgroundColor: "#0056b3",
    color: "white",
    borderRadius: 20,
  },
  statusIcon: {
    fontSize: "20px",
    alignItems: "start",
  },
  filterText: {
    color: "inherit",
  },
  reservationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  reservationDetails: {
    marginBottom: 10,
  },
  reservationStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green", // Adjust based on status
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain", // or 'cover'
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
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default Reservations;

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
import { useNavigation } from "@react-navigation/native";
import { getAllReservationsByUserId } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigation = useNavigation();

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const getFilterButtonStyle = (filter) => {
    return filter === selectedFilter
      ? styles.selectedFilterButton
      : styles.filterButton;
  };

  const getStatusStyle = (status) => {
    return status === "הזמנה בהמתנה" ? "orange" : "green";
  };

  useEffect(() => {
    if (reservations.length === 0) return;

    if (selectedFilter === "all") {
      setFilteredReservations(reservations);
      return;
    }
    const tempFilter = reservations.filter(
      (reservation) => reservation.reservationStatus === selectedFilter
    );
    setFilteredReservations(tempFilter);
  }, [selectedFilter]);

  useEffect(() => {
    const fetchReservations = async () => {
      const userId = 6; // await AsyncStorage.getItem("userId");
      if (userId) {
        const reservations = await getAllReservationsByUserId(userId);
        reservations.map(
          (reservation) =>
            (reservation.reservationDate = new Date(
              reservation.reservation_Date
            ))
        );
        setReservations(reservations);
        setFilteredReservations(reservations);
      }
    };

    fetchReservations();
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  type="ionicon"
                  color="#007AFF"
                  style={styles.backIcon}
                />
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

            {filteredReservations.map((filteredReservation, index) => (
              <View key={index} style={styles.reservationCard}>
                <View style={styles.reservationDetails}>
                  <View style={styles.statusIcon}>
                    <Icon
                      name={
                        filteredReservation.reservationStatus !== "הזמנה בהמתנה"
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
                      חנייה מס': {filteredReservation.markName}
                    </Text>
                  )}
                  <Text>
                    שעת התחלה: {filteredReservation.reservation_STime}
                  </Text>
                  <Text>שעת סיום: {filteredReservation.reservation_ETime}</Text>
                  <Text>
                    {filteredReservation.reservationDate.toLocaleString()}
                  </Text>
                </View>
                {filteredReservation.reservationStatus === "הזמנה בהמתנה" ? (
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ביטול חנייה</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.buttons}>
                    <TouchableOpacity style={styles.blockedParkBtn}>
                      <Text style={styles.buttonText}>חנייה תפוסה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.startParkBtn}
                      onPress={() =>
                        navigation.navigate("ParkingPage", {
                          reservation: filteredReservation,
                        })
                      }
                    >
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
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  parkingNameHeader: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
  },
  markNameHeader: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 14,
    margin: 7,
  },
  blockedParkBtn: {
    backgroundColor: "red",
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
    borderWidth: 2,
    borderColor: "#0056b3",
    color: "#0056b3",
    borderRadius: 20,
  },
  confirmedStatus: {
    color: "green",
  },
  selectedFilterButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#0056b3",
    backgroundColor: "#0056b3",
    color: "white",
    borderRadius: 20,
  },
  statusIcon: {
    fontSize: 20,
    alignItems: "flex-start",
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
    color: "green",
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
    resizeMode: "contain",
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
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default Reservations;

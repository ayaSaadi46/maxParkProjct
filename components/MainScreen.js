import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import NavBar from "./NavBar";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { getAllReservationsByUserId } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { startOfDay } from "date-fns";

const MainScreen = () => {
  const [reservations, setReservations] = useState([]);

  const getStatusStyle = (status) => {
    return status === "הזמנה בהמתנה" ? "orange" : "green";
  };

  useFocusEffect(
    useCallback(() => {
      const fetchReservations = async () => {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const today = startOfDay(new Date());
          const reservations = await getAllReservationsByUserId(userId);
          const filteredReservations = reservations
            .map((reservation) => ({
              ...reservation,
              reservationDate: new Date(reservation.reservation_Date),
            }))
            .filter((reservation) => {
              return (
                startOfDay(reservation.reservationDate).getTime() ===
                  today.getTime() && reservation.reservationStatus === "אישור"
              );
            });
          setReservations(filteredReservations);
        }
      };

      fetchReservations();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {reservations.length > 0 ? (
            <>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>הזמנות להיום</Text>
              </View>

              {reservations.map((reservation, index) => (
                <View key={index} style={styles.reservationCard}>
                  <View style={styles.reservationDetails}>
                    <View style={styles.statusIcon}>
                      <Icon
                        name={
                          reservation.reservationStatus !== "הזמנה בהמתנה"
                            ? "checkmark-circle-outline"
                            : "help-circle-outline"
                        }
                        type="ionicon"
                        color={getStatusStyle(reservation.reservationStatus)}
                      />
                    </View>
                    <Text style={styles.parkingNameHeader}>
                      {reservation.parkName}
                    </Text>
                    {reservation.markName && (
                      <Text style={styles.markNameHeader}>
                        חנייה מס': {reservation.markName}
                      </Text>
                    )}
                    <Text>שעת התחלה: {reservation.reservation_STime}</Text>
                    <Text>שעת סיום: {reservation.reservation_ETime}</Text>
                    <Text>{reservation.reservationDate.toLocaleString()}</Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>אין הזמנות להיום</Text>
            </View>
          )}
        </ScrollView>
        <NavBar />
      </View>
    </SafeAreaView>
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
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  statusIcon: {
    fontSize: 20,
    alignItems: "flex-start",
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
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MainScreen;

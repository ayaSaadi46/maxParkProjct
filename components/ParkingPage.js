import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import Modal from "react-native-modal";
import NavBar from "./NavBar";
import { deleteReservation } from "../services/apiService";

const ParkingPage = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { reservation } = route.params;

  useEffect(() => {
    if (reservation) {
      const timeDifference = calculateTimeDifferenceInSeconds(
        reservation.reservation_STime,
        reservation.reservation_ETime
      );
      setRemainingTime(timeDifference);
    }
  }, [reservation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeDifferenceInSeconds(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const differenceInMilliseconds = end - start;
    return differenceInMilliseconds / 1000;
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReleaseParking = async () => {
    try {
      await deleteReservation(reservation.reservationId)
        .then(() => {
          setModalVisible(false);
          setTimeout(() => {
            Alert.alert("החנייה שוחררה", "החנייה שוחררה בהצלחה", [
              {
                text: "אישור",
                onPress: () => navigation.navigate("MainScreen"),
              },
            ]);
          }, 500);
        })
        .catch(() => {
          throw new Error("Failed to release parking");
        });
    } catch (error) {
      Alert.alert("שגיאה", "אירעה שגיאה בשחרור החנייה. נסה שוב.");
    }
  };

  return (
    <View style={styles.container}>
      <CircularProgress
        size={200}
        width={15}
        fill={(remainingTime / (3 * 60 * 60)) * 100}
        tintColor="#3b5998"
        backgroundColor="#e0e0e0"
      >
        {() => (
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
        )}
      </CircularProgress>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>חנייה:</Text>
          <Text style={styles.value}>{reservation.parkName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>מיקום חנייה:</Text>
          <Text style={styles.value}>{reservation.markName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>תאריך:</Text>
          <Text style={styles.value}>
            {reservation.reservationDate.toLocaleString()}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>טווח שעות:</Text>
          <Text style={styles.value}>
            {reservation.reservation_STime} - {reservation.reservation_ETime}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.blueButton}>
          <Text style={styles.buttonText}>הארכת זמן חנייה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton}>
          <Text style={styles.buttonText}>מישהו חוסם אותי</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.largeButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>שחרור חנייה</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            האם אתה בטוח שברצונך לשחרר את החנייה?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>ביטול</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleReleaseParking}
            >
              <Text style={styles.modalButtonText}>אישור</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 10,
  },
  blueButton: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  redButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  largeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
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

export default ParkingPage;

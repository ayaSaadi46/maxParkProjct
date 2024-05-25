import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CircularProgress } from "react-native-circular-progress";

const ParkingPage = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const route = useRoute();
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
    // Parse the time strings into Date objects
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end - start;

    // Convert milliseconds to seconds
    const differenceInSeconds = differenceInMilliseconds / 1000;

    return differenceInSeconds;
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
        <TouchableOpacity style={styles.blueButton}>
          <Text style={styles.buttonText}>שחרור חנייה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton}>
          <Text style={styles.buttonText}>מישהו חוסם אותי</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  redButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ParkingPage;

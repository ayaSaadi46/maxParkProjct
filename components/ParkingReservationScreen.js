import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import CalendarPicker from "react-native-calendar-picker";
import { getUserById } from "../services/apiService";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ParkingReservationScreen = ({ onReservationConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId !== null) {
          const user = await getUserById(userId);
          console.log(user);
          setUser(user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserId();
  }, []);

  const onDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const handleAddReservation = async () => {
    // Assuming parkId and markId are derived from selectedParkingLot or other parts of your app
    const parkId = selectedParkingLot === "parkingLotA" ? 1 : 2; // Example transformation
    const markId = 0; // Static or derived

    // Formatting the date and time into a string acceptable for your backend
    const reservationDate = selectedDate.toISOString().slice(0, 10);
    const formattedStartTime = startTime.toISOString().slice(11, 19);
    const formattedEndTime = endTime.toISOString().slice(11, 19);

    const data = JSON.stringify({
      reservationId: 0, // Assuming this is auto-generated
      //userId: parseInt(usernametest),
      userId: user.userId,
      // parkId: parkId,
      parkId: 3,
      reservation_Date: reservationDate,
      reservation_STime: formattedStartTime,
      reservation_ETime: formattedEndTime,
      reservation_Status: "הזמנה בהמתנה", // Default status, change as needed
      markId: markId,
    });

    try {
      const response = await fetch(
        "http://10.0.2.2:7157/api/Reservasions/newReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );
      const jsonResponse = await response.json();
      if (response.ok) {
        alert("Reservation added successfully!");
        console.log("Reservation added successfully:", jsonResponse);
      } else {
        throw new Error("Failed to add reservation");
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
      alert("Failed to add reservation. Please try again.");
    }
  };

  const handleConfirm = () => {
    handleAddReservation();
    if (onReservationConfirm) {
      onReservationConfirm(
        selectedDate,
        startTime,
        endTime,
        selectedParkingLot
      );
    }
  };

  const today = new Date();
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() + 7);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.label}>בחר תאריך:</Text>
        <CalendarPicker
          startFromMonday={false}
          minDate={today}
          maxDate={oneWeekFromToday}
          onDateChange={onDateChange}
        />
        <Text style={styles.label}>בחר חניון:</Text>
        <RNPickerSelect
          placeholder={{ label: "בחר חניון...", value: null }}
          value={selectedParkingLot}
          onValueChange={setSelectedParkingLot}
          items={[
            { label: "חניון א", value: "parkingLotA" },
            { label: "חניון ב", value: "parkingLotB" },
          ]}
          style={pickerSelectStyles}
        />
        <View style={styles.timeContainer}>
          <View style={styles.timePickerContainer}>
            <Text style={styles.label}>שעת התחלה</Text>
            {!showStartTimePicker && (
              <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                <Text style={styles.timeText}>
                  {startTime.toLocaleTimeString("he-IL")}
                </Text>
              </TouchableOpacity>
            )}
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                is24Hour={true}
                onChange={(event, selectedTime) => {
                  if (event.type === "set" && selectedTime) {
                    setStartTime(selectedTime);
                  }
                  setShowStartTimePicker(false);
                }}
              />
            )}
          </View>
          <View style={styles.timePickerContainer}>
            <Text style={styles.label}>שעת סיום</Text>
            {!showEndTimePicker && (
              <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                <Text style={styles.timeText}>
                  {endTime.toLocaleTimeString("he-IL")}
                </Text>
              </TouchableOpacity>
            )}
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                is24Hour={true}
                onChange={(event, selectedTime) => {
                  if (event.type === "set" && selectedTime) {
                    setEndTime(selectedTime);
                  }
                  setShowEndTimePicker(false);
                }}
              />
            )}
          </View>
        </View>
        <Button
          title="הזמנה"
          onPress={handleConfirm}
          buttonStyle={styles.confirmButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  timePickerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    textAlign: "right",
  },
  confirmButton: {
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    textAlign: "right",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    textAlign: "right",
  },
});

export default ParkingReservationScreen;

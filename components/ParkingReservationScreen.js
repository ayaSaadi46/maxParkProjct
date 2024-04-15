import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import CalendarPicker from "react-native-calendar-picker";
import axios from "axios";
import { getUserName } from "../services/apiService";
import Header from "./Header";

const ParkingReservationScreen = ({ onReservationConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [usernametest, setUsernametest] = useState("");

  useEffect(() => {
    getUserName()
      .then((username) => {
        setUsernametest(username);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // saveParking() {
  //   axios.post("https://api.github.com/users/mapbox", {startTime, endTime}).then((response) => {

  //   });
  // }

  const onDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirm = () => {
    // העברת פרטי ההזמנה לשרת
    onReservationConfirm(selectedDate, startTime, endTime, selectedParkingLot);
  };

  const today = new Date();
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() + 7);

  return (
    <ScrollView style={styles.container}>
      <Header></Header>
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
            <Text style={styles.label}>שעת סיום</Text>
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={(event, time) => {
                if (time) {
                  setEndTime(time);
                }
              }}
            />
          </View>

          <View style={styles.timePickerContainer}>
            <Text style={styles.label}>שעת התחלה</Text>
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  setStartTime(selectedTime);
                }
              }}
            />
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
    flexDirection: "row", // Sets the main axis to horizontal
    justifyContent: "space-around", // Distributes space around the items
    alignItems: "center", // Aligns items vertically in the center
    padding: 20,
    backgroundColor: "#fff",
  },
  timePickerContainer: {
    flex: 1, // Each picker container takes equal space
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 8,
  },
  dateButton: {
    textAlign: "right",
    marginBottom: 16,
  },
  timeButton: {
    textAlign: "right",
    marginBottom: 16,
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

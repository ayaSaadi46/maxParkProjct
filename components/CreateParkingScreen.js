import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { TimePicker } from "react-native-simple-time-picker"; // This is a placeholder, use actual time picker library

const CreateParkingScreen = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState({
    hours: 9,
    minutes: 0,
  });
  const [selectedEndTime, setSelectedEndTime] = useState({
    hours: 13,
    minutes: 0,
  });

  // Replace with your actual implementation for selecting a company
  const CompanySelector = () => {
    // Imagine this component opens up a selection dialog or a dropdown menu
    return (
      <TouchableOpacity onPress={() => setSelectedCompany("Company XYZ")}>
        <Text>Select a company</Text>
        {selectedCompany && <Text>Selected: {selectedCompany}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>הזמנת חניה</Text>
      <CompanySelector />

      {/* <DatePicker date={selectedDate} onDateChange={setSelectedDate} /> */}
      <TimePicker
        selectedHours={selectedStartTime.hours}
        selectedMinutes={selectedStartTime.minutes}
        onChange={(hours, minutes) => setSelectedStartTime({ hours, minutes })}
      />
      <TimePicker
        selectedHours={selectedEndTime.hours}
        selectedMinutes={selectedEndTime.minutes}
        onChange={(hours, minutes) => setSelectedEndTime({ hours, minutes })}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>אישור</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  // Add additional styling for inputs, selectors, etc.
});

export default CreateParkingScreen;

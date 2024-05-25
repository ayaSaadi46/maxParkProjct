import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";

import redCar from "../assets/car-red.png";
import whiteCar from "../assets/car-white.png";
import yellowCar from "../assets/car-yellow.png";

const ParkingLot = () => {
  const [spots, setSpots] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchParkingSpots();
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // עדכון השעון בזמן אמת כל שנייה
      fetchParkingSpots(); // רענון נתוני החניון בזמן אמת
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchParkingSpots = async () => {
    try {
      //   const response = await fetch("https://your-api-url.com/parkingSpots");
      //   const data = await response.json();

      const reservationData = [
        {
          id: 1,
          reservation_Date: new Date(),
          reservation_STime: "08:00:00.0000000",
          reservation_ETime: "16:00:00.0000000",
          reservation_Status: "reserved",
          markName: "A01",
          markName_Block: "A03",
        },
        {
          id: 2,
          reservation_Date: new Date(),
          reservation_STime: "10:00:00.0000000",
          reservation_ETime: "14:00:00.0000000",
          reservation_Status: "occupied",
          markName: "A02",
          markName_Block: "",
        },
      ];

      const marksData = [
        {
          id: 1,
          isAvailable: false,
          markName: "A01",
          markName_Block: "A02",
        },
        {
          id: 2,
          isAvailable: false,
          markName: "A03",
          markName_Block: "A04",
        },
        {
          id: 3,
          isAvailable: false,
          markName: "A05",
          markName_Block: "A06",
        },
        {
          id: 4,
          isAvailable: false,
          markName: "A07",
          markName_Block: "A08",
        },
        {
          id: 5,
          isAvailable: false,
          markName: "A09",
          markName_Block: "A10",
        },
      ];

      // Merge reservations into marks data
      const mergedData = marksData.map((mark) => {
        // Find the reservation that matches the markName
        const reservation = reservationData.find(
          (res) => res.markName === mark.markName
        );

        // If a matching reservation is found, merge its details into the mark's data
        if (reservation) {
          return {
            ...mark,
            reservation_Date: reservation.reservation_Date,
            reservation_STime: reservation.reservation_STime,
            reservation_ETime: reservation.reservation_ETime,
            reservation_Status: reservation.reservation_Status,
            markName_Block: reservation.markName_Block,
          };
        } else {
          return {
            ...mark,
            reservation_Date: new Date(),
            reservation_STime: "",
            reservation_ETime: "",
            reservation_Status: "",
          };
        }

        return mergedData;
      });

      setSpots(marksData);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  const getCarImage = (spot) => {
    if (spot.reservation_Status === "occupied") {
      const timeLeft = calculateTimeDifference(spot);
      if (timeLeft <= 0) {
        return redCar;
      } else if (timeLeft <= 15) {
        return yellowCar;
      }
      return whiteCar;
    }
    return null;
  };

  function calculateTimeDifference(data) {
    const startTime = new Date(
      data.reservation_Date.toDateString() + " " + data.reservation_STime
    );
    const endTime = new Date(
      data.reservation_Date.toDateString() + " " + data.reservation_ETime
    );
    const difference = endTime - startTime;
    return difference / (1000 * 60 * 60);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.clock}>{currentTime.toLocaleTimeString()}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          {spots.map((spot, index) => (
            <View style={styles.rowContainer}>
              <TouchableOpacity
                key={index}
                style={[styles.spot, styles.box, styles.blocked]}
                onPress={() =>
                  Alert.alert(
                    `Spot ${spot.markName}`,
                    `Status: ${spot.reservation_Status || "free"}`
                  )
                }
              >
                <Text style={styles.text}>{spot.markName_Block}</Text>
                <Image source={getCarImage(spot)} style={styles.carIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                key={index}
                style={[styles.spot, styles.box]}
                onPress={() =>
                  Alert.alert(
                    `Spot ${spot.markName}`,
                    `Status: ${spot.reservation_Status || "free"}`
                  )
                }
              >
                <Text style={styles.text}>{spot.markName}</Text>
                <Image source={getCarImage(spot)} style={styles.carIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderBottom: "solid 2px blue",
    borderTop: "solid 2px blue",
  },
  col: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  blocked: {
    borderRight: "solid 2px blue",
  },
  box: {
    width: 50,
    height: 50,
    textAlign: "center",
    lineHeight: 50,
  },
  spot: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  text: {
    color: "#000",
    marginBottom: 5,
  },
  carIcon: {
    width: 50,
    height: 30,
  },
});

export default ParkingLot;

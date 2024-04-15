import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Image } from "react-native-elements";

import icon from "../assets/icon.png";

const Header = ({ navigation }) => {
  const username = "Aya";
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.username}>שלום, {username}</Text>
        <View style={styles.logoContainer}>
          <Image
            source={icon} // Replace with your logo image path
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.navigationBar}>
        <Icon
          name="arrow-back"
          type="ionicon"
          color="#007AFF"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
        <Text style={styles.title}>הזמנת חנייה</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#007AFF",
  },
  username: {
    color: "#fff",
    fontSize: 18,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backIcon: {
    paddingLeft: 16,
  },
});

export default Header;

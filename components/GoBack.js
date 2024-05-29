import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navigationBar}>
      <Icon
        name="arrow-back"
        type="ionicon"
        color="#007AFF"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  username: {
    color: "#000",
    fontSize: 18,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
  },
  backIcon: {
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default GoBack;

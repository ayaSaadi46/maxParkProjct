import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import avatar from "../assets/avatar.png";
import { useNavigation } from "@react-navigation/native";
import { getUserById } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: "jbowen@gmail.com",
    userFirstName: "James",
    userLastName: "Bowen",
    userCarNum: "1234-ABC",
    userPhone: "+67234567890",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        const user = await getUserById(userId); // Make sure you have defined getUserById
        setUserData(user);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clears all AsyncStorage data
      navigation.navigate("Login"); // Navigates to Login screen
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("User data saved:", userData);
  };

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, ImageUrl: result.uri });
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, ImageUrl: result.uri });
    }
  };

  const handleImagePress = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Choose from Gallery", onPress: handleImageUpload },
        { text: "Take Photo", onPress: handleTakePhoto },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePress}>
          <View style={styles.imageContainer}>
            <Image
              source={avatar}
              onError={(e) => {
                console.error("Failed to load image", e);
                setUserData({
                  ...userData,
                  ImageUrl: Image.resolveAssetSource(avatar).uri,
                });
              }}
              style={styles.profileImage}
            />

            <Ionicons
              name="camera"
              size={24}
              color="black"
              style={styles.cameraIcon}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={styles.profileName}
        >{`${userData.userFirstName} ${userData.userLastName}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>פרופיל</Text>
        <Text style={styles.editText}>לעדכן </Text>
      </View>
      {[
        { label: "מייל", name: "email", value: userData.email },
        { label: "מספר טלפון", name: "userPhone", value: userData.userPhone },
        {
          label: "מספר רכב",
          name: "userCarNum",
          value: userData.userCarNum,
        },
      ].map((field) => (
        <View key={field.name} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={field.label}
              value={field.value}
              onChangeText={(text) => handleChange(field.name, text)}
            />
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>שמור</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>יציאה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileAgeLocation: {
    fontSize: 14,
    color: "gray",
  },
  profileJoinDate: {
    fontSize: 12,
    color: "gray",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editText: {
    fontSize: 14,
    color: "#007BFF",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
});

export default Profile;

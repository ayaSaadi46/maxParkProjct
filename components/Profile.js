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
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import avatar from "../assets/avatar.png";
import { useNavigation } from "@react-navigation/native";
import { getUserById } from "../services/apiService";
import { updateUserDetails } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "./NavBar";

const Profile = ({ onLogout }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    UserPassword: "",
    email: "",
    userFirstName: "",
    userLastName: "",
    userCarNum: "",
    userPhone: "",
    userImagePath: "",
    notificationCode: "",
    isAdmin: true,
    isActive: true,
    isParkingManager: true,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        const user = await getUserById(userId);
        setUserData((prevData) => ({
          ...prevData,
          ...user,
        }));
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      onLogout();
      setTimeout(() => {
        navigation.navigate("Login");
      }, 200);
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

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        const userDataToUpdate = {
          userId: parseInt(userId, 10),
          userEmail: userData.email,
          userPassword: "",
          userFirstName: userData.userFirstName,
          userLastName: userData.userLastName,
          userCarNum: userData.userCarNum,
          userPhone: userData.userPhone.toString(),
          userImagePath: "",
          notificationCode: userData.notificationCode,
          isAdmin: userData.isAdmin,
          isActive: userData.isActive,
          isParkingManager: userData.isParkingManager,
        };
        const updatedUser = await updateUserDetails(userDataToUpdate);
        console.log("User data updated:", updatedUser);
        Alert.alert("הצלחה", "העדכון בוצע בהצלחה!");
      } catch (error) {
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
        } else {
          console.log("Error message:", error.message);
        }
        Alert.alert("שגיאה", "עדכון נתוני המשתמש נכשל. נסה שוב");
      }
    }
  };

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("נדרשת הרשאת גישה לגלריה !");
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
      alert("נדרשת הרשאת גישה למצלמה!");
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
      "עדכון תמונה",
      "בחר מהאפשריות",
      [
        { text: "ביטול", style: "cancel" },
        { text: "בחר מהגלריה", onPress: handleImageUpload },
        { text: "צלם תמונה", onPress: handleTakePhoto },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        </View>
        {[
          { label: "מייל", name: "email", value: userData.email },
          {
            label: "מספר טלפון",
            name: "userPhone",
            value: userData.userPhone.toString(),
          },
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
        <NavBar></NavBar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    writingDirection: "rtl",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
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

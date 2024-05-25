// Profile.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import avatar from "../assets/avatar.png";
const Profile = () => {
  const [userData, setUserData] = useState({
    UserEmail: "test@abs.com",
    UserPassword: "password123",
    UserName: "Kristan",
    ImageUrl: avatar, //"https://via.placeholder.com/100",
    UserLastName: "Grill",
    UserCarNum: "1234-ABC",
    UserPhone: "96034 56878",
  });

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save the updated user data to an API or storage
    console.log("User data saved:", userData);
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setUserData({ ...userData, ImageUrl: uri });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image
            source={{ uri: userData.ImageUrl }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text
          style={styles.profileName}
        >{`${userData.UserName} ${userData.UserLastName}`}</Text>
      </View>
      <Text style={styles.editProfile}>Edit profile</Text>
      {[
        { label: "Email", name: "UserEmail", secure: false },
        { label: "Password", name: "UserPassword", secure: true },
        { label: "First Name", name: "UserName", secure: false },
        { label: "Last Name", name: "UserLastName", secure: false },
        { label: "Car Number", name: "UserCarNum", secure: false },
        { label: "Phone Number", name: "UserPhone", secure: false },
      ].map((field) => (
        <View key={field.name} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={field.label}
              value={userData[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              secureTextEntry={field.secure}
            />
            <Icon name="edit" size={20} color="#000" />
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          /* Handle logout */
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
        <Icon name="logout" size={20} color="#000" />
      </TouchableOpacity>
      <Button title="Save" onPress={handleSave} />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editProfile: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default Profile;

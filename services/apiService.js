import axios from "axios";

const baseUrl = `http://10.0.2.2:7198`;

export const login = async (formData) => {
  const fullUrl = `${baseUrl}/Users/LogIn`;
  try {
    const response = await axios.post(fullUrl, formData);
    console.log(response);
    if (response.data) {
      return response.data.name;
    } else {
      // Handle the case where `name` might not be part of the response
      console.error("Username is not present in the response:", response);
      return null; // Consider what default or error value makes sense for your application
    }
  } catch (error) {
    console.error("Failed to fetch username:", error);
    return null; // Returning null, could rethrow the error or handle differently depending on your error handling strategy
  }
};

export const getAllReservations = async () => {
  const fullUrl = `${baseUrl}/api/Reservasions/allReservations`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null; // Returning null, could rethrow the error or handle differently depending on your error handling strategy
  }
};

export const getAllReservationsByUserId = async (userId) => {
  const fullUrl = `${baseUrl}/api/Reservasions/allReservations/${userId}`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null; // Returning null, could rethrow the error or handle differently depending on your error handling strategy
  }
};

export const getUserById = async (userId) => {
  const fullUrl = `${baseUrl}/api/Users/getUserById/${userId}`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null; // Returning null, could rethrow the error or handle differently depending on your error handling strategy
  }
};

import axios from "axios";

const baseUrl = `https://proj.ruppin.ac.il/cgroup68/test2/tar1`;

export const login = async (formData) => {
  const fullUrl = `${baseUrl}/Users/LogIn`;
  try {
    const response = await axios.post(fullUrl, formData);
    if (response.data) {
      return response.data.name;
    } else {
      // טפל במקרה שבו ייתכן ש'שם' אינו חלק מהתגובה
      console.error("Username is not present in the response:", response);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch username:", error);
    return null;
  }
};

export const getAllReservations = async () => {
  const fullUrl = `${baseUrl}/api/Reservasions/allReservations`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null;
  }
};

export const getAllReservationsByUserId = async (userId) => {
  const fullUrl = `${baseUrl}/api/Reservasions/allReservations/${userId}`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null;
  }
};

export const getUserById = async (userId) => {
  const fullUrl = `${baseUrl}/api/Users/getUserById/${userId}`;
  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch getAllReservations:", error);
    return null;
  }
};
export const updateUserDetails = async (userDataToUpdate) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/Users/updateUserDetails`,
      userDataToUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};
export const deleteReservation = (reservationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${baseUrl}/api/reservasions/reservationId?reservationId=${reservationId}`;
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        console.log("Reservation deleted successfully");
        resolve({ success: true, message: "Reservation deleted successfully" });
      } else {
        const errorData = await response.text();
        console.error(
          "Failed to delete reservation:",
          response.status,
          errorData
        );
        reject({
          success: false,
          message: `Failed to delete reservation: ${errorData}`,
        });
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      reject({
        success: false,
        message: `Error deleting reservation: ${error.message}`,
      });
    }
  });
};

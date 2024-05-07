import axios from "axios";

const baseUrl = `http://localhost:7198`;

export const login = async (formData) => {
  const fullUrl = `${baseUrl}/Users/LogIn`;
  try {
    const response = await axios.post(fullUrl, formData);
    console.log(response);
    if (response.data && response.data.name) {
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

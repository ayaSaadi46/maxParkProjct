import axios from "axios";

export const getUserName = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/ben9992");
    return response.data.name;
  } catch (error) {
    console.error("Failed to fetch username:", error);
    return null; // Returning null or you could rethrow the error or return a default value
  }
};

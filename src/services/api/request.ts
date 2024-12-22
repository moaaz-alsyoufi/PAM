import axios, { Method } from "axios";
import { ACTIVE_API_URL } from "@/services/api/api";

export const apiRequest = async (
  endpoint: string, // API endpoint, e.g., 'Users', 'Products'
  method: Method, // HTTP method: 'GET', 'POST', 'PUT', 'DELETE', etc.
  token: string, // Authorization token
  data?: any // Data payload for POST or PUT
): Promise<{ data?: any; error?: string; isUnauthorized?: boolean }> => {
  try {
    const response = await axios({
      url: `${ACTIVE_API_URL}${endpoint}`, // Combine base URL with endpoint
      method, // HTTP method
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: method === "POST" || method === "PUT" ? data : undefined, // Include data for POST/PUT
    });

    return { data: response.data }; // Return the response data on success
  } catch (error: any) {
    const status = error.response?.status;

    // Handle 401 Unauthorized errors
    if (status === 401) {
      return {
        error: error.response?.data?.warning || "Unauthorized access.",
        isUnauthorized: true,
      };
    }

    // Handle other errors
    return {
      error:
        error.response?.data?.message || error.message || "An error occurred.",
    };
  }
};

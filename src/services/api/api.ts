// export const ACTIVE_URL = "https://localhost:7050/";
export const ACTIVE_URL = "https://pamapis.karamentreprises.com/";

export const ACTIVE_API_URL = `${ACTIVE_URL}api/`;

const apiRequest = async (
  endpoint: string,
  method: string,
  token: string, // Ensure token is required
  body?: any
) => {
  // Remove leading slash if present
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  console.log("API Request - Endpoint:", normalizedEndpoint, "Method:", method); // Added log
  
  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  
  if (body) {
    requestOptions.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${ACTIVE_API_URL}${normalizedEndpoint}`, requestOptions);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`); // Enhanced error logging
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response Data:", data); // Added log
    return data; // Ensure that the API returns an array directly
  } catch (error) {
    console.error("API Request Failed:", error); // Added error catch
    throw error;
  }
};

export default apiRequest;

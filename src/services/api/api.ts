// export const ACTIVE_URL = "https://localhost:7050/";
export const ACTIVE_URL = "https://pamapis.karamentreprises.com/";

export const ACTIVE_API_URL = `${ACTIVE_URL}api/`;

const apiRequest = async (
  endpoint: string,
  method: string,
  token: string,
  body?: any
) => {
  // Remove leading slash if present
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
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
  
  const response = await fetch(`${ACTIVE_API_URL}${normalizedEndpoint}`, requestOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data; // Ensure that the API returns an array directly
};

export default apiRequest;

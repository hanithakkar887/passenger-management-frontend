// // src/api.js
// const API_URL = 'http://localhost:5000/api';

// export const fetchPassengers = async () => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch passengers: ${response.status} ${response.statusText}`);
//     }
    
//     const data = await response.json();
    
//     // Debug log to see the structure of the API response
//     console.log('API response:', data);
    
//     return data;
//   } catch (error) {
//     console.error('Error fetching passengers:', error);
//     throw error;
//   }
// };

// export const addPassengers = async (formData) => {
//   try {
//     const response = await fetch(`${API_URL}/add`, {
//       method: 'POST',
//       body: formData,
//       // Don't set Content-Type header when sending FormData
//       // It will be set automatically including the boundary
//     });
    
//     if (!response.ok) {
//       const errorText = await response.text().catch(() => 'Unknown error');
//       throw new Error(`Failed to add passengers: ${response.status} ${response.statusText}. ${errorText}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error adding passengers:', error);
//     throw error;
//   }
// };



const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://passenger-management-backend.onrender.com/api';
export const fetchPassengers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch passengers: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('API response:', responseData);

    if (!responseData.data || !Array.isArray(responseData.data)) {
      throw new Error('Unexpected API response format');
    }

    return responseData.data;
  } catch (error) {
    console.error('Error fetching passengers:', error);
    throw error;
  }
};

export const addPassengers = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Failed to add passengers: ${response.status} ${response.statusText}. ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding passengers:', error);
    throw error;
  }
};

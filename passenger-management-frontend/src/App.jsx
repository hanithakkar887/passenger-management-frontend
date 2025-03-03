// src/App.jsx
import { useState, useEffect } from 'react';
import PassengerForm from './components/PassengerForm';
import PassengerTable from './components/PassengerTable';
import { fetchPassengers } from './api';

function App() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPassengers = async () => {
    try {
      setLoading(true);
      const data = await fetchPassengers();
      
      // Ensure the response is an array
      if (Array.isArray(data)) {
        setPassengers(data);
      } else if (data && typeof data === 'object' && data.passengers && Array.isArray(data.passengers)) {
        // Handle case where API returns { passengers: [...] }
        setPassengers(data.passengers);
      } else {
        // Default to empty array if response format is unexpected
        console.error('Unexpected API response format:', data);
        setPassengers([]);
        setError('Received invalid data format from the server');
      }
    } catch (err) {
      setError('Failed to load passengers. Please try again later.');
      console.error(err);
      setPassengers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPassengers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Passenger Management System</h1>
          <p className="text-gray-600 mt-2">Add and manage multiple passengers</p>
        </header>
        
        <PassengerForm onPassengersAdded={loadPassengers} />
        
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md mt-8 text-center">
            <p className="text-gray-600">Loading passengers...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-lg shadow-md mt-8 text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={loadPassengers}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <PassengerTable passengers={passengers} onRefresh={loadPassengers} />
        )}
      </div>
    </div>
  );
}

export default App;
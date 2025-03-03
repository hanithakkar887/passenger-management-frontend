// src/components/PassengerForm.jsx
import { useState } from 'react';
import { addPassengers } from '../api';
import { 
  UserPlus, 
  UserMinus, 
  UserCheck, 
  Save, 
  Upload, 
  Mail, 
  Phone, 
  Calendar, 
  User
} from 'lucide-react';

const PassengerForm = ({ onPassengersAdded }) => {
  const [passengers, setPassengers] = useState([
    {
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      photo: null,
      idCard: null
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const addPassengerRow = () => {
    setPassengers([
      ...passengers,
      {
        name: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        photo: null,
        idCard: null
      }
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleFileChange = (index, field, file) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = file;
    setPassengers(updatedPassengers);
  };

  const validateForm = () => {
    const newErrors = [];
    
    passengers.forEach((passenger, index) => {
      const passengerErrors = {};
      
      if (!passenger.name.trim()) {
        passengerErrors.name = 'Name is required';
      }
      
      if (!passenger.age) {
        passengerErrors.age = 'Age is required';
      } else if (isNaN(passenger.age) || passenger.age <= 0) {
        passengerErrors.age = 'Age must be a positive number';
      }
      
      if (!passenger.gender) {
        passengerErrors.gender = 'Gender is required';
      }
      
      if (passenger.email && !/\S+@\S+\.\S+/.test(passenger.email)) {
        passengerErrors.email = 'Invalid email format';
      }
      
      if (Object.keys(passengerErrors).length > 0) {
        newErrors[index] = passengerErrors;
      }
    });
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Loop through each passenger and send a separate request
      for (const passenger of passengers) {
        // Create FormData for each passenger
        const formData = new FormData();
  
        // Add passenger data to FormData
        formData.append('name', passenger.name);
        formData.append('age', passenger.age);
        formData.append('gender', passenger.gender);
        formData.append('contact', passenger.contact || '');
        formData.append('email', passenger.email || '');
  
        // Add files if they exist
        if (passenger.photo) {
          formData.append('photo', passenger.photo);
        }
  
        if (passenger.idCard) {
          formData.append('idCard', passenger.idCard);
        }
  
        // Send data to the server
        await addPassengers(formData);
      }
  
      // Clear form and notify parent component
      setPassengers([
        {
          name: '',
          age: '',
          gender: '',
          contact: '',
          email: '',
          photo: null,
          idCard: null,
        },
      ]);
  
      if (onPassengersAdded) {
        onPassengersAdded();
      }
  
      alert('Passengers added successfully!');
    } catch (error) {
      alert('Failed to add passengers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
      
      // Also update errors array
      const newErrors = [...errors];
      newErrors.splice(index, 1);
      setErrors(newErrors);
    }
  };

  // const handleFileChange = (index, field, file) => {
  //   const updatedPassengers = [...passengers];
  //   updatedPassengers[index][field] = file;
  //   setPassengers(updatedPassengers);
  // };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center">
        <UserCheck className="mr-2" size={24} />
        Passenger Information
      </h2>
      
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-8 p-6 border border-indigo-200 rounded-md bg-indigo-50 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-700 flex items-center">
                <User className="mr-2" size={20} />
                Passenger #{index + 1}
              </h3>
              {passengers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePassenger(index)}
                  className="text-red-500 hover:text-red-700 flex items-center transition-colors duration-200"
                >
                  <UserMinus className="mr-1" size={18} />
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                  <User size={16} className="mr-1" />
                  Name*
                </label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className={`w-full p-3 border rounded-md transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors[index]?.name ? 'border-red-500 bg-red-50' : 'border-indigo-300'
                  }`}
                  placeholder="Full Name"
                  required
                />
                {errors[index]?.name && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Age*
                </label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                  className={`w-full p-3 border rounded-md transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors[index]?.age ? 'border-red-500 bg-red-50' : 'border-indigo-300'
                  }`}
                  required
                  min="1"
                  placeholder="Age in years"
                />
                {errors[index]?.age && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].age}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                  <User size={16} className="mr-1" />
                  Gender*
                </label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  className={`w-full p-3 border rounded-md transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors[index]?.gender ? 'border-red-500 bg-red-50' : 'border-indigo-300'
                  }`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors[index]?.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].gender}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                  <Phone size={16} className="mr-1" />
                  Contact
                </label>
                <input
                  type="text"
                  value={passenger.contact}
                  onChange={(e) => handleInputChange(index, 'contact', e.target.value)}
                  className="w-full p-3 border border-indigo-300 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                  <Mail size={16} className="mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  className={`w-full p-3 border rounded-md transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors[index]?.email ? 'border-red-500 bg-red-50' : 'border-indigo-300'
                  }`}
                  placeholder="email@example.com"
                />
                {errors[index]?.email && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].email}</p>
                )}
              </div>
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 mt-3 p-4 bg-white rounded-md border border-indigo-200">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                    <Upload size={16} className="mr-1" />
                    Photo (PNG)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileChange(index, 'photo', e.target.files[0])}
                      className="w-full p-2 text-sm text-indigo-700 file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0 file:text-sm file:font-semibold
                      file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200
                      focus:outline-none"
                    />
                    {passenger.photo && (
                      <span className="text-xs text-green-600 ml-2">
                        File selected
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center">
                    <Upload size={16} className="mr-1" />
                    ID Card (PDF)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(index, 'idCard', e.target.files[0])}
                      className="w-full p-2 text-sm text-indigo-700 file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0 file:text-sm file:font-semibold
                      file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200
                      focus:outline-none"
                    />
                    {passenger.idCard && (
                      <span className="text-xs text-green-600 ml-2">
                        File selected
                      </span>
                      
                      
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex flex-col sm:flex-row sm:justify-between mt-8 gap-4">
          <button
            type="button"
            onClick={addPassengerRow}
            className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center justify-center"
          >
            <UserPlus className="mr-2" size={18} />
            Add Another Passenger
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center"
          >
            <Save className="mr-2" size={18} />
            {isSubmitting ? 'Submitting...' : 'Submit All'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
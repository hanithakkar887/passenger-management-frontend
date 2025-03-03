// import { useState } from 'react';

// const PassengerTable = ({ passengers = [], onRefresh }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Ensure passengers is an array before filtering
//   const passengerArray = Array.isArray(passengers) ? passengers : [];

//   // Filter passengers based on search term
//   const filteredPassengers = passengerArray.filter((passenger) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       passenger.name?.toLowerCase().includes(searchLower) ||
//       (passenger.email && passenger.email.toLowerCase().includes(searchLower))
//     );
//   });

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mt-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Passengers List</h2>

//         <div className="flex space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by name or email"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-64 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <svg
//               className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>

//           <button
//             onClick={onRefresh}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {filteredPassengers.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 text-left border-b">Name</th>
//                 <th className="py-3 px-4 text-left border-b">Age</th>
//                 <th className="py-3 px-4 text-left border-b">Gender</th>
//                 <th className="py-3 px-4 text-left border-b">Contact</th>
//                 <th className="py-3 px-4 text-left border-b">Email</th>
//                 <th className="py-3 px-4 text-left border-b">Photo</th>
//                 <th className="py-3 px-4 text-left border-b">ID Card</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPassengers.map((passenger, index) => {
//                 // Construct the full URLs for the photo and ID card
//                 const photoUrl = passenger.photo
//                   ? `http://localhost:5000/uploads/${passenger.photo.replace('uploads\\', '')}`
//                   : null;
//                 const idCardUrl = passenger.idCard
//                   ? `http://localhost:5000/uploads/${passenger.idCard.replace('uploads\\', '')}`
//                   : null;

//                 return (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="py-3 px-4 border-b">{passenger.name}</td>
//                     <td className="py-3 px-4 border-b">{passenger.age}</td>
//                     <td className="py-3 px-4 border-b">{passenger.gender}</td>
//                     <td className="py-3 px-4 border-b">{passenger.contact || '-'}</td>
//                     <td className="py-3 px-4 border-b">{passenger.email || '-'}</td>
//                     <td className="py-3 px-4 border-b">
//                       {photoUrl ? (
//                         <img
//                           src={photoUrl}
//                           alt={`${passenger.name}'s photo`}
//                           className="h-12 w-12 object-cover rounded-md"
//                         />
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                     <td className="py-3 px-4 border-b">
//                       {idCardUrl ? (
//                         <a
//                           href={idCardUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 hover:underline"
//                         >
//                           Download PDF
//                         </a>
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-8 bg-gray-50 rounded-md">
//           <p className="text-gray-500">
//             {searchTerm ? 'No passengers match your search criteria.' : 'No passengers available.'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PassengerTable;

import { useState } from "react";
import { Search, RefreshCw, Download, User, Mail, Phone } from "lucide-react";

const PassengerTable = ({ passengers = [], onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Safety check if API returns invalid data
  const passengerArray = Array.isArray(passengers) ? passengers : [];

  // Filter by name or email
  const filteredPassengers = passengerArray.filter((passenger) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      passenger.name?.toLowerCase().includes(searchLower) ||
      (passenger.email && passenger.email.toLowerCase().includes(searchLower))
    );
  });
  console.log();
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800">
          <User className="mr-2 text-blue-600" size={24} />
          Passengers List
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <button
            onClick={onRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {filteredPassengers.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Card
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPassengers.map((passenger, index) => {
                // Fix Windows backslash path issues in URLs
                // const photoUrl = passenger.photo
                //   ? `http://localhost:5000/uploads/${passenger.photo.replace('uploads\\', '')}`
                //   : null;
                // const idCardUrl = passenger.idCard
                //   ? `http://localhost:5000/uploads/${passenger.idCard.replace('uploads\\', '')}`
                //   : null;
                const photoUrl = passenger.photo;
                const idCardUrl = passenger.idCard;
                console.log(idCardUrl)

                return (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {passenger.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {passenger.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {passenger.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {passenger.contact ? (
                        <div className="flex items-center text-gray-700">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {passenger.contact}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {passenger.email ? (
                        <div className="flex items-center text-gray-700">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {passenger.email}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {photoUrl ? (
                        <div className="relative">
                          <img
                            src={photoUrl}
                            alt={`${passenger.name}'s photo`}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {idCardUrl ? (
                        <a
                          href={idCardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
  {photoUrl ? (
    <img
      src={photoUrl}
      alt={`${passenger.name}'s photo`}
      className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
    />
  ) : (
    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
      <User className="h-5 w-5 text-gray-400" />
    </div>
  )}
</td>

{/* <td className="px-6 py-4 whitespace-nowrap">
  {idCardUrl ? (
    <a
      href={idCardUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
    >
      <Download className="h-4 w-4 mr-1" />
      View
    </a>
  ) : (
    <span className="text-gray-400">-</span>
  )}
</td> */}

<td className="border p-2">
  {passenger.file ? (
    <a
      // href={URL.createObjectURL(passenger.file)}
      href='https://drive.google.com/file/d/1oogC467FNqDUEZLwHZ_ct4pI8Si2AurP/view?usp=sharing'
      download={passenger.file.name}
      className="text-blue-500 underline"
    >
      <Download/>
    </a>
  ) : (
    // "No file uploaded"
    <Download/>
  )}
</td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">
            {searchTerm
              ? "No passengers match your search criteria."
              : "No passengers available."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PassengerTable;

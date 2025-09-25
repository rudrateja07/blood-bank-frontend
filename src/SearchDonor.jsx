import React, { useState } from 'react';
import axios from 'axios';

const DonorSearch = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8081/donors/search', {
        params: { state, district, bloodGroup }
      });
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Donors</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Blood Group:</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">
          Search
        </button>
      </form>

      {donors.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Matching Donors:</h3>
          <ul className="space-y-2">
            {donors.map((donor) => (
              <li key={donor.id} className="p-4 border rounded shadow-sm">
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>State:</strong> {donor.state}</p>
                <p><strong>District:</strong> {donor.district}</p>
                <p><strong>Email:</strong> {donor.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DonorSearch;

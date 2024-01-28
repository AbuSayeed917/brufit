// HealthServices.js
import React, { useState } from 'react';
import axios from 'axios';
import "./HealthServices.css";

const HealthServices = () => {
  const [postcode, setPostcode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const clientId = process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET;
    const version = '20220101';

    try {
      const response = await axios.get(`https://api.foursquare.com/v2/venues/search?near=${postcode}&client_id=${clientId}&client_secret=${clientSecret}&v=${version}&categoryId=4bf58dd8d48988d196941735`);
      
      if (response.data.meta && response.data.meta.code === 200) {
        // Check if the response indicates success
        const data = response.data;

        if (data.response && data.response.venues && data.response.venues.length > 0) {
          const hospitalNames = data.response.venues.map(venue => venue.name);
          setHospitals(hospitalNames);
          setError('');
        } else {
          setHospitals([]);
          setError('No hospitals found near the given location. Please try again.');
        }
      } else {
        // Handle API error
        setError('API error. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="health-services-container">
      <h2>Health Services</h2>
      <div className="input-container">
        <label className="label" htmlFor="postcode">
          Enter your postcode:
        </label>
        <input
          className="input"
          type="text"
          id="postcode"
          value={postcode}
          onChange={handlePostcodeChange}
        />
      </div>
      <button className="button" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="error">{error}</p>}

      {hospitals.length > 0 && (
        <div>
          <h3>Nearby Hospitals:</h3>
          <ul className="hospitals-list">
            {hospitals.map((hospital, index) => (
              <li key={index}>{hospital}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthServices;

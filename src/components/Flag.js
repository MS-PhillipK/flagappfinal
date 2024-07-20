// Flag.js
import React from 'react';
import './Flag.css';

const Flag = ({ countryCode }) => {
  console.log('Flag Component countryCode:', countryCode); // Debugging line
  return (
    <div className="flag-container">
      <img
        src={`${process.env.PUBLIC_URL}/flags/${countryCode}.png`}
        alt={`Flag of ${countryCode}`}
        className="flag-image"
        onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/flags/placeholder.png`; }} // Optional: Fallback to a placeholder
      />
    </div>
  );
};

export default Flag;

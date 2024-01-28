// Import necessary React functionality
import React from 'react';


// Import the associated CSS file for styling
import './Header.css';

// Define the Headers component
const Headers = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <h1>BrunelFitness</h1>
      </div>
      <div className="menu">
        <ul className="menu-list">
          <li><a href="/">Goals</a></li>
          <li><a href="./DietAndWorkoutPlan">Diet and Workout</a></li>
          <li><a href="/health-services"rel="noopener noreferrer">Health Services</a></li>
          <li><a href="/">Progress Tracker</a></li>
          <li><a href="https://www.nhs.uk/live-well/" target="_blank" rel="noopener noreferrer">Resources</a></li>
          <li><a href="/bmi-calculator" rel="noopener noreferrer">BMI & Diet Plan</a></li>
        </ul>
      </div>
    </nav>
  );
}

// Export the Headers component
export default Headers;
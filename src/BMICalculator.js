// Import necessary React functionality
import React, { useState } from 'react';
import DietPlan from './DietPlan'; // Import the DietPlan component

// Import the associated CSS file for styling
import './BMICalculator.css';

// Define the BMICalculator component
const BMICalculator = () => {
  // State variables to hold user input and calculated values
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmi, setBmi] = useState('');
  const [neededCalories, setNeededCalories] = useState('');
  const [error, setError] = useState('');
  const [dietPlanVisible, setDietPlanVisible] = useState(false); // New state for DietPlan visibility

  // Function to convert height from feet and inches to centimeters
  const convertHeightToCm = () => {
    const heightInInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
    // 1 inch = 2.54 cm
    return heightInInches * 2.54;
  };

  // Function to determine health status based on BMI
  const determineHealthStatus = (bmiValue) => {
    if (bmiValue < 18.5) {
      return 'You are underweight. Consider consulting with a healthcare professional.';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return 'You are in a healthy weight range. Keep it up!';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return 'You are overweight. Consider adopting a healthier lifestyle.';
    } else {
      return 'You are in the obese range. It is advisable to consult with a healthcare professional.';
    }
  };

  // Function to calculate BMI and needed calories
  const calculateBMI = () => {
    // Check if input values are valid
    if (heightFeet > 0 && heightInches >= 0 && weight > 0 && age > 0) {
      // Convert height to centimeters
      const heightCm = convertHeightToCm();

      // Calculate BMI
      const bmiValue = weight / (heightCm * heightCm / 10000);
      setBmi(bmiValue.toFixed(2));

      // Determine health status
      const healthStatus = determineHealthStatus(bmiValue);

      // Calculate BMR based on Harris-Benedict Equation
      const bmr = gender === 'male'
        ? 88.362 + (13.397 * weight) + (4.799 * heightCm) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * heightCm) - (4.330 * age);

      // Calculate TDEE based on activity level
      const activityMultipliers = {
        sedentary: 1.2,
        lightlyActive: 1.375,
        moderatelyActive: 1.55,
        veryActive: 1.725,
        extremelyActive: 1.9,
      };

      const tdee = bmr * activityMultipliers[activityLevel];

      // Set the calculated TDEE as needed calories
      setNeededCalories(tdee.toFixed(2));

      // Clear any previous error
      setError('');

      // Display health status message
      alert(healthStatus); // You can replace this with a more visually appealing way of displaying the message

      // Render the DietPlan component with the calculated BMI
      setDietPlanVisible(true);
    } else {
      // Set an error message if input values are not valid
      setError('Please enter valid values for height, weight, and age.');
      // Hide the DietPlan component if there's an error
      setDietPlanVisible(false);
    }
  };

  // JSX structure for the component
  return (
    <div className="bmi-calculator-container">
      {/* Video background */}
      <video autoPlay loop muted className="video-background">
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content container */}
      <div className="content">
        {/* Heading */}
        <h2>BMI Calculator</h2>

        {/* Form for user input */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Height (feet):
            <input
              type="number"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              placeholder="Enter feet"
              aria-label="Height in feet"
              required
            />
          </label>

          <label>
            Height (inches):
            <input
              type="number"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              placeholder="Enter inches"
              aria-label="Height in inches"
              required
            />
          </label>

          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              aria-label="Weight in kilograms"
              required
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              aria-label="Age"
              required
            />
          </label>

          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              aria-label="Select gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label>
            Activity Level:
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              aria-label="Select activity level"
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightlyActive">Lightly Active</option>
              <option value="moderatelyActive">Moderately Active</option>
              <option value="veryActive">Very Active</option>
              <option value="extremelyActive">Extremely Active</option>
            </select>
          </label>

          {/* Container for the "Calculate" button, centered */}
          <div className="button-container">
            {/* Button to trigger BMI calculation */}
            <button onClick={calculateBMI}>Calculate</button>
          </div>

        </form>

        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        {/* Display BMI and needed calories only if there is no error */}
        {!error && bmi && <p>Your BMI is: {bmi}</p>}
        {!error && neededCalories && <p>Estimated Needed Calories: {neededCalories} kcal</p>}

        {/* Display DietPlan component if visible */}
        {dietPlanVisible && <DietPlan bmi={bmi} />}

      </div>
    </div>
  );
};

// Export the BMICalculator component
export default BMICalculator;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import BMICalculator from './BMICalculator';
import HealthServices from './HealthServices';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/health-services" element={<HealthServices/>} />
          {/* Add more routes for other components/pages */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
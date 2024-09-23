import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(''); // Will hold the strength value (weak, moderate, strong)
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [result, setResult] = useState(null); // To store the result from the backend

  // Handle password input change (only updates the input field)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password as the user types
  };

  // Handle the API call when the "Enter" button is clicked
  const handleSubmit = () => {
    if (password) {
      axios.post('http://localhost:3002/check-password', { password })
        .then(response => {
          console.log(response.data);  // Log the response for debugging
          setStrength(response.data.strength); // Set strength based on backend response
          setResult(response.data.message); // Display the message from the backend
        })
        .catch(error => {
          console.error('Error fetching password strength:', error);
          setResult('Error fetching password strength.');
        });
    } else {
      setResult('Please enter a password.');
    }
  };

  // Toggle the password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container ${strength}`}>
      <h2>Password Strength Checker</h2>
      <div className="inputArea">
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type between password and text
          placeholder="Password"
          id="YourPassword"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="show" onClick={toggleShowPassword}>
          {showPassword ? 'HIDE' : 'SHOW'}
        </div>
      </div>
      <button onClick={handleSubmit}>Enter</button> {/* Trigger API call on click */}
      <div className="strengthMeter"></div>
      
      {result && (
        <div className="result">
          <p>{result}</p> {/* Display the result below the button */}
        </div>
      )}
    </div>
  );
}

export default App;

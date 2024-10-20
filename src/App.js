import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState(null);
  const [entropy, setEntropy] = useState('');
  const [mutationWarning, setMutationWarning] = useState('');
  const [predictionWarning, setPredictionWarning] = useState(''); // Add predictionWarning
  const [score, setScore] = useState('');  // Added for score display
  const [tips, setTips] = useState([]);    // Added for password tips

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');

  // Handle input change
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle the API call when the "Enter" button is clicked
  const handleSubmit = () => {
    if (password.includes(' ')) {
      setResult('Passwords should not contain spaces.');
      setStrength('weak');
      return;
    }

    if (password) {
      const userData = { name, birthdate, email };
      axios.post('http://localhost:3002/check-password', { password, userData })
        .then(response => {
          console.log(response.data);
          setStrength(response.data.strength);
          setResult(response.data.message);
          setEntropy(response.data.entropy);
          setMutationWarning(response.data.mutationWarning);
          setPredictionWarning(response.data.predictionWarning); // Set prediction warning
          setScore(response.data.score);       // Set score
          setTips(response.data.tips);         // Set tips for improving password
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
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`container ${strength}`}>
      <h2>Password Strength Checker</h2>
      <div className="inputArea">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Birthdate (optional)"
          value={birthdate}
          onChange={handleBirthdateChange}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={handleEmailChange}
        />
        <div className="show" onClick={toggleShowPassword}>
          {showPassword ? 'HIDE' : 'SHOW'}
        </div>
      </div>
      
      <button onClick={handleSubmit}>Enter</button>

      {entropy && <p>Entropy: {entropy}</p>}
      {mutationWarning && <p>{mutationWarning}</p>}
      {predictionWarning && <p>{predictionWarning}</p>} {/* Display prediction warning */}
      {score && <p>Score: {score}</p>}
      {tips.length > 0 && (
        <div>
          <p>Suggestions to improve your password:</p>
          <ul>
            {tips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </div>
      )}
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;

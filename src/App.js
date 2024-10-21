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
  const [predictionWarning, setPredictionWarning] = useState('');
  const [score, setScore] = useState('');
  const [tips, setTips] = useState([]);

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');

  // State for handling collapsible boxes
  const [isEntropyOpen, setIsEntropyOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [isMasteringOpen, setIsMasteringOpen] = useState(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

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
          setStrength(response.data.strength);
          setResult(response.data.message);
          setEntropy(response.data.entropy);
          setMutationWarning(response.data.mutationWarning);
          setPredictionWarning(response.data.predictionWarning);
          setScore(response.data.score);
          setTips(response.data.tips);
        })
        .catch(error => {
          console.error('Error fetching password strength:', error);
          setResult('Error fetching password strength.');
        });
    } else {
      setResult('Please enter a password.');
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="main-container">
      <aside className="left-panel">
        <h2>How to make your password more secure?</h2>
        <ul className="article-list">
          <li><a href="https://www.dhs.gov/archive/news/2013/05/08/protecting-your-personal-information-secure-passwords" target="_blank" rel="noopener noreferrer">Protecting Your Personal Information</a></li>
          <li><a href="https://cybersecuritynews.com/nist-rules-password-security/amp/" target="_blank" rel="noopener noreferrer">NIST Rules for Password Security</a></li>
          <li><a href="https://cisa.gov/secure-our-world/require-strong-passwords" target="_blank" rel="noopener noreferrer">CISA: Require Strong Passwords</a></li>
        </ul>
      </aside>

      <div className={`center-panel ${strength}`}>
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

        {result && <p className={`password-strength-label ${strength}`}>{result}</p>}

        {/* Display entropy and score */}
        {entropy && <p className="entropy-info">Entropy: {entropy}</p>}
        {score && <p className="score-info">Score: {score}</p>}

        {/* Additional warnings and tips */}
        {mutationWarning && <p className="mutationWarning">{mutationWarning}</p>}
        {predictionWarning && <p className="predictionWarning">{predictionWarning}</p>}
        {tips.length > 0 && (
          <div className="suggestions">
            <p>Suggestions to improve your password:</p>
            <ul>
              {tips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </div>
        )}
      </div>

      <aside className="right-panel">
        <div className="info-box">
          <h3 onClick={() => setIsEntropyOpen(!isEntropyOpen)}>
            {isEntropyOpen ? '▼ ' : '▶ '}What is Entropy?
          </h3>
          {isEntropyOpen && (
            <div>
              <p>
              In the context of passwords, entropy refers to the unpredictability or randomness of a password. It's measured in bits, and the higher the entropy, the stronger the password. A higher entropy means your password is more resistant to brute force attacks, which systematically try every possible combination. Entropy increases when you use a longer password and include a variety of characters such as uppercase letters, lowercase letters, numbers, and symbols.
              </p>
              <h4 onClick={() => setIsTipsOpen(!isTipsOpen)}>
                {isTipsOpen ? '▼ ' : '▶ '}Quick Tips to Boost Entropy:
              </h4>
              {isTipsOpen && (
                <ul>
                  <li>Use a longer password (at least 12 characters).</li>
                  <li>Mix up your characters (upper, lower, symbols, numbers).</li>
                  <li>Avoid repeating patterns (e.g., “aaa123”).</li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="info-box">
          <h3 onClick={() => setIsScoreOpen(!isScoreOpen)}>
            {isScoreOpen ? '▼ ' : '▶ '}How is Your Password Score Calculated?
          </h3>
          {isScoreOpen && (
            <div>
              <p>
              The password score is a numeric representation of how well your password stands up to common attacks. It ranges from 0 to 100. A perfect score of 100 indicates that your password is well-balanced in terms of length, character variety, and resistance to dictionary attacks. Shorter passwords with limited character sets (e.g., only numbers or lowercase letters) result in lower scores. The score is penalized for using common patterns or easily guessable information like your name or birthdate.
              </p>
              <h4 onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}>
                {isBreakdownOpen ? '▼ ' : '▶ '}Breakdown of Scores:
              </h4>
              {isBreakdownOpen && (
                <ul>
                  <li><strong>80-100:</strong> Excellent. This password is very strong and resistant to attacks.</li>
                  <li><strong>50-79:</strong> Moderate. Could be stronger, but generally acceptable for low-risk scenarios.</li>
                  <li><strong>Below 50:</strong> Weak. Your password is vulnerable to attacks—consider improving it.</li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="info-box">
          <h3 onClick={() => setIsMasteringOpen(!isMasteringOpen)}>
            {isMasteringOpen ? '▼ ' : '▶ '}Master the Art of Strong Passwords
          </h3>
          {isMasteringOpen && (
            <div>
              <p>Crafting a strong password doesn't have to be hard. Here are some expert strategies:</p>
              <ul>
                <li><strong>Length is your best friend:</strong> Aim for at least 12 characters. The longer the better!</li>
                <li><strong>Blend the ingredients:</strong> Use uppercase and lowercase letters, numbers, and symbols.</li>
                <li><strong>Go random:</strong> Consider using a password manager to generate random passwords.</li>
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;

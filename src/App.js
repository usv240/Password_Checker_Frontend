import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State for inputs
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState(""); // New phone state

  // State for results
  const [result, setResult] = useState(null);
  const [strength, setStrength] = useState("");
  const [entropy, setEntropy] = useState("");
  const [mutationWarning, setMutationWarning] = useState("");
  const [predictionWarning, setPredictionWarning] = useState("");
  const [score, setScore] = useState("");
  const [tips, setTips] = useState([]);

  // State for UI and interactions
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Handle input changes
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Real-time strength feedback
    if (value.length === 0) setStrength(""); // Default state for plain bar
    else if (value.length < 6) setStrength("weak");
    else if (value.length < 12) setStrength("medium");
    else setStrength("strong");
  };

  const handlePhoneChange = (e) => setPhone(e.target.value); // New phone handler
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Debounce password check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        handlePasswordCheck();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [password]);

  // Password check functionality
  const handlePasswordCheck = () => {
    setIsLoading(true);
    const userData = { name, email, birthdate, phone }; // User data
    const payload = { password, userData }; // Correctly structure the payload
    console.log(userData)
    axios
      .post("http://localhost:3002/check-password", payload) // Send structured payload
      .then((response) => {
        setStrength(response.data.strength);
        setResult(response.data.message);
        setEntropy(response.data.entropy);
        setMutationWarning(response.data.mutationWarning);
        setPredictionWarning(response.data.predictionWarning);
        setScore(response.data.score);
        setTips(response.data.tips);
      })
      .catch((error) => {
        console.error("Error fetching password strength:", error);
        setResult("Error processing your password. Try again.");
      })
      .finally(() => setIsLoading(false));
  };

  // Toggle Password Insights
  const toggleInsights = () => setExpandedInsights((prev) => !prev);

  // Handle individual question toggle
  const handleQuestionToggle = (question) => {
    if (expandedQuestion === question) {
      setExpandedQuestion(null); // Collapse if already expanded
    } else {
      setExpandedQuestion(question); // Expand the clicked question
    }
  };

  return (
    <div className="main-container">
      {/* Header */}
      <header className="header">
        <h1>Password Strength Checker</h1>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-item">
          <h3
            onClick={() => setShowResources(!showResources)}
            className="clickable"
          >
            Educational Resources {showResources ? "▼" : "▶"}
          </h3>
          {showResources && (
            <ul>
              <li>
                <a
                  href="https://www.dhs.gov/archive/news/2013/05/08/protecting-your-personal-information-secure-passwords"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Protecting Your Personal Information
                </a>
              </li>
              <li>
                <a
                  href="https://cybersecuritynews.com/nist-rules-password-security/amp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NIST Rules for Password Security
                </a>
              </li>
              <li>
                <a
                  href="https://cisa.gov/secure-our-world/require-strong-passwords"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CISA: Require Strong Passwords
                </a>
              </li>
            </ul>
          )}
        </div>

        <div className="navbar-item">
          <h3 onClick={toggleInsights} className="clickable">
            Password Insights {expandedInsights ? "▼" : "▶"}
          </h3>
          {expandedInsights && (
            <div>
              <div className="info-box">
                <h4
                  onClick={() => handleQuestionToggle("entropy")}
                  className="clickable"
                >
                  {expandedQuestion === "entropy" ? "▼" : "▶"} What is Entropy?
                </h4>
                {expandedQuestion === "entropy" && (
                  <p>
                    Entropy measures the unpredictability of your password.
                    Higher entropy values indicate stronger, more secure
                    passwords.
                  </p>
                )}
              </div>
              <div className="info-box">
                <h4
                  onClick={() => handleQuestionToggle("score")}
                  className="clickable"
                >
                  {expandedQuestion === "score"
                    ? "▼"
                    : "▶"} How is Your Password Score Calculated?
                </h4>
                {expandedQuestion === "score" && (
                  <p>
                    Your password score reflects how resistant it is to attacks
                    based on length, complexity, and character variety. Avoid
                    predictable patterns or repeated characters.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Center Panel */}
      <div className={`center-panel ${strength}`}>
        <div className="card">
          <h2>Secure Your Password</h2>
          <div className="inputArea">
            {/* Password Input */}
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                className="input-field"
              />
              <button
                className="toggle-password-btn"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="password-strength-meter">
              <div
                className={`strength-bar`}
                style={{
                  width:
                    strength === "strong"
                      ? "100%"
                      : strength === "medium"
                      ? "66%"
                      : strength === "weak"
                      ? "33%"
                      : "0%",
                  backgroundColor:
                    strength === "strong"
                      ? "green"
                      : strength === "medium"
                      ? "orange"
                      : strength === "weak"
                      ? "red"
                      : "#ccc",
                }}
              ></div>
            </div>

            {/* Additional Fields */}
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={handleNameChange}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
            />
            <input
              type="date"
              placeholder="Birthdate (optional)"
              value={birthdate}
              onChange={handleBirthdateChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Phone (optional)"
              value={phone}
              onChange={handlePhoneChange}
              className="input-field"
            />
          </div>

          {/* Results */}
          {isLoading && <p className="loading">Checking password...</p>}
          {result && (
            <div className={`result-container ${strength}`}>
              <p>{result}</p>
              <p>Entropy: {entropy} bits</p>
              <p>Score: {score}</p>
              {mutationWarning && <p>{mutationWarning}</p>}
              {predictionWarning && <p>{predictionWarning}</p>}
              {tips.length > 0 && (
                <ul>
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Password Security Checker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

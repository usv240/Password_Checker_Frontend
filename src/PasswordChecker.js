import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [result, setResult] = useState(null);
  const [entropy, setEntropy] = useState("");
  const [mutationWarning, setMutationWarning] = useState("");
  const [predictionWarning, setPredictionWarning] = useState("");
  const [score, setScore] = useState("");
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [expandedInsights, setExpandedInsights] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState("");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleInsights = () => setExpandedInsights((prev) => !prev);
  const handleQuestionToggle = (question) => {
    setExpandedQuestion((prev) => (prev === question ? "" : question));
  };

  // Debounce effect to check password
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        handlePasswordCheck();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [password]);

  const handlePasswordCheck = () => {
    setIsLoading(true);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const payload = { password, userData };

    axios
      .post("http://localhost:3002/check-password", payload)
      .then((response) => {
        setStrength(response.data.strength);
        setResult(response.data.message);
        setEntropy(response.data.entropy || "N/A");
        setScore(response.data.score);
        setTips(response.data.tips);
        setMutationWarning(response.data.mutationWarning || "None");
        setPredictionWarning(response.data.predictionWarning || "None");
      })
      .catch((error) => {
        console.error("Error fetching password strength:", error);
        setResult("Error processing your password. Try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="main-container">
      {/* Header */}
      <header className="header">
        <h1>Password Strength Checker</h1>
      </header>

      {/* Navbar */}
      <div className="navbar">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <h3 className="navbar-item" onClick={() => setExpandedInsights(false)}>
          Password Strength Checker
        </h3>
        <h3 className="navbar-item clickable" onClick={toggleInsights}>
          Password Insights {expandedInsights ? "▼" : "▶"}
        </h3>
      </div>

      {/* Main Password Checker Section */}
      {!expandedInsights && (
        <div className="center-panel">
          <div className="card">
            <h2>Set Your Password</h2>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button
                className="toggle-password-btn"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <div
              className="strength-bar"
              style={{
                width:
                  strength === "strong"
                    ? "100%"
                    : strength === "moderate"
                    ? "66%"
                    : strength === "weak"
                    ? "33%"
                    : "0%",
                backgroundColor:
                  strength === "strong"
                    ? "green"
                    : strength === "moderate"
                    ? "yellow"
                    : strength === "weak"
                    ? "red"
                    : "#ccc",
              }}
            ></div>

            {isLoading && <p className="loading">Checking password...</p>}
            {!isLoading && result && (
              <div className="results-wrapper">
                <div className="result-box">
                  <h3>Result</h3>
                  <h3>{result}</h3>
                </div>
                <div className="results-container">
                  <div className="result-box">
                    <h4>Entropy</h4>
                    <p>{entropy} bits</p>
                  </div>
                  <div className="result-box">
                    <h4>Score</h4>
                    <p>{score}</p>
                  </div>
                  <div className="result-box">
                    <h4>Mutation Warning</h4>
                    {Array.isArray(mutationWarning) ? (
                      <ul>
                        {mutationWarning.map((item, index) => (
                          <li key={index}>
                            <span>
                              {item.mutation} → {item.original}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{mutationWarning}</p>
                    )}
                  </div>
                  <div className="result-box">
                    <h4>Prediction Warning</h4>
                    <p>{predictionWarning}</p>
                  </div>
                </div>
                <div className="tips-container">
                  <h4>Tips</h4>
                  {tips.length > 0 ? (
                    tips.map((tip, index) => (
                      <p key={index}>{tip}</p>
                    ))
                  ) : (
                    <p>No tips available</p>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* Insights Section */}
      {/* Insights Section */}
{expandedInsights && (
  <div className="center-panel">
    <div className="card">
      <h2>Password Insights</h2>
      <div className="info-box">
        <h4
          onClick={() => handleQuestionToggle("entropy")}
          className="clickable"
        >
          {expandedQuestion === "entropy" ? "▼" : "▶"} What is Entropy?
        </h4>
        {expandedQuestion === "entropy" && (
          <p>
            Entropy measures the unpredictability of your password. Higher
            entropy values indicate stronger, more secure passwords.
          </p>
        )}
      </div>
      <div className="info-box">
        <h4
          onClick={() => handleQuestionToggle("score")}
          className="clickable"
        >
          {expandedQuestion === "score" ? "▼" : "▶"} How is Your Password Score
          Calculated?
        </h4>
        {expandedQuestion === "score" && (
          <p>
            Your password score reflects how resistant it is to attacks based
            on length, complexity, and character variety. Avoid predictable
            patterns or repeated characters.
          </p>
        )}
      </div>
      <div className="info-box">
        <h4
          onClick={() => handleQuestionToggle("mutationWarning")}
          className="clickable"
        >
          {expandedQuestion === "mutationWarning" ? "▼" : "▶"} What is Mutation Warning?
        </h4>
        {expandedQuestion === "mutationWarning" && (
          <p>
            Mutation warnings occur when your password uses predictable substitutions, like "@" instead of "a" or "3" instead of "e." Attackers can easily guess these substitutions.
          </p>
        )}
      </div>
      <div className="info-box">
        <h4
          onClick={() => handleQuestionToggle("predictionWarning")}
          className="clickable"
        >
          {expandedQuestion === "predictionWarning" ? "▼" : "▶"} What is Prediction Warning?
        </h4>
        {expandedQuestion === "predictionWarning" && (
          <p>
            Prediction warnings highlight patterns or sequences that are commonly used and easily guessed, like "1234" or "abcd." Avoid such predictable patterns for a stronger password.
          </p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default PasswordChecker;

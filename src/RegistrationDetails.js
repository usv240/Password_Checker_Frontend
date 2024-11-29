import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function RegistrationDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // State to handle the active tab
  const navigate = useNavigate();

  const handleRegister = () => {
    // Store user data in sessionStorage to pass to the password checker
    sessionStorage.setItem("userData", JSON.stringify({ name, email, birthdate, phone }));
    navigate("/set-password");
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <div className="center-panel">
          <div className="card">
            <h2>Enter your details</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="date"
              placeholder="Birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
            <button onClick={handleRegister} className="toggle-password-btn">
              Enter
            </button>
          </div>
        </div>
      );
    } else if (activeTab === "resources") {
      return (
        <div className="center-panel">
          <div className="card">
            <h2>Helpful Resources</h2>
            <ul className="resources-list">
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
          </div>
        </div>
      );
    }
  };

  return (
    <div className="main-container">
      {/* Header */}
      <header className="header">
        <h1>Password Strength Checker</h1>
      </header>

      {/* Navbar */}
      <div className="navbar">
        <h3
          className={`navbar-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          Home
        </h3>
        <h3
          className="navbar-item"
          onClick={() => navigate("/set-password")}
        >
          Password Strength Checker
        </h3>
        <h3
          className={`navbar-item ${activeTab === "resources" ? "active" : ""}`}
          onClick={() => setActiveTab("resources")}
        >
          Show Resources
        </h3>
      </div>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default RegistrationDetails;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationDetails from "./RegistrationDetails";
import PasswordChecker from "./PasswordChecker";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<RegistrationDetails />} />
          <Route path="/set-password" element={<PasswordChecker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

# Password Strength Checker - Frontend

This repository contains the **frontend implementation** of the Password Strength Checker application. It provides an interactive user interface for analyzing password strength and displaying feedback based on entropy, mutations, and prediction patterns.

---

## Features
- Real-time password strength analysis.
- Displays insights including:
  - Entropy
  - Mutation warnings
  - Prediction warnings
- Provides actionable tips to improve password strength.
- Seamlessly integrates with the backend via API calls.

---

## Technologies Used
- React.js
- React Router
- Axios

---

## Installation Instructions

### Prerequisites
- **Node.js** (v14+)
- The backend server should be running ([Password Checker Backend Repository](https://github.com/usv240/Password_Checker_Backend)).

---

### Steps to Run the Frontend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/usv240/Password_Checker_Frontend.git
   cd Password_Checker_Frontend

2. Install dependencies:

        npm install

3. Ensure the backend server is running:

    The backend server must be running at http://localhost:3002 (or update the API URL in the code if needed).

4. Start the development server:

        npm start

5. Access the application:
        Open your browser and go to http://localhost:3000.

How to Use

    Navigate to the Home page to register your details (name, email, birthdate, etc.).
    Enter a password on the Password Checker page to analyze its strength.
    Review the entropy, score, warnings, and tips provided to improve your password.

Screenshots
Password Strength Checker Page
https://drive.google.com/file/d/13rcea6CnAyGL6swSXwTSAArwTy1NrJIq/view?usp=sharing, 
https://drive.google.com/file/d/1BjNrwFhpn4dZlepMj0qNgCPSBY6Oe74C/view?usp=sharing, 
https://drive.google.com/file/d/1aukhhGAzkH_Gfgr8yRLja1wNH9kmMwY2/view?usp=sharing,
https://drive.google.com/file/d/1kvu23ktG0P25EffBEh5V_CgtCZFmA1ai/view?usp=sharing

Insights and Recommendations

Related Repository

The backend for this project can be found here:

    [Password Checker Backend](https://github.com/usv240/Password_Checker_Backend)

For a combined backend and frontend implementation, visit the monorepo:

    [Monorepo](https://github.com/usv240/password-strength-checker/tree/main)

import React, { useState } from "react";
import "./PasswordReset.css";  // Import the CSS file for styling
import Header from "../../components/header/Header.jsx";  // Import the Header component
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation


// Function component for the reset password form
function ResetPasswordForm() {
    const navigate = useNavigate();  // Initialize navigation hook
    const { t } = useTranslation();  // Initialize translation hook
    const [email, setEmail] = useState("");  // State for the email input field
    const [error, setError] = useState("");  // State for error messages

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to handle email input change
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            setError(t("Email is required"));
            return;
        }
        if (!emailRegex.test(email)) {
            setError(t("Please enter a valid email address"));
            return;
        }
        // Here you can add the logic to check if the email exists in your system
        // For demonstration purposes, we will assume the email is valid

        // Generate a mock OTP and store it in localStorage
        const mockOtp = "1234";  // Generate a mock OTP
        localStorage.setItem("mockOtp", mockOtp);
        localStorage.setItem("userEmail", email);

        // Navigate to the OTP verification page
        navigate("/OTPVerify");
    };

    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>
            <h1 className="form-title">{t("Reset your password")}</h1>
            {/* Title of the form, translated using t function */}
            <p className="form-description">
                {t("Please provide the email address that you used when you signed up for your account.")}
            </p>
            {/* Description of the form, translated using t function */}
            <label htmlFor="email" className="input-label">
                {t("Email")}
            </label>
            {/* Label for the email input field */}
            <div className="input-wrapper">
                <input
                    type="email"
                    id="email"
                    placeholder="youremail@example.com"
                    className="input-field"
                    aria-label="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {/* Email input field */}
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8bc642fc8af17f8c6afa0d9222189edfb7bd77d18ba9728c2122351ffa3385c?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="Email Icon" className="input-icon" />
                {/* Icon for the email input field */}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Display error message if there's an error */}
            <p className="form-note">
                {t("We will send you an email that will allow you to reset your password.")}
            </p>
            {/* Note about the reset password email, translated using t function */}
            <button type="submit" className="reset-button">
                {t("Reset password")}
            </button>
            {/* Button to reset the password, navigates to /otp-verify on click */}
        </form>
    );
}

// Main component that includes the header and the reset password form
function MyComponent() {
    return (
        <div className="container">
            <Header />  {/* Header component */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="form-column">
                        <ResetPasswordForm />  {/* Reset password form component */}
                    </div>
                    <div className="image-column">
                        <img src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" alt="Reset Password Illustration" className="illustration" />
                        {/* Illustration image */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyComponent;  // Export the main component as default

import * as React from "react";
import { useState } from "react";
import Header from "../../components/header/Header.jsx";  // Import the Header component
import "./EnterNewPass.css";  // Import the CSS file for styling
import { useTranslation } from "react-i18next";  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import { Modal } from "antd";

import {t} from "i18next";


// PasswordInput component for input fields with show/hide password functionality
function PasswordInput({ id, label, placeholder, value, onChange, error, warning }) {
    const [showPassword, setShowPassword] = React.useState(false);  // State to manage password visibility

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='pwdinput'>
            <label htmlFor={id} className="form-label" style={{paddingTop:"10px"}} >
                {label}
            </label>
            <div className={`password-input ${error ? 'password-input-error' : ''}`}>
                <input
                    type={showPassword ? "text" : "password"}  // Toggle between text and password type
                    id={id}
                    className="form-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}  // Handle input change
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                    <img
                        loading="lazy"
                        src={showPassword ? "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png" : "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png"}  // Toggle icon based on visibility
                        alt="Password visibility toggle"
                    />
                </button>
            </div>
            {warning && <p className='warninglabel' style={{color: 'red'}}>{t("Passwords do not match")}</p>}
        </div>
    );
}

// ChangePasswordForm component for the change password form
function ChangePasswordForm() {
    const { t } = useTranslation();  // Initialize translation hook
    const navigate = useNavigate();  // Initialize navigate hook
    const [newPassword, setNewPassword] = useState("");  // State for new password
    const [confirmPassword, setConfirmPassword] = useState("");  // State for confirm password
    const [error, setError] = useState("");  // State for error messages

    // Function to validate password
    const validatePassword = (password) => {
        if (password.length <= 5) {
            return <p className='warninglabel' style={{color: 'red', margin: '0', padding: '8px 0'}}> {t("Password must be more than 5 characters")} </p>;  // Check if password is longer than 5 characters
        }
        if (password.charAt(0) !== password.charAt(0).toUpperCase()) {
            return <p className='warninglabel' style={{color: 'red', margin: '0'}}> {t("The first character must be uppercase")} </p>;  // Check if the first character is uppercase
        }
        return "";  // Return an empty string if no errors
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission
        const newPasswordError = validatePassword(newPassword);
        if (newPasswordError) {
            setError(newPasswordError);  // Set error if password validation fails
            return;
        }
        if (newPassword !== confirmPassword) {
            setError(t("Passwords do not match"));  // Set error if passwords do not match
            return;
        }
        success();
    };

    const success = () => {
        Modal.success({
            content: t("Password has been successfully changed"),
            afterClose: () => navigate("/signin"), // Navigate to SignIn page
            centered: true,
        });
    };
    
    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            <h1 className="form-title">{t("Change Password")}</h1>
            <PasswordInput
                id="newPassword"
                label={t("New Password *")}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}  // Update new password state
                error={error && newPassword && validatePassword(newPassword)}
            />
            {/* Show error message if new password validation fails */}
            {error && newPassword && validatePassword(newPassword)}
            <PasswordInput
                id="confirmPassword"
                label={t("Confirm New Password *")}
                placeholder={t("Re-enter your password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}  // Update confirm password state
                error={error && confirmPassword && newPassword !== confirmPassword}
                warning={error && confirmPassword && newPassword !== confirmPassword}
            />
            {/* Show error message if passwords do not match */}
            <button type="submit" className="submit-button">
                {t("Change Password")}
            </button>
        </form>
    );
}

// Main component for the "Enter New Password" page
function MyPass() {
    return (
        <div className="enter-new-pass">
            <Header />  {/* Header component */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="newpassbox">
                        <ChangePasswordForm />  {/* ChangePasswordForm component */}
                    </div>
                    <div className="image-column">
                        <img loading="lazy" src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" alt="Decorative illustration" className="illustration" />
                        {/* Illustration image */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPass;  // Export the MyPass component as default

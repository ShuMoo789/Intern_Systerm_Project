import * as React from "react";
import Header from "../../components/header/Header.jsx";  // Import the Header component
import "./EnterNewPass.css";  // Import the CSS file for styling
import { useTranslation } from "react-i18next";  // Import the useTranslation hook for internationalization

// PasswordInput component for input fields with show/hide password functionality
function PasswordInput({ id, label, placeholder }) {
    const [showPassword, setShowPassword] = React.useState(false);  // State to manage password visibility

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <div className="password-input">
                <input
                    type={showPassword ? "text" : "password"}  // Toggle between text and password type
                    id={id}
                    className="form-input"
                    placeholder={placeholder}
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                    <img
                        loading="lazy"
                        src={showPassword ? "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png" : "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png"}  // Toggle icon based on visibility
                        alt="Password visibility toggle"
                    />
                </button>
            </div>
        </>
    );
}

// ChangePasswordForm component for the change password form
function ChangePasswordForm() {
    const { t } = useTranslation();  // Initialize translation hook

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            <h1 className="form-title">{t("Change Password")}</h1>
            <PasswordInput id="newPassword" label={t("New Password *")} placeholder="••••••••" />
            <PasswordInput id="confirmPassword" label={t("Confirm New Password*")} placeholder={t("Re-enter your password")} />
            <button type="submit" className="submit-button">
                {t("Change Password")}
            </button>
        </form>
    );
}

// Main component for the "Enter New Password" page
function MyPass() {
    return (
        <div className="container">
            <Header />  {/* Header component */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="form-column">
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

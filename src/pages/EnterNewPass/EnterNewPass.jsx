import * as React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header.jsx";  // Import the Header component
import "./EnterNewPass.css";  // Import the CSS file for styling
import { useTranslation } from "react-i18next";  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import { Modal, Form, Input, Button } from "antd";
import { t } from "i18next";

const { Item } = Form;

// PasswordInput component for input fields with show/hide password functionality
function PasswordInput({ id, label, placeholder, value, onChange, error, warning }) {
    const [showPassword, setShowPassword] = useState(false);  // State to manage password visibility

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='pwdinput'>
            <label htmlFor={id} className="form-label" style={{ paddingTop: "10px" }}>
                {label}
            </label>
            <div className={`password-input ${error ? 'password-input-error' : ''}`}>
                <Input
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
            {warning && <p className='warninglabel' style={{ color: 'red' }}>{t("Passwords do not match")}</p>}
            {error && <p className='warninglabel' style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

// ChangePasswordForm component for the change password form
function ChangePasswordForm() {
    const { t, i18n } = useTranslation();  // Initialize translation hook
    const navigate = useNavigate();  // Initialize navigate hook
    const [form] = Form.useForm();  // Initialize Ant Design form
    
    // Function to handle form submission
    const handleSubmit = (values) => {
        const { newPassword, confirmPassword } = values;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            form.setFields([
                {
                    name: 'confirmPassword',
                    errors: [t("Passwords do not match")],
                },
            ]);
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
        <Form
            form={form}
            className="change-password-form"
            onFinish={handleSubmit}
            layout="vertical"
        >
            <h1 className="form-title">{t("Change Password")}</h1>
            <Item
                name="newPassword"
                label={t("New Password")}
                rules={[
                    { required: true, message: t("You have not entered any password") },
                    { min: 6, message: t("Password must be more than 5 characters") },
                    { pattern: /^[A-Z]/, message: t("The first character must be uppercase") },
                ]}
            >
                <PasswordInput
                    id="newPassword"
                    placeholder={t("Enter new password")}
                />
            </Item>
            <Item
                name="confirmPassword"
                label={t("Confirm New Password")}
                rules={[
                    { required: true, message: t("You have not entered any password") },
                ]}
            >
                <PasswordInput
                    id="confirmPassword"
                    placeholder={t("Re-enter your password")}
                />
            </Item>
            <Button type="primary" htmlType="submit" className="submit-button">
                {t("Change Password")}
            </Button>
        </Form>
    );
}

// Main component for the "Enter New Password" page
function MyPass() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 990);
        };
    
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const hiddenImageStyle =  {
        display: "none"
    }

    const responsiveImageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    return (
        <div className="enter-new-pass">
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="newpassbox">
                        <ChangePasswordForm />  {/* ChangePasswordForm component */}
                    </div>
                    <div className="image-column">
                        <img
                            style={isMobile ? hiddenImageStyle : responsiveImageStyle} 
                            loading="lazy" 
                            src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" 
                            alt="Decorative illustration" 
                            className="illustration" 
                        />
                        {/* Illustration image */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPass;  // Export the MyPass component as default

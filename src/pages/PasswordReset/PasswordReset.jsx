import * as React from "react";
import { useState } from "react";
import "./PasswordReset.css";  // Import the CSS file for styling
import Header from "../../components/header/Header.jsx";  // Import the Header component
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";

function ResetPasswordForm() {
    const navigate = useNavigate();  // Initialize navigation hook
    const { t } = useTranslation();  // Initialize translation hook
    const [otp, setOtp] = useState("");  // State to store the generated OTP
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility

    // Regular expression to validate email format
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required')
    })

    // Function to generate a random OTP code
    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Generate a 4-digit random OTP
    };

    // Function to handle form submission
    const handleSubmit = (values, {setSubmitting}) => {
        const email = values.email;

        // Generate a random OTP and store it in localStorage
        const generatedOtp = generateOtp();  // Generate a random OTP
        setOtp(generatedOtp);  // Store the OTP in state
        localStorage.setItem("mockOtp", generatedOtp);
        localStorage.setItem("userEmail", email);

        // Show the modal with the OTP
        setShowModal(true);
        setSubmitting(false);
    };

    // Function to handle closing the modal and navigating to the OTP verification page
    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/OTPVerify");  // Navigate to the OTP verification page
    };

    return (
        <div>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="reset-password-form">
                        <h1 className="form-title">Reset your password</h1>
                        <p className="form-description">
                            Please provide the email address that you used when you signed up for your account.
                        </p>
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <div className={`input-wrapper ${errors.email && touched.email ? 'input-wrapper-error' : ''}`}>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="youremail@example.com"
                                className= "input-field"
                                aria-label="Enter your email"
                            />
                        </div>
                        <ErrorMessage name="email" component="p" className="form-error" style={{ color: 'red' }} />
                        <p className="form-note">
                            We will send you an email that will allow you to reset your password.
                        </p>
                        <button type="submit" className="reset-button" disabled={isSubmitting}>
                            Reset password
                        </button>
                    </Form>
                )}
            </Formik>
            {/* Modal for displaying the OTP */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{t("Your OTP Code")}</h2>
                        <p>{otp}</p>
                        <button onClick={handleCloseModal}>{t("OK")}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function MyComponent() {
    return (
        <>
            <div className="password-reset">
                <Header/>  {/* Header component */}
                <main className="main-content">
                    <div className="content-wrapper">
                        <div className="form-column">
                            <ResetPasswordForm/>  {/* ResetPasswordForm component */}
                        </div>
                        <div className="image-column">
                            <img src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" alt="Reset Password Illustration" className="illustration" />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default MyComponent;  // Export the main component as default

import * as React from "react";
import { useState } from "react";
import "./PasswordReset.css";  // Import the CSS file for styling
import Header from "../../components/header/Header.jsx";  // Import the Header component
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import { Form, Input, Button, Modal } from "antd";
import { MailOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useFormik } from "formik";

function ResetPasswordForm() {
    const navigate = useNavigate();  // Initialize navigation hook
    const { t } = useTranslation();  // Initialize translation hook
    const [otp, setOtp] = useState("");  // State to store the generated OTP
    const [isModalVisible, setIsModalVisible] = useState(false);  // State to control modal visibility

    // Regular expression to validate email format
    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('Invalid email address')).required(t('Email is required'))
    });

    // Function to generate a random OTP code
    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Generate a 4-digit random OTP
    };

    // Function to handle form submission
    const handleSubmit = (values, { setSubmitting }) => {
        const email = values.email;

        // Generate a random OTP and store it in localStorage
        const generatedOtp = generateOtp();  // Generate a random OTP
        setOtp(generatedOtp);  // Store the OTP in state
        localStorage.setItem("mockOtp", generatedOtp);
        localStorage.setItem("userEmail", email);

        // Show the modal with the OTP
        setIsModalVisible(true);
        setSubmitting(false);
    };

    // Function to handle closing the modal and navigating to the OTP verification page
    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigate("/OTPVerify");  // Navigate to the OTP verification page
    };

    // Initialize Formik
    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div>
            <Form
                className="reset-password-form"
                onFinish={formik.handleSubmit}
            >
                <h1 className="form-title">{t("Reset your password")}</h1>
                <p className="form-description">
                    {t("Please provide the email address that you used when you signed up for your account.")}
                </p>
                <Form.Item
                    label={t("Email")}
                    validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
                    help={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                >
                    <Input
                        id="email"
                        name="email"
                        placeholder="youremail@example.com"
                        className="input-field"
                        aria-label="Enter your email"
                        prefix={<MailOutlined />}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                <p className="form-note">
                    {t("We will send you an email that will allow you to reset your password.")}
                </p>
                <Button type="primary" htmlType="submit" className="reset-button" disabled={formik.isSubmitting}>
                    {t("Reset password")}
                </Button>
            </Form>
            {/* Modal for displaying the OTP */}
            <Modal
                title={t("Your OTP Code")}
                visible={isModalVisible}
                onOk={handleCloseModal}
                onCancel={() => setIsModalVisible(false)}
                centered
            >
                <p>{otp}</p>
            </Modal>
        </div>
    );
}

function MyComponent() {
    return (
        <div className="password-reset">
            <Header />  {/* Header component */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="form-column">
                        <ResetPasswordForm />  {/* ResetPasswordForm component */}
                    </div>
                    <div className="image-column">
                        <img src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" alt="Reset Password Illustration" className="illustration" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyComponent;  // Export the main component as default

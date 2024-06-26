import React, { useState, useEffect, useRef } from 'react';
import "./OTPVerify.css";  // Import the CSS file for styling
import Header from "../../components/header/Header.jsx";  // Import the Header component
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook for internationalization
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for navigation
import { useLanguage } from '../../translation/LanguageContext.jsx';
// OTP verification component
const OTPVerify = () => {
    const { t,i18n } = useTranslation();  // Initialize translation hook
    const navigate = useNavigate();  // Initialize navigate hook
    const [otpCode, setOtpCode] = useState(["", "", "", ""]);  // State for the OTP code input fields
    const [timeRemaining, setTimeRemaining] = useState(60);  // State for the countdown timer
    const [error, setError] = useState('');  // State for error messages
    const timerRef = useRef(null);  // Reference to store the interval timer
    const [translatedError, setTranslatedError] = useState(''); // Lỗi đã dịch
    // useEffect to handle the countdown timer
    useEffect(() => {
        // Set an interval to decrease the timeRemaining every second
        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        // Clear the interval timer on component unmount
        return () => clearInterval(timerRef.current);
    }, []);

    // Function to handle changes in the OTP input fields
    const handleOtpChange = (event) => {
        const { maxLength, value, name } = event.target;
        const fieldIndex = parseInt(name.split("-")[1], 10);

        // Ensure only numeric input
        if (/^[0-9]*$/.test(value)) {
            setOtpCode(prevOtpCode => {
                const updatedOtpCode = [...prevOtpCode];
                updatedOtpCode[fieldIndex] = value;
                return updatedOtpCode;
            });

            // Move focus to the next input field if maxLength is reached
            if (value.length >= maxLength) {
                if (fieldIndex < 3) {
                    const nextField = document.querySelector(`input[name=field-${fieldIndex + 1}]`);
                    if (nextField !== null) {
                        nextField.focus();
                    }
                }
            }
        }
    };
    
    // Function to handle key down events in the OTP input fields
    const handleKeyDown = (event) => {
        const forbiddenKeys = ["e", "+", "-", "."];  // Disallowed keys
        if (forbiddenKeys.includes(event.key)) {
            event.preventDefault();
        }
        if (
            event.target.value.length >= 1 &&
            !["Delete", "Backspace", "ArrowLeft", "ArrowRight"].includes(event.key)
        ) {
            event.target.select();
        }
    };

    // Function to handle resending the OTP
    const handleResendOTP = () => {
        setTimeRemaining(60);  // Reset the countdown timer
        // Optionally, you can also update the mock OTP in localStorage if required.
    };
    // Cập nhật lỗi đã dịch mỗi khi error hoặc ngôn ngữ thay đổi
    useEffect(() => {
        if (error) {
          setTranslatedError(t(error));
        } else {
          setTranslatedError('');
        }
      }, [error, t]);
    // Function to handle OTP verification
    const handleVerify = () => {
        const enteredOtp = otpCode.join('');  // Combine the OTP fields to a single string
        const storedOtp = localStorage.getItem('mockOtp');  // Get the mock OTP from localStorage

        if (enteredOtp.length !== 4) {
            setError(t("Please enter the complete 4-digit OTP"));
        } else if (enteredOtp === storedOtp) {
            setError('');
            navigate("/EnterNewPass");  // Navigate to the EnterNewPass page
        } else {
            setError("Incorrect OTP");
        }
    };

    // Function to format the countdown timer
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

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
        <div className="otp-verification-page">
            <main className="main-content">
                <div className="content-wrapper">
                    <section className="verification-section">
                        <h1 className="verification-title">{t("OTP Verification")}</h1>
                        {/* Title of the OTP verification section, translated using t function */}
                        <p className="verification-description">
                            {t("Enter the 4 digit verification code received on your Email ID.")}
                        </p>
                        {/* Description of the OTP verification process, translated using t function */}
                        <div className="verification-actions">
                            <section className="resend-section">
                                <p>{t("Verification Code")} : {timeRemaining > 0 && `(${formatTime(timeRemaining)})`}</p>
                                {/* Display the verification code label and countdown timer */}
                                <div className="resend-otp" onClick={handleResendOTP}>
                                    {t("Resend OTP")}
                                </div>
                                {/* Resend OTP button */}
                            </section>
                            <div className="otp-group">
                                {otpCode.map((code, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        name={`field-${index}`}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="1"
                                        value={code}
                                        onFocus={e => e.target.select()}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleOtpChange}
                                        style={{height:"50px", width:"50px"}}
                                    />
                                    /* OTP input fields */
                                ))}
                            </div>
                        </div>
                        {translatedError && <p style={{ color: 'red' }}>{translatedError}</p>}
                        <button className="verify-button" onClick={handleVerify}>
                            {t("Verify")}
                        </button>
                        {/* Verify button */}
                    </section>
                    <section className="image-section">
                        <img
                            style={isMobile ? hiddenImageStyle : responsiveImageStyle}
                            loading="lazy"
                            src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png"
                            className="verification-image"
                            alt="Verification process illustration"
                        />
                        {/* Illustration image */}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OTPVerify;  // Export the OTPVerify component as default

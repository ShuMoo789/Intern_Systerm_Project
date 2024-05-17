import React, { useState, useEffect, useRef } from 'react';
import "./OTPVerify.css";
import Header from "../../components/header/Header.jsx";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const OTPVerify = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // Initialize navigate hook
    const [otpCode, setOtpCode] = useState(["", "", "", ""]);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const handleOtpChange = (event) => {
        const { maxLength, value, name } = event.target;
        const fieldIndex = parseInt(name.split("-")[1], 10);

        if (/^[0-9]*$/.test(value)) {
            setOtpCode(prevOtpCode => {
                const updatedOtpCode = [...prevOtpCode];
                updatedOtpCode[fieldIndex] = value;
                return updatedOtpCode;
            });

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

    const handleKeyDown = (event) => {
        const forbiddenKeys = ["e", "+", "-", "."];
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

    const handleResendOTP = () => {
        setTimeRemaining(60);
    };

    const handleVerify = () => {
        navigate("/EnterNewPass");
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="otp-verification-page">
            <Header />
            <main className="main-content">
                <div className="content-wrapper">
                    <section className="verification-section">
                        <h1 className="verification-title">{t("OTP Verification")}</h1>
                        <p className="verification-description">
                            {t("Enter the 4 digit verification code received on your Email ID.")}
                        </p>
                        <div className="verification-actions">
                            <section className="resend-section">
                                <p>{t("Verification Code")} : {timeRemaining > 0 && `(${formatTime(timeRemaining)})`}</p>
                                <div className="resend-otp" onClick={handleResendOTP}>
                                    {t("Resend OTP")}
                                </div>
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
                                    />
                                ))}
                            </div>
                        </div>
                        <button className="verify-button" onClick={handleVerify}>
                            {t("Verify")}
                        </button>
                    </section>
                    <section className="image-section">
                        <img
                            loading="lazy"
                            src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png"
                            className="verification-image"
                            alt="Verification process illustration"
                        />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OTPVerify;

import * as React from "react";
import Header from "../../components/header/Header.jsx";
import "./EnterNewPass.css"
import { useTranslation } from "react-i18next";
function PasswordInput({ id, label, placeholder }) {
    const [showPassword, setShowPassword] = React.useState(false);
    
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
                    type={showPassword ? "text" : "password"}
                    id={id}
                    className="form-input"
                    placeholder={placeholder}
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                    <img
                        loading="lazy"
                        src={showPassword ? "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png" : "https://i.postimg.cc/Bn4wxcLx/Hide-Icon.png"}
                        alt="Password visibility toggle"
                    />
                </button>
            </div>
        </>
    );
}

function ChangePasswordForm() {
    const {t} = useTranslation();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form className="change-password-form" onSubmit={handleSubmit}>
            <h1 className="form-title">{t("Change Password")}</h1>
            <PasswordInput id="newPassword" label={t("New Password *")} placeholder="••••••••" />
            <PasswordInput id="confirmPassword" label={t("Confirm New Password*")} placeholder= {t("Re-enter your password")} />
            <button type="submit" className="submit-button">
                {t("Change Password")}
            </button>
        </form>
    );
}

function MyPass() {
    return (
        <div className="container">
            <Header />
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="form-column">
                        <ChangePasswordForm />
                    </div>
                    <div className="image-column">
                        <img loading="lazy" src="https://i.postimg.cc/D0c1FsvT/image-7-x4.png" alt="Decorative illustration" className="illustration" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPass;
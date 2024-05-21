import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import i18n from "./translation/i18n.js";
import { I18nextProvider } from "react-i18next";

// Creating the root element for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application
root.render(
    <BrowserRouter> {/* Enables routing in the application */}
        <React.StrictMode> {/* Activates additional checks and warnings in development mode */}
            <I18nextProvider i18n={i18n}> {/* Provides the i18n instance to the application */}
                <App /> {/* Main App component */}
            </I18nextProvider>
        </React.StrictMode>
    </BrowserRouter>
);
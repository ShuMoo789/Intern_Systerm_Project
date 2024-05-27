import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Importing necessary components and pages for the application routing
import AccountManagement from "./pages/AccountManagement/AccountManagement.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import OTPVerify from "./pages/OTPVerify/OTPVerify";
import EnterNewPass from "./pages/EnterNewPass/EnterNewPass";
import SignUp from "./components/SignUpForm_Intern/SignUpForm.jsx";
import FirstPage from "./pages/FirstPage/FirstPage";
import ApproveCV from "./pages/ApproveCV/ApproveCV.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import GroupList from "./pages/GroupList/GroupList.jsx";
import InternList from "./pages/InternList/InternList.jsx";

// Define the main App component
function App() {
  // useState hook to manage a count state, although it isn't used in the current implementation
  const [count, setCount] = useState(0);

  // Return the JSX that defines the routing structure of the application
  return (
    <>
      {/* Routes component is used to define all the routes in the application */}
      <Routes>
        {/* Each Route component defines a path and the corresponding component to render */}
        <Route path="/" element={<FirstPage />} />
        {/* Route to the home page, rendering the First_Page component */}

        <Route path="/SignIn" element={<SignInPage />} />
        {/* Route to the SignInPage, rendering the SignIn_Page component */}

        <Route path="/SignUp" element={<SignUpPage />} />
        {/* Route to the SignUpPage, rendering the SignUp_Page component */}

        <Route path="/Profile" element={<AccountManagement />} />
        {/* Route to the account management page, rendering the AccountManagement component 
            Note: There seems to be a typo in the path "/Profie". It should likely be "/Profile". */}

        <Route path="/pwdreset" element={<PasswordReset />} />
        {/* Route to the password reset page, rendering the PasswordReset component */}

        <Route path="/OTPVerify" element={<OTPVerify />} />
        {/* Route to the OTP verification page, rendering the OTPVerify component */}

        <Route path="/EnterNewPass" element={<EnterNewPass />} />
        {/* Route to the page for entering a new password, rendering the EnterNewPass component */}

        <Route path="/register" element={<SignUp />} />
        {/* Route to the sign-up page, rendering the SignUp component */}

        <Route path="/ApproveCV" element={<ApproveCV />} />
        {/* Route to the CV approval page, rendering the ApproveCV component */}

        <Route path="/Dashboard" element={<Dashboard />} />
        {/* Route to the CV approval page, rendering the Dashboard component */}

        <Route path="/GroupList" element={<GroupList />} />
        {/* Route to the CV approval page, rendering the GroupList component */}

        <Route path="/InternList" element={<InternList />} />
        {/* Route to the CV approval page, rendering the GroupList component */}
      </Routes>
    </>
  );
}

// Export the App component as the default export
export default App;

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Importing necessary components and pages for the application routing
import AccountManagement from "./pages/AccountManagement/AccountManagement.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";
import OTPVerify from "./pages/OTPVerify/OTPVerify";
import EnterNewPass from "./pages/EnterNewPass/EnterNewPass";
import SignUp from "./components/SignUpForm_Intern/SignUpForm.jsx";
import FirstPage from "./pages/FirstPage/FirstPage";
import ApproveCV from "./pages/ApproveCV/ApproveCV.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import GroupList from "./pages/GroupList/GroupList.jsx";
import InternList from "./pages/InternList/InternList.jsx";
import PositionManagement from "./pages/PositionManagement/PositionManagement.jsx";
import ProjectMan from "./pages/Project Management/ProjectMan.jsx";
import TechnologyManagement from "./pages/TechnologyManagement/TechnologyManagement.jsx";
import ConfirmCV from "./pages/ConfirmCV/ConfirmCV.jsx";
import GroupZaloManagementDetails from "./pages/GroupZaloManagementDetails/GroupZaloManagementDetails.jsx";
import GroupZaloManagement from "./pages/GroupZaloManagement/GroupZaloManagement/GroupZaloManagement.jsx";
import MainLayout from "./MainLayout/MainLayout.jsx";
import AuthLayout from "./AuthLayout/AuthLayout.jsx";

function App() {
  const location = useLocation();

  // useEffect hook to change the URL to '/' after every route change
  useEffect(() => {
    // Replace the current URL with '/'
    if (location.pathname !== "/") {
      window.history.replaceState(null, null, "/");
    }
  }, [location]);
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route element={<AuthLayout />}>
          <Route path="SignIn" element={<SignInPage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="PasswordReset" element={<PasswordReset />} />
          <Route path="EnterNewPass" element={<EnterNewPass />} />
          <Route path="OTPVerify" element={<OTPVerify />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="profile" element={<AccountManagement />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approveCV" element={<ApproveCV />} />
          <Route path="confirmCV" element={<ConfirmCV />} />
          <Route path="internList" element={<InternList />} />
          <Route path="groupList" element={<GroupList />} />
          <Route path="projectManagement" element={<ProjectMan />} />
          <Route path="positionManagement" element={<PositionManagement />} />
          <Route
            path="/TechnologyManagement"
            element={<TechnologyManagement />}
          />
          <Route
            path="/GroupZaloManagement"
            element={<GroupZaloManagement />}
          />
          <Route
            path="/GroupZaloManagementDetails"
            element={<GroupZaloManagementDetails />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

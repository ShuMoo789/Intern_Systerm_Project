import { Route, Routes } from "react-router-dom";
import AccountManagement from "./pages/AccountManagement/AccountManagement";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import OTPVerify from "./pages/OTPVerify/OTPVerify";
import EnterNewPass from "./pages/EnterNewPass/EnterNewPass";
import SignUp from "./components/SignUpForm/SignUpForm";
import First_Page from "./pages/FirstPage/FirstPage";
import GroupList from "./pages/GroupList/GroupList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<First_Page />} />
        <Route path="/Profie" element={<AccountManagement />} />
        <Route path="/pwdreset" element={<PasswordReset />} />
        <Route path="/OTPVerify" element={<OTPVerify />} />
        <Route path="/EnterNewPass" element={<EnterNewPass />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/GroupList" element={<GroupList />} />
      </Routes>
    </>
  );
}

export default App;

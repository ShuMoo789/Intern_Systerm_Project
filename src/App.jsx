import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import First_Page from "./pages/first_page/First_Page";
import Menu from "./components/Menu/MenuNavigate";
import AccountManagement from "./pages/account_management/AccountManagement";
import "./App.css";
import "./pages/ApproveCV/ApproveCV.jsx";
import ApproveCV from "./pages/ApproveCV/ApproveCV.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<AccountManagement />} />
          <Route path="/ApproveCV" element={<ApproveCV />} />
      </Routes>
    </>
  );
}

export default App;

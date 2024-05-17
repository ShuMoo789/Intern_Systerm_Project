import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import First_Page from "./pages/first_page/First_Page";
import Menu from "./components/Menu/MenuNavigate";
import AccountManagement from "./pages/account_management/AccountManagement";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<AccountManagement />} />
      </Routes>
    </>
  );
}

export default App;

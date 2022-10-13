import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/Account";
import Login from "./components/accountPage/Login";
// import Logout from "./components/accountPage/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/accountPage/RegistrationForm";
import React from "react";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="account" element={<Account />} />
                    <Route path="register" element={<RegistrationForm />} />
                    <Route path="login" element={<Login />} />
                    {/*<Route path="logout" element={<Logout/> } />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

import React from "react";
import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/Account";
import Login from "./components/accountPage/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/accountPage/RegistrationForm";
import DoctorsList from "./pages/DoctorsList";
import Admin from "./pages/Admin";
import AdminDoctors from "./components/accountPage/AdminDoctors";
import AdminSchedule from "./components/accountPage/AdminSchedule";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="account" element={<Account />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="register" element={<RegistrationForm />} />
                    <Route path="login" element={<Login />} />
                    <Route path="doctors" element={<DoctorsList />} />
                    <Route path="admin/doctors" element={<AdminDoctors />} />
                    <Route path="admin/schedule" element={<AdminSchedule />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

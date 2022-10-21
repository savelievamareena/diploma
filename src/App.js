import React from "react";
import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/userProfile/Account";
import Login from "./components/accountPage/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/accountPage/RegistrationForm";
import DoctorsList from "./pages/DoctorsList";
import Admin from "./pages/adminProfile/Admin";
import AdminDoctors from "./pages/adminProfile/AdminDoctors";
import AdminSchedule from "./pages/adminProfile/AdminSchedule";
import AdminInfo from "./pages/adminProfile/AdminInfo";

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
                    <Route path="admin/schedule" element={<AdminSchedule />} />
                    <Route path="admin/profile" element={<AdminInfo />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

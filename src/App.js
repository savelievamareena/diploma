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
import AdminCallback from "./pages/adminProfile/AdminCallback";
import AdminReviews from "./pages/adminProfile/AdminReviews";
import UserVisits from "./pages/userProfile/UserVisits";
import History from "./pages/aboutUs/History";
import Contacts from "./pages/aboutUs/Contacts";
import Faq from "./pages/aboutUs/Faq";
import Department from "./pages/Department"
import ReviewsList from "./pages/ReviewsList";
import UserAppointment from "./pages/userProfile/UserAppointment";
import DoctorPage from "./pages/DoctorPage";
import AdminRegistration from "./components/accountPage/AdminRegistration";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/special-register-admin-for-zdorovye-clinic" element={<AdminRegistration />} />

                    <Route path="/admin/doctors" element={<AdminDoctors />} />
                    <Route path="/admin/schedule" element={<AdminSchedule />} />
                    <Route path="/admin/callback" element={<AdminCallback />} />
                    <Route path="/admin/profile" element={<AdminInfo />} />
                    <Route path="/admin/reviews" element={<AdminReviews />} />

                    <Route path="/account/visits" element={<UserVisits />} />
                    <Route path="/account/appointment" element={<UserAppointment />} />

                    <Route path="/history" element={<History />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/doctors" element={<DoctorsList />} />
                    <Route path="/doctor/:id" element={<DoctorPage />} />
                    <Route path="/reviews" element={<ReviewsList />} />

                    <Route path="/department/:id" element={<Department/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/Account";
import Login from "./components/accountPage/Login";
import Logout from "./components/accountPage/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import RegistrationForm from "./components/accountPage/RegistrationForm";
import React from "react";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    React.useEffect(() => {
        console.log("require auth work");
        // if (Cookies.get('loggedInUser').length > 0) {
        //     setIsAuthenticated(true);
        // }else {
        //     setIsAuthenticated(false);
        // }
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage isAuthenticated={isAuthenticated} />} />
                    <Route path="account" element={<Account isAuthenticated={isAuthenticated} />} />
                    <Route path="register" element={<RegistrationForm isAuthenticated={isAuthenticated} />} />
                    <Route path="login" element={<Login isAuthenticated={isAuthenticated} />} />
                    <Route path="logout" element={<Logout/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/Account";
import Login from "./components/accountPage/Login";
import Logout from "./components/accountPage/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    const isAuthenticated = true;

    function requireAuth(nextState, replace, next) {
        if (!isAuthenticated) {
            replace({
                pathname: "/login",
                state: {nextPathname: nextState.location.pathname}
            });
        }
        next();
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage isAuthenticated={isAuthenticated} />} />
                    <Route path="account" element={<Account isAuthenticated={isAuthenticated} />} onEnter={requireAuth}/>
                    <Route path="register" element={<Account />} />
                    <Route path="login" component={<Login/>}/>
                    <Route path="logout" component={<Logout/> } onEnter={requireAuth} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

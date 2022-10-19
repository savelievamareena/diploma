import React from "react"
import Header from "../components/Header"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../components/accountPage/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import Admin from "./Admin";


export default function Account(props) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    React.useEffect(() => {
        if (!cookies.authKey && cookies.role !== "user") {
            navigate("/");
        }
    }, [cookies])

    return(
        <div className="account--wrapper">
            {/*<Header />*/}
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="account" element={<Account />} />
                    <Route path="admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
import React from "react"
import Header from "../components/Header"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../components/accountPage/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import AdminDoctors from "../components/accountPage/AdminDoctors";
import AdminSchedule from "../components/accountPage/AdminSchedule";

export default function Admin(props) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [doctors, setDoctors] = React.useState([])

    React.useEffect(() => {
        if (!cookies.authKey && cookies.role !== "admin") {
            navigate("/");
        }
    }, [cookies, navigate])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [])

    return(
        <div className="admin--wrapper">
            {/*<Header />*/}
            <Sidebar />
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/admin" element={<Admin />} />*/}
            {/*        <Route path="/admin/doctors" element={<AdminDoctors />} />*/}
            {/*        <Route path="/admin/schedule" element={<AdminSchedule />} />*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
        </div>
    )
}
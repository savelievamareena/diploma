import React from "react"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import AdminDoctorsContent from "../../components/accountPage/admin/AdminDoctorsContent";

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
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar />
                {/*<AdminDoctorsContent/>*/}
            </div>
        </div>
    )
}
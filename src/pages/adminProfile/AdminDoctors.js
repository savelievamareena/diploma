import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import AdminDoctorsContent from "../../components/accountPage/admin/AdminDoctorsContent";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";

export default function AdminDoctors() {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (cookies.role === "user") {
            navigate("/");
        }
    }, [cookies, navigate])

    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataAdmin} />
                <AdminDoctorsContent/>
            </div>
        </div>
    )
}
import React from "react"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataUser} from "../../dataSources/SidebarDataUser";
import PersonalInfoManageContent from "../../components/accountPage/PersonalInfoManageContent";


export default function Account(props) {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (!cookies.authKey && cookies.role !== "user") {
            navigate("/");
        }
    }, [cookies])

    return(
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataUser} />
                <PersonalInfoManageContent/>
            </div>
        </div>
    )
}
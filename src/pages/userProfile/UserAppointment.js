import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataUser} from "../../dataSources/SidebarDataUser";
import PersonalInfoManageContent from "../../components/accountPage/PersonalInfoManageContent";

export default function UserAppointment() {
    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataUser} />
                <PersonalInfoManageContent/>
            </div>
        </div>
    )
}
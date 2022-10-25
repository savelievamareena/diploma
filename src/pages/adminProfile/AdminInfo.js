import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import PersonalInfoManageContent from "../../components/accountPage/PersonalInfoManageContent";

export default function AdminInfo() {
    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataAdmin} />
                <PersonalInfoManageContent/>
            </div>
        </div>
    )
}
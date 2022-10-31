import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import AdminDoctorsContent from "../../components/accountPage/admin/AdminDoctorsContent";

export default function AdminDoctors() {
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
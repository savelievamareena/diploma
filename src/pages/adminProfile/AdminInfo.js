import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import AdminInfoContent from "../../components/accountPage/admin/AdminInfoContent";

export default function AdminIndo() {
    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar />
                <AdminInfoContent/>
            </div>
        </div>
    )
}
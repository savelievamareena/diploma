import React from "react";
import '../../styles/Account.css';
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";

export default function Sidebar() {
    const sidebarItem = SidebarDataAdmin.map((val, key) => {
        return (
            <li
                key={key}
                onClick={() => {window.location.pathname = val.link}}
                className="sidebar--item"
                id={window.location.pathname === val.link ? "active" : ""}
            >
                <div className="sidebar--icon">{val.icon}</div>
                <div className="sidebar--title">{val.title}</div>
            </li>
        )
    })

    return(
        <div className="sidebar">
            <ul className="sidebar--list">
                {sidebarItem}
            </ul>
        </div>
    )
}
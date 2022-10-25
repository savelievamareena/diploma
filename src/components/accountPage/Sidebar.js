import React from "react";
import '../../styles/Account.css';

export default function Sidebar(props) {
    const sidebarData = props.sidebarData;
    const sidebarItems = sidebarData.map((val, key) => {
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
                {sidebarItems}
            </ul>
        </div>
    )
}
import React from "react";
import {AiFillFund, AiFillIdcard, AiFillCarryOut, AiFillSetting} from "react-icons/ai";

export const SidebarDataAdmin = [
    {
        title: "Dashboard",
        icon: <AiFillFund/>,
        link: "/admin"
    },
    {
        title: "Doctors",
        icon: <AiFillIdcard/>,
        link: "/admin/doctors"
    },
    {
        title: "Schedule",
        icon: <AiFillCarryOut/>,
        link: "/admin/schedule"
    },
    {
        title: "My Profile",
        icon: <AiFillSetting/>,
        link: "/admin/profile"
    }
]
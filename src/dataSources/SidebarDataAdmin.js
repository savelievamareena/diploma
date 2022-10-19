import React from "react";
import {AiFillFund, AiFillIdcard, AiFillCarryOut} from "react-icons/ai";

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
]
import React from "react";
import {AiOutlineFileText, AiOutlineClockCircle} from "react-icons/ai";
import {HiOutlineCog} from "react-icons/hi";

export const SidebarDataUser = [
    {
        title: "My Profile",
        icon: <HiOutlineCog/>,
        link: "/account"
    },
    {
        title: "Visits",
        icon: <AiOutlineFileText/>,
        link: "/account/visits"
    },
    {
        title: "Make an appointment",
        icon: <AiOutlineClockCircle/>,
        link: "/account/appointment"
    }
]
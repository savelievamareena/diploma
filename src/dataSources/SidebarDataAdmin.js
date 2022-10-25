import React from "react";
import {AiOutlineFileText, AiOutlineCrown, AiOutlineBook, AiOutlineCopy, AiOutlineCustomerService} from "react-icons/ai";
import {HiOutlineCog} from "react-icons/hi";

export const SidebarDataAdmin = [
    {
        title: "Dashboard",
        icon: <AiOutlineFileText/>,
        link: "/admin"
    },
    {
        title: "Doctors",
        icon: <AiOutlineCrown/>,
        link: "/admin/doctors"
    },
    {
        title: "Schedule",
        icon: <AiOutlineBook/>,
        link: "/admin/schedule"
    },
    {
        title: "Callback Requests",
        icon: <AiOutlineCustomerService/>,
        link: "/admin/callback"
    },
    {
        title: "Reviews",
        icon: <AiOutlineCopy/>,
        link: "/admin/reviews"
    },
    {
        title: "My Profile",
        icon: <HiOutlineCog/>,
        link: "/admin/profile"
    }
]
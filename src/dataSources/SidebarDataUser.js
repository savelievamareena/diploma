import React from "react";
import {AiOutlineFileText, AiOutlineClockCircle} from "react-icons/ai";
import {HiOutlineCog} from "react-icons/hi";

export const SidebarDataUser = [
    {
        title: "Мои данные",
        icon: <HiOutlineCog/>,
        link: "/account"
    },
    {
        title: "Визиты",
        icon: <AiOutlineFileText/>,
        link: "/account/visits"
    },
    {
        title: "Записаться на прием",
        icon: <AiOutlineClockCircle/>,
        link: "/account/appointment"
    }
]
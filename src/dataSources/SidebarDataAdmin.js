import React from "react";
import {AiOutlineFileText, AiOutlineCrown, AiOutlineBook, AiOutlineCopy, AiOutlineCustomerService} from "react-icons/ai";
import {HiOutlineCog} from "react-icons/hi";

export const SidebarDataAdmin = [
    {
        title: "Записи на прием",
        icon: <AiOutlineFileText/>,
        link: "/admin"
    },
    {
        title: "Специалисты",
        icon: <AiOutlineCrown/>,
        link: "/admin/doctors"
    },
    {
        title: "Расписание",
        icon: <AiOutlineBook/>,
        link: "/admin/schedule"
    },
    {
        title: "Запросы обратного звонка",
        icon: <AiOutlineCustomerService/>,
        link: "/admin/callback"
    },
    {
        title: "Отзывы",
        icon: <AiOutlineCopy/>,
        link: "/admin/reviews"
    },
    {
        title: "Мои данные",
        icon: <HiOutlineCog/>,
        link: "/admin/profile"
    }
]
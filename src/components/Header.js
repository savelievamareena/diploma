import React from "react"
import '../styles/Header.css';
import logo from "../images/logo.png"
import searchIcon from "../images/search-icon.png"
import {Link} from "react-router-dom";


export default function Header(props) {
    function showDropdownMenu(event) {
        event.currentTarget.nextElementSibling.style.display = 'flex';
    }

    function hideDropdownMenu(event) {
        event.currentTarget.nextElementSibling.style.display = 'none';
    }

    function showDropdownMenuItem(event) {
        event.currentTarget.style.display = 'flex';
    }

    function hideDropdownMenuItem(event) {
        event.currentTarget.style.display = 'none';
    }

    return(
        <div className="header--style">
            <div className="header--wrapper">
                <div className="header--icons-corner">
                    <Link to="/"><img src={logo} alt="" className="header--logo" /></Link>
                    <img src={searchIcon} alt="" className="header--search-icon"/>
                </div>
                <ul className="header--menu">
                    <li>
                        <a href="" className="header--dropdownToggle"
                           onMouseEnter={showDropdownMenu}
                           onMouseLeave={hideDropdownMenu}>
                            О НАС
                        </a>
                            <ul className="header--dropdownMenu"
                                onMouseEnter={showDropdownMenuItem}
                                onMouseLeave={hideDropdownMenuItem}
                            >
                                <li>История клиники</li>
                                <li>Как нас найти</li>
                            </ul>
                    </li>
                    <li>
                        <a href="" className="header--dropdownToggle"
                           onMouseEnter={showDropdownMenu}
                           onMouseLeave={hideDropdownMenu}>
                            НАПРАВЛЕНИЯ
                        </a>
                        <ul className="header--dropdownMenu"
                            onMouseEnter={showDropdownMenuItem}
                            onMouseLeave={hideDropdownMenuItem}
                        >
                            <li>Стоматоогия</li>
                            <li>Хирургия</li>
                            <li>Кардиология</li>
                            <li>Эндокринология</li>
                            <li>Гинекология</li>
                            <li>Ревматология</li>
                            <li>Дерматология</li>
                        </ul>
                    </li>
                    <li>
                        <a href="" className="header--dropdownToggle"
                           onMouseEnter={showDropdownMenu}
                           onMouseLeave={hideDropdownMenu}>
                            ВРАЧИ
                        </a>
                        <ul className="header--dropdownMenu"
                            onMouseEnter={showDropdownMenuItem}
                            onMouseLeave={hideDropdownMenuItem}
                        >
                            <li>История клиники</li>
                            <li>Как нас найти</li>
                        </ul>

                    </li>
                    <li>ОТЗЫВЫ</li>
                    <li>КОНТАКТЫ</li>
                </ul>
                <div className="header--cabinet">
                    <Link to="/account">{props.isAuthenticated ? "Личный кабинет" : "Вход/Регистрация"}</Link>
                </div>
            </div>
        </div>
    )
}
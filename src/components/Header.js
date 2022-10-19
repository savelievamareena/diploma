import React from "react"
import '../styles/Header.css';
import logo from "../images/logo.png"
import searchIcon from "../images/search-icon.png"
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";


export default function Header() {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();

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

    async function handleLogout(event) {
        event.preventDefault();

        const res = await fetch("http://localhost:8080/api/auth/logout", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status === 200) {
            navigate('/');
        } else {
            console.log(resJson.message);
        }
    }

    return(
        <div className="header--style">
            <div className="header--wrapper">
                <div className="header--icons-corner">
                    <Link to="/"><img src={logo} alt="" className="header--logo" /></Link>
                    <img src={searchIcon} alt="" className="header--search-icon"/>
                </div>
                <div className="header--contacts">
                    <div><strong>Как с нами связаться:</strong></div>
                    <div>+37529 1010101, +37529 2020202</div>
                    <div>bestclinique@gmai.com</div>
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
                    <Link to={cookies.authKey != null ? (cookies.role === "admin" ? "/admin" : "/account") : "/login"}>{cookies.authKey != null ? "Личный кабинет" : "Вход/Регистрация"}</Link>
                    <br/>
                    {cookies.authKey != null && <button onClick={handleLogout}>Выйти</button>}
                </div>
            </div>
        </div>
    )
}
import React from "react"
import '../styles/Header.css';
import logo from "../images/logo.png"
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";


export default function Header() {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();
    const [departments, setDepartments] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/departments')
            return result.json();
        }
        fetchData()
            .then(data => {setDepartments(prevDepartments => [...data]);});
    }, [])

    const departmentLinks = departments.map((val, key) => {
        const link = "/department/" + val.id;
        return (
            <a key={key} href={link} >{val.title}</a>
        )
    })

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

    // async function handleLogout(event) {
    //     event.preventDefault();
    //
    //     const res = await fetch("http://localhost:8080/api/auth/logout", {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //         credentials: 'include'
    //     });
    //     const resJson = await res.json();
    //     if (res.status === 200) {
    //         navigate('/');
    //     } else {
    //         console.log(resJson.message);
    //     }
    // }

    return(
        <div className="header--style">
            <div className="header--wrapper">
                <div className="header--icons-corner">
                    <Link to="/"><img src={logo} alt="" className="header--logo" /></Link>
                </div>
                <div className="header--contacts">
                    <div><strong>Как с нами связаться:</strong></div>
                    <div>+37529 1010101, +37529 2020202</div>
                    <div>bestclinique@gmai.com</div>
                </div>
                <div className="header--menu">
                    <div className="header--dropdownToggle-container">
                        <div className="header--dropdownToggle header--menu-item"
                           onMouseEnter={showDropdownMenu}
                           onMouseLeave={hideDropdownMenu}
                        >
                            О НАС
                        </div>
                        <div className="header--dropdownMenu"
                             onMouseEnter={showDropdownMenuItem}
                             onMouseLeave={hideDropdownMenuItem}
                        >
                            <a href="/history">История клиники</a>
                            <a href="/contacts">Как нас найти/Контакты</a>
                            <a href="/faq">Часто задаваемые вопросы</a>
                        </div>
                    </div>
                    <div className="header--dropdownToggle-container">
                        <div className="header--dropdownToggle header--menu-item"
                           onMouseEnter={showDropdownMenu}
                           onMouseLeave={hideDropdownMenu}>
                            НАПРАВЛЕНИЯ
                        </div>
                        <div className="header--dropdownMenu"
                            onMouseEnter={showDropdownMenuItem}
                            onMouseLeave={hideDropdownMenuItem}
                        >
                            {departmentLinks}
                        </div>
                    </div>
                    <a href="/doctors" className="header--menu-item">
                        ВРАЧИ
                    </a>
                    <a href="/reviews" className="header--menu-item">
                        ОТЗЫВЫ
                    </a>
                </div>
                <div className="header--cabinet">
                    <Link to={cookies.authKey != null ? (cookies.role === "admin" ? "/admin" : "/account") : "/login"}>{cookies.authKey != null ? "Личный кабинет" : "Вход/Регистрация"}</Link>
                    {/*{cookies.authKey != null && <button onClick={handleLogout}>Выйти</button>}*/}
                </div>
            </div>
        </div>
    )
}
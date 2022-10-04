import React from "react"
import '../styles/Header.css';
import logo from "../images/logo.png"
import searchIcon from "../images/search-icon.png"
import {Link} from "react-router-dom";


export default function Header() {

    return(
        <div className="header--style">
            <div className="header--wrapper">
                <div className="header--icons-corner">
                    <Link to="/"><img src={logo} alt="" className="header--logo" /></Link>
                    <img src={searchIcon} alt="" className="header--search-icon"/>

                </div>
                <ul className="header--menu">
                    <li>О НАС</li>
                    <li>УСЛУГИ</li>
                    <li>ВРАЧИ</li>
                    <li>ОТЗЫВЫ</li>
                    <li>КОНТАКТЫ</li>
                </ul>
                <div className="header--cabinet">
                    <Link to="/account">Личный кабинет</Link>
                </div>
            </div>
        </div>
    )
}
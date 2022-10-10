import React from "react";
import '../../styles/AccountForms.css';
import Header from "../Header";

export default function Login(props) {

    return(
        <div>
            <Header isAuthenticated = {props.isAuthenticated}/>
            <div className="login--formWrapper">
                <div className="form">
                    <div className="form-body">
                        <div className="email form--row">
                            <label className="form__label" htmlFor="email">Email </label>
                            <input type="email" id="email" className="form__input" placeholder="Email"/>
                        </div>
                        <div className="password form--row">
                            <label className="form__label" htmlFor="password">Password </label>
                            <input className="form__input" type="password" id="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="register-btn">Log In</button>
                    </div>
                </div>
            </div>
            <div>
                <a href="/register">Создать аккаунт</a>
            </div>
        </div>
    )
}
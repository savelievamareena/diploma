import React from "react";
import '../../styles/AccountForms.css';

export default function RegistrationForm() {

    return(
        <div className="form">
            <div className="form-body">
                <div className="username form--row">
                    <label className="form__label" htmlFor="firstName">First Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname form--row">
                    <label className="form__label" htmlFor="lastName">Last Name </label>
                    <input type="text" name="" id="lastName" className="form__input" placeholder="LastName"/>
                </div>
                <div className="email form--row">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input type="email" id="email" className="form__input" placeholder="Email"/>
                </div>
                <div className="password form--row">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password" id="password" placeholder="Password"/>
                </div>
                <div className="confirm-password form--row">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="form-footer">
                <button type="submit" className="register-btn">Register</button>
            </div>
        </div>
    )
}
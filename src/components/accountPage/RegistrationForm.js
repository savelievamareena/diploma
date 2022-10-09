import React from "react";
import '../../styles/AccountForms.css';
import Header from "../Header";

export default function RegistrationForm(props) {
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password,setPassword] = React.useState();
    const [confirmPassword,setConfirmPassword] = React.useState();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(name === "firstName"){
            setFirstName(value);
        }
        if(name === "lastName"){
            setLastName(value);
        }
        if(name === "email"){
            setEmail(value);
        }
        if(name === "password"){
            setPassword(value);
        }
        if(name === "confirmPassword"){
            setConfirmPassword(value);
        }
    }

    return(
        <div>
            <Header isAuthenticated />
            <div className="form">
                <div className="form-body">
                    <div className="username form--row">
                        <label className="form__label" htmlFor="firstName">First Name </label>
                        <input className="form__input" type="text" placeholder="First Name" value={firstName} />
                    </div>
                    <div className="lastname form--row">
                        <label className="form__label" htmlFor="lastName">Last Name </label>
                        <input type="text" name="" className="form__input" placeholder="LastName" value={lastName}/>
                    </div>
                    <div className="email form--row">
                        <label className="form__label" htmlFor="email">Email </label>
                        <input type="email" className="form__input" placeholder="Email" value={email}/>
                    </div>
                    <div className="password form--row">
                        <label className="form__label" htmlFor="password">Password </label>
                        <input className="form__input" type="password" placeholder="Password" value={password}/>
                    </div>
                    <div className="confirm-password form--row">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <input className="form__input" type="password" placeholder="Confirm Password" value={confirmPassword}/>
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" className="register-btn">Register</button>
                </div>
            </div>
            <div>
                <a href="/login">У меня есть аккаунт</a>
            </div>
        </div>
    )
}
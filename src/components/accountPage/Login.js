import React from "react";
import '../../styles/AuthForms.css';
import Header from "../Header";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";

export default function Login() {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies();
    const [formData, setFormData] = React.useState(
        {
            email: "",
            password: ""
        }
    );

    const [errorMessage, setErrorMessage] = React.useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formData.email === "" || formData.password === "") {
            setErrorMessage("Fields are required");
            return;
        }

        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Error");
        } else {
            if(!resJson.message) {
                if(resJson.role === "user") {
                    navigate('/account');
                }else if(resJson.role === "admin") {
                    navigate('/admin');
                }
            }else {
                setErrorMessage(resJson.message);
            }
        }
    }

    return(
        <div>
            <Header />
            <div className="login--formWrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-body">
                        <div className="email form--row">
                            <label className="form__label" htmlFor="email">Email </label>
                            <input
                                type="text"
                                name="email"
                                className="form__input"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />

                        </div>
                        <div className="password form--row">
                            <label className="form__label" htmlFor="password">Password </label>
                            <input
                                type="password"
                                name="password"
                                className="form__input"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                                value={formData.password}
                            />

                        </div>
                    </div>
                    <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                    <div className="form-footer">
                        <button type="submit" className="register-btn">Log In</button>
                    </div>
                </form>
            </div>
            <div>
                <a href="/register">Создать аккаунт</a>
            </div>
        </div>
    )
}
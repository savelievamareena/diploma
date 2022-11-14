import React from "react";
import '../../styles/AuthForms.css';
import Header from "../Header";
import {useNavigate} from "react-router";
import DatePicker from 'react-date-picker';

export default function RegistrationForm() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = React.useState("");
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: "",
            agreement: false
        }
    );
    const [date, setDate] = React.useState(new Date('2010-01-01'));

    function handleChange(event) {
        const {name, value, type, checked} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    React.useEffect(() => {
        const dateToSave = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                dateOfBirth: dateToSave
            }
        })
    }, [date])

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch("http://localhost:8080/api/auth/register", {
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
                navigate('/account');
            }else {
                setErrorMessage(resJson.message);
            }
        }
    }

    return(
        <div>
            <Header />
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div className="firstName form--row">
                        <label className="form__label" htmlFor="firstName">First Name</label>
                        <input className="form__input"
                               name="firstName"
                               type="text"
                               placeholder="First Name"
                               value={formData.firstName}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="lastname form--row">
                        <label className="form__label" htmlFor="lastName">Last Name</label>
                        <input className="form__input"
                               name="lastName"
                               type="text"
                               placeholder="Last Name"
                               value={formData.lastName}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="datepicker form--row">
                        <label className="form__label" htmlFor="dateOfBirth">День рождения</label>
                        <DatePicker
                            onChange={setDate}
                            value={date}
                            format="dd-MM-y"
                            locale="ru-RU"
                            clearIcon={null}
                            maxDate={new Date('2010-01-01')}
                        />
                    </div>
                    <div className="phoneNumber form--row">
                        <label className="form__label" htmlFor="phoneNumber">Phone Number</label>
                        <input className="form__input"
                               name="phoneNumber"
                               type="text"
                               placeholder="Phone Number"
                               value={formData.phoneNumber}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="email form--row">
                        <label className="form__label" htmlFor="email">Email</label>
                        <input className="form__input"
                               name="email"
                               type="email"
                               placeholder="Email"
                               value={formData.email}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="password form--row">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input className="form__input"
                               name="password"
                               type="password"
                               placeholder="Password"
                               value={formData.password}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="confirm-password form--row">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <input className="form__input"
                               name="confirmPassword"
                               type="password"
                               placeholder="Confirm Password"
                               value={formData.confirmPassword}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={formData.agreement}
                            onChange={handleChange}
                            name="agreement"
                            required
                        />
                        <label htmlFor="agreement">Подтверждаю свое согласие на хранение и обработку персональных данных</label>
                    </div>
                </div>
                <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                <div className="form-footer centered-link-wrapper">
                    <button type="submit" className="register-btn">Register</button>
                </div>
            </form>
            <div className="centered-link-wrapper">
                <a href="/login">У меня есть аккаунт</a>
            </div>
        </div>
    )
}
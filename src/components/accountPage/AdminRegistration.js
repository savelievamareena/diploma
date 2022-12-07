import React from "react";
import '../../styles/AuthForms.css';
import {useNavigate} from "react-router";
import DatePicker from 'react-date-picker';

export default function AdminRegistration() {
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
            admin: true
        }
    );

    const today = new Date();
    const defaultDate = new Date(today.setFullYear(today.getFullYear() - 18));
    const [date, setDate] = React.useState(defaultDate);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
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
            setErrorMessage("Ошибка");
        } else {
            if(!resJson.message) {
                navigate('/admin');
            }else {
                setErrorMessage(resJson.message);
            }
        }
        setTimeout(() => {
            setErrorMessage("");
        }, 2000)
    }

    return(
        <div className="admin-register-wrapper">
            <h3>Страница регистрации администратора</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div className="firstName form--row">
                        <label className="form__label" htmlFor="firstName">Имя</label>
                        <input className="form__input"
                               name="firstName"
                               type="text"
                               placeholder="Имя"
                               value={formData.firstName}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="lastname form--row">
                        <label className="form__label" htmlFor="lastName">Фамилия</label>
                        <input className="form__input"
                               name="lastName"
                               type="text"
                               placeholder="Фамилия"
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
                            maxDate={defaultDate}
                        />
                    </div>
                    <div className="phoneNumber form--row">
                        <label className="form__label" htmlFor="phoneNumber">Номер телефона</label>
                        <input className="form__input"
                               name="phoneNumber"
                               type="text"
                               placeholder="Номер телефона"
                               value={formData.phoneNumber}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="email form--row">
                        <label className="form__label" htmlFor="email">Электронная почта</label>
                        <input className="form__input"
                               name="email"
                               type="email"
                               placeholder="Электронная почта"
                               value={formData.email}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="password form--row">
                        <label className="form__label" htmlFor="password">Пароль</label>
                        <input className="form__input"
                               name="password"
                               type="password"
                               placeholder="Пароль"
                               value={formData.password}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="confirm-password form--row">
                        <label className="form__label" htmlFor="confirmPassword">Повторить пароль</label>
                        <input className="form__input"
                               name="confirmPassword"
                               type="password"
                               placeholder="Повторить пароль"
                               value={formData.confirmPassword}
                               required
                               onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                <div className="form-footer centered-link-wrapper">
                    <button type="submit" className="register-btn">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    )
}
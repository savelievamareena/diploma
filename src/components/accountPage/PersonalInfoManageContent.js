import React from "react"
import {useCookies} from "react-cookie";
import DatePicker from "react-date-picker";
import '../../styles/AuthForms.css';

export default function PersonalInfoManageContent() {
    const [cookies] = useCookies();
    const userId = cookies.userId;

    const [message, setMessage] = React.useState("");
    const [date, setDate] = React.useState(new Date('2010-01-01'));
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            dateOfBirth: "",
            password: ""
        }
    );

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://localhost:8080/api/users/" + userId)
            return result.json();
        }
        fetchData()
            .then(data => {
                const dateReceived = data.dateOfBirth;
                if(dateReceived != null) {
                    const dateFullString = dateReceived + "T12:00:00Z";
                    const dateObj = new Date(dateFullString);
                    setDate(dateObj)
                }else {
                    setDate("")
                }
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    }
                })
            });
    }, [])

    React.useEffect(() => {
        let dateToSave = "";
        if(date != null) {
            dateToSave = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                dateOfBirth: dateToSave
            }
        })
    }, [date])

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

        setMessage("");
        const res = await fetch("http://localhost:8080/api/users/" + userId, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setMessage("Error");
        } else {
            if(resJson.message) {
                setMessage(resJson.message);
            }else {
                setMessage("Saved!");
            }
        }
    }

    return (
        <div className="account--right-content-block">
            <form className="form--edit" onSubmit={handleSubmit}>
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
                            locale="ru-Ru"
                            clearIcon={null}
                            maxDate={new Date('2010-01-01')}
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
                    <div className="email form--row">
                        <label className="form__label" htmlFor="password">Пароль</label>
                        <input className="form__input"
                               name="password"
                               type="password"
                               placeholder="Пароль"
                               value={formData.password}
                               onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="message">{message && <span>{message}</span>}</div>
                <div className="form-footer centered-link-wrapper">
                    <button type="submit" className="register-btn">Обновить личные данные</button>
                </div>
            </form>
        </div>
    )
}
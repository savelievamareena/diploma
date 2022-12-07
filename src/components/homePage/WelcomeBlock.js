import React from "react"
import '../../styles/Homepage.css';
import {FaRegWindowClose} from "react-icons/fa"

export default function WelcomeBlock() {
    const [isCallbackFormShown, setIsCallbackFormShown] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            question: ""
        }
    );

    function clickHandler() {
        setIsCallbackFormShown(prevState => !prevState);
        setFormData({firstName: "", lastName: "", phoneNumber: "", question: ""})
        setSuccessMessage("");
        setErrorMessage("");
    }

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

        const res = await fetch("http://localhost:8080/api/callback", {
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
                setSuccessMessage("Готово!")
                setTimeout(() => {
                    setIsCallbackFormShown(false)
                }, 500);
            }else {
                setErrorMessage(resJson.message);
            }
        }
    }

    return(
        <div className="homepageMain--header homepage--block">
            <div className="homepageMain--headerText">
                <h1>Мы рады, что вы выбрали наш центр.</h1>
                <p>«Клиника Здоровье» – многопрофильная медицинская компания, крупнейшая в частной медицине Республики Беларусь.
                Работая с 1992 года, мы постоянно расширяем перечень услуг для пациентов, закупаем инновационное
                оборудование и внедряем в практику самые передовые методы диагностики и лечения.</p>
                <div className="callback-button" onClick={clickHandler}>
                    Заказать звонок
                </div>
            </div>

            <div className="callback-request-form" style={{display: isCallbackFormShown ? 'block' : 'none' }}>
                <div className="close--callback-form" onClick={clickHandler}>
                    <FaRegWindowClose/>
                </div>
                <h3>Оставьте номер, и мы вам перезвоним.</h3>
                <form onSubmit={handleSubmit}>
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
                        <div className="phoneNumber form--row">
                            <label className="form__label" htmlFor="phoneNumber">Вопрос</label>
                            <textarea className=" callback-form-textarea"
                                name="question"
                                type="text"
                                placeholder="Какой вопрос вас интересует?"
                                value={formData.question}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                    <div className="success-message">{successMessage && <span>{successMessage}</span>}</div>
                    <div className="form-footer centered-link-wrapper">
                        <button type="submit" className="callback-submit-btn">Отправить</button>
                    </div>
                </form>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
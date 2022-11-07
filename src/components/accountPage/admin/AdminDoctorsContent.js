import React from "react"
import DoctorRow from "../../accountPage/admin/DoctorRow";
import {FaRegWindowClose} from "react-icons/fa";
import doctorCategories from "../../../dataSources/doctorCategories.json";

export default function AdminDoctorsContent() {
    const [doctors, setDoctors] = React.useState([]);
    const [popupShown, setPopupShown] = React.useState(false);
    const [specializations, setSpecializations] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [formData, setFormData] = React.useState({
        id: 0,
        specializationId: "",
        firstName: "",
        lastName: "",
        education: "",
        bio: "",
        available: true,
        fee: "",
        yearsOfExperience: "",
        profilePhotoLink: "",
        category: "отсутствует"
    });

    //fetch doctors
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [successMessage])

    //fetch specializations
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/specializations')
            return result.json();
        }
        fetchData()
            .then(data => {setSpecializations([...data])});
    }, [successMessage])

    //select options prepare
    const selectSpecOptions = specializations.map((val, key) => {
        return(
            <option key={key} value={val.id}>{val.title}</option>
        )
    })

    const selectCategoryOptions = doctorCategories.map((val, key) => {
        return(
            <option key={key} value={val}>{val}</option>
        )
    })

    //delete doctor functionality
    async function handleDelete(event) {
        const doctorId = event.currentTarget.parentNode.getAttribute("data-id");

        const res = await fetch("http://localhost:8080/api/doctors/" + doctorId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Error");
        } else {
            if(resJson.message) {
                setErrorMessage(resJson.message);
            }else {
                setSuccessMessage("Done!")
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000);
    }

    //click edit button
    function handleEdit(event) {
        const doctorId = event.currentTarget.parentNode.getAttribute("data-id");
        const doctorToEdit = doctors.find(x => x.id == doctorId);
        setFormData({...doctorToEdit, specializationId: doctorToEdit.specialization.id});
        setPopupShown(true);
    }

    function handleAddDoctor() {
        setFormData({
            id: "0",
            specializationId: "",
            firstName: "",
            lastName: "",
            education: "",
            bio: "",
            isAvailable: true,
            fee: "",
            yearsOfExperience: "",
            profilePhotoLink: "",
            category: "отсутствует"
        })
        setPopupShown(true);
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleRadio(event) {
        const isAvailable = event.currentTarget.value === "true";
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                available: isAvailable
            }
        })
    }

    function closeFormHandler() {
        setPopupShown(false);
        setFormData({
            id: "0",
            specializationId: "",
            firstName: "",
            lastName: "",
            education: "",
            bio: "",
            isAvailable: true,
            fee: "",
            yearsOfExperience: "",
            profilePhotoLink: "",
            category: "отсутствует"
        })
        setSuccessMessage("");
        setErrorMessage("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if(formData.specializationId == 0) {
            setErrorMessage("Выберите Специализацию")
            setTimeout(() => {
                setErrorMessage("")
            }, 1000);
            return
        }

        const res = await fetch("http://localhost:8080/api/doctors/" + formData.id, {
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
                setSuccessMessage("Done!")
                setPopupShown(false)
            }else {
                setErrorMessage(resJson.message);
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000);
    }

    const doctorsForAdmin = doctors.map((val, key) => {
        return(
            <DoctorRow
                key={key}
                id={val.id}
                fullName={val.fullName}
                bio={val.bio}
                specialization={val.specialization.title}
                education={val.education}
                photo={val.profilePhotoLink}
                experience={val.yearsOfExperience}
                fee={val.fee}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isAvailable={val.available}
                category={val.category}
            />
        )
    })

    return (
        <div className="admin--doctors-wrapper">
            <div>
                <button type="button" onClick={handleAddDoctor}>
                    Добавить доктора
                </button>
            </div>
            <div className="message">{errorMessage ? errorMessage : null}</div>
            <div className="success-message">{successMessage ? successMessage : null}</div>
            {
                doctors.length > 0 &&
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Имя</th>
                        <th>Специализация</th>
                        <th>Описание</th>
                        <th>Образование</th>
                        <th>Стаж</th>
                        <th>Ставка</th>
                        <th>Категория</th>
                        <th></th>
                        <th className="empty"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {doctorsForAdmin}
                    </tbody>
                </table>
            }
            <div className="edit-doctor-popup" style={{display: popupShown ? 'block' : 'none' }}>
                <div className="close--callback-form" onClick={closeFormHandler}>
                    <FaRegWindowClose/>
                </div>
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
                        <div className="lastname form--row">
                            <label className="form__label" htmlFor="lastName">Специализация</label>
                            <select
                                className="form__input"
                                value={formData.specializationId}
                                onChange={handleChange}
                                name="specializationId"
                            >
                                <option value="0">--Не выбрано--</option>
                                {selectSpecOptions}
                            </select>
                        </div>

                        <div className="education form--row">
                            <label className="form__label" htmlFor="education">Образование</label>
                            <input className="form__input"
                                   name="education"
                                   type="text"
                                   placeholder="Образование"
                                   value={formData.education}
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="bio form--row">
                            <label className="form__label" htmlFor="bio">Описание</label>
                            <textarea className="callback-form-textarea"
                                      name="bio"
                                      placeholder="Описание"
                                      value={formData.bio}
                                      onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="fee form--row">
                            <label className="form__label" htmlFor="fee">Ставка</label>
                            <input className="form__input"
                                   name="fee"
                                   type="number"
                                   placeholder="Ставка"
                                   value={formData.fee}
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="yearsOfExperience form--row">
                            <label className="form__label" htmlFor="yearsOfExperience">Опыт, лет</label>
                            <input className="form__input"
                                   name="yearsOfExperience"
                                   type="number"
                                   placeholder="Опыт"
                                   value={formData.yearsOfExperience}
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="category form--row">
                            <label className="form__label" htmlFor="category">Категория</label>
                            <select
                                className="form__input"
                                value={formData.category}
                                onChange={handleChange}
                                name="category"
                                required
                            >
                                {selectCategoryOptions}
                            </select>
                        </div>
                        <div className="profilePhotoLink form--row">
                            <label className="form__label" htmlFor="yearsOfExperience">Ссылка на фото</label>
                            <input className="form__input"
                                   name="profilePhotoLink"
                                   type="text"
                                   placeholder="Ссылка на фото"
                                   value={formData.profilePhotoLink}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="profilePhotoLink form--row">
                            <div>Статус:</div>
                            <div className="doctors-form-radio">
                                <input
                                    id="available"
                                    type="radio"
                                    name="available"
                                    value="true"
                                    checked={formData.available === true}
                                    onChange={handleRadio}
                                />
                                <label htmlFor="available">Доступен</label>
                                <br />

                                <input
                                    required
                                    id="not-available"
                                    type="radio"
                                    name="available"
                                    value="false"
                                    checked={formData.available === false}
                                    onChange={handleRadio}
                                />
                                <label htmlFor="available">Недоступен</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-footer centered-link-wrapper">
                        <button type="submit" className="callback-submit-btn">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
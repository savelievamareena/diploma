import React from "react"
import DoctorRow from "../../accountPage/admin/DoctorRow";
import {FaRegWindowClose} from "react-icons/fa";
import doctorCategories from "../../../dataSources/doctorCategories.json";

export default function AdminDoctorsContent() {
    const [doctors, setDoctors] = React.useState([]);
    const [specializations, setSpecializations] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [formData, setFormData] = React.useState({
        id: "",
        specializationId: "",
        firstName: "",
        lastName: "",
        education: "",
        bio: "",
        isAvailable: "",
        fee: "",
        yearsOfExperience: "",
        profilePhotoLink: "",
        category: ""
    });

    const [popupShown, setPopupShown] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [successMessage])

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
                setTimeout(() => {
                    setErrorMessage("")
                }, 1000);
            }else {
                setSuccessMessage("Done!")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 1000);
            }
        }
    }

    function handleEdit(event) {
        const doctorId = event.currentTarget.parentNode.getAttribute("data-id");
        const doctorToEdit = doctors.find(x => x.id == doctorId);
        setFormData({...doctorToEdit});
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

    function closeFormHandler() {
        setPopupShown(false);
        setFormData({
            id: "",
            specializationId: "",
            firstName: "",
            lastName: "",
            education: "",
            bio: "",
            isAvailable: "",
            fee: "",
            yearsOfExperience: "",
            profilePhotoLink: "",
            category: ""
        })
        setSuccessMessage("");
        setErrorMessage("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // const res = await fetch("http://localhost:8080/api/callback", {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'include'
        // });
        // const resJson = await res.json();
        // if (res.status !== 200) {
        //     setErrorMessage("Error");
        // } else {
        //     if(!resJson.message) {
        //         setSuccessMessage("Done!")
        //         setTimeout(() => {
        //             setIsCallbackFormShown(false)
        //         }, 500);
        //     }else {
        //         setErrorMessage(resJson.message);
        //     }
        // }
    }

    const doctorsForAdmin = doctors.map((val, key) => {
        return(
            <DoctorRow
                key={key}
                id={val.id}
                firstName={val.firstName}
                lastName={val.lastName}
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
            <div className="message">{errorMessage ? errorMessage : null}</div>
            <div className="success-message">{successMessage ? successMessage : null}</div>
            {doctorsForAdmin}
            <div className="edit-doctor-popup" style={{display: popupShown ? 'block' : 'none' }}>
                <div className="close--callback-form" >
                    <FaRegWindowClose/>
                </div>
                <form onSubmit={handleSubmit}>
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
                        {/*<div className="lastname form--row">*/}
                        {/*    <label className="form__label" htmlFor="lastName">Last Name</label>*/}
                        {/*    <input className="form__input"*/}
                        {/*           name="lastName"*/}
                        {/*           type="text"*/}
                        {/*           placeholder="Last Name"*/}
                        {/*           value={formData.lastName}*/}
                        {/*           required*/}
                        {/*           onChange={handleChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="phoneNumber form--row">*/}
                        {/*    <label className="form__label" htmlFor="phoneNumber">Phone Number</label>*/}
                        {/*    <input className="form__input"*/}
                        {/*           name="phoneNumber"*/}
                        {/*           type="text"*/}
                        {/*           placeholder="Phone Number"*/}
                        {/*           value={formData.phoneNumber}*/}
                        {/*           required*/}
                        {/*           onChange={handleChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="phoneNumber form--row">*/}
                        {/*    <label className="form__label" htmlFor="phoneNumber">Phone Number</label>*/}
                        {/*    <textarea className=" callback-form-textarea"*/}
                        {/*              name="question"*/}
                        {/*              type="text"*/}
                        {/*              placeholder="Какой вопрос вас интересует?"*/}
                        {/*              value={formData.question}*/}
                        {/*              onChange={handleChange}*/}
                        {/*    ></textarea>*/}
                        {/*</div>*/}
                    </div>
                    <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                    <div className="success-message">{successMessage && <span>{successMessage}</span>}</div>
                    <div className="form-footer centered-link-wrapper">
                        <button type="submit" className="callback-submit-btn">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
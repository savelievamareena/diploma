import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import ScheduleRow from "../../components/accountPage/admin/ScheduleRow";
import {FaRegWindowClose} from "react-icons/fa";
import DatePicker from "react-date-picker";

export default function AdminSchedule() {
    const [schedules, setSchedules] = React.useState([]);
    const [doctors, setDoctors] = React.useState([]);
    const [formData, setFormData] = React.useState({
        id: 0,
        doctorId: "",
        scheduleDate: new Date(),
        startTime: "08:00",
        endTime: "22:00"
    });

    const [scheduleDTO, setScheduleDTO] = React.useState({
        id: 0,
        doctorId: "",
        scheduleDate: new Date(),
        startTime: new Date(),
        endTime: new Date()
    })

    const [popupShown, setPopupShown] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const [dateScheduleDate, setDateScheduleDate] = React.useState(new Date());

    //fetch schedules
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/schedules')
            return result.json();
        }
        fetchData()
            .then(data => {setSchedules([...data])});
    }, [successMessage])

    //fetch doctors
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [successMessage])

    //select options prepare
    const selectDoctorOptions = doctors.map((val, key) => {
        return(
            <option key={key} value={val.id}>{val.fullName}, {val.specialization.title}</option>
        )
    })

    function openPopup (event) {
        const scheduleId = event.currentTarget.parentNode.getAttribute("data-id");
        if(scheduleId != null) {
            const scheduleToEdit = schedules.find(x => x.id == scheduleId);

            const dateFullString = scheduleToEdit.scheduleDate + "T12:00:00Z";
            const dateObj = new Date(dateFullString);
            setDateScheduleDate(dateObj)

            const startObj = new Date(scheduleToEdit.startTime);
            const startReady = startObj.toLocaleTimeString('ru-RU', {timeStyle: 'short'});

            const endObj = new Date(scheduleToEdit.endTime);
            const endReady = endObj.toLocaleTimeString('ru-RU', {timeStyle: 'short'});

            setFormData(
                {
                    id: scheduleToEdit.id,
                    doctorId: scheduleToEdit.doctor.id,
                    scheduleDate: new Date(scheduleToEdit.scheduleDate),
                    startTime: startReady,
                    endTime: endReady
                }
            );
        }else {
            setFormData(
                {
                    id: 0,
                    doctorId: "",
                    scheduleDate: new Date(),
                    startTime: "08:00",
                    endTime: "22:00"
                }
            );
            setDateScheduleDate(new Date())
        }
        setPopupShown(true);
    }

    function closeFormHandler() {
        setFormData(
            {
                id: 0,
                doctorId: "",
                scheduleDate: new Date(),
                startTime: "08:00",
                endTime: "22:00"
            }
        )
        setPopupShown(false);
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

    //dates and time handling
    React.useEffect(() => {
        let scheduleDate = new Date();
        if(dateScheduleDate != null) {
            scheduleDate = dateScheduleDate.getFullYear() + "-" + (dateScheduleDate.getMonth() + 1) + "-" + dateScheduleDate.getDate();
        }

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                scheduleDate: scheduleDate
            }
        })
    }, [dateScheduleDate])

    React.useEffect(() => {
        const startToParse = formData.scheduleDate + " " + formData.startTime + ":00";
        const endToParse = formData.scheduleDate + " " + formData.endTime + ":00";
        const startAsDate = new Date(startToParse);
        const endAsDate = new Date(endToParse);

        setScheduleDTO(
            {
            id: formData.id,
            doctorId: formData.doctorId,
            scheduleDate: formData.scheduleDate,
            startTime: startAsDate,
            endTime: endAsDate
            }
        )
    }, [formData])

    async function handleSubmit(event) {
        event.preventDefault();

        if(formData.doctorId == 0) {
            setErrorMessage("Выберите специалиста")
            setTimeout(() => {
                setErrorMessage("")
            }, 1000);
            return
        }

        if(formData.scheduleDate == null) {
            setErrorMessage("Выберите дату")
            setTimeout(() => {
                setErrorMessage("")
            }, 1000);
            return
        }

        const res = await fetch("http://localhost:8080/api/schedules/", {
            method: "POST",
            body: JSON.stringify(scheduleDTO),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Something went wrong");
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

    async function handleDelete (event) {
        const scheduleId = event.currentTarget.parentNode.getAttribute("data-id");

        const res = await fetch("http://localhost:8080/api/schedules/" + scheduleId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Error!");
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

    const doctorsForAdmin = schedules.map((val, key) => {
        return(
            <ScheduleRow
                key={key}
                id={val.id}
                fullName={val.doctor.fullName}
                date={val.scheduleDate}
                start={val.startTime}
                end={val.endTime}
                photo={val.doctor.profilePhotoLink}
                specialization={val.doctor.specialization.title}

                handleEdit={openPopup}
                handleDelete={handleDelete}
            />
        )
    })

    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataAdmin} />
                <div className="schedules-wrapper">
                    <div>
                        <button onClick={openPopup}>Add schedule</button>
                    </div>
                    <div className="message">{errorMessage ? errorMessage : null}</div>
                    <div className="success-message">{successMessage ? successMessage : null}</div>
                    {
                        schedules.length > 0 &&
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Имя</th>
                                <th>Специализация</th>
                                <th>День</th>
                                <th>Начало рабочего дня</th>
                                <th>Конец рабочего дня</th>
                            </tr>
                            </thead>
                            <tbody>
                            {doctorsForAdmin}
                            </tbody>
                        </table>
                    }
                    <div className="edit-schedule-popup" style={{display: popupShown ? 'block' : 'none' }}>
                        <div className="close--callback-form" onClick={closeFormHandler}>
                            <FaRegWindowClose/>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-body">
                                <div className="category form--row">
                                    <label className="form__label" htmlFor="specialization">Специалист</label>
                                    <select
                                        className="form__input"
                                        value={formData.doctorId}
                                        onChange={handleChange}
                                        name="doctorId"
                                        required
                                    >
                                        <option value="0">--Не выбрано--</option>
                                        {selectDoctorOptions}
                                    </select>
                                </div>
                                <div className="datepicker form--row">
                                    <label className="form__label" htmlFor="dateOfBirth">Рабочий день</label>
                                    <DatePicker
                                        onChange={setDateScheduleDate}
                                        value={dateScheduleDate}
                                        format="dd-MM-y"
                                        locale="ru-RU"
                                    />
                                </div>
                                <div className="datepicker form--row">
                                    <label className="form__label" htmlFor="dateOfBirth">Начало рабочего дня</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        onChange={handleChange}
                                        value={formData.startTime}
                                        min="08:00"
                                        max="21:40" required
                                    />
                                </div>
                                <div className="datepicker form--row">
                                    <label className="form__label" htmlFor="dateOfBirth">Конец рабочего дня</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        onChange={handleChange}
                                        value={formData.endTime}
                                        min="08:20"
                                        max="22:00" required
                                    />
                                </div>
                            </div>
                            <div className="form-footer centered-link-wrapper">
                                <button type="submit" className="callback-submit-btn">Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
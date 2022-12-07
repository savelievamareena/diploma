import React from "react"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {FaRegWindowClose} from "react-icons/fa";

export default function Admin() {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (cookies.role === "user") {
            navigate("/");
        }
    }, [cookies, navigate])

    const [appointmentsActive, setAppointmentsActive] = React.useState([]);
    const [appointmentsPast, setAppointmentsPast] = React.useState([]);
    const [popupShown, setPopupShown] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const [formData, setFormData] = React.useState({
        reportText: "",
        appointmentId: 0,
        id: 0
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://localhost:8080/api/appointments/past")
            return result.json();
        }
        fetchData().then(data => {
            setAppointmentsPast([...data])
        });
    }, [successMessage])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/active')
            return result.json();
        }
        fetchData().then(data => {
            setAppointmentsActive([...data])
        });
    }, [])

    function openFormHandler(event) {
        setFormData({
            reportText: "",
            appointmentId: 0,
            id: 0
        })

        let reportText = "";
        let id = 0;
        const appointmentId = event.currentTarget.parentNode.getAttribute("data-id");

        const appToEdit = appointmentsPast.find(x => x.id == appointmentId);
        if(appToEdit.report != null) {
            reportText =  appToEdit.report.text;
            id =  appToEdit.report.id;
        }

        setFormData(prevFormData => {
            return {
                reportText: reportText,
                appointmentId: appointmentId,
                id: id
            }
        })
        setPopupShown(true);
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    function closeFormHandler() {
        setPopupShown(false);
    }

    async function submitReportSave(event) {
        event.preventDefault();

        const res = await fetch("http://localhost:8080/api/report/" + formData.id, {
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
                    setPopupShown(false)
                }, 500);
            }else {
                setErrorMessage(resJson.message);
            }
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 500);
    }

    const appointmentsActiveToShow = appointmentsActive.map((val, i) => {
        return(
            <div className="appointment-row-admin" key={i}>
                <div><span className="strong">Специалист:</span> {val.schedule.doctor.fullName}, {val.schedule.doctor.specialization.title}</div>
                <div><span className="strong">Услуга:</span> {val.service.title}</div>
                <div><span className="strong">Пациент:</span> {val.user.firstName + " " + val.user.lastName}</div>
                <div><span className="strong">Номер телефона и емейл:</span> {val.user.phoneNumber}, {val.user.email}</div>
                <div><span className="strong">Дата:</span> {val.schedule.scheduleDate}</div>
                <div><span className="strong">Начало:</span> {val.beginning}</div>
            </div>
        )
    })

    const appointmentsPastToShow = appointmentsPast.map((val, i) => {
        return(
            <div className="appointment-row-admin" key={i} data-id={val.id}>
                <div><span className="strong">Специалист:</span> {val.schedule.doctor.fullName}, {val.schedule.doctor.specialization.title}</div>
                <div><span className="strong">Услуга:</span> {val.service.title}</div>
                <div><span className="strong">Пациент:</span> {val.user.firstName + " " + val.user.lastName}</div>
                <div><span className="strong">Номер телефона и емейл:</span> {val.user.phoneNumber}, {val.user.email}</div>
                <div><span className="strong">Дата:</span> {val.schedule.scheduleDate}</div>
                <div><span className="strong">Начало:</span> {val.beginning}</div>
                <div onClick={openFormHandler}><button>Добавить/редактировать заключение</button></div>
            </div>
        )
    })

    return(
        <div className="admin--wrapper">
            <AdminHeader />
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataAdmin} />
                <div className="visit-tabs-wrapper">
                    <Tabs >
                        <TabList>
                            <Tab>Предстоящие визиты</Tab>
                            <Tab>Прошедшие визиты</Tab>
                        </TabList>

                        <TabPanel>
                            <div>
                                {appointmentsActiveToShow}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                {appointmentsPastToShow}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                {/*popup block*/}
                <div className="appointment-report-card popup-window" style={{display: popupShown ? 'block' : 'none' }}>
                    <div className="close--callback-form" onClick={closeFormHandler}>
                        <FaRegWindowClose/>
                    </div>
                    <h3>Заключение врача по итогам приема пациента</h3>
                    <form onSubmit={submitReportSave}>
                        <div className="report-form-body">
                            <div className="reviewText form--row">
                                <label className="form__label" htmlFor="reportText">Текст заключения</label>
                                <textarea className="review-form-textarea"
                                          name="reportText"
                                          type="text"
                                          placeholder="Введите текст"
                                          value={formData.reportText}
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
                </div>
            </div>
        </div>
    )
}
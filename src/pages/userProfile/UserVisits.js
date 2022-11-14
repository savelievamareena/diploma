import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataUser} from "../../dataSources/SidebarDataUser";
import {useCookies} from "react-cookie";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import {FaRegWindowClose} from "react-icons/fa";

export default function UserVisits() {
    const [cookies] = useCookies();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const [appointmentsActive, setAppointmentsActive] = React.useState([]);
    const [appointmentsPast, setAppointmentsPast] = React.useState([]);
    const [popupShown, setPopupShown] = React.useState(false);
    const [report, setReport] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/past/user/' + cookies.userId)
            return result.json();
        }
        fetchData().then(data => {
            console.log(data);
            setAppointmentsPast([...data])
        });
    }, [successMessage])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/active/user/' + cookies.userId)
            return result.json();
        }
        fetchData().then(data => {
            console.log(data);
            setAppointmentsActive([...data])
        });
    }, [successMessage])

    const appointmentsActiveToShow = appointmentsActive.map((val, i) => {
        return(
            <div className="appointment-row-admin" key={i}>
                <div><span className="strong">Специалист:</span> {val.schedule.doctor.fullName}, {val.schedule.doctor.specialization.title}</div>
                <div><span className="strong">Услуга:</span> {val.service.title}</div>
                <div><span className="strong">Дата:</span> {val.schedule.scheduleDate}</div>
                <div><span className="strong">Начало:</span> {val.beginning}</div>
                <div className="admin-review-buttons" data-id={val.id}>
                    <button type="reject-button" onClick={handleReject}>
                        Отменить визит
                    </button>
                </div>
            </div>
        )
    })

    const appointmentsPastToShow = appointmentsPast.map((val, i) => {
        return(
            <div className="appointment-row-admin" key={i}>
                <div><span className="strong">Специалист:</span> {val.schedule.doctor.fullName}, {val.schedule.doctor.specialization.title}</div>
                <div><span className="strong">Услуга:</span> {val.service.title}</div>
                <div><span className="strong">Дата:</span> {val.schedule.scheduleDate}</div>
                <div><span className="strong">Начало:</span> {val.beginning}</div>
                {
                    val.report != null &&
                    <div className="admin-review-buttons" data-id={val.id}>
                        <button type="reject-button" onClick={handleOpenReport}>
                            Посмотреть заключение
                        </button>
                    </div>
                }

            </div>
        )
    })

    async function handleReject(event) {
        const appointmentId = event.currentTarget.parentNode.getAttribute("data-id");
        const res = await fetch("http://localhost:8080/api/appointments/" + appointmentId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Ошибка");
        } else {
            if(resJson.message) {
                setErrorMessage(resJson.message);
            }else {
                setSuccessMessage("Отклонено!")
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000)
    }

    function handleOpenReport(event) {
        const appointmentId = event.currentTarget.parentNode.getAttribute("data-id");
        const appToOpen = appointmentsPast.find(x => x.id == appointmentId);
        setReport(appToOpen.report.text);

        setPopupShown(true);
    }

    function closePopupHandler() {
        setPopupShown(false);
        setReport("");
    }

    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataUser} />
                <div>
                    <div className="admin-reviews-messages">
                        <div className="message">{errorMessage ? errorMessage : null}</div>
                        <div className="success-message">{successMessage ? successMessage : null}</div>
                    </div>
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
                    <div className="appointment-report-card-user popup-window" style={{display: popupShown ? 'block' : 'none' }}>
                        <div className="close--callback-form" onClick={closePopupHandler}>
                            <FaRegWindowClose/>
                        </div>
                        <h3>Заключение врача по итогам приема пациента</h3>
                        <div className="report-container">
                            {report}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from "react"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Admin() {
    const [doctors, setDoctors] = React.useState([])
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (cookies.role === "user") {
            navigate("/");
        }
    }, [cookies, navigate])

    const [appointmentsActive, setAppointmentsActive] = React.useState([]);
    const [appointmentsPast, setAppointmentsPast] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://localhost:8080/api/appointments/past")
            return result.json();
        }
        fetchData().then(data => {
            setAppointmentsPast([...data])
        });
    }, [])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/active')
            return result.json();
        }
        fetchData().then(data => {
            setAppointmentsActive([...data])
        });
    }, [])

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
            <div className="appointment-row-admin" key={i}>
                <div><span className="strong">Специалист:</span> {val.schedule.doctor.fullName}, {val.schedule.doctor.specialization.title}</div>
                <div><span className="strong">Услуга:</span> {val.service.title}</div>
                <div><span className="strong">Пациент:</span> {val.user.firstName + " " + val.user.lastName}</div>
                <div><span className="strong">Номер телефона и емейл:</span> {val.user.phoneNumber}, {val.user.email}</div>
                <div><span className="strong">Дата:</span> {val.schedule.scheduleDate}</div>
                <div><span className="strong">Начало:</span> {val.beginning}</div>
                <div><button>Добавить заключение</button></div>
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
            </div>
        </div>
    )
}
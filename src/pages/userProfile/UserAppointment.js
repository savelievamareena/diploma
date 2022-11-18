import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataUser} from "../../dataSources/SidebarDataUser";
import '../../styles/User.css';
import AppointmentsComponent from "../../components/accountPage/user/AppointmentsComponent";

export default function UserAppointment() {
    const [specializations, setSpecializations] = React.useState([]);
    const [selectedSpecializationId, setSelectedSpecialization] = React.useState();
    const [doctors, setDoctors] = React.useState([]);
    const [doctor, setDoctor] = React.useState();
    const [selectedDoctorId, setSelectedDoctor] = React.useState();
    const [services, setServices] = React.useState([]);
    const [service, setService] = React.useState();
    const [schedules, setSchedules] = React.useState([]);

    const [blockToShow, setBlockToShow] = React.useState(1);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/specializations')
            return result.json();
        }
        fetchData()
            .then(data => {setSpecializations([...data])});
    }, [])

    function handleSpecSelect(event) {
        const specializationId = event.currentTarget.getAttribute("data-id");
        setSelectedSpecialization(specializationId);

        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors/spec/' + specializationId)
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});

        setBlockToShow(prevBlockToShow => {return prevBlockToShow + 1})
    }

    function handleDocSelect(event) {
        const doctorId = event.currentTarget.getAttribute("data-id");
        setSelectedDoctor(doctorId);
        const doctorToPass = doctors.find(x => x.id == doctorId);
        setDoctor(doctorToPass);

        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/services/spec/' + selectedSpecializationId)
            return result.json();
        }
        fetchData()
            .then(data => {setServices([...data])});

        setBlockToShow(prevBlockToShow => {return prevBlockToShow + 1})
    }

    function handleServiceSelect(event) {
        const serviceId = event.currentTarget.getAttribute("data-id");
        const serviceToPass = services.find(x => x.id == serviceId);
        setService(serviceToPass);

        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/schedules/doc/' + selectedDoctorId)
            return result.json();
        }
        fetchData()
            .then(data => {setSchedules([...data])});

        setBlockToShow(prevBlockToShow => {return prevBlockToShow + 1})
    }

    const specializationsToShow = specializations.map((val, i) => {
        return(
            <div className="specsToShow app-row" key={i} data-id={val.id} onClick={handleSpecSelect}>
                {val.title}
            </div>
        )
    })

    const doctorsToShow = doctors.map((val, i) => {
        return(
            <div className="doctorsToShow app-row" key={i} data-id={val.id} onClick={handleDocSelect}>
                <div>{val.fullName} -- Категория: {val.category} -- Опыт: {val.yearsOfExperience} лет</div>
                <div><img src={val.profilePhotoLink} alt=""/></div>
            </div>
        )
    })

    function renderDoctors() {
        if(doctors.length > 0) {
            return <div>{doctorsToShow}</div>;
        } else {
            return <div>К сожалению, прием к докторам с этой специализацией сейчас не доступен</div>;
        }
    }

    const servicesToShow = services.map((val, i) => {
        const priceCalculated = (val.price * doctor.fee).toFixed(2);
        return(
            <div className="serviceToShow app-row" key={i} data-id={val.id} onClick={handleServiceSelect}>
                <div className="service-title">{val.title}</div>
                <div className="offer-description">{val.description}</div>
                <div className="price">{priceCalculated} рублей</div>
            </div>
        )
    })

    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataUser} />
                <div className="appointment--content-wrapper">
                    <div className="1-specializationsBlock appointment-step"
                         style={{display: blockToShow === 1 ? 'block' : 'none' }}
                    >
                        {specializationsToShow}
                    </div>

                    <div className="2-specializationsBlock appointment-step"
                         style={{display: blockToShow === 2 ? 'block' : 'none' }}
                    >
                        {renderDoctors()}
                    </div>

                    <div className="3-specializationsBlock appointment-step"
                         style={{display: blockToShow === 3 ? 'block' : 'none' }}
                    >
                        {servicesToShow}
                    </div>

                    <div className="4-specializationsBlock appointment-step"
                         style={{display: blockToShow === 4 ? 'block' : 'none' }}
                    >
                        {
                            schedules.length > 0 ?
                            <AppointmentsComponent
                                schedules={schedules}
                                doctor={doctor}
                                service={service}
                            /> : <h4>К сожалению, у данного специалиста нет свободных слотов на прием.</h4>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
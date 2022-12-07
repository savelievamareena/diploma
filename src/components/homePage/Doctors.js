import React from "react";
import '../../styles/Homepage.css';
import DoctorCard from "./DoctorCard";

export default function Doctors(props) {
    const [doctors, setDoctors] = React.useState([])

    React.useEffect(() => {
        setDoctors([...props.doctors])
    }, [props.doctors])

    const doctorCards = doctors.map((doctor, i) => {
        return <DoctorCard
            key={i}
            experiense={doctor.yearsOfExperience}
            specialization={doctor.specialization.title}
            fullName={doctor.firstName + " " + doctor.lastName}
            photo={doctor.profilePhotoLink}
            bio={doctor.education}
            id={doctor.id}
        />
    })

    const doctorsToDisplay = doctorCards.slice(0, 4);

    return (
        <div className="doctors--wrapper homepage--block">
            <h1>Врачи</h1>
            <div className="doctors--cards">
                {doctorsToDisplay}
            </div>
            <div className="doctors--buttonWrapper">
                <a href="/doctors">Посмотреть всех врачей</a>
            </div>
        </div>
    )
}
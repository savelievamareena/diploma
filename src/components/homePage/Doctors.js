import React from "react";
import '../../styles/Homepage.css';
import DoctorCard from "./DoctorCard";
import {useNavigate} from "react-router";

export default function Doctors(props) {
    const navigate = useNavigate();

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
        />
    })

    const doctorsToDisplay = doctorCards.slice(0, 4);

    function handleClick() {
        navigate('/doctors');
    }

    return (
        <div className="doctors--wrapper homepage--block">
            <h1>Врачи</h1>
            <div className="doctors--cards">
                {doctorsToDisplay}
            </div>
            <div className="doctors--buttonWrapper">
                <button onClick={handleClick}>Show all doctors</button>
            </div>
        </div>
    )
}
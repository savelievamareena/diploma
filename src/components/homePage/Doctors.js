import React from "react";
import '../../styles/Homepage.css';
import DoctorCard from "./DoctorCard";
import {useNavigate} from "react-router";

export default function Doctors() {
    const navigate = useNavigate();

    const [doctors, setDoctors] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [])

    const doctorCards = doctors.map((doctor, i) => {
        return <DoctorCard
            key={i}
            experiense={doctor.yearsOfExperience}
            specialization={doctor.specialization.title ? doctor.specialization.title : "nikakaya"}
            fullName={doctor.firstName + " " + doctor.lastName}
            photo={doctor.profilePhotoLink}
            bio={doctor.bio}
        />
    })

    function handleClick() {
        navigate('/doctors');
    }

    return (
        <div className="doctors--wrapper homepage--block">
            <div className="doctors--cards">
                {doctorCards}
            </div>
            <div className="doctors--buttonWrapper">
                <button onClick={handleClick}>Show all doctors</button>
            </div>
        </div>
    )
}
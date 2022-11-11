import React from "react"
import Header from "../components/Header";
import DoctorCard from "../components/homePage/DoctorCard";

export default function DoctorsList() {
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
            id={doctor.id}
        />
    })

    return (
        <div>
            <Header/>
            <div className="account--right-content-block doctors-page-wrapper">
                {doctorCards}
            </div>
        </div>

    )
}
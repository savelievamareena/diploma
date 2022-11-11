import React from "react"
import Header from "../components/Header";
import profilePic from "../images/noProfilePhoto.png";

export default function DoctorPage() {
    const route = window.location.href;
    const routeAsArr = route.split('/');
    const doctorId = routeAsArr[routeAsArr.length - 1];

    const [doctor, setDoctor] = React.useState({});
    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors/' + doctorId)
            return result.json();
        }
        fetchData().then(data => {
                setDoctor(data);
            });
    }, [doctorId])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/reviews/doc/' + doctorId)
            return result.json();
        }
        fetchData()
            .then(data => {
                setReviews([...data])
            });
    }, [doctorId])

    const reviewBlock = reviews.map((val, i) => {
        return(
            <div className="doctor-page-reviews-row" key={i}>
                <div className="review-row-header">
                    <div className="review-row-header-sender">
                        Отзыв оставил/а: {val.sender}
                    </div>
                </div>
                <div className="review-row-body">
                    {val.reviewText}
                </div>
            </div>
        )
    })

    return(
        <div>
            <Header/>
            <div className="doctor-page-list-wrapper">
                {doctor != null && <div className="doctor-page-left-column">
                    <div className="">
                        <img src={doctor.profilePhotoLink ? doctor.profilePhotoLink : profilePic}/>
                    </div>
                    <h2>{doctor.fullName}</h2>
                    <div>
                        <strong>Специализация:</strong>
                        {
                        doctor && doctor.specialization && doctor.specialization.title &&
                        <strong> {doctor.specialization.title}</strong>
                        }
                    </div>
                </div>}
                <div className="doctor-page-reviews">
                    {reviewBlock}
                </div>
            </div>
        </div>
    )
}
import React from "react"
import Header from "../components/Header";
import ReviewRow from "../components/ReviewRow";

export default function ReviewsList() {
    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/reviews')
            return result.json();
        }
        fetchData()
            .then(data => {setReviews(prevReviews => [...data]);});
    }, [])

    const reviewPageBlock = reviews.map((val, i) => {
        return(
            <ReviewRow
                key={i}
                sender={val.sender}
                reviewText={val.reviewText}
                doctor={val.doctor}
            />
        )
    })

    return (
        <div className="reviewsList--wrapper">
            <Header/>
            <div className="reviews-page-wrapper">
                <div className="reviews-page-content">
                    {reviewPageBlock}
                </div>
            </div>
        </div>
    )
}
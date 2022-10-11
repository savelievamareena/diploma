import React from "react"
import '../../styles/Homepage.css';
import reviewsData from "../../dataSources/reviewsData.json"

export default function Reviews() {
    const [reviews, setReviews] = React.useState(reviewsData.reviews);
    const [reviewShown, setReviewShown] = React.useState(reviews[0]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/reviews')
            return result.json();
        }
        fetchData()
            .then(data => {setReviews(prevReviews => [...prevReviews, ...data]);});
    }, [])

    function handleLeft() {
        setReviewShown(prevReviewShown => {
            const index = reviews.map(object => object.id).indexOf(prevReviewShown.id);
            if(index === 0) {
                return reviews[reviews.length - 1]
            }else {
                return reviews[index - 1]
            }
        })
    }

    function handleRight() {
        setReviewShown(prevReviewShown => {
            const index = reviews.map(object => object.id).indexOf(prevReviewShown.id);
            if(index === (reviews.length - 1)) {
                return reviews[0]
            }else {
                return reviews[index + 1]
            }
        })
    }

    return(
        <div className="homepageMain--reviews homepage--block">
            <h1 className="reviews--header">Отзывы</h1>
            <div className="reviews--wrapper">
                <div className="reviews--leftArrow reviews--arrow" onClick={handleLeft}>
                    &#10140;
                </div>
                <div className="reviews--main">
                    <div className="reviews--text">
                        {reviewShown.reviewText}
                    </div>
                    <div className="reviews--sender">
                        {reviewShown.sender}
                    </div>
                </div>
                <div className="reviews--rightArrow reviews--arrow" onClick={handleRight}>
                    &#10140;
                </div>
            </div>
        </div>
    )
}
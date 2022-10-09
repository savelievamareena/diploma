import React from "react"
import '../../styles/Homepage.css';
import reviewsData from "../../dataSources/reviewsData.json"

export default function Reviews() {
    const [reviews, setReviews] = React.useState(reviewsData.reviews);
    const [reviewShown, setReviewShown] = React.useState(reviews[0]);

    // fetch("http://localhost:8080/api/reviews")
    //     .then(result => result.json())
    //     .then(
    //         (data) => {setReviews(data)}
    //     )
    //
    // console.log(reviews);

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
        <div className="homepageMain--reviews">
            <div className="reviews--leftArrow reviews--arrow" onClick={handleLeft}>
                &#10140;
            </div>
            <div className="reviews--main">
                <div className="reviews--text">
                    {reviewShown.text}
                </div>
                <div className="reviews--sender">
                    {reviewShown.author}
                </div>
            </div>
            <div className="reviews--rightArrow reviews--arrow" onClick={handleRight}>
                &#10140;
            </div>
        </div>
    )
}
import React from "react"

export default function ReviewRow(props) {
    return(
        <div className="review--row">
            <div className="review-row-header">
                <div className="review-row-header-sender">{props.sender}</div>
                <div className="review-row-header-doctor">
                    {props.doctor && "Отзыв на: " + props.doctor.fullName + ", " + props.doctor.specialization.title}
                </div>
            </div>
            <div className="review-row-body">
                {props.reviewText}
            </div>
        </div>
    )
}
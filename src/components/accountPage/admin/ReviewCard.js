import React from "react"

export default function ReviewCard(props) {
    return (
        <div className="callback-request-card">
            <div><strong>Имя:</strong> {props.sender}</div>
            {props.doctor && <div><strong>Доктор:</strong> {props.doctor.fullName}, {props.doctor.specialization.title}</div>}
            <div className="reviewText-scroll"><strong>Отзыв:</strong> {props.reviewText}</div>
            <div className="admin-review-buttons" data-id={props.id}>
                <button type="confirm-button" onClick={props.handleConfirm}>
                    Одобрить
                </button>
                <button type="reject-button" onClick={props.handleReject}>
                    Отклонить
                </button>
            </div>
        </div>
    )
}
import React from "react"

export default function CallBackRequestCard(props) {

    return (
        <div className="callback-request-card" data-id={props.id}>
            <div>Имя: {props.name}</div>
            <div>Телефон: {props.phoneNumber}</div>
            <div>Вопрос: {props.question}</div>
            <div className="message">{props.errorMessage && <span>{props.errorMessage}</span>}</div>
            <button type="button" onClick={props.handleClick}>
                Обработано
            </button>
        </div>
    )
}
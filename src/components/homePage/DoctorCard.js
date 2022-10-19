import React from "react";
import '../../styles/Homepage.css';
import profilePic from "../../images/noProfilePhoto.png";

export default function DoctorCard(props) {
    const photoUrl = props.photo ? props.photo : profilePic

    return (
        <div className="doctorCard--wrapper">
            <div className="doctorCard--profilePic">
                <img src={photoUrl} alt=""/>
            </div>
            <h4>{props.fullName}</h4>
            <div>{props.bio}</div>
            <div>Специализация: {props.specialization}</div>
            <div>Стаж: {props.experiense} лет</div>
        </div>
    )
}
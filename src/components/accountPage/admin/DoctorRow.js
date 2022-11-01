import React from "react"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import profilePic from "../../../images/noProfilePhoto.png";

export default function DoctorRow(props) {
    const photoUrl = props.photo ? props.photo : profilePic

    return(
        <div className="admin--doctor-row">
            <div className="doctor-row-cell0 doctor-cell">
                <div className="doctor-admin-photoLink">
                    <img src={photoUrl} alt=""/>
                </div>
            </div>
            <div className="doctor-row-cell1 doctor-cell">{props.lastName} {props.firstName}</div>
            <div className="doctor-row-cell2 doctor-cell">{props.specialization}</div>
            <div className="doctor-row-cell3 doctor-cell">{props.bio}</div>
            <div className="doctor-row-cell4 doctor-cell">{props.education}</div>
            <div className="doctor-row-cell5 doctor-cell">{props.experience} лет</div>
            <div className="doctor-row-cell6 doctor-cell">Ставка: {props.fee}</div>
            <div className="doctor-row-cell9 doctor-cell">Категория: {props.category}</div>
            <div className="doctor-row-cell7 doctor-cell">{props.isAvailable ? "Доступен" : "Недоступен"}</div>
            <div className="doctor-row-cell8 doctor-cell" data-id={props.id}>
                <div className="admin-doctor-button admin-doctor-edit-button" onClick={props.handleEdit}>
                    <AiFillEdit/>
                </div>
                <div className="admin-doctor-button admin-doctor-delete-button" onClick={props.handleDelete}>
                    <AiFillDelete/>
                </div>
            </div>
        </div>
    )
}
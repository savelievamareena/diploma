import React from "react"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import profilePic from "../../../images/noProfilePhoto.png";

export default function DoctorRow(props) {
    const photoUrl = props.photo ? props.photo : profilePic

    return(
        <tr>
            <td><img src={photoUrl} alt=""/></td>
            <td>{props.fullName}</td>
            <td>{props.specialization}</td>
            <td>{props.bio}</td>
            <td>{props.education}</td>
            <td>{props.experience} лет</td>
            <td>{props.fee}</td>
            <td>{props.category}</td>
            <td>{props.isAvailable ? "Доступен" : "Недоступен"}</td>
            <td data-id={props.id} className="edit-buttons">
                <AiFillEdit onClick={props.handleEdit} className="table-button" /> <br/>
                <AiFillDelete onClick={props.handleDelete} className="table-button" />
            </td>
        </tr>
    )
}
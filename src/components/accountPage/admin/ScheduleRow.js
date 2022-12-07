import React from "react"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import profilePic from "../../../images/noProfilePhoto.png";

export default function ScheduleRow(props) {
    const photoUrl = props.photo ? props.photo : profilePic

    const start = new Date(props.start);
    const startReady = start.toLocaleTimeString('ru-RU', {timeStyle: 'short'});
    const end = new Date(props.end)
    const endReady = end.toLocaleTimeString('ru-RU', {timeStyle: 'short'});

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(props.date).toLocaleDateString('ru-RU', options);

    return(
        <tr>
            <td><img src={photoUrl} alt=""/></td>
            <td>{props.fullName}</td>
            <td>{props.specialization}</td>
            <td>{date}</td>
            <td className="timeCell">{startReady}</td>
            <td className="timeCell">{endReady}</td>
            <td data-id={props.id} className="edit-buttons">
                <AiFillEdit onClick={props.handleEdit} className="table-button" /> <br/>
                <AiFillDelete onClick={props.handleDelete} className="table-button" />
            </td>
        </tr>
    )
}
import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataUser} from "../../dataSources/SidebarDataUser";
import {useCookies} from "react-cookie";

export default function UserVisits() {
    const [appointments, setAppointments] = React.useState([]);
    const [cookies] = useCookies();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/appointments/user/' + cookies.userId)
            return result.json();
        }
        fetchData().then(data => {
            console.log(data);
            setAppointments([...data])
        });
    }, [successMessage])

    const appointmentsToShow = appointments.map((val, i) => {
        return(
            <div className="callback-request-card" key={i}>
                <div>{val.beginning}</div>
                <div className="admin-review-buttons" data-id={val.id}>
                    <button type="reject-button" onClick={handleReject}>
                        Отменить визит
                    </button>
                </div>
            </div>
        )
    })

    async function handleReject(event) {
        const reviewId = event.currentTarget.parentNode.getAttribute("data-id");
        const res = await fetch("http://localhost:8080/api/appointments/" + reviewId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Попробуйте еще раз.");
        } else {
            if(resJson.message) {
                setErrorMessage(resJson.message);
            }else {
                setSuccessMessage("Отклонено!")
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000)
    }


    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataUser} />
                <div className="admin-reviews-messages">
                    <div className="message">{errorMessage ? errorMessage : null}</div>
                    <div className="success-message">{successMessage ? successMessage : null}</div>
                </div>
                <div className="admin-reviews-wrapper">
                    {appointmentsToShow}
                </div>
            </div>
        </div>
    )
}
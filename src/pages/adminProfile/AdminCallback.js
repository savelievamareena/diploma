import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import CallBackRequestCard from "../../components/accountPage/admin/CallBackRequestCard";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";

export default function AdminCallback() {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (cookies.role === "user") {
            navigate("/");
        }
    }, [cookies, navigate])

    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const [callBackRequests, setCallbackRequests] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/callback')
            return result.json();
        }
        fetchData().then(data => {
            setCallbackRequests([...data])
        });
    }, [successMessage])

    async function handleClick(event) {
        const elementId = event.currentTarget.parentNode.getAttribute("data-id");

        const res = await fetch("http://localhost:8080/api/callback/" + elementId, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Error");
        } else {
            if(resJson.message) {
                setErrorMessage(resJson.message);
            }else {
                setSuccessMessage("Обработано!")
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000)
    }

    const callBackRequestCards = callBackRequests.map((val, key) => {
        return(
            <CallBackRequestCard
                key={key}
                name={val.name}
                phoneNumber={val.phoneNumber}
                question={val.question}
                handleClick={handleClick}
                id={val.id}
            />
        )
    })

    function renderCallBackRequestCards() {
        if(callBackRequests.length > 0) {
            return <div className="callBack-cards-wrapper">{callBackRequestCards}</div>;
        } else {
            return <div className="admin-reviews-wrapper">Запросы на обратный звонок отсутствуют</div>;
        }
    }

    return (
        <div className="admin--wrapper">
            <AdminHeader/>
            <div className="account--content-wrapper">
                <Sidebar sidebarData={SidebarDataAdmin} />
                <div>
                    <div className="admin-reviews-messages">
                        {errorMessage && <div className="message">{errorMessage}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                    </div>
                    {
                        renderCallBackRequestCards()
                    }
                </div>
            </div>
        </div>
    )
}
import React from "react"
import Sidebar from "../../components/accountPage/Sidebar";
import AdminHeader from "../../components/accountPage/admin/AdminHeader";
import {SidebarDataAdmin} from "../../dataSources/SidebarDataAdmin";
import ReviewCard from "../../components/accountPage/admin/ReviewCard";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";

export default function AdminReviews() {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (cookies.role === "user") {
            navigate("/");
        }
    }, [cookies, navigate])

    const [reviews, setReviews] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/admin/reviews')
            return result.json();
        }
        fetchData()
            .then(data => {setReviews(prevReviews => [...data]);});
    }, [successMessage])

    async function handleConfirm(event) {
        const reviewId = event.currentTarget.parentNode.getAttribute("data-id");
        const res = await fetch("http://localhost:8080/api/reviews/" + reviewId, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Ошибка");
        } else {
            if(resJson.message) {
                setErrorMessage(resJson.message);
            }else {
                setSuccessMessage("Одобрено!")
            }
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 1000)
    }

    async function handleReject(event) {
        const reviewId = event.currentTarget.parentNode.getAttribute("data-id");
        const res = await fetch("http://localhost:8080/api/reviews/" + reviewId, {
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

    const reviewCards = reviews.map((val, index) => {
        return(
            <ReviewCard
                key={index}
                sender={val.sender}
                id={val.id}
                reviewText={val.reviewText}
                handleConfirm={handleConfirm}
                handleReject={handleReject}
                doctor={val.doctor ? val.doctor : null}
            />
        )
    })

    function renderInputField() {
        if(reviews.length > 0) {
            return <div className="admin-reviews-wrapper">{reviewCards}</div>;
        } else {
            return <div className="admin-reviews-wrapper">Нет отзывов на модерацию</div>;
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
                        renderInputField()
                    }
                </div>
            </div>
        </div>
    )
}
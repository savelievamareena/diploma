import React from "react"
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";

export default function AdminHeader() {
    const navigate = useNavigate();
    const [cookies] = useCookies();

    React.useEffect(() => {
        if (!cookies.authKey) {
            navigate("/login");
        }
    }, [cookies])

    async function handleLogout(event) {
        event.preventDefault();

        const res = await fetch("http://localhost:8080/api/auth/logout", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status === 200) {
            navigate('/login');
        } else {
            console.log(resJson.message);
        }
    }
    return (
        <div className="adminHeader--wrapper">
            <div className="adminHeader-menu">
                <div>
                    <a href="/">вернуться на главную</a>
                </div>
                <div>
                    <div className="admin--welcome">
                    Добро пожаловать, {cookies.role === "admin" ? "admin" : "уважаемый клиент"}.
                </div>
                    <button onClick={handleLogout}>Выйти</button>
                </div>

            </div>
        </div>
    )
}
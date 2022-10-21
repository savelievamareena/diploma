import React from "react"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import Sidebar from "../../components/accountPage/Sidebar";


export default function Account(props) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    React.useEffect(() => {
        if (!cookies.authKey && cookies.role !== "user") {
            navigate("/");
        }
    }, [cookies])

    return(
        <div className="account--wrapper">
            <Sidebar />
        </div>
    )
}
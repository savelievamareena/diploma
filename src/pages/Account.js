import React from "react"
import Header from "../components/Header"
import {useCookies} from "react-cookie";

export default function Account(props) {
    const [cookies, setCookie, removeCookie] = useCookies();

    return(
        <div>
            <Header />
            <div>
                ACCOUNT PAGE
            </div>
        </div>
    )
}
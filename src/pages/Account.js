import React from "react"
import Header from "../components/Header"
import RegistrationForm from "../components/accountPage/RegistrationForm";

export default function Account(props) {
    return(
        <div>
            <Header isAuthenticated = {props.isAuthenticated} />
            <RegistrationForm />
        </div>
    )
}
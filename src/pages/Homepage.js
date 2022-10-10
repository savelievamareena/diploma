import React from "react"
import Header from "../components/Header"
import WelcomeBlock from "../components/homePage/WelcomeBlock";
import AboutUs from "../components/homePage/AboutUs";
import Reviews from "../components/homePage/Reviews";
import Offers from "../components/homePage/Offers";
import Footer from "../components/homePage/Footer";

export default function Homepage(props) {
    return(
        <div className="homepage--wrapper">
            <Header isAuthenticated = {props.isAuthenticated} />
            <WelcomeBlock />
            <AboutUs />
            <Reviews />
            <Offers />
            <Footer />
        </div>
    )
}
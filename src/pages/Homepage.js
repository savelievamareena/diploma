import React from "react"
import Header from "../components/Header"
import WelcomeBlock from "../components/homePage/WelcomeBlock";
import AboutUs from "../components/homePage/AboutUs";
import Reviews from "../components/homePage/Reviews";
import Offers from "../components/homePage/Offers";

export default function Homepage() {
    return(
        <div className="homepage--wrapper">
            <Header />
            <WelcomeBlock />
            <AboutUs />
            <Reviews />
            <Offers />
        </div>
    )
}
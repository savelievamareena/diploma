import React from "react"
import Header from "../components/Header"
import LargeHeader from "../components/homePage/LargeHeader";
import AboutUs from "../components/homePage/AboutUs";
import Reviews from "../components/homePage/Reviews";
import Offers from "../components/homePage/Offers";

export default function Homepage() {
    return(
        <div className="homepage--wrapper">
            <Header />
            <LargeHeader />
            <AboutUs />
            <Reviews />
            <Offers />
        </div>
    )
}
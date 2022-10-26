import React from "react"
import Header from "../components/Header"
import WelcomeBlock from "../components/homePage/WelcomeBlock";
import AboutUs from "../components/homePage/AboutUs";
import Reviews from "../components/homePage/Reviews";
import Offers from "../components/homePage/Offers";
import Footer from "../components/homePage/Footer";
import Doctors from "../components/homePage/Doctors";
import Map from "../components/homePage/Map";

export default function Homepage() {
    return(
        <div className="homepage--wrapper">
            <Header />
            <WelcomeBlock />
            <AboutUs />
            <Reviews />
            <Doctors />
            <Offers />
            <Map />
            <Footer />
        </div>
    )
}
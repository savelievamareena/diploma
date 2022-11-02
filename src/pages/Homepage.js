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
    const [doctors, setDoctors] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/doctors')
            return result.json();
        }
        fetchData()
            .then(data => {setDoctors([...data])});
    }, [])

    return(
        <div className="homepage--wrapper">
            <Header />
            <WelcomeBlock />
            <AboutUs />
            <Reviews doctors={doctors} />
            <Doctors doctors={doctors}/>
            <Offers />
            <Map />
            <Footer />
        </div>
    )
}
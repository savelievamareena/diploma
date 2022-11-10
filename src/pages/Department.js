import React from "react"
import Header from "../components/Header";

export default function Department() {
    const route = window.location.href;
    const routeAsArr = route.split('/');
    const departmentId = routeAsArr[routeAsArr.length - 1];

    const [depWithServices, setDepWithServices] = React.useState([]);
    const [department, setDepartment] = React.useState("");
    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/services/' + departmentId)
            return result.json();
        }
        fetchData()
            .then(data => {
                setDepWithServices([...data])
            });
    }, [departmentId])

    React.useEffect(() => {
        if(depWithServices.length > 0) {
            console.log(depWithServices[0].specialization)
            setDepartment(depWithServices[0].specialization.department.title);
        }

    }, [depWithServices])

    const serviceElements = depWithServices.map((val, i) => {
        return(
            <div className="services-row">
                <div class="services-first-row">
                    <div>{val.title}</div>
                    <h4>{val.price} рублей</h4>
                </div>
                <div>{val.description}</div>
            </div>
        )
    })

    return (
        <div>
            <Header/>
            <div className="services-page-wrapper">
                <div className="department-title-wrapper">
                    <h1>{department}</h1>
                </div>
                <div className="services-list-wrapper">
                    {serviceElements}
                </div>
            </div>
        </div>
    )
}
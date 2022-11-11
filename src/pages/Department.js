import React from "react"
import Header from "../components/Header";

export default function Department() {
    const route = window.location.href;
    const routeAsArr = route.split('/');
    const departmentId = routeAsArr[routeAsArr.length - 1];

    const [servicesWithDepartment, setServicesWithDepartment] = React.useState([]);
    const [department, setDepartment] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/services/' + departmentId)
            return result.json();
        }
        fetchData()
            .then(data => {
                setServicesWithDepartment([...data])
            });
    }, [departmentId])

    React.useEffect(() => {
        if(servicesWithDepartment.length > 0) {
            setDepartment(servicesWithDepartment[0].specialization.department.title);
        }

    }, [servicesWithDepartment])

    const serviceElements = servicesWithDepartment.map((val, i) => {
        return(
            <div className="services-row" key={i}>
                <div className="services-first-row">
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
                    <h1>{department && department}</h1>
                </div>
                <div className="services-list-wrapper">
                    {serviceElements}
                </div>
            </div>
        </div>
    )
}
import React from "react"
import '../../styles/Homepage.css';

export default function Offers() {
    const [departments, setDepartments] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/departments')
            return result.json();
        }
        fetchData()
            .then(data => {setDepartments(() => [...data]);});

    }, [])

    const offerCards = departments.map((val, key) => {
        const link = "/department/" + val.id;
        return(
            <div key={key} className="offers--homepage-card">
                <a href={link}>{val.title}</a>
            </div>
        )
    })

    return(
        <div className="homepageMain--offers homepage--block">
            <h1>Услуги</h1>
            <div className="offers--cards-container">
                {offerCards}
            </div>
        </div>
    )
}
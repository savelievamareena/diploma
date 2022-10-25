import React from "react"
import {useCookies} from "react-cookie";

export default function PersonalInfoManageContent() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const userId = cookies.userId;

    const [message, setMessage] = React.useState("");
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        }
    );

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://localhost:8080/api/users/" + userId)
            return result.json();
        }
        fetchData()
            .then(data => {
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    }
                })
            });
    }, [])

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        const res = await fetch("http://localhost:8080/api/users/" + userId, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setMessage("Error");
        } else {
            if(resJson.message) {
                setMessage(resJson.message);
            }else {
                setMessage("Saved!");
            }
        }
    }

    return (
        <div className="account--right-content-block">
            <form className="form--edit" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div className="firstName form--row">
                        <label className="form__label" htmlFor="firstName">First Name</label>
                        <input className="form__input"
                               name="firstName"
                               type="text"
                               placeholder="First Name"
                               value={formData.firstName}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="lastname form--row">
                        <label className="form__label" htmlFor="lastName">Last Name</label>
                        <input className="form__input"
                               name="lastName"
                               type="text"
                               placeholder="Last Name"
                               value={formData.lastName}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="phoneNumber form--row">
                        <label className="form__label" htmlFor="phoneNumber">Phone Number</label>
                        <input className="form__input"
                               name="phoneNumber"
                               type="text"
                               placeholder="Phone Number"
                               value={formData.phoneNumber}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="email form--row">
                        <label className="form__label" htmlFor="email">Email</label>
                        <input className="form__input"
                               name="email"
                               type="email"
                               placeholder="Email"
                               value={formData.email}
                               required
                               onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="message">{message && <span>{message}</span>}</div>
                <div className="form-footer centered-link-wrapper">
                    <button type="submit" className="register-btn">Update</button>
                </div>
            </form>
        </div>
    )
}
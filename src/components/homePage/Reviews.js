import React from "react"
import '../../styles/Homepage.css';
import reviewsData from "../../dataSources/reviewsData.json"
import {FaRegWindowClose} from "react-icons/fa";

export default function Reviews(props) {
    const [doctors, setDoctors] = React.useState([])
    const [reviews, setReviews] = React.useState(reviewsData.reviews);
    const [reviewShown, setReviewShown] = React.useState(reviews[0]);
    const [popupShown, setPopupShown] = React.useState(false);
    const [formData, setFormData] = React.useState({
        doctorId: 0,
        reviewText: "",
        sender: "",
    });

    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:8080/api/reviews')
            return result.json();
        }
        fetchData()
            .then(data => {setReviews(prevReviews => [...prevReviews, ...data]);});
    }, [successMessage])

    const doctorsSpecOptions = doctors.map((val, key) => {
        return(
            <option key={key} value={val.id}>{val.fullName}, {val.specialization.title}</option>
        )
    })

    React.useEffect(() => {
        setDoctors([...props.doctors])
    }, [props.doctors])

    function handleLeft() {
        setReviewShown(prevReviewShown => {
            const index = reviews.map(object => object.id).indexOf(prevReviewShown.id);
            if(index === 0) {
                return reviews[reviews.length - 1]
            }else {
                return reviews[index - 1]
            }
        })
    }

    function handleRight() {
        setReviewShown(prevReviewShown => {
            const index = reviews.map(object => object.id).indexOf(prevReviewShown.id);
            if(index === (reviews.length - 1)) {
                return reviews[0]
            }else {
                return reviews[index + 1]
            }
        })
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function closeFormHandler() {
        setFormData({
            doctorId: "0",
            reviewText: "",
            sender: "",
        })
        setPopupShown(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch("http://localhost:8080/api/reviews", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const resJson = await res.json();
        if (res.status !== 200) {
            setErrorMessage("Error");
        } else {
            if(!resJson.message) {
                setSuccessMessage("Done!")
                setTimeout(() => {
                    setPopupShown(false)
                }, 500);
            }else {
                setErrorMessage(resJson.message);
            }
        }
    }

    function handleOpenPopup() {
        setPopupShown(true);
    }

    return(
        <div className="homepageMain--reviews homepage--block">
            <h1 className="reviews--header">Отзывы</h1>
            <div className="reviews--wrapper">
                <div className="reviews--leftArrow reviews--arrow" onClick={handleLeft}>
                    &#10140;
                </div>
                <div className="reviews--main">
                    <div className="reviews--text">
                        {reviewShown.reviewText}
                    </div>
                    <div className="reviews--sender">
                        {reviewShown.sender}
                    </div>
                </div>
                <div className="reviews--rightArrow reviews--arrow" onClick={handleRight}>
                    &#10140;
                </div>
            </div>
            <div className="add-review-button">
                <button type="button" onClick={handleOpenPopup}>
                    Оставить отзыв
                </button>
            </div>

            {/*popup block*/}
            <div className="callback-request-form" style={{display: popupShown ? 'block' : 'none' }}>
                <div className="close--callback-form" onClick={closeFormHandler}>
                    <FaRegWindowClose/>
                </div>
                <h3>Оставьте свой отзыв о нашей работе.</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-body">
                        <div className="doctorId form--row">
                            <label className="form__label" htmlFor="doctorId">Врач</label>
                            <select
                                className="form__input"
                                value={formData.doctorId}
                                onChange={handleChange}
                                name="doctorId"
                            >
                                <option value="0">--Не выбрано--</option>
                                {doctorsSpecOptions}
                            </select>
                        </div>
                        <div className="sender form--row">
                            <label className="form__label" htmlFor="sender">Ваше имя</label>
                            <input className="form__input"
                                   name="sender"
                                   type="text"
                                   placeholder="Ваше имя"
                                   value={formData.sender}
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="reviewText form--row">
                            <label className="form__label" htmlFor="reviewText">Отзыв</label>
                            <textarea className="review-form-textarea"
                                      name="reviewText"
                                      type="text"
                                      placeholder="Оставьте свой отзыв о нашей работе"
                                      value={formData.reviewText}
                                      onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="message">{errorMessage && <span>{errorMessage}</span>}</div>
                    <div className="success-message">{successMessage && <span>{successMessage}</span>}</div>
                    <div className="form-footer centered-link-wrapper">
                        <button type="submit" className="callback-submit-btn">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
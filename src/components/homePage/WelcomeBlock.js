import React from "react"
import '../../styles/Homepage.css';

export default function WelcomeBlock() {
    return(
        <div className="homepageMain--header">
            <div className="homepageMain--headerText">
                <h1>Мы рады, что вы выбрали наш центр.</h1>
                <p>«Клиника Реакт» – многопрофильная медицинская компания, крупнейшая в частной медицине Республики Беларусь.
                Работая с 1992 года, мы постоянно расширяем перечень услуг для пациентов, закупаем инновационное
                оборудование и внедряем в практику самые передовые методы диагностики и лечения.</p>
            </div>
        </div>
    )
}
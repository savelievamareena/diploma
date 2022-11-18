import React from "react"

export default function Map() {
    return(
        <div className="map--container homepage--block">
            <div className="map--wrapper">
                <div className="map--text-wrapper">
                    <h1>Клиника Здоровье</h1>
                    <div className="map--text-line-wrapper">
                        <div className="map--text-line-title">Адрес</div>
                        <div className="map--text-line-right-column">
                            <div>Минск,</div>
                            <div>пр. Независимости, 168/3</div>
                        </div>
                    </div>
                    <div className="map--text-line-wrapper">
                        <div className="map--text-line-title">Телефон</div>
                        <div className="map--text-line-right-column">
                            <div>+375 29 101 01 01</div>
                            <div>+375 17 303-03-03</div>
                            <div>(8044)7070707 - директор</div>
                        </div>
                    </div>
                    <div className="map--text-line-wrapper">
                        <div className="map--text-line-title">Email</div>
                        <div className="map--text-line-right-column">
                            <div>bestclinique@gmai.com</div>
                            <div>director@bestclinique.by</div>
                        </div>
                    </div>
                    <div className="map--text-line-wrapper">
                        <div className="map--text-line-title">Время работы</div>
                        <div className="map--text-line-right-column">
                            <div>Пн-пт: 9.00-21.00</div>
                            <div>Сб-вс: 9.00-19.00</div>
                        </div>
                    </div>
                </div>
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe width="700" height="500" id="gmap_canvas"
                                src="https://maps.google.com/maps?q=33%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%BB%D0%B8%D0%BA%D0%BB%D0%B8%D0%BD%D0%B8%D0%BA%D0%B0&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
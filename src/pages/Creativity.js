import React from "react";
import Bulb from "./assets/bulb.jpg"
import House from "./assets/house.jpg"

const Creativity = () => {
    return (
        <section className="fullScreen creativityPage">
            <div className="creativityText">
                <span className="creativityTextWhite">with a passion </span>for art.
            </div>

            <img src={Bulb}  alt="" className="creativityBulb" />
            <img src={House} alt="" className="creativityHouse" />
            
        </section>
    )
}

export default Creativity

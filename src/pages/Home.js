
import React from "react";
import KavinHome from "./assets/KavinHome.png"

const Home = () => {
    return (
        <section className="fullScreen homepage">
            <img className="homeKavinImg" src={KavinHome} alt="Kavin Home" />
            <div className="homeText">
                <div className="homeText"><span className="homeHey">Hey, I'm </span>Kavin</div>
                <div className="homeText">Bharathi</div>
                <div className="homeHey">And this is a bit about myself!</div>
            </div>
        </section>
    )
}

export default Home
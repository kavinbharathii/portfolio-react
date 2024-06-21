import React from "react";
import MazeSpill from "./assets/mazeSpill.png"
import Kavin from "./assets/kavindp.jpg"

const Projects = () => {
    return (
        <section className="fullScreen githubPage">
            <img className="mazeSpillImage" src={MazeSpill} />

            <div className="githubContent">
                <div className="githubCard">
                    <div className="githubCardTop">
                        <img className="githubKavinImg" src={Kavin} />

                        <div>
                            <p className="githubUserName">Kavin Bharathi</p>
                            <p className="githubUserId">@kavinbharathii</p>
                        </div>
                    </div>

                    <a className="githubCardLink" href="https://github.com/kavinbharathii" target="blank_">github.com/kavinbharathii</a>
                </div>


                <div className="githubText">
                    <p>A hectic</p>
                    <p>collection</p>
                    <p>of everything</p>
                    <p>code</p>
                </div>
            </div>
        </section>
    )
}

export default Projects

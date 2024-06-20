import React from "react";
import KavinWindow from "./assets/kavinwindow.jpg"
import GithubIcon from "./assets/github-icon.png"
import LinkedinIcon from "./assets/linkedin-icon.png"
import LanguageBox from "../components/LanguageBox";

const Footer = () => {

    const fluentLanguages = ["English", "Tamil"]
    const basicLanguages = ["German", "French"]

    return (
        <section className="fullScreen footerPage">
            <img src={KavinWindow} className="kavinWindowImg" alt="Dev sitting near a window" />

            <div className="footerContent">
                <div className="footerDevInfo">
                    <p className="footerTitle">// developed by</p>
                    <p className="footerDevName">Kavin Bharathi</p>
                    <p className="footerText">fullstack + AI&ML developer / designer / tryhard</p>
                    <div className="footerSocials">
                        <a href="https://github.com/kavinbharathii" target="_blank">
                            <img className="footerIcons" src={GithubIcon} alt="Icons" />
                        </a>

                        <a href="https://linkedin.com/in/kavinbharathii" target="_blank">
                            <img className="footerIcons" src={LinkedinIcon} alt="Icons " />
                        </a>
                    </div>
                </div>

                <div className="footerLanguagesContainer">
                    <p className="footerTitle">// languages</p>
                    <div className="footerLanguages">
                        <LanguageBox startToken={"fluent {"} content={fluentLanguages} endToken={"}"} color="white" />
                        <LanguageBox startToken={"basic {"} content={basicLanguages} endToken={"}"} color="grey" />
                    </div>
                </div>

                <div className="footerPassion">
                    <p className="footerTitle">// passion</p>
                    <p className="footerText">Everything tech, inspired by creative ventures and</p>
                    <p className="footerText">innovative ideas. Interested in photography, music and</p>
                    <p className="footerText">gaming.</p>
                </div>

            </div>
        </section>
    )
}

export default Footer

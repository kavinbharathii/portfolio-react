import React from "react";
import { useState } from "react";

const ProjectCard = ({ nameProject, linkProject, tagProject, tagColor, content }) => {

    const openProjectLink = () => {
        const newWindow = window.open(linkProject, "_blank")
        if (newWindow) newWindow.opener = null
    }


    const [text, setText] = useState(nameProject)
    const alphas = "abcdefghijklmnopqrstuvwxyz@#$%&*"

    const hackerize = () => {
        let iterations = 0

        const interval = setInterval(() => {
            let newText = text.split("").map((_, index) => {
                if (index < iterations) {
                    return nameProject[index]
                }
                return alphas[Math.floor(Math.random() * alphas.length)]
            }).join("")

            setText(newText)

            if (iterations >= text.length) {
                clearInterval(interval)
            }
            iterations += 1 / 2
        }, 20)
        setText(nameProject)
    }

    return (
        <div className="projectCard" onClick={openProjectLink} onMouseOut={hackerize}>
            <div className="projectCardHeaders">
                <h3 className="projectCardTitle">
                    {text}
                </h3>
                <div className={`projectCardTitle text-cyan-500 ${tagColor}`}>{tagProject}</div>
            </div>
            <div className="projectCardLink">{content}</div>
        </div>
    )
}

export default ProjectCard

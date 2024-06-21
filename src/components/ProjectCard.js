import React from "react";

const ProjectCard = ({ nameProject, linkProject, tagProject, tagColor, content }) => {

    const openProjectLink = () => {
        const newWindow = window.open(linkProject, "_blank")
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className="projectCard" onClick={openProjectLink}>
            <div className="projectCardHeaders">
                <h3 className="projectCardTitle">{nameProject}</h3>
                <div className={`projectCardTitle text-cyan-500 ${tagColor}`}>{tagProject}</div>
            </div>
            <a className="projectCardLink" href={linkProject} target="_blank" rel="noreferrer">{content}</a>
        </div>
    )
}

export default ProjectCard

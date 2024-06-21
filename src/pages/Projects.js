import React from "react";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {

    const tagColors = {
        "DSA": "tagRed",
        "DEV": "tagYellow",
        "AI/ML": "tagBlue",
        "OPN SRC": "tagGreen",
        "OTHERS": "tagStone"
    }

    const wfc = {
        name: "Wave Function Collapse",
        link: "https://github.com/kavinbharathii/wave-function-collapse",
        tag: "DSA",
        content: "An algorithm for procedural image generation"
    }

    const robot = {
        name: "Industrial Scale Robot",
        link: "https://github.com/kavinbharathii/robot_ws",
        tag: "DEV",
        content: "Built using ROS for handling machinery and tools",
    }

    const ga = {
        name: "Genetic Algorithm",
        link: "https://github.com/kavinbharathii/Feature_Selection_Using_GA",
        tag: "AI/ML",
        content: "Using Genetic Algorithm for optimal model feature selection"
    }

    const nerdtree = {
        name: "Nerdtree",
        link: "https://github.com/kavinbharathii/nerdtree",
        tag: "OPN SRC",
        content: "An open source project for a file explorer in terminal"
    }

    const neat = {
        name: "NEAT Algorithm",
        link: "https://github.com/kavinbharathii/flappy_bird_NEAT",
        tag: "AI/ML",
        content: "Using NEAT algorithm for training a game environment"
    }

    const mozhi = {
        name: "Mozhi",
        link: "https://github.com/kavinbharathii/mozhi",
        tag: "DEV",
        content: "An interpreted programming language built on Python"
    }

    const ciph = {
        name: "Ciph",
        link: "https://github.com/kavinbharathii/ciph",
        tag: "DEV",
        content: "A project templating tool built for web developers"
    }

    const optimus = {
        name: "Optimus",
        link: "https://github.com/kavinbharathii/optimus",
        tag: "OPN SRC",
        content: "An open source project for quantifying code optimization"
    }

    const devto = {
        name: "dev.to",
        link: "https://dev.to/kavinbharathi",
        tag: "OTHERS",
        content: "A collection of articles on tech and development"
    }

    return (
        <section className="fullScreen projectsPage">
            <div className='titleCursive'>Projects</div>
            <div className="projectsContainer">
                <div className="projectsRow">
                    <ProjectCard nameProject={wfc.name} linkProject={wfc.link} tagProject={wfc.tag} tagColor={tagColors[wfc.tag]} content={wfc.content}/>
                    <ProjectCard nameProject={robot.name} linkProject={robot.link} tagProject={robot.tag} tagColor={tagColors[robot.tag]} content={robot.content}/>
                    <ProjectCard nameProject={ga.name} linkProject={ga.link} tagProject={ga.tag} tagColor={tagColors[ga.tag]} content={ga.content}/>
                </div>

                <div className="projectsRow">
                    <ProjectCard nameProject={nerdtree.name} linkProject={nerdtree.link} tagProject={nerdtree.tag} tagColor={tagColors[nerdtree.tag]} content={nerdtree.content}/>
                    <ProjectCard nameProject={neat.name} linkProject={neat.link} tagProject={neat.tag} tagColor={tagColors[neat.tag]} content={neat.content}/>
                    <ProjectCard nameProject={mozhi.name} linkProject={mozhi.link} tagProject={mozhi.tag} tagColor={tagColors[mozhi.tag]} content={mozhi.content}/>
                </div>

                <div className="projectsRow">
                    <ProjectCard nameProject={ciph.name} linkProject={ciph.link} tagProject={ciph.tag} tagColor={tagColors[ciph.tag]} content={ciph.content}/>
                    <ProjectCard nameProject={optimus.name} linkProject={optimus.link} tagProject={optimus.tag} tagColor={tagColors[optimus.tag]} content={optimus.content}/>
                    <ProjectCard nameProject={devto.name} linkProject={devto.link} tagProject={devto.tag} tagColor={tagColors[devto.tag]} content={devto.content}/>
                </div>

            </div>
        </section>
    )
}

export default Projects


// Wave function collapse algorithm for procedural generation
// An industrial scale robot for handling machinery and tools
// Using Genetic Algorithm for mdoel feature selection 

import React from "react";
import HackerText from "../components/HackerText";

const Maze = () => {

    return (
        <section className="fullScreen mazePage">
            <div className="mazeContent">
                <HackerText textString={"Creative"} />
                <HackerText textString={"design and"} />
                <HackerText textString={"development"} />
            </div>

        </section>
    )
}

export default Maze


// const [creativeClass, setCreativeClass] = useState("default")
// const [designClass, setDesignClass] = useState("default")
// const [developmentClass, setDevelopmentClass] = useState("default")

// const fontClasses = ["default", "default", "default", "default", "default", "arrayClass", "sharpieClass", "quicksandClass", "satoshiClass"]

// setTimeout(() => {
//     var classIndex = Math.floor(Math.random() * fontClasses.length)
//     var designIndex = Math.floor(Math.random() * fontClasses.length)
//     var developmentIndex = Math.floor(Math.random() * fontClasses.length)

//     setCreativeClass(fontClasses[classIndex])
//     setDesignClass(fontClasses[designIndex])
//     setDevelopmentClass(fontClasses[developmentIndex])
// }, 2000);


import React from "react";


//                          Props
const SkillsBox = ({ startToken, content, endToken }) => {
    return (
        <div className="skillsBox">
            <div className="skillsBoxTitle">{startToken}</div>
            {
                content.map((contentString, key) => (
                    <div className="skillsBoxContent">{contentString}</div>
                ))
            }
            <div className="skillsBoxTitle">{endToken}</div>
        </div>
    )
}

export default SkillsBox

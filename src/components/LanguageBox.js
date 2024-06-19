import React from "react";

const LanguageBox = ({ startToken, content, endToken, color }) => {
    return (
        <div className={`languageBox ${color}`}>
            <div className="languageBoxTitle">{startToken}</div>
            {
                content.map((contentString, key) => (
                    <div className="languageBoxContent">{contentString}</div>
                ))
            }
            <div className="languageBoxTitle">{endToken}</div>
        </div>
    )
}

export default LanguageBox

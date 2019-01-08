import React from 'react';


const DisplayFormattedCode = ({ displayCodeString }) => {
    let displayCode;
    if (displayCodeString) {
        displayCode = displayCodeString;
    }
    else {
        displayCode = "<span>Paste your code in the text area, then click on the submit button.</span>";
    }

    // console.log(displayCode)

    return (
        <div className="margin-md">
            <h2 className="text-center">Preview</h2>
            <br />
            <div className="list-style-none">
                <div dangerouslySetInnerHTML={{ __html: displayCode }} />
            </div>
        </div>

    );
}
// {displayCode}

export default React.memo(DisplayFormattedCode);


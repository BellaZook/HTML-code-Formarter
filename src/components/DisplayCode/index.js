import React from 'react';

const DisplayFormattedCode = ({ displayCodeString }) => {
    let displayCode;
    if (displayCodeString) {
        displayCode = displayCodeString;
    }
    else {
        displayCode = "<span>Paste your code in the text area, then click on the convert button.</span>";
    }

    return (
        <div className="margin-md">
            <h2 className="text-center">Preview</h2>
            <br />
            <div className="code">
                <div dangerouslySetInnerHTML={{ __html: displayCode }} />
            </div>
        </div>

    );
}

export default React.memo(DisplayFormattedCode);


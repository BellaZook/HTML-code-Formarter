// import React from 'react'
// import PropTypes from 'prop-types'

const getReplacementText = (radioStyle, radioFormat, radioJSX, selectedText, color) => {
    let classNameStyle = 'class';
    let textAreaReplacement = "";

    if (radioJSX === 'JSX') {
        classNameStyle = 'className';
    }

    if (radioStyle === 'Style') {
        switch (radioFormat) {
            case 'Color':
                textAreaReplacement = `<span style="color:#${color}; font-weight: bold"> ${selectedText}</span>`;
                break;
            case 'Border':
                textAreaReplacement = `<span style="border: solid #${color}; padding: 0 1px"> ${selectedText}</span>`;
                break;
            default:
                break;
        }
    } else {
        switch (radioFormat) {
            case 'Color':
                textAreaReplacement = `<span ${classNameStyle}="c-${color} f-bold"> ${selectedText}</span>`;
                break;
            case 'Border':
                textAreaReplacement = `<span ${classNameStyle}="bd-color c-${color}"> ${selectedText}</span>`;
                break;
            default:
                break;
        }
    }
    return textAreaReplacement;
}

// getReplacementText.propTypes = {

// }

export default getReplacementText

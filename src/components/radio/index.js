import React from 'react';
import './radio.css';
import RadioButton from './RadioButton';

const RadioButtons = ({ selectedRadio, handleRadioChange }) => {
    // console.log(selectedRadio, handleRadioChange)
    return (
        <div className="margin-sm">
            <RadioButton
                title="Color" selectedRadio={selectedRadio}
                onChange={handleRadioChange}
            />
            <RadioButton
                title="Border" selectedRadio={selectedRadio}
                onChange={handleRadioChange}
            />
        </div>
    );
}

export default RadioButtons;


// <label className="radio">Color
// <input type="radio" name="radio" checked={selectedRadio === "color"} />
//         <span className="checkmark"></span>
//     </label>

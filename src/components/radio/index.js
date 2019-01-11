import React from 'react';
import './radio.css';
import RadioButton from './RadioButton';

const RadioButtons = ({ radioFormat, handleRadioChange }) => {
    // console.log('radio format ', radioFormat)
    return (
        <div className="flexContainer margin-sm">
            <RadioButton
                title="Color" selectedRadio={radioFormat}
                onChange={handleRadioChange}
                radioName="radioFormat"
            />
            <RadioButton
                title="Border" selectedRadio={radioFormat}
                onChange={handleRadioChange}
                radioName="radioFormat"
            />
        </div>
    );
}

export default RadioButtons;



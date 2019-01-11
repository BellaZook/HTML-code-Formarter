import React from 'react';
import RadioButton from '../../radio/RadioButton';
import Checkbox from './Checkbox';

const RadioStart = ({ radioJSX, radioStyle, handleRadioChange }) => {
    // console.log(selectedRadio, handleRadioChange)
    return (
        <div className="flexContainer margin-sm">
            <RadioButton
                title="Style" selectedRadio={radioStyle}
                onChange={handleRadioChange}
                radioName="radioStyle"
            />
            <RadioButton
                title="Class" selectedRadio={radioStyle}
                onChange={handleRadioChange}
                radioName="radioStyle"
            />
            <Checkbox
                title="JSX" selectedRadio={radioJSX}
                onChange={handleRadioChange}
                radioName="radioJSX"
            />
            <span>(class only)</span>
        </div>
    );
}

export default RadioStart;



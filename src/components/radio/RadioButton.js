import React from 'react';
import './radio.css';

const RadioButton = ({ title, selectedRadio, onChange, radioName }) => {
    // console.log('button ', selectedRadio)

    return (
        <label className="radio">{title}
            <input
                type="radio" name={radioName}
                value={title}
                checked={selectedRadio === title}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </label>

    );
}

export default RadioButton;
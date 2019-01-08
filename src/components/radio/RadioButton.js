import React from 'react';

const RadioButton = ({ title, selectedRadio, onChange }) => {
    // console.log(selectedRadio, onChange)

    return (
        <label className="radio">{title}
            <input
                type="radio" name="radio"
                value={title}
                checked={selectedRadio === title}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </label>

    );
}

export default RadioButton;
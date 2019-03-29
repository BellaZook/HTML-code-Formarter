import React from 'react';

const Checkbox = ({ title, onChange, radioName }) => {
    return (
        <label className="radio">{title}
            <input
                type="checkbox"
                value={title}
                name={radioName}
                onClick={onChange}
            />
            <span className="checkmark"></span>
        </label>
    );
}

export default Checkbox;
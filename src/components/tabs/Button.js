import React from 'react';

const Button = ({ name, className, color, onClick }) => {
    return (
        <button
            type="button"
            className={`${className} ${color} btn`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

export default Button;
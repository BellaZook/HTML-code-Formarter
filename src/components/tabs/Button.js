import React from 'react';

const Button = ({ name, className, color, onClick }) => {
    return (
        <button
            type="button"
            className={`btn ${className} ${color}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

export default Button;
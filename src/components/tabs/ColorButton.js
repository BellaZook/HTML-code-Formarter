import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';

const ColorButton = ({ color, onClick }) => {
    return (
        <Button
            color={`bg-${color}`}
            onClick={onClick}
        />
    )
}

ColorButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default ColorButton;

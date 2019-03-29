import React from 'react'
import PropTypes from 'prop-types'
import buttonColors from "./colorButtons.json";
import ColorButton from '../ColorButton.js';

const MapColorButtons = ({ handleAddColor }) => {
    return buttonColors.map((item) => {
        return <ColorButton key={item.color} color={item.color} onClick={(e) => handleAddColor(e, item.color)} />
    })
}

MapColorButtons.propTypes = {
    handleAddColor: PropTypes.func.isRequired
}

export default React.memo(MapColorButtons);

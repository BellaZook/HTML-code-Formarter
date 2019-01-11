import React from 'react';
import Button from '../Button';
import RadioButtons from '../../radio';

const Format = ({ radioFormat, handleRadioChange, handleAddColor, activeTab }) => {
    return (
        <div id="menu" className="tabContent" style={{ display: activeTab === 'Format' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Select some text, then click to change the text color</p>
            <div className="flexContainer flex-vertical flex-warp">
                <RadioButtons
                    radioFormat={radioFormat}
                    handleRadioChange={handleRadioChange}
                />
                <div className="flexContainer flex-horizontal flex-warp">
                    <Button name="Red" color="color-red" onClick={(e) => handleAddColor(e, "red")} />
                    <Button name="Blue" color="color-blue" onClick={(e) => handleAddColor(e, "blue")} />
                    <Button name="Black" color="color-black" onClick={(e) => handleAddColor(e, "black")} />
                    <Button name="Green" color="color-green" onClick={(e) => handleAddColor(e, "green")} />
                </div>
            </div>

        </div>

    );
}

export default Format;
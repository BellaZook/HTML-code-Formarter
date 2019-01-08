import React from 'react';
import Button from '../Button';
import RadioButtons from '../../radio';

const Menu = ({ selectedRadio, handleRadioChange, handleAddColor, activeTab }) => {
    // let styleValue = null;
    // if (activeTab === 'Menu') {
    //     styleValue = { display: "none" }

    // }
    // console.log(activeTab)
    return (
        <div id="menu" className="tabcontent" style={{ display: activeTab === 'Menu' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Select some text, then click to change the text color</p>
            <div className="flexContainer flex-horizontal flex-warp">
                <RadioButtons
                    selectedRadio={selectedRadio}
                    handleRadioChange={handleRadioChange}
                />
                <Button name="Red" color="color-red" onClick={(e) => handleAddColor(e, "red")} />
                <Button name="Blue" color="color-blue" onClick={(e) => handleAddColor(e, "blue")} />
                <Button name="Black" color="color-black" onClick={(e) => handleAddColor(e, "black")} />
                <Button name="Green" color="color-green" onClick={(e) => handleAddColor(e, "green")} />

            </div>

        </div>

    );
}

export default Menu;
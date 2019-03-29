import React from 'react';
import RadioButtons from '../../radio';
import MapColorButtons from './MapColorButtons';

const Format = ({ radioFormat, handleRadioChange, handleAddColor, activeTab }) => {
    return (
        <div id="menu" className="tabContent" style={{ display: activeTab === 'Format' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Paste your code, then click on the convert button.</p>
            <div className="flexContainer flex-vertical flex-warp">
                <RadioButtons
                    radioFormat={radioFormat}
                    handleRadioChange={handleRadioChange}
                />
                <div className="flexContainer flex-horizontal flex-warp">
                    <MapColorButtons handleAddColor={handleAddColor} />
                </div>
            </div>

        </div>

    );
}

export default Format;
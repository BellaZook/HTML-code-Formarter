import React from 'react';
import Button from '../Button';
import RadioStart from './RadioStart';

function Start({
    handleRadioChange, handleSubmit,
    handleReset, activeTab, radioJSX, radioStyle,

}) {

    return (
        <div id="start" className="tabContent" style={{ display: activeTab === 'Start' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Select some text, then click to change the text color</p>
            <div className="flexContainer flex-vertical flex-warp">
                <RadioStart
                    radioJSX={radioJSX}
                    radioStyle={radioStyle}
                    handleRadioChange={handleRadioChange}
                />
                <div className="flexContainer flex-horizontal flex-warp">
                    <Button name="Convert" color="color-black" onClick={(e) => handleSubmit()} />
                    <Button name="Reset" color="color-black" onClick={(e) => handleReset()} />
                </div>

            </div>

        </div>

    );
}

export default Start;
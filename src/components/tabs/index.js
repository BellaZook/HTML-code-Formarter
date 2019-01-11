import React from 'react';
import './tabs.css';
import CssClass from './CssClass';
import Format from './Format';
import Instructions from './Instructions';
import Start from './Start';
import TabButton from './TabButton';

const Tabs = ({
    handleSetActiveTab, activeTab, handleReset,
    handleRadioChange, handleAddColor, handleSubmit,
    radioFormat, radioJSX, radioStyle

}) => {


    return (
        <React.Fragment>
            <div className="tab">
                <TabButton
                    handleSetActiveTab={handleSetActiveTab}
                    activeTab={activeTab}
                    tabName='Start'
                />
                <TabButton
                    handleSetActiveTab={handleSetActiveTab}
                    activeTab={activeTab}
                    tabName='Format'
                />
                <TabButton
                    handleSetActiveTab={handleSetActiveTab}
                    activeTab={activeTab}
                    tabName='CSS'
                />
                <TabButton
                    handleSetActiveTab={handleSetActiveTab}
                    activeTab={activeTab}
                    tabName='Instructions'
                />
            </div>
            <Start
                activeTab={activeTab}
                handleRadioChange={handleRadioChange}
                handleAddColor={handleAddColor}
                handleSubmit={handleSubmit}
                handleReset={handleReset}

                radioJSX={radioJSX}
                radioStyle={radioStyle}
            />
            <Format
                radioFormat={radioFormat}

                handleRadioChange={handleRadioChange}
                handleAddColor={handleAddColor}
                activeTab={activeTab}

            />
            <CssClass activeTab={activeTab} />
            <Instructions activeTab={activeTab} />
        </React.Fragment>
    );
}



export default Tabs;


// <button className="tablinks" onClick={(event) => this.openCity(event, 'list')}>List</button>
//     <div id="list" className="tabcontent">
//         <p style={{ margin: 0 }}>Select some list tag, then click to change its background color</p>
//         <Button name="Red" color="color-red" />
//         <Button name="Blue" color="color-blue" />
//         <Button name="Black" color="color-black" />
//         <Button name="Green" color="color-green" />
//     </div>

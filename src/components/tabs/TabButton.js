import React from 'react';

const TabButton = ({ handleSetActiveTab, activeTab, tabName }) => {
    return (
        <button
            className={`tablinks ${activeTab === tabName && 'active'}`}
            value={tabName}
            onClick={(event) => handleSetActiveTab(event, tabName)}
            id="defaultOpen"
        >
            {tabName}
        </button>
    );
}

export default TabButton;
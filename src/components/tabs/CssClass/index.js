import React from 'react';

const CssClass = ({ activeTab }) => {
    return (
        <div id="css" className="tabContent" style={{ display: activeTab === 'CSS' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Coming Soon</p>
            <p>To Do:  Add radio button (jsx, style, class)</p>
        </div>

    );
}

export default CssClass;
import React from 'react';
import DisplayStyle from './DisplayStyle';

const CssClass = ({ activeTab }) => {
    return (
        <div id="css" className="tabContent" style={{ display: activeTab === 'CSS' ? "block" : "none" }}>
            <h2 style={{ margin: 0 }}>CSS Code</h2>
            <p style={{ margin: 0 }}>Copy and paste into your style sheet.</p>

            <DisplayStyle />
        </div>

    );
}

export default CssClass;
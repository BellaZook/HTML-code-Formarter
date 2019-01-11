import React from 'react';

const Instructions = ({ activeTab }) => {
    return (
        <div id="instructions" className="tabContent" style={{ display: activeTab === 'Instructions' ? "block" : "none" }}>
            <p style={{ margin: 0 }}>Tip:</p>
            <ol><li>Go from right to left.</li></ol>
            <p>Instructions</p>
            <ol>
                <li>Paste your code inside the text area.</li>
                <li>Click on the "Convert" button below the text area</li>
                <li>Select a word to color or add a border around it</li>
                <li>Select the appropriate radio buttons</li>
                <li>Click on the desired color button</li>
            </ol>
            <p>To Do:</p>
            <ul>
                <li>Add svg buttons or image, to save space</li>
                <li>Add tool tip for svg button or image</li>
                <li>Add word and list radio buttons instead of a tab</li>
                <li>Add undo redo button</li>
                <li>Add ability to insert a number in a circle (1,2,3)</li>
                <li>Add inline stile with JSX, currently JSX only work with class</li>
            </ul>
        </div>

    );
}

export default Instructions;
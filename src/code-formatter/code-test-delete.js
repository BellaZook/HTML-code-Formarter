import React from 'react';

const testCode = () => {
    const name = 'test';
    if (name) {
        console.log("has name");
        if (name === 'test') {
            console.log("name is test")
        }
    }
    return (
        <div>
            Test
        </div>
    );
}

export default testCode;
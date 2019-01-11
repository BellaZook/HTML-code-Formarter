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
            <p
                color="blue"
                bg="black"
            >
                test
            </p>
            Test
        </div>
    );
}

export default testCode;
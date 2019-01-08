import React from 'react';
import './styles/page.css';

const Page = (props) => {
    return (
        <div className={`flexContainer ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    );
}

export default Page;
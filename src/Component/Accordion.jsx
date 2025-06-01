import React, { useState } from 'react';
import './Accordion.css'; // Add some styles for the accordion

const Accordion = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="accordion">
            <div className="accordion-header" onClick={onToggle}>
                <h3 className='accordion-title' >{title}</h3>
                {/* <span>{isOpen ? '-' : '+'}</span> */}
            </div>
            {isOpen && <div className="accordion-body">{children}</div>}
        </div>
    );
};

export default Accordion;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const HoverableIcon = ({ DefaultIcon, HoverIcon, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink
            to={link}
            target="_blank"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? <HoverIcon /> : <DefaultIcon />}
        </NavLink>
    );
};

export default HoverableIcon
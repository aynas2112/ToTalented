// ScrollLink.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ScrollLink = ({ to, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    const targetElement = document.getElementById(to.slice(1));

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <RouterLink to={to} onClick={handleClick}>
      {children}
    </RouterLink>
  );
};

export default ScrollLink;

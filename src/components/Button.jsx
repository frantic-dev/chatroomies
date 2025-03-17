import React from 'react';
import '../chatroom.css'; // Assuming this will contain the necessary styles

const Button = ({ onClick, children, color = '#007bff', size = 'medium' }) => {
  const sizeClass = size === 'large' ? 'btn-large' : size === 'small' ? 'btn-small' : 'btn-medium';

  return (
    <button
      onClick={onClick}
      className={`btn ${sizeClass}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default Button;

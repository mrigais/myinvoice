import React from 'react';

const Button = ({ name, onClick }) => {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {name}
    </button>
  );
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default React.memo(Button);

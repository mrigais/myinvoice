import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={modalWrapperStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>x</button>
        <h3>Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

const modalWrapperStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '15px 20px',
  borderRadius: '6px',
  width: '300px',
  textAlign: 'center',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default ErrorModal;

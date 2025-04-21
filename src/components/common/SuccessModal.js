import React, { useEffect } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ message, onClose }) => {
    const navigate = useNavigate();
  if (!message) return null;
  
  const navigateToInvoices = () =>{
    navigate('/')
  }

  return (
    <div style={modalWrapperStyle} onClick={onClose}>
      <div style={modalStyle} >
        <button style={closeBtnStyle} onClick={onClose}>x</button>
        <h3>Success</h3>
        <p>{message}</p>
        <Button name={'Go to invoices => '} onClick={navigateToInvoices}/>
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

export default SuccessModal;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendEmail } from '../utils';
import Button from './common/Button';
import SuccessModal from './common/SuccessModal';
import ErrorModal from './common/ErrorModal';

const InvoicePreview = () => {
  const { id } = useParams();
  const invoice = useSelector((state) => state.invoice.invoices[id]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const isPastDue = new Date(invoice.dueDate) < new Date();

  const handleSendReminder = async () => {
        let emailSent  = await sendEmail(invoice, true);
        console.log('here is the response', emailSent)
        if(emailSent && emailSent.status === 200){
          setShowSuccessModal(true);
        }else{
          setShowErrorModal(true);
        }    
  };

  return (
    <div style={mainContainer}>
      <h1>Invoice Preview</h1>
      <p><strong>To:</strong> {invoice.to}</p>
      <p><strong>Due:</strong> {invoice.dueDate}</p>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Notes:</strong> {invoice.notes}</p>
      <h3>Items</h3>
      <ul>
        {invoice.items.map((item, i) => (
          <li key={i}>
            {item.description} - {item.quantity} x {item.rate} = {item.quantity * item.rate}
          </li>
        ))}
      </ul>
      {true && (
        <Button name={'Send a reminder'} onClick={handleSendReminder}/>
      )}

{showSuccessModal && (
        <SuccessModal message={'Reminder sent successfully'} onClose={()=>{setShowSuccessModal(false)}}/>
      )}
      {showErrorModal && (
        <ErrorModal message={'Issue occured while sending reminder'} onClose={()=>{setShowErrorModal(false)}}/>
      )}
    </div>
  );
};

export default InvoicePreview;

const mainContainer = {
  flexDirection: 'column',
  marginTop: 100,
  display: 'flex',
  gap: 10,
  borderStyle: 'groove',
  borderWidth: 5,
  borderColor: 'black',
  padding: 10,
};

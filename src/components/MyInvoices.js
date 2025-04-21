import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice } from '../store/slices';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../utils';
import SuccessModal from './common/SuccessModal';
import ErrorModal from './common/ErrorModal';

const MyInvoice = () => {
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoice.invoices);
  const dispatch = useDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handleDelete = (id) => {
    dispatch(deleteInvoice(id));
  };

  const handlePreview = (id) => {
    navigate(`/preview/${id}`);
  };

  const handleSendEmail = async (invoice) => {
    let emailSent  = await sendEmail(invoice, false);
    if(emailSent && emailSent.status === 200){
      setShowSuccessModal(true);
    }else{
      setShowErrorModal(true);
    }
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h2>Invoices</h2>
      {invoices && invoices.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice.id}>
                <td>{index + 1}</td>
                <td>{invoice.to}</td>
                <td>{invoice.status}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <button onClick={() => handlePreview(index)}>Preview</button>{' '}
                  <button onClick={() => handleSendEmail(invoice)}>Send Email</button>{' '}
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices found.</p>
      )}

      {showSuccessModal && (
        <SuccessModal message={'Email sent successfully'} onClose={()=>{setShowSuccessModal(false)}}/>
      )}
      {showErrorModal && (
        <ErrorModal message={'Issue occured while sending email'} onClose={()=>{setShowErrorModal(false)}}/>
      )}
    </div>
  );
};

export default MyInvoice;

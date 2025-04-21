import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/slices';
import { validateEmail } from '../utils';
import ErrorModal from './common/ErrorModal';
import Button from './common/Button';
import SuccessModal from './common/SuccessModal';

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const [currentInvoice, setCurrentInvoice] = useState({
    to: '',
    items: [],
    notes: '',
    dueDate: '',
    status: 'Outstanding',
  });
  const [item, setItem] = useState({ description: '', quantity: 0, rate: 0 });
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const addItem = useCallback(() => {
    if (!item.description || !item.quantity || !item.rate) {
      setErr('Please fill all the fields.');
      return;
    }

    setCurrentInvoice({
      ...currentInvoice,
      items: [...currentInvoice.items, { ...item }],
    });
    setItem({ description: '', quantity: 0, rate: 0 });
    setErr('');
  }, [currentInvoice, item]);

  const saveInvoice = useCallback(() => {
    let dataValidation = validateInvoiceData();
    if (dataValidation) {
      dispatch(addInvoice(currentInvoice));
      setCurrentInvoice({
        to: '',
        items: [],
        notes: '',
        dueDate: '',
        rate : '',
        status: 'Outstanding',
      });
      setErr('');
      setSuccess('Invoice created successfully!!');
    }
  }, [currentInvoice]);

  const validateInvoiceData = useCallback(() => {
    const isValidDueDate = new Date(currentInvoice.dueDate) >= new Date(new Date().toDateString());

    if (!currentInvoice.to || !validateEmail(currentInvoice.to)) {
      setErr('Please enter a valid email address.');
      return false;
    }

    if (!currentInvoice.dueDate || !isValidDueDate) {
      setErr('Please select a valid due date (today or future).');
      return false;
    }

    if (currentInvoice.items.length === 0) {
      setErr('Please add at least one item.');
      return false;
    }

    setErr('');
    return true;
  }, [currentInvoice]);

  const deleteItem = (id) => {
    const updatedItems = currentInvoice.items.filter((_, index) => index !== id);
    setCurrentInvoice({ ...currentInvoice, items: updatedItems });
  };

  return (
    <div style={mainContainer}>
      <h1>Create</h1>
      <div>
        <label style={inputLabel}>To: </label>
        <input
          value={currentInvoice.to}
          onChange={(e) => setCurrentInvoice({ ...currentInvoice, to: e.target.value })}
        />
        <label style={inputLabel}>Due By: </label>
        <input
          type="date"
          value={currentInvoice.dueDate}
          onChange={(e) => setCurrentInvoice({ ...currentInvoice, dueDate: e.target.value })}
        />
      </div>
      <h2>Line Items</h2>
      <label style={inputLabel}>Description </label>
      <input
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <label style={inputLabel}>Quantity </label>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: parseFloat(e.target.value) })}
      />
      <label style={inputLabel}>Rate </label>
      <input
        type="number"
        value={item.rate}
        onChange={(e) => setItem({ ...item, rate: parseFloat(e.target.value) })}
      />
      <Button name={'Add'} onClick={addItem} />
      <ul>
        {currentInvoice.items.map((it, idx) => (
          <li key={idx}>
            {it.description} - {it.quantity} x {it.rate} = {it.quantity * it.rate}
            <button onClick={() => deleteItem(idx)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <textarea
          rows="6" cols="50"
          value={currentInvoice.notes}
          placeholder="Add a note"
          onChange={(e) => setCurrentInvoice({ ...currentInvoice, notes: e.target.value })}
        />
      </div>
      <Button name={'Save'} onClick={saveInvoice} />
      {err && <ErrorModal message={err} onClose={() => setErr('')} />}
      {success && <SuccessModal message={success} onClose={() => setSuccess('')} />}
    </div>
  );
};

export default React.memo(CreateInvoice);

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

const inputLabel = {
  fontFamily: '-moz-initial',
  fontSize: 20,
};

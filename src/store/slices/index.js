import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice, index) => index !== action.payload);
    },
  },
});

export const { addInvoice, deleteInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;

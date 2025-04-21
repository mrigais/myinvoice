import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './slices/index';

 const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;

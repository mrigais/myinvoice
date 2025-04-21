import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateInvoice from './components/Create';
import InvoiceList from './components/MyInvoices';
import InvoicePreview from './components/Preview';
import Header from './components/common/Header';
import { SCREEN_WIDTH } from './constants';

const App = () => {
  return (
    <div style={{display: 'flex',justifyContent: 'center'}}>
      {/* <div> */}
        <Header/>
      {/* </div> */}
      <Routes>
      <Route path="/create" element={<CreateInvoice />} />
      <Route path="/" element={<InvoiceList />} />
      <Route path="/preview/:id" element={<InvoicePreview />} />
    </Routes>

    </div>
    
  );
};

export default App;

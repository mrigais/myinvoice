import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div style={{position: 'absolute'}}>
        <h2>
            <nav style={{display: 'flex',justifyItems: 'center',gap: 100,justifyContent: 'space-around', gap: 10}}>
        <Link to="/" style={{}} >View Invoices</Link> | <Link to="/create" style={{}}>Create Invoice</Link>
      </nav></h2>
      
    </div>
  );
};

export default Header;
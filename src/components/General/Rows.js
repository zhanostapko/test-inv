import React from 'react';
import Row from './Row';

const Rows = ({ invoices }) => {
  return (
    <tbody>
      {invoices.map((invoice) => (
        <Row key={invoice.id} invoice={invoice} />
      ))}
    </tbody>
  );
};

export default Rows;

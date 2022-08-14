import { Table as TableScratch } from 'react-bootstrap';
import { useEffect, useState, useCallback } from 'react';
import Rows from './Rows';
import Loader from '../UI/Loader/Loader';

function Table() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const time1 = new Date('9:55');
  console.log(time1);

  const fetchInvoiceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const url = 'https://invoicingtesttask.azurewebsites.net/Invoices';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      setInvoices(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchInvoiceData();
  }, [fetchInvoiceData]);

  return (
    <>
      {isLoading && <Loader />}
      <TableScratch striped bordered hover responsive>
        <thead>
          <tr>
            <th>Period</th>
            <th>Days</th>
            <th>BLH</th>
            <th>OR days</th>
            <th>Extra fee</th>
            <th>Status/Details</th>
          </tr>
        </thead>
        {!isLoading && invoices.length > 0 && <Rows invoices={invoices} />}
      </TableScratch>
      {!isLoading && invoices.length === 0 && !error && (
        <p>No invoices found</p>
      )}

      {!isLoading && error && <p>{error}</p>}
    </>
  );
}

export default Table;

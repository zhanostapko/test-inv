import { useEffect, useState, useCallback } from 'react';
import Rows from './Rows';
import Loader from '../UI/Loader/Loader';
import Table from '../UI/Table/Table';

function TableWrapper() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <Table>
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
      </Table>
      {!isLoading && invoices.length === 0 && !error && (
        <p>No invoices found</p>
      )}

      {!isLoading && error && <p>{error}</p>}
    </>
  );
}

export default TableWrapper;

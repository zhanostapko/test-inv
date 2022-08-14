import React, { useState, useEffect, useCallback } from 'react';
import { Table as TableScratch } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import ConfirmForm from './ConfirmForm';
import classes from './Detail.module.css';
import ArrowBack from '../../assets/icons/circle-arrow-left.svg';

const Detail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState({});

  const { invoiceId } = useParams();
  const location = useLocation();

  const fetchInvoiceDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const url = `https://invoicingtesttask.azurewebsites.net/Invoices/${invoiceId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      setInvoice(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [invoiceId]);

  useEffect(() => {
    fetchInvoiceDetail();
  }, [fetchInvoiceDetail]);

  const getTotal = (key) => {
    let total = 0;

    invoice.activities?.forEach((item) => {
      if (key === 'blh' && item[key]) {
        const minutes =
          +item[key].split(':')[0] * 60 + +item[key].split(':')[1];

        return (total += minutes);
      }
      total += item[key];
    });

    if (key === 'blh') {
      const formattedTotal = +`${Math.trunc(total / 60)}.${
        total - Math.trunc(total / 60) * 60
      }`;

      total = formattedTotal;
    }

    return isNaN(total) ? '' : total;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.arrowBack}>
        <Link to="/">
          <img className={classes.arrow} src={ArrowBack} alt="Back button" />
        </Link>
      </div>
      <TableScratch striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Actual base</th>
            <th>Daily</th>
            <th>BLH (decimal)</th>
            <th>BLH</th>
            <th>STBY</th>
            <th>OR</th>
            <th>GC</th>
            <th>UPL</th>
            <th>Sick</th>
            <th>LT</th>
            <th>Proj.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.activities?.map((activity, index) => {
            const formatDate = () => {
              const date = new Date(activity.date);
              const formattedDate = `${date.getDate()}.${
                +date.getMonth() + 1
              }.${date.getFullYear()}`;
              return formattedDate;
            };

            return (
              <tr key={index}>
                <td>{formatDate()}</td>
                <td>{activity.activity}</td>
                <td>{activity.actualBase}</td>
                <td>{activity.daily}</td>
                <td>{activity.blhDecimal}</td>
                <td>{activity.blh}</td>
                <td>{activity.stby}</td>
                <td>{activity.or}</td>
                <td>{activity.gc}</td>
                <td>{activity.upl}</td>
                <td>{activity.sick}</td>
                <td>{activity.lt}</td>
                <td>{activity.proj}</td>
                <td>{activity.total}</td>
              </tr>
            );
          })}
          <tr className={classes.total}>
            <td>Subtotal</td>
            <td>{getTotal('activity')}</td>
            <td>{getTotal('actualBase')}</td>
            <td>{getTotal('daily')}</td>
            <td>{getTotal('blhDecimal')}</td>
            <td>{getTotal('blh')}</td>
            <td>{getTotal('stby')}</td>
            <td>{getTotal('or')}</td>
            <td>{getTotal('gc')}</td>
            <td>{getTotal('upl')}</td>
            <td>{getTotal('sick')}</td>
            <td>{getTotal('lt')}</td>
            <td>{getTotal('proj')}</td>
            <td>{getTotal('total')}</td>
          </tr>
        </tbody>

        {!isLoading && Object.keys(invoice) === 0 && !error && (
          <p>No invoices found</p>
        )}
      </TableScratch>
      {location.state.status === 'In Process' ? <ConfirmForm /> : ''}

      {!isLoading && error && <p>{error}</p>}
    </>
  );
};

export default Detail;

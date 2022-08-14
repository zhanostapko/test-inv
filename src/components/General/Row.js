import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Row.module.css';

const Row = ({ invoice }) => {
  const { id, days, blh, orDays, extraFee, status, periodMonth, periodYear } =
    invoice;

  return (
    <tr>
      <td className={classes.centered}>
        <Link to={`/${id}`} state={{ status: status }}>
          {periodYear}.{periodMonth}
        </Link>
      </td>
      <td>{days}</td>
      <td>{blh}</td>
      <td>{orDays}</td>
      <td>{extraFee}</td>
      <td
        className={
          status === 'Accepted'
            ? 'table-success'
            : status === 'In Process'
            ? 'table-warning'
            : ''
        }
      >
        {status}
      </td>
    </tr>
  );
};

export default Row;

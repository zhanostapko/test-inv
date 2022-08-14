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
          {periodYear}.{periodMonth < 10 ? `0${periodMonth}` : periodMonth}
        </Link>
      </td>
      <td>{days}</td>
      <td>{blh.toFixed(2)}</td>
      <td>{orDays}</td>
      <td>{extraFee}</td>
      <td
        className={
          status === 'Accepted'
            ? `${classes.accepted}`
            : status === 'In Process'
            ? `${classes.process}`
            : ''
        }
      >
        {status}
      </td>
    </tr>
  );
};

export default Row;

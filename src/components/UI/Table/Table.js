import classes from './Table.module.css';

const Table = ({ children }) => {
  return <table className={classes.table}>{children}</table>;
};

export default Table;

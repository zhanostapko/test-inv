import classes from './Button.module.css';

const Button = ({ title, className, onClick }) => {
  return (
    <button
      value={title}
      onClick={onClick}
      className={`${classes.button} ${className} `}
    >
      {title}
    </button>
  );
};

export default Button;

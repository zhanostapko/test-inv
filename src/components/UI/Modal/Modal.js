import classes from './Modal.module.css';
import { useEffect } from 'react';
import Button from '../Button/Button';

const Modal = ({ onClose, message }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);
  return (
    <div onClick={onClose} className={classes.backdrop}>
      <div className={classes.modal}>
        <p className={classes.text}>{message}</p>
        <Button onClick={onClose} title="Close" />
      </div>
    </div>
  );
};

export default Modal;

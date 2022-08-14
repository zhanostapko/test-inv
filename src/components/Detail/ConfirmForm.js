import { useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './ConfirmForm.module.css';
import { useParams } from 'react-router-dom';

const ConfirmForm = () => {
  const { invoiceId } = useParams();
  const inputRef = useRef(null);
  const [invalid, setInvalid] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      inputRef.current.value === '' &&
      e.target.value.toLowerCase() === 'reject'
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);

      const url = `https://invoicingtesttask.azurewebsites.net/Invoices/${invoiceId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: e.target.value.toLowerCase(),
          comment: inputRef.current.value,
        }),
      });

      !response.ok
        ? setModalMessage('Something went wrong. Please, try again.')
        : setModalMessage('Thank you. We received your message');

      inputRef.current.value = '';

      setModalOpen(true);
    }
  };
  return (
    <div>
      {modalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      <form>
        {invalid ? (
          <p className={classes.invalidText}>
            You have to specify rejection reason.
          </p>
        ) : (
          ''
        )}
        <textarea
          ref={inputRef}
          className={`${classes.input} ${invalid ? classes.invalid : ''}`}
          type="text"
          placeholder="Comments/Rejection reason"
        />
        <div className={classes.actions}>
          <Button
            onClick={submitHandler}
            title="Approve"
            className={classes.approve}
          />
          <Button
            onClick={submitHandler}
            title="Reject"
            className={classes.reject}
          />
        </div>
      </form>
    </div>
  );
};

export default ConfirmForm;

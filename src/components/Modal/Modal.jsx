import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onCloseModal }) => {
  const handleCloseOnOverlay = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  useEffect(() => {
    const handleCloseOnEsc = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleCloseOnEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseOnEsc);
    };
  }, [onCloseModal]);

  return (
    <div className={css.overlay} onClick={handleCloseOnOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

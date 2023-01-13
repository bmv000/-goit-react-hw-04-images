import PropTypes from 'prop-types';
import css from "./Button.module.css";

export function Button({ onClickLoadMore }) {
    return (
        <button className={css.buttonLoader} type="button" onClick={onClickLoadMore}>
        Load more
      </button>
    );
}

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
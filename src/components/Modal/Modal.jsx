import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };
  handleCloseOnEsc = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  handleCloseOnOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseOnEsc);
  }

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleCloseOnOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

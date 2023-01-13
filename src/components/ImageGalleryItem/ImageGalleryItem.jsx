import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css'

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };
   state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

   
  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <li className={css.item} onClick={this.toggleModal}>
          <img className={css.img} src={webformatURL} alt={tags} />
        </li>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}



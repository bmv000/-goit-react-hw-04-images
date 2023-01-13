
import { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import { toast } from 'react-toastify';

import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css'

export class ImageGallery extends Component {
  static propTypes = {
    queryImages: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    isLoading: false,
    isError: false,
   
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQueryImages = prevProps.queryImages;
    const nextQueryImages = this.props.queryImages;

    const prevQueryPage = prevState.page;
    const nextQueryPage = this.state.page;

    if (prevQueryImages !== nextQueryImages) {
      this.setState({ isLoading: true, images: [], page: 1 });

      try {
        if (this.state.page === 1) {
          let images = await api.fetchImages(nextQueryImages, nextQueryPage);
          images = images.map(image => {
            return (image = {
              id: image.id,
              largeImageURL: image.largeImageURL,
              webformatURL: image.webformatURL,
              tags: image.tags,
            });
          });
          this.setState({ images });
        }
      } catch (error) {
        console.log(error);
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevQueryPage !== nextQueryPage) {
      this.setState({ isLoading: true });

      try {
        let images = await api.fetchImages(nextQueryImages, nextQueryPage);
        images = images.map(image => {
          return (image = {
            id: image.id,
            largeImageURL: image.largeImageURL,
            webformatURL: image.webformatURL,
            tags: image.tags,
          });
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      } catch (error) {
        console.log(error);
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }


  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError } = this.state;

    return (
      <>
        {images?.length !== 0 && (
          <div className={css.gallery}>
            {images?.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </div>
        )}
        {isLoading && <Loader />}
        {!isLoading && images?.length !== 0 && (
          <Button onClickLoadMore={this.handleLoadMore} />
        )}
        {isError && toast.error('We have error.')}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
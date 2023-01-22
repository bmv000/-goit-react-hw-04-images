import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import { toast } from 'react-toastify';

import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ queryImages }) => {
  const [query, setQuery] = useState(queryImages);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setQuery(queryImages);
  }, [queryImages]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);

        let images = await api.fetchImages(query, page);
        images = images.map(image => {
          return (image = {
            id: image.id,
            largeImageURL: image.largeImageURL,
            webformatURL: image.webformatURL,
            tags: image.tags,
          });
        });
        setImages(prevState => [...prevState, ...images]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

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
        <Button onClickLoadMore={handleLoadMore} />
      )}
      {isError && toast.error('We have error.')}
    </>
  );
};

ImageGallery.propTypes = {
  queryImages: PropTypes.string.isRequired,
};

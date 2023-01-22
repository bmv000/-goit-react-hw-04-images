import { Component } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [querySubmit, setQuerySubmit] = useState('');

  return (
    <div className={css.app}>
      <Searchbar onSubmitForApp={setQuerySubmit} />
      <ImageGallery queryImages={querySubmit} />
    </div>
  );
};

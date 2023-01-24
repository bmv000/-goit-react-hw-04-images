import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Searchbar = ({ onSubmitForApp }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Searchign form is empty! Please input some text.');
      return;
    }

    onSubmitForApp(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <div className={css.searchbar}>
      <form className={css.search__form} onSubmit={handleSubmit}>
        <button className={css.search__button} type="submit">
          <FaSearch size={32} />
          <label className={css.search__label}>Search</label>
        </button>
        <input
          className={css.search__input}
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};


Searchbar.propTypes = {
  onSubmitForApp: PropTypes.func.isRequired,
};

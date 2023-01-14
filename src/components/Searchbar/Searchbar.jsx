import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  static propTypes = {
    onSubmitForApp: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('Searchign form is empty! Please input some text.');
      return;
    }

    this.props.onSubmitForApp(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className={css.searchbar}>
        <form className={css.search__form} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

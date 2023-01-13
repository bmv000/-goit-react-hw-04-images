import { Component } from 'react';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    querySubmit: '',
  };

  handleFormSubmit = queryImages => {
    this.setState({ querySubmit: queryImages });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmitForApp={this.handleFormSubmit} />
        <ImageGallery queryImages={this.state.querySubmit} />
      </div>
    );
  }
}

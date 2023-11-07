import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Swal from 'sweetalert2';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    valueSearch: null,
    isLoading: false,
    image: null,
    error: null,
    page: 1,
    isModalOpen: false,
    modalData: null,
    totalHits: null,
  };

  onSubmit = valueInput => {
    this.setState({
      valueSearch: valueInput,
    });

    this.fetchImage(valueInput);
  };

  fetchImage = async value => {
    try {
      this.setState({
        isLoading: true,
      });

      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${value}&page=${1}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (data.total === 0) {
        alert('Ничего не найдено');
        return
      }
      this.setState({
        image: [...data.hits],
        totalHits: data.totalHits,
      });

      console.log("Cколько раз вылезло")
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  fetchImageMore = async () => {
    try {
      this.setState({
        isLoading: true,
      });

      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${this.state.valueSearch}&page=${this.state.page}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photosa&orientation=horizontal&per_page=12`
      );

      this.setState({
        image: [...this.state.image, ...data.hits],
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  hendleClickMore = () => {
    let page = this.state.page;
    page += 1;

    this.setState({
      page: page,
    });
  };

  errorMessage = () => {
    Swal.fire({
      title: 'Что то пошло не так =(',
      showClass: {
        popup: `
  animate__animated
  animate__fadeInUp
  animate__faster
`,
      },
      hideClass: {
        popup: `
  animate__animated
  animate__fadeOutDown
  animate__faster
`,
      },
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImageMore();
    }
  }

  chekForValue = () => {
    const { image } = this.state;
    return image !== null && image.length === 0 && image === null;
  };

  handleClickModal = webformatURL => {
    const { image } = this.state;

    if (image && image.length > 0) {
      const matchedImage = image.find(
        item => item.webformatURL === webformatURL
      );

      if (matchedImage) {
        this.setState({
          modalData: matchedImage,
          isModalOpen: true,
        });
      }
    }
  };

  closeModal = e => {
    if (e.target === e.currentTarget) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  closeModalToESCAPE = e => {
    if (e.key === 'Escape') {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  render() {
    const { isLoading, error, image, isModalOpen, modalData, totalHits } =
      this.state;

      
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {error !== null && this.errorMessage()}

        {this.chekForValue() && <p> Запрос не найден</p>}

        <ImageGallery
          imageData={image}
          handleClickModal={this.handleClickModal}
        />
{image === null && <h2>Начните поиск</h2>}
        {image !== null && image.length < totalHits &&  <Button hendleClickMore={this.hendleClickMore} />}
        {isModalOpen && (
          <Modal
            modalData={modalData}
            closeModal={this.closeModal}
            closeModalToESCAPE={this.closeModalToESCAPE}
          />
        )}
      </div>
    );
  }
}

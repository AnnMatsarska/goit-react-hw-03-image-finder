import { Component } from 'react';
import { fetchImages } from 'services/pixabay-api';

import { ImageGalleryList, Item } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notifications } from '../notifications/notifications';
import { animateScroll } from 'react-scroll';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const { IDLE, PENDING, RESOLVED, REJECTED } = STATUS;
export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: IDLE,
    loadMore: false,
    page: 1,
    totalImages: 0,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchedQuery !== this.props.searchedQuery) {
      this.setState({ images: [] });
      this.fetchImages(this.props.searchedQuery);
    }
    if (prevState.page !== this.state.page && this.state.status === RESOLVED) {
      this.fetchImages(this.props.searchedQuery, this.state.page);
    }
  }

  fetchImages = async (searchedQuery, page) => {
    try {
      this.setState({ status: PENDING });
      const fetchedImages = await fetchImages(searchedQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...fetchedImages.hits],
        status: RESOLVED,
        loadMore: this.state.page < Math.ceil(fetchedImages.totalHits / 12),
        totalImages: prevState.totalImages + fetchedImages.hits.length,
      }));
      if (fetchedImages.totalHits === 0) {
        return await Promise.reject(
          new Error(
            toast.warn(
              'Sorry, there are no images matching your search query. Please try again.',
              notifications
            )
          )
        );
      }
    } catch (error) {
      this.setState({
        status: REJECTED,
        error: toast.error(error.message, notifications),
      });
      console.log(error);
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      duration: 1600,
      delay: 10,
      smooth: 'linear',
    });
  };

  openModal = largeImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage,
    }));
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { status, loadMore, images, showModal, largeImage } = this.state;

    if (status === RESOLVED) {
      return (
        <>
          <ImageGalleryList>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <Item key={id} onClick={() => this.openModal(largeImageURL)}>
                  <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
                </Item>
              );
            })}
          </ImageGalleryList>
          {loadMore && <Button onClick={this.onLoadMore} />}
          {showModal && (
            <Modal
              largeImage={largeImage}
              images={images}
              closeModal={this.closeModal}
            />
          )}
        </>
      );
    }
    if (status === PENDING) {
      return <Loader />;
    }
    if (status === REJECTED) {
      return <ToastContainer />;
    }
  }
}

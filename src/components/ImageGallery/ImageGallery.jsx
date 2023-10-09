import { ImageGalleryList, Item } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ImageGalleryList>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <Item key={id} showModal={() => openModal(largeImageURL)}>
              <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
            </Item>
          );
        })}
      </ImageGalleryList>
    </>
  );
};

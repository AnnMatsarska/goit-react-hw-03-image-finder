import { ImageGalleryList, Item } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ImageGalleryList>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <Item key={id}>
              <ImageGalleryItem
                showModal={openModal}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
              />
            </Item>
          );
        })}
      </ImageGalleryList>
    </>
  );
};

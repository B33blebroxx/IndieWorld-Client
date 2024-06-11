import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { Masonry } from '@mui/lab';

export default function PromotionPics({ promotionPics, handleImageClick }) {
  return (
    <Masonry columns={3} spacing={2}>
      {promotionPics.map((pic) => (
        <div key={pic.id}>
          <Image
            src={pic.image}
            alt="Past Show Images"
            fluid
            loading="lazy"
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={() => handleImageClick(pic.image, pic.showName, pic.showDate)}
          />
        </div>
      ))}
    </Masonry>

  );
}

PromotionPics.propTypes = {
  promotionPics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      promotionImage: PropTypes.string,
    }),
  ).isRequired,
  handleImageClick: PropTypes.func.isRequired,
};

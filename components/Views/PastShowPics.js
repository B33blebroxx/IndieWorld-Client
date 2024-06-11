import PropTypes from 'prop-types';
import { ImageList, ImageListItem } from '@mui/material';
import { Image } from 'react-bootstrap';

export default function PromotionPics({ promotionPics, handleImageClick }) {
  return (
    <ImageList sx={{ width: '100%', height: 600, gap: 3 }} variant="quilted" cols={3} rowHeight={121}>
      {promotionPics.map((pic) => (
        <ImageListItem key={pic.id} cols={pic.cols || 1} rows={pic.rows || 1}>
          <Image
            src={pic.promotionImage}
            alt="Past Show Images"
            fluid
            loading="lazy"
            style={{ cursor: 'pointer' }}
            onClick={() => handleImageClick(pic.promotionImage)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

PromotionPics.propTypes = {
  promotionPics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      promotionImage: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleImageClick: PropTypes.func.isRequired,
};

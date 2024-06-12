import {
  Dialog, DialogContent, IconButton, Typography, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'react-bootstrap';
import { DeleteOutline } from '@mui/icons-material';

export default function ImageModal({
  openModal,
  handleCloseModal,
  selectedImage,
  showName,
  showDate,
  handleDeleteImage,
  isDeletable,
}) {
  // Format the showDate to display only the date part
  const formattedDate = new Date(showDate).toLocaleDateString();

  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
      <DialogContent style={{ position: 'relative', background: 'black' }}>
        <IconButton
          style={{
            color: 'white', position: 'absolute', right: 0, top: 0,
          }}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </IconButton>
        {isDeletable && (
          <Button
            onClick={handleDeleteImage}
            size="small"
            style={{
              color: 'red',
              position: 'absolute',
              left: -20,
              top: 69,
            }}
          >
            <DeleteOutline size="small" />
          </Button>
        )}
        <Typography
          variant="h6"
          className="font"
          style={{
            color: 'white', position: 'absolute', top: 10, left: 10,
          }}
        >
          {showName}
        </Typography>
        <Typography
          variant="subtitle1"
          className="font"
          style={{
            color: 'white', position: 'absolute', top: 40, left: 10,
          }}
        >
          {formattedDate}
        </Typography>
        {selectedImage && (
          <Image src={selectedImage} alt="Selected" style={{ width: '100%' }} />
        )}
      </DialogContent>
    </Dialog>
  );
}

ImageModal.propTypes = {
  openModal: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  selectedImage: PropTypes.string,
  showName: PropTypes.string,
  showDate: PropTypes.string,
  handleDeleteImage: PropTypes.func,
  isDeletable: PropTypes.bool,
};

ImageModal.defaultProps = {
  openModal: false,
  handleCloseModal: () => {},
  selectedImage: '',
  showName: '',
  showDate: '',
  handleDeleteImage: () => {},
  isDeletable: false,
};

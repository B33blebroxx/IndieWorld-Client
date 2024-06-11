import { Dialog, DialogContent, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'react-bootstrap';

export default function ImageModal({ openModal, handleCloseModal, selectedImage }) {
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
};
ImageModal.defaultProps = {
  openModal: false,
  handleCloseModal: () => {},
  selectedImage: '',
};

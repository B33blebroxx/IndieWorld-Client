import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Image } from 'react-bootstrap';
import { UserContext } from '../../utils/context/authContext';
import { createPromotionPic } from '../../api/promotionPicApi';

const initialState = {
  image: '',
  showName: '',
  showDate: null,
};

export default function PromotionPicForm({ setPromotionPics }) {
  const [formData, setFormData] = useState({ ...initialState });
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setFormData({ ...initialState });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ ...initialState });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      promotionId: user.promotionId,
    };
    await createPromotionPic(data).then((newPic) => {
      setPromotionPics((prevPics) => [...prevPics, newPic]);
      handleClose();
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Button
        className="font"
        variant="outlined"
        style={{
          marginBottom: '1rem',
          backgroundColor: 'rgba(189, 189, 189, 0.288)',
          opacity: '.9',
          border: '1px solid rgba(255, 255, 255, 0.129)',
          boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
          backdropFilter: 'blur( 7px )',
        }}
        onClick={handleClickOpen}
      >
        Add Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Promotion Image</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormLabel>Show Name</FormLabel>
            <TextField name="showName" value={formData.showName} onChange={handleChange} fullWidth variant="standard" margin="normal" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Show Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Show Date"
                value={formData.showDate}
                onChange={(newValue) => {
                  setFormData((prevData) => ({ ...prevData, showDate: newValue }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth variant="standard" margin="normal" />}
              />
            </LocalizationProvider>
          </FormGroup>
          <FormGroup>
            <FormLabel>Image</FormLabel>
            <TextField type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleFileUpload} variant="standard" margin="normal" fullWidth />
            {formData.image && (
              <div style={{
                marginTop: '1rem', display: 'flex', justifyContent: 'center',
              }}
              >
                <Image key={formData.image} src={formData.image} alt="Promotion Image" style={{ maxWidth: '100%', maxHeight: '400px' }} />
              </div>
            )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PromotionPicForm.propTypes = {
  setPromotionPics: PropTypes.func.isRequired,
};

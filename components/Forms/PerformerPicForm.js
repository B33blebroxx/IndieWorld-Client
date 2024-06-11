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
import Image from 'next/image';
import { UserContext } from '../../utils/context/authContext';
import { createPerformerPic } from '../../api/performerPicApi';

const initialState = {
  image: '',
  showName: '',
  showDate: null,
};

export default function PerformerPicForm({ setPerformerPics }) {
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
      performerId: user.performerId,
    };
    await createPerformerPic(data).then((newPic) => {
      setPerformerPics((prevPics) => [...prevPics, newPic]);
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Performer Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Performer Image</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormLabel>Image</FormLabel>
            <TextField type="file" accept="image/*" onChange={handleFileUpload} variant="outlined" margin="normal" fullWidth />
            {formData.image && (
              <div style={{
                marginTop: '1rem', display: 'flex', justifyContent: 'center',
              }}
              >
                <Image key={formData.image} src={formData.image} alt="Performer Image" style={{ maxWidth: '100%', maxHeight: '400px' }} />
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Show Name</FormLabel>
            <TextField name="showName" value={formData.showName} onChange={handleChange} fullWidth variant="outlined" margin="normal" />
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
                renderInput={(params) => <TextField {...params} fullWidth variant="outlined" margin="normal" />}
              />
            </LocalizationProvider>
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

PerformerPicForm.propTypes = {
  setPerformerPics: PropTypes.func.isRequired,
};

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Image } from 'react-bootstrap';
import { AddBoxOutlined } from '@mui/icons-material';
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
    if (!data.image || !data.showDate || !data.showName) {
      alert('Please fill out all fields before submitting');
      return;
    }
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
      <Button
        variant="contained"
        size="small"
        style={{
          marginBottom: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          opacity: '.88',
          border: '1px solid rgba(255, 255, 255, 0.129)',
          boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
          backdropFilter: 'blur( 7px )',
        }}
        onClick={handleClickOpen}
      >
        <AddBoxOutlined size="small" style={{ color: 'white' }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          <Typography
            className="font"
            component="div"
            variant="h4"
            align="center"
          >
            Add  Image
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            <TextField
              name="showName"
              label="Event Name"
              helperText="(e.g. All Out, Effy's Big Gay Brunch, etc.)"
              value={formData.showName}
              onChange={handleChange}
              fullWidth
              variant="filled"
              margin="normal"
              required
            />
          </FormGroup>
          <br />
          <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={formData.showDate}
                onChange={(newValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    showDate: newValue,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="standard"
                    margin="normal"
                  />
                )}
              />
            </LocalizationProvider>
          </FormGroup>
          <br />
          <FormGroup>
            <TextField
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              variant="standard"
              margin="normal"
              fullWidth
            />
            <FormHelperText>
              (Select an image from an event to upload)
            </FormHelperText>
            {formData.image && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image
                  key={formData.image}
                  src={formData.image}
                  alt="Performer Image"
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
              </div>
            )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Add Image
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PerformerPicForm.propTypes = {
  setPerformerPics: PropTypes.func.isRequired,
};

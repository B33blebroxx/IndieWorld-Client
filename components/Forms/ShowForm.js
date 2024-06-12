import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup, FormLabel, TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { AddBoxOutlined, DesignServices } from '@mui/icons-material';
import { UserContext } from '../../utils/context/authContext';
import { updateShow, createShow } from '../../api/showApi';

const initialState = {
  showName: '',
  showImage: '',
  location: '',
  showDate: null,
  showTime: '',
  price: 0,
};

export default function ShowForm({ showObj, setShows }) {
  const [formData, setFormData] = useState({ ...initialState });
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('showObj:', showObj); // Log showObj for debugging
    if (showObj && showObj.id) {
      setFormData({
        ...showObj,
        showDate: showObj.showDate ? dayjs(showObj.showDate) : null, // Convert to dayjs object
      });
    } else {
      setFormData({ ...initialState });
    }
  }, [showObj]);

  const handleClickOpen = (e) => {
    e.preventDefault();
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
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      promotionId: user.promotionId,
    };
    if (showObj?.id) {
      await updateShow(data)
        .then(() => {
          setShows((prevShows) => prevShows.map((show) => (show.id === data.id ? data : show)));
          handleClose();
          router.push(`/promotions/profile/${user?.promotionId}`);
        })
        .catch((error) => console.error('Error updating show:', error));
    } else {
      await createShow(data)
        .then((newShow) => {
          setShows((prevShows) => [...prevShows, newShow]);
          handleClose();
          router.push(`/promotions/profile/${user?.promotionId}`);
        })
        .catch((error) => console.error('Error creating show:', error));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          showImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          className="font"
          variant="contained"
          style={{
            marginBottom: '1rem',
            backgroundColor: 'rgba(104, 101, 101, 0.4)',
            border: '1.5px solid rgba(255, 255, 255, 0.129)',
            boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
            backdropFilter: 'blur( 7px )',
            color: 'white',
          }}
          type="button"
          size="small"
          onClick={handleClickOpen}
        >
          {showObj?.id ? <DesignServices size="small" /> : <AddBoxOutlined size="small" />}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"><Typography component="div" variant="h6" align="center">Show Form</Typography></DialogTitle>
          <DialogContent style={{ width: '600px' }}>
            <Typography component="div" align="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <div className="form-wrapper">
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">Show Name</Typography>
                      </FormLabel>
                      <TextField id="filled-basic" label="Show Name" variant="filled" name="showName" value={formData.showName} onChange={handleChange} required />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">Location</Typography>
                      </FormLabel>
                      <TextField id="filled-basic" label="Location" variant="filled" name="location" value={formData.location} onChange={handleChange} required />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">
                          Show Date
                        </Typography>
                      </FormLabel>
                      <DatePicker
                        label="Show Date"
                        value={formData.showDate}
                        inputFormat="MM/DD/YYYY"
                        onChange={(newValue) => {
                          setFormData({ ...formData, showDate: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">Show Time</Typography>
                      </FormLabel>
                      <TextField id="filled-basic" label="(ex: Doors @ 5pm Bell @ 6pm)" type="text" variant="filled" name="showTime" value={formData.showTime} onChange={handleChange} required />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">Price</Typography>
                      </FormLabel>
                      <TextField id="filled-basic" label="Price" type="number" variant="filled" name="price" value={formData.price} onChange={handleChange} required />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <FormLabel>
                        <Typography component="div" variant="h7" color="textPrimary">Show Image</Typography>
                      </FormLabel>
                      <TextField type="file" accept="image/*" onChange={handleFileUpload} />
                      {formData.showImage && (
                      <div style={{
                        marginTop: '10px', marginLeft: '60px', width: '400px', height: '400px', position: 'relative',
                      }}
                      >
                        <Image key={formData.showImage} src={formData.showImage} alt="Show Image" layout="fill" objectFit="cover" />
                      </div>
                      )}
                    </FormGroup>
                    <br />
                    <div className="button-container">
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </Box>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button" color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
}

ShowForm.propTypes = {
  showObj: PropTypes.shape({
    id: PropTypes.number,
    showName: PropTypes.string,
    showImage: PropTypes.string,
    location: PropTypes.string,
    showDate: PropTypes.instanceOf(dayjs), // Use dayjs instance
    showTime: PropTypes.string,
    price: PropTypes.number,
    promotionId: PropTypes.number,
  }),
  setShows: PropTypes.func.isRequired,
};

ShowForm.defaultProps = {
  showObj: initialState,
};

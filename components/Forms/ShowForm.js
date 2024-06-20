import React, { useContext, useState, useEffect } from 'react';
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            opacity: '.88',
            border: '1px solid rgba(255, 255, 255, 0.129)',
            boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
            backdropFilter: 'blur( 7px )',
          }}
          type="button"
          size="small"
          onClick={handleClickOpen}
        >
          {showObj?.id ? (
            <DesignServices size="small" />
          ) : (
            <AddBoxOutlined size="small" />
          )}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{ style: { width: '700px', maxWidth: 'none' } }}
        >
          <DialogTitle id="form-dialog-title">
            <Typography
              className="font"
              component="div"
              variant="h4"
              align="center"
            >
              Show Form
            </Typography>
          </DialogTitle>
          <DialogContent style={{ width: '700px' }}>
            <Typography component="div" align="center">
              <FormGroup>
                <TextField
                  id="filled-basic"
                  label="Show Name"
                  helperText="(e.g. All Out, Effy's Big Gay Brunch etc.)"
                  variant="filled"
                  name="showName"
                  value={formData.showName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  id="filled-basic"
                  label="Location"
                  variant="filled"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <br />
              <FormGroup>
                <DatePicker
                  label="Show Date"
                  value={formData.showDate}
                  inputFormat="MM/DD/YYYY"
                  onChange={(newValue) => {
                    setFormData({ ...formData, showDate: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormHelperText>(When is your show?)</FormHelperText>
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  id="filled-basic"
                  label="Doors and Bell Time"
                  helperText="(e.g. Doors @ 5pm Bell @ 6pm)"
                  type="text"
                  variant="filled"
                  name="showTime"
                  value={formData.showTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  id="filled-basic"
                  label="Show Price"
                  helperText="(e.g. 20, 25 etc.)"
                  type="number"
                  variant="filled"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  type="file"
                  variant="filled"
                  accept="jpg, jpeg, png"
                  onChange={handleFileUpload}
                />
                <FormHelperText>
                  (Upload a promotional image/logo for your show)
                </FormHelperText>
                {formData.showImage && (
                  <div
                    style={{
                      marginTop: '1rem',
                      marginLeft: '7%',
                      width: '550px',
                      height: '400px',
                      position: 'relative',
                    }}
                  >
                    <Image
                      key={formData.showImage}
                      src={formData.showImage}
                      alt="Show Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </FormGroup>
              <br />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ color: 'black' }}
              onClick={handleSubmit}
              type="button"
              color="primary"
            >
              {showObj?.id ? 'Update' : 'Create'}
              <Button
                style={{ color: 'black' }}
                onClick={handleClose}
                type="button"
                color="primary"
              >
                Cancel
              </Button>
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

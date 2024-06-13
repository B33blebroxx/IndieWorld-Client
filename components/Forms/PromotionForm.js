/* eslint-disable react/jsx-no-bind */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { getUser, updateUserPromotion } from '../../api/userApi';
import { useAuth } from '../../utils/context/authContext';
import { updatePromotion, createPromotion } from '../../api/promotionApi';

const initialState = {
  promotionName: '',
  acronym: '',
  logo: '',
  hq: '',
  established: '',
  owner: '',
  showFrequency: '',
};

export default function PromotionForm({ promotionObj }) {
  const [formData, setFormData] = useState({ ...initialState });
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (promotionObj) setFormData(promotionObj);
    else setFormData({ ...initialState });
  };

  useEffect(() => {
    if (promotionObj) setFormData(promotionObj);
  }, [promotionObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (promotionObj?.id) {
      await updatePromotion(formData).then(() => router.push('/promotions/all'));
    } else {
      await createPromotion(formData).then((newPromotion) => {
        getUser(user.id).then(() => {
          updateUserPromotion(user.id, newPromotion.id).then(() => router.push(`/promotions/profile/${newPromotion.id}`));
        });
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Button
        className="font"
        style={{ width: '12rem', color: 'white' }}
        color="primary"
        onClick={handleClickOpen}
      >
        {promotionObj ? 'Edit Promotion' : 'Create Promotion'}
      </Button>
      <Dialog
        open={open}
        className="font"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { width: '700px', maxWidth: 'none' } }}
      >
        <DialogTitle>
          <Typography
            component="div"
            className="font"
            variant="h4"
            align="center"
          >
            Promotion Form
          </Typography>
        </DialogTitle>
        <DialogContent style={{ width: '700px' }}>
          <Typography component="div" align="center">
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Promotion Name"
                helperText="(e.g. All Elite Wrestling, New Japan Pro Wrestling, etc.)"
                variant="filled"
                name="promotionName"
                value={formData.promotionName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Promotion Acronym"
                helperText="(e.g. AEW, NJPW, etc.)"
                variant="filled"
                name="acronym"
                value={formData.acronym}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Headquarters"
                helperText="(e.g. Jacksonville, FL, Stamford, CT, etc.)"
                type="text"
                variant="filled"
                name="hq"
                value={formData.hq}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Established"
                helperText="(e.g. 2021, 1999, etc.)"
                variant="filled"
                type="number"
                name="established"
                value={formData.established}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Owner"
                helperText="(e.g. Tony Khan, TKO Holdings, etc...)"
                variant="filled"
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                id="filled-basic"
                label="Description"
                helperText="(e.g. A brief description of your promotion)"
                variant="filled"
                type="text"
                multiline
                maxRows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl variant="filled">
                <Select
                  labelId="showFrequency"
                  label="Show Frequency"
                  size="small"
                  id="showFrequency"
                  name="showFrequency"
                  className="font"
                  sx={{ fontSize: '1.4rem' }}
                  value={formData.showFrequency}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Twice Weekly">Twice Weekly</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
                  <MenuItem value="Twice Monthly">Twice Monthly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Bi-Monthly">Bi-Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                </Select>
                <FormHelperText>
                  (How often does your promotion run shows?)
                </FormHelperText>
              </FormControl>
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                name="image"
                type="file"
                accept="jpg, jpeg, png"
                onChange={handleFileUpload}
                required
                fullWidth
              />
              <FormHelperText>
                (Upload a logo for your promotion)
              </FormHelperText>
              {formData.logo && (
                <div
                  style={{
                    marginTop: '1rem',
                    marginLeft: '19%',
                    width: '400px',
                    height: '400px',
                    position: 'relative',
                  }}
                >
                  <Image
                    key={formData.logo}
                    src={formData.logo}
                    alt="Logo"
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
            color="primary"
          >
            {promotionObj ? 'Update' : 'Create'}
          </Button>
          <Button
            style={{ color: 'black' }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PromotionForm.propTypes = {
  promotionObj: PropTypes.shape({
    id: PropTypes.number,
    promotionName: PropTypes.string,
    acronym: PropTypes.string,
    logo: PropTypes.string,
    hq: PropTypes.string,
    established: PropTypes.number,
    owner: PropTypes.string,
    showFrequency: PropTypes.string,
  }),
};

PromotionForm.defaultProps = {
  promotionObj: initialState,
};

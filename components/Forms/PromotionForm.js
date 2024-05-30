/* eslint-disable react/jsx-no-bind */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, FormGroup, FormHelperText, FormLabel, MenuItem, Select, TextField,
  Typography,
} from '@mui/material';
import { Form } from 'react-bootstrap';
import Image from 'next/image';
import { getUser, updateUserPromotion } from '../../api/userApi';
import { useAuth } from '../../utils/context/authContext';
import { updatePromotion, createPromotion } from '../../api/promotionApi';

const initialState = {
  promotionName: '',
  acronym: '',
  logoUrl: '',
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
    if (promotionObj.id) {
      await updatePromotion(formData).then(() => router.push('/promotions/all'));
    } else {
      await createPromotion(formData)
        .then((newPromotion) => {
          getUser(user.id)
            .then(() => {
              updateUserPromotion(user.id, newPromotion.id)
                .then(() => router.push('/promotions/all'));
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
          logoUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {promotionObj ? 'Edit Promotion' : 'Create Promotion'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography component="div" variant="h6" align="center">Promotion Form</Typography></DialogTitle>
        <DialogContent style={{ width: '600px' }}>
          <Typography component="div" align="center">
            <Box display="flex" flexDirection="column" alignItems="center">
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>
                      <Typography component="div" variant="h7" color="textPrimary">Promotion Name</Typography>
                    </FormLabel>
                    <TextField id="filled-basic" label="(ex: All Elite Wrestling, World Wrestling Entertainment, etc.)" variant="filled" name="promotionName" value={formData.promotionName} onChange={handleChange} required />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel>
                      <Typography component="div" variant="h7" color="textPrimary">Acronym</Typography>
                    </FormLabel>
                    <TextField id="filled-basic" label="(ex: AEW, WWE, etc.)" variant="filled" name="acronym" value={formData.acronym} onChange={handleChange} required />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel> <Typography component="div" variant="h7" color="textPrimary">Headquarters</Typography></FormLabel>
                    <TextField id="filled-basic" label="(ex: Jacksonville, FL, Stamford, CT, etc.)" type="text" variant="filled" name="hq" value={formData.hq} onChange={handleChange} required />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel> <Typography component="div" variant="h7" color="textPrimary">Established</Typography></FormLabel>
                    <TextField id="filled-basic" label="(ex: 2021, 1999, etc.)" variant="filled" type="number" name="established" value={formData.established} onChange={handleChange} required />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel> <Typography component="div" variant="h7" color="textPrimary">Owner</Typography></FormLabel>
                    <TextField id="filled-basic" label="(ex: Tony Khan, TKO Holdings, etc...)" variant="filled" type="text" name="owner" value={formData.owner} onChange={handleChange} required />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel> <Typography component="div" variant="h7" color="textPrimary">Show Frequency</Typography></FormLabel>
                    <FormControl variant="filled">
                      <Select
                        labelId="showFrequency"
                        id="showFrequency"
                        name="showFrequency"
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
                      <FormHelperText>Select how often your promotion has shows</FormHelperText>
                    </FormControl>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <FormLabel> <Typography component="div" variant="h7" color="textPrimary">Logo</Typography></FormLabel>
                    <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
                    {formData.logoUrl && (
                    <div style={{
                      marginTop: '10px', marginLeft: '60px', width: '400px', height: '400px', position: 'relative',
                    }}
                    >
                      <Image key={formData.logoUrl} src={formData.logoUrl} alt="Logo" layout="fill" objectFit="cover" />
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
          <Button onClick={handleClose} color="primary">
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
    logoUrl: PropTypes.string,
    hq: PropTypes.string,
    established: PropTypes.number,
    owner: PropTypes.string,
    showFrequency: PropTypes.string,
  }),
};

PromotionForm.defaultProps = {
  promotionObj: initialState,
};

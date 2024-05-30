import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl, FormGroup, FormHelperText, FormLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { Form } from 'react-bootstrap';
import { updatePromotion, createPromotion } from '../../api/promotionApi';
import { useAuth } from '../../utils/context/authContext';
import { getUser, updateUserPromotion } from '../../api/userApi';

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

  useEffect(() => {
    if (promotionObj) setFormData(promotionObj);
    console.warn(user);
  }, [promotionObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ formData });
    if (promotionObj.id) {
      await updatePromotion(formData).then(() => router.push('/promotions'));
    } else {
      await createPromotion(formData)
        .then((newPromotion) => {
          getUser(user.id)
            .then(() => {
              // Update the user's promotionId with the new promotion's ID
              updateUserPromotion(user.id, newPromotion.id)
                .then(() => router.push('/promotions'));
            });
        });
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          logoUrl: reader.result,
        }));
      };
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Promotion Name</FormLabel>
          <TextField id="filled-basic" label="(ex: All Elite Wrestling, World Wrestling Entertainment, etc.)" variant="filled" name="promotionName" value={formData.promotionName} onChange={handleChange} required />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Acronym</FormLabel>
          <TextField id="filled-basic" label="(ex: AEW, WWE, etc.)" variant="filled" name="acronym" value={formData.acronym} onChange={handleChange} required />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>HQ</FormLabel>
          <TextField id="filled-basic" label="(ex: Jacksonville, FL, Stamford, CT, etc.)" type="text" variant="filled" name="hq" value={formData.hq} onChange={handleChange} required />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Established</FormLabel>
          <TextField id="filled-basic" label="(ex: 2021, 1999, etc.)" variant="filled" type="number" name="established" value={formData.established} onChange={handleChange} required />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Owner</FormLabel>
          <TextField id="filled-basic" label="(ex: Tony Khan, TKO Holdings, etc...)" variant="filled" type="text" name="owner" value={formData.owner} onChange={handleChange} required />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Show Frequency</FormLabel>
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
        <Form.Group>
          <Form.Label>Promotion Logo</Form.Label>
          <Form.Control className="file-upload" variant="sm" type="file" onChange={handleFileUpload} />
        </Form.Group>
        <br />
        <div className="button-container">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
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
    established: PropTypes.string,
    owner: PropTypes.string,
    showFrequency: PropTypes.string,
  }),
};

PromotionForm.defaultProps = {
  promotionObj: initialState,
};

import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions,
  FormLabel,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { UserContext } from '../../utils/context/authContext';
import { createPerformer, updatePerformer } from '../../api/performerApi';
import getRoles from '../../api/roleApi';
import { getUser, updateUserPerformer } from '../../api/userApi';

const initialState = {
  ringName: '',
  image: '',
  bio: '',
  hometown: '',
  accolades: '',
  roleId: '',
  active: false,
};

const PerformerForm = ({ performerObj }) => {
  const [formData, setFormData] = useState({ ...initialState });
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  useContext(UserContext);

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = await getRoles();
      setRoles(fetchedRoles);
    };

    fetchRoles();

    if (user.promotionId && performerObj) {
      setFormData(performerObj);
      setIsActive(performerObj.active);
    }
  }, [user.promotionId, performerObj, user.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const {
      name, value,
    } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setIsActive(event.target.checked);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const performerData = {
      ...formData,
      promotionId: user.promotionId,
      active: isActive,
    };
    if (user.performerId) {
      await updatePerformer(performerData).then(() => router.push(`/performers/profile/${user.performerId}`));
    } else {
      await createPerformer(performerData).then((newPerformer) => {
        getUser(user.id).then(() => updateUserPerformer(user.id, newPerformer.id)).then(() => window.location.reload());
      });
    }
  };

  return (
    <div>
      <Button className="font" style={{ color: 'white' }} onClick={handleClickOpen}>
        {user.performerId ? 'Edit Performer' : 'Create Performer'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{performerObj ? 'Edit Performer' : 'Create Performer'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="normal" variant="outlined" name="ringName" label="Ring Name" type="text" fullWidth value={formData.ringName} onChange={handleChange} />
          <TextField margin="normal" variant="outlined" name="bio" label="Bio" type="text" fullWidth value={formData.bio} onChange={handleChange} />
          <TextField margin="normal" variant="outlined" name="hometown" label="Hometown" type="text" fullWidth value={formData.hometown} onChange={handleChange} />
          <TextField margin="normal" variant="outlined" name="accolades" label="Accolades" type="text" fullWidth value={formData.accolades} onChange={handleChange} />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="roleId" value={formData.roleId} onChange={handleChange}>
              {roles?.map((role) => (
                <MenuItem key={role.id} value={role.id}>{role.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup>
            <FormLabel>
              <Typography component="div" variant="h7" color="textPrimary">Performer Image</Typography>
            </FormLabel>
            <TextField type="file" accept="image/*" onChange={handleFileUpload} variant="outlined" margin="normal" />
            {formData.image && (
            <div style={{
              marginTop: '1rem', marginLeft: '1rem', width: '400px', height: '400px', position: 'relative',
            }}
            >
              <Image key={formData.image} src={formData.image} alt="Performer Image" style={{ marginLeft: '7.5rem', height: '21rem', width: '17rem' }} />
            </div>
            )}
          </FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={isActive}
                onChange={handleCheckboxChange}
                name="active"
                color="primary"
              />
  )}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{performerObj ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PerformerForm.propTypes = {
  performerObj: PropTypes.shape({
    id: PropTypes.number,
    ringName: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    hometown: PropTypes.string,
    accolades: PropTypes.string,
    roleId: PropTypes.number,
    active: PropTypes.bool,
  }),
  roles: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

PerformerForm.defaultProps = {
  performerObj: null,
  roles: null,
};

export default PerformerForm;

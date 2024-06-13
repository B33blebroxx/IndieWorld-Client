import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
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
  instagram: '',
  x: '',
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
    const { name, value } = e.target;
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
        getUser(user.id)
          .then(() => updateUserPerformer(user.id, newPerformer.id))
          .then(() => window.location.reload());
      });
    }
  };

  return (
    <div>
      <Button
        className="font"
        style={{ color: 'white' }}
        onClick={handleClickOpen}
      >
        {user.performerId ? 'Edit Performer' : 'Create Performer'}
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
            {performerObj ? 'Edit Performer' : 'Create Performer'}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ width: '700px' }}>
          <Typography component="div" variant="h7" align="center">
            <FormGroup>
              <TextField
                required
                autoFocus
                margin="normal"
                variant="filled"
                name="ringName"
                label="Ring Name"
                helperText="(e.g. 'Speedball' Mike Bailey, 'The Cleaner' Kenny Omega, etc.)"
                type="text"
                fullWidth
                value={formData.ringName}
                onChange={handleChange}
              />
            </FormGroup>
          </Typography>
          <Typography component="div" align="center">
            <FormGroup>
              <TextField
                required
                margin="normal"
                variant="filled"
                name="bio"
                multiline
                label="Bio"
                helperText="(Tell the fans about yourself...)"
                type="text"
                fullWidth
                value={formData.bio}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                required
                margin="normal"
                variant="filled"
                name="hometown"
                label="Hometown"
                helperText="(e.g. Winnipeg, Manitoba, Canada, Truth or Consequences, New Mexico, etc.)"
                type="text"
                fullWidth
                value={formData.hometown}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                required
                margin="normal"
                variant="filled"
                name="accolades"
                label="Accolades"
                helperText="(e.g. 2x IWGP Heavyweight Champion, 3x Triple Crown Champion, etc.)"
                type="text"
                fullWidth
                value={formData.accolades}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                required
                margin="normal"
                variant="filled"
                name="instagram"
                label="Instagram"
                helperText="(e.g. https://www.instagram.com/yourhandle)"
                type="url"
                fullWidth
                value={formData.instagram}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                required
                margin="normal"
                variant="filled"
                name="x"
                label="X (Twitter)"
                helperText="(e.g. https://twitter.com/yourhandle)"
                type="url"
                fullWidth
                value={formData.x}
                onChange={handleChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl fullWidth>
                <Select
                  required
                  labelId="role-label"
                  id="role"
                  name="roleId"
                  className="font"
                  sx={{ fontSize: '1.4rem' }}
                  value={formData.roleId}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    -Select a Performer Role-
                  </MenuItem>
                  {roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isActive}
                    onChange={handleCheckboxChange}
                    name="active"
                    color="primary"
                    required
                  />
                )}
                label="Active"
              />
            </FormGroup>
            <FormGroup>
              <Typography component="div" variant="h7" color="textPrimary">
                <TextField
                  required
                  type="file"
                  helperText="{Show the fans who you are...}"
                  accept="jpg, jpeg, png"
                  onChange={handleFileUpload}
                  variant="filled"
                  margin="normal"
                />
                {formData.image && (
                  <div
                    style={{
                      marginTop: '1rem',
                      marginLeft: '1rem',
                      width: '400px',
                      height: '400px',
                      position: 'relative',
                    }}
                  >
                    <Image
                      key={formData.image}
                      src={formData.image}
                      alt="Performer Image"
                      style={{
                        marginLeft: '42%',
                        height: '28rem',
                        width: '20rem',
                      }}
                    />
                  </div>
                )}
              </Typography>
            </FormGroup>
            <br />
            <br />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: 'black' }}
            onClick={handleSubmit}
            color="primary"
          >
            {performerObj ? 'Update' : 'Create'}
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
    instagram: PropTypes.string,
    x: PropTypes.string,
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

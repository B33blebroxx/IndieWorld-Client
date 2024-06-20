import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { Image } from 'react-bootstrap';
import { getAllPerformers } from '../../api/performerApi';

export default function PerformerSelectionModal({
  open,
  handleClose,
  handleSave,
  currentPerformers,
}) {
  const [selectedPerformers, setSelectedPerformers] = useState([]);
  const [performers, setPerformers] = useState([]);

  useEffect(() => {
    getAllPerformers().then((data) => {
      setPerformers(data);
    });
  }, []);

  const handleSelect = (performerId) => {
    setSelectedPerformers((prev) => {
      if (prev.includes(performerId)) {
        return prev.filter((id) => id !== performerId);
      }
      return [...prev, performerId];
    });
  };

  const handleSaveClick = () => {
    handleSave(selectedPerformers);
    setSelectedPerformers([]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '700px', maxWidth: 'none' } }}>
      <DialogTitle>
        <Typography component="div" className="font" variant="h4" align="center">
          Add Performers
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {performers
            .filter((performer) => !currentPerformers.includes(performer.id))
            .map((performer) => (
              <Grid item xs={12} sm={6} md={4} key={performer.id}>
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={selectedPerformers.includes(performer.id)}
                        onChange={() => handleSelect(performer.id)}
                      />
                    )}
                    label={(
                      <div style={{ textAlign: 'center' }}>
                        <Image
                          src={performer.image}
                          alt={performer.ringName}
                          fluid
                          rounded
                          style={{ width: '100px', height: '125px', objectFit: 'cover' }}
                        />
                        <Typography component="div" className="font" variant="h6">
                          {performer.ringName}
                        </Typography>
                        <Typography component="div" className="font" variant="body2">
                          {performer.role}
                        </Typography>
                      </div>
                    )}
                  />
                </FormGroup>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'black' }} onClick={handleSaveClick} color="primary">
          Save
        </Button>
        <Button style={{ color: 'black' }} onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PerformerSelectionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  currentPerformers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

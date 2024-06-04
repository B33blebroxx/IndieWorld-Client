import {
  Dialog, DialogTitle, DialogContent, Grid, Button, Checkbox, FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllPerformers } from '../../api/performerApi';

export default function PerformerSelectionModal({
  open, handleClose, handleSave, currentPerformers,
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Performers</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {performers
            .filter((performer) => !currentPerformers.includes(performer.id))
            .map((performer) => (
              <Grid item xs={12} key={performer.id}>
                <FormControlLabel
                  control={<Checkbox checked={selectedPerformers.includes(performer.id)} onChange={() => handleSelect(performer.id)} />}
                  label={`${performer.ringName} (${performer.role.title})`}
                />
              </Grid>
            ))}
        </Grid>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}

PerformerSelectionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  currentPerformers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Image } from 'react-bootstrap';
import { DeleteOutline } from '@mui/icons-material';
import ShowForm from '../Forms/ShowForm';
import { deleteShow } from '../../api/showApi';

export default function ShowCard({ show, userObj, setShows }) {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const showWithDateObject = {
    ...show,
    showDate: new Date(show.showDate),
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    deleteShow(show.id)
      .then(() => {
        setShows((prevShows) => prevShows.filter((s) => s.id !== show.id));
        handleCloseDeleteDialog();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card className="show-card m-2">
      <Link href={`/shows/show-details/${show.id}`}>
        <a>
          <Image
            src={show.showImage}
            alt="Promotion Logo"
            width={445}
            height={275}
          />
          <div className="promotion-card-name">
            <h4>{show.showName}</h4>
          </div>
        </a>
      </Link>
      {userObj && userObj?.promotionId === show.promotionId ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ShowForm
            showObj={showWithDateObject}
            open={open}
            handleClose={handleClose}
            setShows={setShows}
          />
          <Button
            size="small"
            variant="contained"
            style={{
              marginBottom: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              opacity: '.88',
              border: '1px solid rgba(255, 255, 255, 0.129)',
              boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
              backdropFilter: 'blur( 7px )',
            }}
          >
            <DeleteOutline
              size="small"
              color="error"
              onClick={handleOpenDeleteDialog}
            />
          </Button>
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete Show</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this show?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </Card>
  );
}

ShowCard.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    showName: PropTypes.string.isRequired,
    showTime: PropTypes.string.isRequired,
    showDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    showImage: PropTypes.string.isRequired,
    promotionId: PropTypes.number,
  }),
  setShows: PropTypes.func.isRequired,
  userObj: PropTypes.shape({
    promotionId: PropTypes.number.isRequired,
  }),
};

ShowCard.defaultProps = {
  show: null,
  userObj: null,
};

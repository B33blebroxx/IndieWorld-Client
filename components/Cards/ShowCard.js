/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card } from '@mui/material';
import ShowForm from '../Forms/ShowForm';

export default function ShowCard({
  show, userObj, setShows,
}) {
  const [open, setOpen] = useState(false);
  const showWithDateObject = {
    ...show,
    showDate: new Date(show.showDate),
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className="show-card m-2">
      <Link href={`/shows/show-details/${show.id}`}>
        <a>
          <img src={show.showImage} alt="Promotion Logo" width={395} height={275} />
          <div className="promotion-card-name"><h4>{show.showName}</h4></div>
        </a>
      </Link>
      {userObj && userObj?.promotionId === show.promotionId && (
      <ShowForm showObj={showWithDateObject} open={open} handleClose={handleClose} setShows={setShows} />
      )}
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
    promotionId: PropTypes.number.isRequired,
  }).isRequired,
  setShows: PropTypes.func.isRequired,
  userObj: PropTypes.shape({
    promotionId: PropTypes.number.isRequired,
  }).isRequired,
};

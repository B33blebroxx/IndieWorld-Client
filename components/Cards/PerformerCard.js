import { Card, Button } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { UserContext } from '../../utils/context/authContext';

export default function PerformerCard({ performer, onRemove, showPromotionId }) {
  const { user } = useContext(UserContext);

  const handleRemove = () => {
    onRemove(performer.id);
  };

  return (
    <div className="d-flex flex-column align-items-center mb-5">
      <Link href={`/performers/profile/${performer?.id}`} passHref>
        <Card className="performer-card m-2">
          <Image src={performer?.image} style={{ height: '27rem', width: '19rem' }} alt="Performer Image" />
          <div className="performer-card-info">
            <h4>{performer?.ringName}</h4>
            <p>{performer?.role}</p>
          </div>
        </Card>
      </Link>
      {showPromotionId === user.promotionId && (
        <div>
          <Button variant="outlined" color="error" onClick={handleRemove}>Remove Performer</Button>
        </div>
      )}
    </div>
  );
}

PerformerCard.propTypes = {
  showPromotionId: PropTypes.number.isRequired,
  performer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ringName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

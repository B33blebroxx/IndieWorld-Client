import { Card, Button } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CardFooter, Image } from 'react-bootstrap';
import { DeleteOutline } from '@mui/icons-material';
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
          <Image src={performer?.image} style={{ height: '27rem', width: '21rem' }} alt="Performer Image" />
          <CardFooter className="performer-card-info">
            <h4>{performer?.ringName}</h4>
            <p>{performer?.role}</p>
          </CardFooter>
        </Card>
      </Link>
      {showPromotionId === user.promotionId && (
        <div>
          <Button
            className="font"
            variant="outlined"
            color="error"
            onClick={handleRemove}
            style={{
              marginBottom: '1rem',
              backgroundColor: 'rgba(104, 101, 101, 0.4)',
              border: '1.5px solid rgba(255, 255, 255, 0.129)',
              boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
              backdropFilter: 'blur( 7px )',
            }}
          ><DeleteOutline />
          </Button>
        </div>
      )}
    </div>
  );
}

PerformerCard.propTypes = {
  showPromotionId: PropTypes.number,
  performer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ringName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

PerformerCard.defaultProps = {
  onRemove: null,
  showPromotionId: null,
};

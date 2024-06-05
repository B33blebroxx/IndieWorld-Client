import { Card } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function PerformerCard({ performer }) {
  return (
    <Link href={`/performers/profile/${performer?.id}`} passHref>
      <Card className="performer-card m-2">
        <Image src={performer?.image} style={{ height: '27rem', width: '19rem' }} alt="Performer Image" />
        <div className="performer-card-info">
          <h4>{performer?.ringName}</h4>
          <p>{performer?.role.title}</p>
        </div>
      </Card>
    </Link>
  );
}

PerformerCard.propTypes = {
  performer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ringName: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

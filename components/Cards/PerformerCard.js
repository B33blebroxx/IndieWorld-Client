import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function PerformerCard({ performer }) {
  return (
    <Link href={`/performers/profile/${performer.id}`}>
      <div className="performer-card">
        <Image src={performer.image} style={{ maxHeight: '25rem' }} alt="Performer" />
        <div className="performer-card-info">
          <h4>{performer.ringName}</h4>
          <p>{performer.role}</p>
        </div>
      </div>
    </Link>
  );
}

PerformerCard.propTypes = {
  performer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ringName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

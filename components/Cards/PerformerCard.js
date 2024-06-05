import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function PerformerCard({ performer }) {
  return (
    <Link href={`/performers/profile/${performer?.id}`}>
      <div className="performer-card">
        <Image src={performer?.image} style={{ height: '27rem', width: '19rem' }} alt="Performer Image" />
        <div className="performer-card-info">
          <h4>{performer?.ringName}</h4>
          <p>{performer?.role.title}</p>
        </div>
      </div>
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

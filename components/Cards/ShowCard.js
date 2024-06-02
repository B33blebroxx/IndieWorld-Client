/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ShowCard({ show }) {
  return (
    <Link href={`/shows/show-page/${show.id}`}>
      <a>
        <img src={show.showImage} alt="Promotion Logo" width={350} height={200} />
        <div className="promotion-card-name"><h4>{show.showName}</h4></div>
      </a>
    </Link>
  );
}

ShowCard.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    showName: PropTypes.string.isRequired,
    showType: PropTypes.string.isRequired,
    showTime: PropTypes.string.isRequired,
    showDay: PropTypes.string.isRequired,
    showDescription: PropTypes.string.isRequired,
    showImage: PropTypes.string.isRequired,
  }).isRequired,
};

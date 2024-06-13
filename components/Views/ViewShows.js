import PropTypes from 'prop-types';
import ShowCard from '../Cards/ShowCard';

export default function ViewShows({ shows, user, setShows }) {
  return (
    <div className="show-cards-container">
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          show={show}
          userObj={user}
          setShows={setShows}
        />
      ))}
    </div>
  );
}

ViewShows.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      showName: PropTypes.string.isRequired,
      showTime: PropTypes.string.isRequired,
      showDate: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      showImage: PropTypes.string.isRequired,
      promotionId: PropTypes.number,
    }),
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    promotionId: PropTypes.number,
  }),
  setShows: PropTypes.func.isRequired,
};

ViewShows.defaultProps = {
  user: null,
};

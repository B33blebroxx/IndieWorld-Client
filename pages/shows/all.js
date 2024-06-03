import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllShows } from '../../api/showApi';
import ShowCard from '../../components/Cards/ShowCard';

export default function Shows({ initialShows }) {
  const [shows, setShows] = useState(initialShows || []);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const allShows = await getAllShows();
        setShows(allShows);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    if (!initialShows) {
      fetchShows();
    }
  }, []);

  return (
    <>
      <div>
        <h2>All Shows</h2>
      </div>
      <div className="card-container">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} setShows={setShows} />
        ))}
      </div>
    </>
  );
}

Shows.propTypes = {
  initialShows: PropTypes.string,
};
Shows.defaultProps = {
  initialShows: null,
};

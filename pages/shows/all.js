import { useEffect, useState } from 'react';
import { getAllShows } from '../../api/showApi';
import ShowCard from '../../components/Cards/ShowCard';

export default function AllShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const allShows = await getAllShows();
        setShows(allShows);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };
    fetchShows();
  }, []);

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'left', color: 'white', paddingBottom: '10px' }}>All Shows</h2>
      </div>
      <div className="card-container">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} setShows={setShows} />
        ))}
      </div>
    </>
  );
}

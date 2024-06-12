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
      <br />
      <div style={{ display: 'flex' }}>
        <h2 style={{
          textAlign: 'center',
          color: 'white',
          paddingBottom: '10px',
          marginBottom: '1rem',
          backgroundColor: 'rgba(104, 101, 101, 0.4)',
          border: '1.5px solid rgba(255, 255, 255, 0.129)',
          boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
          backdropFilter: 'blur( 7px )',
          width: 'fit-content',
          padding: '.5rem',
          margin: 'auto',
        }}
        >All Shows
        </h2>
      </div>
      <br />
      <br />
      <div className="card-container">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} setShows={setShows} />
        ))}
      </div>
    </>
  );
}

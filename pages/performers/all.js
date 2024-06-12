import { useEffect, useState } from 'react';
import PerformerCard from '../../components/Cards/PerformerCard';
import { getAllPerformers } from '../../api/performerApi';

export default function AllPerformers() {
  const [performers, setPerformers] = useState([]);

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const allPerformers = await getAllPerformers();
        setPerformers(allPerformers);
      } catch (error) {
        console.error('Error fetching performers:', error);
      }
    };

    fetchPerformers();
  }, []);

  return (
    <>
      <br />
      <br />
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
      >All Performers
      </h2>
      <br />
      <br />
      <div className="performer-card-container">
        {performers.map((performer) => (
          <PerformerCard key={performer.id} performer={performer} />
        ))}
      </div>
    </>
  );
}

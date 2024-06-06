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
      <h2 style={{ textAlign: 'left', color: 'white', paddingBottom: '10px' }}>All Performers</h2>
      <div className="card-container">
        {performers.map((performer) => (
          <PerformerCard key={performer.id} performer={performer} />
        ))}
      </div>
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import Loading from '../../../components/Loading';
import { getAShowAndItsPerformers } from '../../../api/showApi';
import { UserContext } from '../../../utils/context/authContext';
import PerformerCard from '../../../components/Cards/PerformerCard';

export default function ShowDetails() {
  const [showDetails, setShowDetails] = useState({});
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAShowAndItsPerformers(id);
      setShowDetails(result);
      setPerformers(result?.performers);
      setLoading(false);
    };
    fetchData();
    console.warn(user);
  }, [id]);

  if (loading) {
    return <div><Loading /></div>;
  }
  return (
    <>
      <Card style={{ maxWidth: '100%', maxHeight: '40rem' }} className="showInfo">
        <div style={{ display: 'flex' }}>
          <CardMedia
            style={{
              flex: '1 0 33%', maxHeight: '40rem', maxWidth: '50%', objectFit: 'contain',
            }}
            component="img"
            image={showDetails?.showImage}
            alt="Show Logo"
          />
          <CardContent style={{ flex: '1 0 50%', maxHeight: 'fit' }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="div">
                {showDetails?.showName}
              </Typography>
              <Typography variant="body1" component="div">
                Date: {showDetails?.showDate}
              </Typography>
              <Typography variant="body1" component="div">
                Time: {showDetails?.showTime}
              </Typography>
              <Typography variant="body1" component="div">
                Location: {showDetails?.location}
              </Typography>
              <Typography variant="body1" component="div">
                Door Price: {showDetails?.price}
              </Typography>
              <Typography variant="body1" component="div">
                Description: {showDetails?.description}
              </Typography>
            </Stack>
          </CardContent>
        </div>
      </Card>
      <br />
      <br />
      <div className="text-center">
        <h4>Performers:</h4>
      </div>
      <div className="performer-card-container">
        {performers.map((performer) => (
          <PerformerCard key={performer.id} performer={performer} />
        ))}
      </div>
    </>
  );
}

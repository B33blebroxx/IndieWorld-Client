import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Stack } from 'react-bootstrap';
import { UserContext } from '../../../utils/context/authContext';
import { getAPerformerAndTheirShows } from '../../../api/performerApi';
import ShowCard from '../../../components/Cards/ShowCard';

export default function PerformerProfile() {
  const [performer, setPerformer] = useState({});
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAPerformerAndTheirShows(id);
      setPerformer(result);
      setShows(result?.shows);
      setLoading(false);
    };
    fetchData();
  }, [user, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Card style={{ maxWidth: 'contain', maxHeight: '40rem' }} className="performerInfo">
        <div style={{ display: 'flex' }}>
          <CardMedia
            style={{
              flex: '1 0 33%', maxHeight: '40rem', maxWidth: '50%', objectFit: 'fill',
            }}
            component="img"
            image={performer?.image}
            alt="Performer Image"
            className="CardMedia"
          />
          <CardContent style={{ flex: '1 0 50%', maxHeight: 'fit' }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="div">
                {performer?.ringName}
              </Typography>
              <Typography variant="body1" component="div">
                Role: {performer?.role?.title}
              </Typography>
              <Typography variant="body2" component="div">
                Bio: {performer?.bio}
              </Typography>
            </Stack>
          </CardContent>
        </div>
      </Card>
      <br />
      <br />
      <div className="text-center">
        <h4>Shows:</h4>
      </div>
      <br />
      <br />
      <div className="card-container d-flex flex-wrap justify-content-center">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </>
  );
}

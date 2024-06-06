import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, Divider, Typography,
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
      <Card style={{ maxWidth: 'contain', height: '25rem' }} className="performerInfo">
        <div style={{ display: 'flex' }}>
          <CardMedia
            style={{
              width: '300px',
              height: '25rem', // fixed height
              objectFit: 'fill',
            }}
            component="img"
            image={performer?.image}
            alt="Performer Image"
            className="CardMedia"
          />
          <CardContent style={{
            flex: '1 0 50%', overflowY: 'auto', maxHeight: '25rem', margin: 0, padding: 0,
          }}
          >
            <Stack spacing={2}>
              <Typography variant="h4" component="div" align="center" style={{ color: 'white' }}>
                {performer?.ringName}
              </Typography>
              <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
              <Typography variant="h5" component="div" align="center" style={{ color: 'white' }}>
                Hometown: {performer?.hometown}
              </Typography>
              <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
              <Typography variant="h5" component="div" align="center" style={{ color: 'white' }}>
                Role: {performer?.role}
              </Typography>
              <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
              <Typography variant="h5" component="div" align="center" style={{ color: 'white' }}>
                Accolades: {performer?.accolades}
              </Typography>
              <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
              <Typography variant="h5" component="div" align="center" style={{ color: 'white' }}>
                Status: {performer?.active ? 'Active' : 'Inactive'}
              </Typography>
              <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
              <Typography variant="h5" component="div" align="center" style={{ color: 'white' }}>
                Bio: {performer?.bio}
              </Typography>
            </Stack>
          </CardContent>
        </div>
      </Card>
      <br />
      <br />
      <div className="text-center">
        <h4 style={{ color: 'grey' }}>Upcoming Shows:</h4>
      </div>
      <br />
      <br />
      <div className="card-container d-flex flex-wrap justify-content-center">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} setShows={setShows} />
        ))}
      </div>
    </>
  );
}

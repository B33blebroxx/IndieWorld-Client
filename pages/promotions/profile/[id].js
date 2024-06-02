import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import { getAPromotionAndItsShows } from '../../../api/promotionApi';
import ShowCard from '../../../components/Cards/ShowCard';
import ShowForm from '../../../components/Forms/ShowForm';
import { UserContext } from '../../../utils/context/authContext';

export default function PromotionPage() {
  const [promotion, setPromotion] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!user.promotionId && promotion?.id) {
        setLoading(true);
        return;
      }
      const result = await getAPromotionAndItsShows(id);
      setPromotion(result);
      setLoading(false);
    };
    fetchData();
  }, [id, user]);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading indicator
  }
  return (
    <>
      <Card style={{ maxWidth: '100%', maxHeight: '23rem' }} className="promotionInfo">
        <div style={{ display: 'flex' }}>
          <CardMedia
            style={{
              flex: '1 0 33%', maxHeight: '23rem', maxWidth: '50%', objectFit: 'contain',
            }}
            component="img"
            image={promotion?.logo}
            alt="Promotion Logo"
          />
          <CardContent style={{ flex: '1 0 50%', maxHeight: 'fit' }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="div">
                {promotion?.promotionName} ({promotion?.acronym})
              </Typography>
              <Typography variant="body1" component="div">
                Based out of {promotion?.hq}
              </Typography>
              <Typography variant="body1" component="div">
                Est. in {promotion?.established}
              </Typography>
              <Typography variant="body1" component="div">
                Owned By: {promotion?.owner}
              </Typography>
              <Typography variant="body1" component="div">
                Show Frequency: {promotion?.showFrequency}
              </Typography>
              <Typography variant="body1" component="div">
                {promotion?.description}
              </Typography>
            </Stack>
          </CardContent>
        </div>
      </Card>
      <br />
      <br />
      <div className="text-center">
        <h2>Upcoming Shows</h2>
        {user.promotionId === promotion?.id && (
        <div style={{ textAlign: 'left' }}>
          <ShowForm />
        </div>
        )}
      </div>
      <div className="show-cards-container">
        {promotion?.shows?.map((show) => <ShowCard key={show.id} show={show} />)}
      </div>
    </>
  );
}

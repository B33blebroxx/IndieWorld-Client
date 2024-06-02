import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import { getAPromotionAndItsShows } from '../../../api/promotionApi';
import ShowCard from '../../../components/Cards/ShowCard';

export default function PromotionPage() {
  const [promotion, setPromotion] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getAPromotionAndItsShows(id).then(setPromotion);
  }, [promotion]);

  return (
    <>
      <Card style={{ maxWidth: '100%', maxHeight: '21rem' }} className="promotionInfo">
        <div style={{ display: 'flex' }}>
          <CardMedia
            style={{
              flex: '1 0 33%', maxHeight: '21rem', maxWidth: '50%', objectFit: 'contain',
            }}
            component="img"
            image={promotion?.logo}
            alt="Promotion Logo"
          />
          <CardContent style={{ flex: '1 0 50%', objectFit: 'contain' }}>
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
      <div className="show-cards-container">
        {promotion?.shows?.map((show) => <ShowCard key={show.id} show={show} />)}
      </div>
    </>
  );
}

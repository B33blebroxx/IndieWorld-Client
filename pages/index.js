import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import PromotionForm from '../components/Forms/PromotionForm';
import { getPromotion } from '../api/promotionApi';

function Home() {
  const { user } = useAuth();
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    if (user.promotionId) {
      getPromotion(user.promotionId).then((promotionData) => {
        setPromotion(promotionData);
      });
    }
  }, [user.promotionId]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <br />
      <div id="landing-page-buttons">
        <Stack spacing={3}>
          <PromotionForm promotionObj={promotion} />
          <Button variant="contained" size="medium">Create Performer</Button>
          <Button variant="contained" size="medium">Shows</Button>
        </Stack>
      </div>
    </div>
  );
}

export default Home;

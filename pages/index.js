import { useEffect, useState } from 'react';
import {
  Button, Card, Stack,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import PromotionForm from '../components/Forms/PromotionForm';
import PerformerForm from '../components/Forms/PerformerForm';
import { getPromotion } from '../api/promotionApi';
import { getAPerformer } from '../api/performerApi';

function Home() {
  const { user } = useAuth();
  const [promotion, setPromotion] = useState(null);
  const [performer, setPerformer] = useState(null);
  const [openPromotionForm, setOpenPromotionForm] = useState(false);
  const [openPerformerForm, setOpenPerformerForm] = useState(false);

  useEffect(() => {
    if (user.promotionId) {
      getPromotion(user.promotionId).then((promotionData) => {
        setPromotion(promotionData);
      });
    }
  }, [user.promotionId]);

  useEffect(() => {
    if (user.performerId) {
      getAPerformer(user.performerId).then((performerData) => {
        setPerformer(performerData);
      });
    }
  }, [user.performerId]);

  return (
    <Card
      id="home-card"
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '40rem',
        padding: '30px',
        width: '30rem',
        margin: '0 auto',
        marginTop: '10rem',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <br />
      <Stack spacing={2}>
        {/* ButtonGroup for actions */}
        <Link href="/shows/all" passHref><Button style={{ color: 'white' }}>Shows</Button></Link>
        <PromotionForm open={openPromotionForm} onClose={() => setOpenPromotionForm(false)} promotionObj={promotion} />
        <PerformerForm open={openPerformerForm} onClose={() => setOpenPerformerForm(false)} performerObj={performer} />
      </Stack>
    </Card>
  );
}

export default Home;

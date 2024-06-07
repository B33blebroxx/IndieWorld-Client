import { useEffect, useState } from 'react';
import {
  Button, Card, Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import PromotionForm from '../components/Forms/PromotionForm';
import PerformerForm from '../components/Forms/PerformerForm';
import { getPromotion } from '../api/promotionApi';
import { getAPerformer } from '../api/performerApi';
import logo from '../utils/data/IndieWorldLogoNoBackground.png';

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
      className="font text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Image id="logo" src={logo} objectFit="contain" height={300} width={300} alt="Indie World Logo" />
      <Typography className="font" variant="h4" color="white">{user.fbUser.displayName}<br /> Welcome To Indie World </Typography>
      <br />
      <Stack spacing={2}>
        {/* ButtonGroup for actions */}
        <Link href="/shows/all" passHref><Button className="font" style={{ color: 'white' }}>Shows</Button></Link>
        <PromotionForm open={openPromotionForm} onClose={() => setOpenPromotionForm(false)} promotionObj={promotion} />
        <PerformerForm open={openPerformerForm} onClose={() => setOpenPerformerForm(false)} performerObj={performer} />
      </Stack>
    </Card>
  );
}

export default Home;

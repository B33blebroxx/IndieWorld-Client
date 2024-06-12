import { useEffect, useState } from 'react';
import {
  Button, Card, CardMedia, Divider, Stack,
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
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
      id="home-card"
      className="text-center"
    >
      <CardMedia objectFit="contain">
        <Image id="logo" height={200} width={200} quality={100} src={logo} objectFit="contain" alt="Indie World Logo" />
      </CardMedia>
      <Typography className="font" variant="h4" color="white">{user.fbUser.displayName}<br /> Welcome To Indie World </Typography>
      <br />
      <Stack spacing={2}>
        <Link href="/shows/all" passHref><Button className="font" style={{ color: 'white' }}>Shows</Button></Link>
        <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} />
        <Link href="/performers/all" passHref><Button className="font" style={{ color: 'white' }}>Performers</Button></Link>
        <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} />
        <Link href="/promotions/all" passHref><Button className="font" style={{ color: 'white' }}>Promotions</Button></Link>
        <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} />
        <PromotionForm open={openPromotionForm} onClose={() => setOpenPromotionForm(false)} promotionObj={promotion} />
        <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} />
        <PerformerForm open={openPerformerForm} onClose={() => setOpenPerformerForm(false)} performerObj={performer} />
      </Stack>
      <br />
    </Card>
  );
}

export default Home;

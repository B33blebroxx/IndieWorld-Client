import React from 'react';
import {
  Button, Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logo from '../utils/data/IndieWorldLogoNoBackground.png';

function Signin() {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      id="home-card"
      className="text-center"
    >
      <CardMedia>
        <Image
          id="logo"
          height={200}
          width={200}
          quality={100}
          src={logo}
          alt="Indie World Logo"
        />
      </CardMedia>
      <Typography className="font" color="white">
        <CardContent component="h1">Hi there!</CardContent>
        <CardContent component="h3">Click the button below to login!</CardContent>
        <Button
          type="button"
          variant="outlined"
          size="med"
          style={{
            alignSelf: 'center', width: '6rem', color: 'white', borderColor: 'white',
          }}
          className="copy-btn"
          onClick={signIn}
        >
          Sign In
        </Button>
      </Typography>
    </Card>
  );
}

export default Signin;

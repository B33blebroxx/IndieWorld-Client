import React from 'react';
import {
  Button,
  Drawer,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Image from 'next/image';
import smallLogo from '../utils/data/IndieWorldLogoNoBackground.png';
import { signOut } from '../utils/auth';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 300,
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Gemunu Libre',
  },
  drawerPaper: {
    width: 300,
    backgroundColor: '#333',
    opacity: 0.8,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDrawerToggle}>
        <MenuIcon className="nav-icon" />
      </Button>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Image id="small-logo" quality={100} src={smallLogo} objectFit="contain" alt="Indie World Logo" />
        <Stack spacing={3} direction="column" style={{ padding: '1rem' }}>
          <Link href="/" passHref>
            <Button className={`${classes.button} navLink`}>
              Home
            </Button>
          </Link>
          <Link href="/promotions/all" passHref>
            <Button className={`${classes.button} navLink`}>
              Promotions
            </Button>
          </Link>
          <Link href="/shows/all" passHref>
            <Button className={`${classes.button} navLink`}>
              All Shows
            </Button>
          </Link>
          <Link href="/performers/all" passHref>
            <Button className={`${classes.button} navLink`}>
              Performers
            </Button>
          </Link>
          <Button className={`${classes.button} navLink`} onClick={signOut}>
            Sign Out
          </Button>
          {/* Add more navigation links here */}
        </Stack>
      </Drawer>
    </div>
  );
}

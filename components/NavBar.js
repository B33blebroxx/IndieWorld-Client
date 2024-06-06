import React from 'react';
import {
  Button,
  Drawer,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { signOut } from '../utils/auth';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 320,
  },
  button: {
    fontSize: '1.2rem', // Bigger font
    fontWeight: 'bold',
    color: '#fff',
  },
  drawerPaper: {
    width: 320,
    backgroundColor: '#333',
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
        <MenuIcon color="action" />
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

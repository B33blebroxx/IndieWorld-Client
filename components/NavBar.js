import React from 'react';
import {
  Button,
  Drawer, List, ListItem, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { signOut } from '../utils/auth';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 320,
  },
  drawerPaper: {
    width: 320,
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
      <Button onClick={handleDrawerToggle}><MenuIcon /></Button>
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
        <List>
          <Link href="/" passHref>
            <ListItem className="navLink" Button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/promotions/all" passHref>
            <ListItem className="navLink" Button>
              <ListItemText primary="Promotions" />
            </ListItem>
          </Link>
          <Link href="/shows/all" passHref>
            <ListItem className="navLink" Button>
              <ListItemText primary="Shows" />
            </ListItem>
          </Link>
          <Link href="/performers/all" passHref>
            <ListItem className="navLink" Button>
              <ListItemText primary="Performers" />
            </ListItem>
          </Link>
          <ListItem Button variant="outline-danger" className="navLink" onClick={signOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
          {/* Add more navigation links here */}
        </List>
      </Drawer>
    </div>
  );
}

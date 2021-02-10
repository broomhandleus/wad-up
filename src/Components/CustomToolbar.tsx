import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuDialog from './MenuDialogComponents/MenuDialog';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolbar: {
    color: 'black',
  }
}));

// need to define an interface for the props if we use it
// TODO: will probably need to pass some user data in the future
export default function CustomToolbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [menuItem, setMenuItem] = useState<null | string>("");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    setMenuItem(event.currentTarget.textContent);
  };
  const childSetMenuItem = (menuItem: string) => {
    setMenuItem(menuItem);
  }

  // TODO: Conditionally show the "Create Event" options based on use isHost
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Wad Up
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClick}>Profile</MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <MenuDialog menuItem={menuItem} setMenuItem={childSetMenuItem}/>
    </AppBar>
  );
}
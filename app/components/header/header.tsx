import {Link} from "@remix-run/react";
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";

import styles from './header.css';
import {useState} from "react";

export default function Header() {

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <header className="header">
         <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
               <div className="mobileOnly">
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={handleMenu}>
                     <MenuIcon/>
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
                     open={open}
                     onClose={handleClose}
                     MenuListProps={{
                        'aria-labelledby': 'basic-button',
                     }}
                  >
                     <MenuItem onClick={handleClose} component={Link} to="/invitations" >Events</MenuItem>
                     <MenuItem onClick={handleClose} component={Link} to="/invitations/new" >Create Event</MenuItem>
                     {/* Add more menu items as needed */}
                  </Menu>
               </div>

               <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                  SportsHub
               </Typography>


               <div className="desktopOnly">
                  <Button color="inherit" component={Link} to="/invitations">Events</Button>
                  <Button color="inherit" component={Link} to="/invitations/new">Create Event</Button>
               </div>
               {/* Add more navigation links as needed */}
            </Toolbar>
         </AppBar>
      </header>
   );
}

export function links() {
   return [{rel: 'stylesheet', href: styles}];
}
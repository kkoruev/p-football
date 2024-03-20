import {Link} from "@remix-run/react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import styles from './header.css';

export default function Header() {

   return (
      <header className="header">
         <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
               <div className="mobileOnly">
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                     <Menu/>
                  </IconButton>
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
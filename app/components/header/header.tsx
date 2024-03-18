import {Link} from "@remix-run/react";
import {AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Menu} from "@mui/icons-material";

import styles from './header.css';

export default function Header() {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <header className="header">
         <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} className="mobileOnly">
                  <Menu/>
               </IconButton>

               <div className="desktopOnly">
                  <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                     SportsHub
                  </Typography>
                  <Button color="inherit" component={Link} to="/invitations">Events</Button>
                  <Button color="inherit" component={Link} to="/invitations/new">Create Event</Button>
               </div>
               {/* Add more navigation links as needed */}
            </Toolbar>
         </AppBar>
         {/*<nav className="nav">*/}
         {/*   <Link to="/invitations/new" reloadDocument className="nav__link">Create Event</Link>*/}
         {/*   <Link to="/invitations" reloadDocument className="nav__link">Events</Link>*/}
         {/*</nav>*/}
      </header>
   );
}

export function links() {
   return [{rel: 'stylesheet', href: styles}];
}
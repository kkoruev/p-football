import {Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Link} from "@remix-run/react";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";


export default function NavigationLinks({isLoggedIn}) {



   const responsiveNavigationButton = {
      '@media (max-width: 599px)': {
         marginTop: 1
      },
   }

   return (
      <>
         <Button color="inherit" component={Link} to="/" sx={{...responsiveNavigationButton}}>
            Home
         </Button>
         {isLoggedIn && (
            <>
               <Button color="inherit" component={Link} to="/invitations"
                       sx={{...responsiveNavigationButton}}>Events</Button>
               <Button color="inherit" component={Link} to="/invitations/new" sx={{...responsiveNavigationButton}}>Create
                  Event</Button>
            </>
         )}
         <Button color="inherit" component={Link} to="/" sx={{...responsiveNavigationButton}}>About</Button>
      </>
   );
}
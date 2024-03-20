import {Button} from "@mui/material";
import {Link} from "@remix-run/react";


export default function NavigationLinks() {

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
        <Button color="inherit" component={Link} to="/invitations" sx={{...responsiveNavigationButton}}>Events</Button>
        <Button color="inherit" component={Link} to="/invitations/new" sx={{...responsiveNavigationButton}}>Create Event</Button>
        <Button color="inherit" component={Link} to="/" sx={{...responsiveNavigationButton}}>About</Button>
     </>
   );
}
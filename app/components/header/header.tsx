import {Link} from "@remix-run/react";
import {
   AppBar,
   Box,
   Button,
   IconButton,
   Menu,
   MenuItem,
   Slide,
   Toolbar,
   Tooltip,
   Typography,
   useTheme
} from "@mui/material";
import {AccountCircle, Close, Menu as MenuIcon} from "@mui/icons-material";

import styles from './header.css';
import {useState} from "react";
import NavigationLinks from "~/components/navigation/navigation.links";
import MobileNavigationMenu from "~/components/navigation/mobile.navigation.menu";
import ProfileNavigationMenu from "~/components/navigation/profile.navigation.menu";

export default function Header({isLoggedIn}) {

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="header">
         <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
               <div className="mobileOnly">
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={handleMenuToggle}>
                     <MenuIcon/>
                  </IconButton>
               </div>

               <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                  SportsHub
               </Typography>


               <div className="desktopOnly">
                  <NavigationLinks isLoggedIn={isLoggedIn}></NavigationLinks>
               </div>

               {isLoggedIn && (
                  <>
                     <ProfileNavigationMenu/>
                  </>
               )}

            </Toolbar>
         </AppBar>

         {isMenuOpen && (<MobileNavigationMenu isOpen={isMenuOpen} toggleMenu={handleMenuToggle}/>)}
      </header>
   );
}

export function links() {
   return [{rel: 'stylesheet', href: styles}];
}
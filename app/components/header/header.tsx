import {Link} from "@remix-run/react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Slide, Toolbar, Typography, useTheme} from "@mui/material";
import {Close, Menu as MenuIcon} from "@mui/icons-material";

import styles from './header.css';
import {useState} from "react";
import NavigationLinks from "~/components/navigation/navigation.links";

export default function Header() {

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const theme = useTheme();

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
                  <NavigationLinks></NavigationLinks>
               </div>
               {/* Add more navigation links as needed */}
            </Toolbar>
         </AppBar>
         {isMenuOpen && (
            <Slide direction={"right"} in={isMenuOpen} mountOnEnter unmountOnExit>
               <Box
                  sx={{
                     position: "fixed",
                     top: 0,
                     left: 0,
                     width: "100%",
                     height: "100vh",
                     backgroundColor: theme.palette.primary.main,
                     zIndex: 1300, // Ensure it's above most other elements
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     paddingTop: "64px",
                     color: "white",
                  }}
                  onClick={handleMenuToggle}
               >
                  <IconButton
                     color="inherit"
                     aria-label="close menu"
                     sx={{position: "absolute", top: 8, right: 8}}
                  >
                     <Close/>
                  </IconButton>
                  {/* Add your menu items here */}
                  <NavigationLinks></NavigationLinks>
               </Box>
            </Slide>
         )}
      </header>
   );
}

export function links() {
   return [{rel: 'stylesheet', href: styles}];
}
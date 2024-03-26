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

export default function Header({isLoggedIn}) {

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

   const theme = useTheme();

   const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
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
                     <Tooltip title="Open user settings">
                        <IconButton onClick={handleOpenUserMenu} size="large" color="inherit">
                           <AccountCircle/>
                        </IconButton>
                     </Tooltip>
                     <Menu
                        sx={{ mt: '45px' }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                     >
                        <MenuItem>
                           <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem>
                           <Typography textAlign="center">Log out</Typography>
                        </MenuItem>

                     </Menu>
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
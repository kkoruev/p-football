import {IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";

export default function ProfileNavigationMenu() {

   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
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
   )
}
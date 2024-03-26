import {Box, IconButton, Slide, useTheme} from "@mui/material";
import {Close} from "@mui/icons-material";
import NavigationLinks from "~/components/navigation/navigation.links";

interface MobileMenuProps {
   isOpen: boolean;
   toggleMenu: () => void;
}


export default function MobileNavigationMenu({isOpen, toggleMenu}: MobileMenuProps) {
   const theme = useTheme();

   return (
      <>
         <Slide direction={"right"} in={isOpen} mountOnEnter unmountOnExit>
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
               onClick={toggleMenu}
            >
               <IconButton
                  color="inherit"
                  aria-label="close menu"
                  sx={{position: "absolute", top: 8, right: 8}}
               >
                  <Close/>
               </IconButton>

               <NavigationLinks></NavigationLinks>
            </Box>
         </Slide>
      </>
   )
}
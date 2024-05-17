import {ReactNode} from "react";
import Header from "~/components/header/header";
import {Box, Container} from "@mui/material";


type RootLayoutProps = {
   isLoggedIn: boolean;
   children: ReactNode;
};

export default function RootLayout({isLoggedIn, children}: RootLayoutProps) {
   return (
      <>
         <Header isLoggedIn={isLoggedIn}/>
         <Box
            sx={{
               minHeight: '100vh',
               backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)) ,url("/images/sports-hub-background.png")`,
               backgroundSize: { sm: 'cover'},
               backgroundRepeat: 'no-repeat',
               backgroundPosition: { xs: 'center', sm: 'top left' },
               display: 'flex',
               flexDirection: 'column',
            }}>
            <Container
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  width: '100%',
                  flex: 1,
               }}
            >
               <main>{children}</main>
            </Container>
         </Box>
      </>
   );
}
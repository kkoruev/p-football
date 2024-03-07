import {Box, Button, Container, Typography} from "@mui/material";
import {Facebook} from "@mui/icons-material";
import {useState} from "react";


export default function HomePage() {
   const [userName, setUserName] = useState('');

   const handleLogin = () => {
      if (FB) {
         FB.login(function(response) {
            if (response.authResponse) {
               console.log('Welcome! Fetching your information.... ');
               FB.api('/me', {fields: 'name_format,short_name,name,email,picture'}, function(response) {
                  setUserName(response.name); // Set the user name in state
               });
            } else {
               console.log('User cancelled login or did not fully authorize.');
            }
         }, {scope: 'public_profile'});
      }
   };

   return (
      <Container maxWidth="sm">
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               minHeight: '100vh',
            }}
         >
            {!userName && <Typography variant="h4" component="h1" gutterBottom>
               Welcome to Our Community
            </Typography>}
            {userName && <Typography variant="h6">Welcome, {userName}</Typography>} {/* Display the user's name */}
            {!userName && <Typography variant="body1" paragraph>
               Join us and let's play football together. Log in to create or join events!
            </Typography>}
            {!userName && <Button
               startIcon={<Facebook />}
               variant="contained"
               color="primary"
               onClick={handleLogin}
               sx={{ textTransform: 'none' }}
            >
               Login with Facebook
            </Button> }
         </Box>
      </Container>
   );
}
import {Box, Button, Container, Typography} from "@mui/material";
import {Facebook} from "@mui/icons-material";
import {useState} from "react";
import {redirect} from "@remix-run/node";
import {useFetcher, useSubmit} from "@remix-run/react";
import {commitUserSession, getUserSession} from "~/sessions/user.session";
import {SessionUser} from "~/data/user";
import {FbUserRepository} from "~/repository/fb.user.repository";


export async function action({request}) {
   const session = await getUserSession(request.headers.get("Cookie"));
   const user = await request.json();
   const sessionUser: SessionUser = {...user};

   session.set("fbId", sessionUser.fbId);
   session.set("name", sessionUser.name);
   session.set("email", sessionUser.email);

   // const dbUser = await UserRepository.findUniqueFbUser(sessionUser.fbId);
   const dbUser = await FbUserRepository.findUniqueUser(4);

   console.log(dbUser);

   if (dbUser) {
      return redirect('/invitations')
   }

   return redirect('users/complete', {
      status: 302,
      headers: {
         "Set-Cookie": await commitUserSession(session),
      }
   });
}

export default function HomePage() {
   const [userName, setUserName] = useState('');
   const fetcher = useFetcher();

   const handleLogin = () => {
      if (FB) {
         FB.login(function(response) {
            if (response.authResponse) {
               console.log('Welcome! Fetching your information.... ');
               FB.api('/me', {fields: 'name_format,short_name,name,email,picture'}, async function (response) {
                  const sessionUser: SessionUser = {name: response.name, email: response.email, fbId: response.id};
                  fetcher.submit({...sessionUser}, {method: 'post', encType: "application/json"});
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
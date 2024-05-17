import {Box, Button, Container, Typography} from "@mui/material";
import {Facebook} from "@mui/icons-material";
import {useState} from "react";
import {redirect} from "@remix-run/node";
import {useFetcher, useSubmit} from "@remix-run/react";
import {commitUserSession, getUserSession} from "~/sessions/user.session";
import {SessionUser} from "~/data/user";
import {FbUserRepository} from "~/repository/fb.user.repository";
import {FbProfileRepository} from "~/repository/fb.profile.repository";
import {commitProfileSession, getProfileSession} from "~/sessions/profile.session";


export async function action({request}) {
   const user = await request.json();
   const sessionUser: SessionUser = {...user};

   // const dbUser = await UserRepository.findUniqueFbUser(sessionUser.fbId);
   const fbProfile = await FbProfileRepository.findFbProfile(sessionUser.fbId);

   if (fbProfile) {
      console.log(fbProfile);

      const profileSession = await getProfileSession(request.headers.get("Cookie"));
      profileSession.set("id", fbProfile.user.id);
      profileSession.set("name", fbProfile.user.name);
      return redirect('/invitations', {
         status: 302,
         headers: {
            "Set-Cookie": await commitProfileSession(profileSession),
         }
      });
   }

   const userSession = await getUserSession(request.headers.get("Cookie"));
   userSession.set("fbId", sessionUser.fbId);
   userSession.set("name", sessionUser.name);
   userSession.set("email", sessionUser.email);

   return redirect('users/complete', {
      status: 302,
      headers: {
         "Set-Cookie": await commitUserSession(userSession),
      }
   });
}

export default function HomePage() {
   const [userName, setUserName] = useState('');
   const fetcher = useFetcher();

   const handleLogin = () => {
      if (FB) {
         FB.login(function (response) {
            if (response.authResponse) {
               console.log('Welcome! Fetching your information.... ');
               FB.api('/me', {fields: 'name_format,short_name,name,email,picture'}, async function (response) {
                  console.log(response);
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
          <Box sx={{ textAlign: 'center' }}>
            <img src="/images/sport-hub-transparent-logo.png" alt="Logo" style={{maxWidth: '100%'}}/>

            {userName && <Typography variant="h6">Welcome, {userName}</Typography>} {/* Display the user's name */}
            {!userName && <Button
               startIcon={<Facebook/>}
               variant="contained"
               color="primary"
               onClick={handleLogin}
               sx={{textTransform: 'none'}}
            >
               Login with Facebook
            </Button>}
         </Box>
   );
}
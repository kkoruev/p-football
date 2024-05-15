import {Links, LiveReload, Outlet, Scripts, useLoaderData} from '@remix-run/react'

import theme from "~/utils/theme";
import {Box, ThemeProvider} from "@mui/material";

import globalCss from '~/styles/global.css';
import {links as headerStyles} from '~/components/header/header'
import RootLayout from "~/components/root/root.layout";
import {json} from "@remix-run/node";
import {isUserLoggedIn} from "~/utils/session.util";

function createFacebookSDKScript() {
   return `
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1167415367956511',
        cookie: true,
        xfbml: true,
        version: 'v10.0'
      });
      FB.AppEvents.logPageView();   
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  `;
}

export async function loader({request}) {
   const isLoggedIn: boolean = await isUserLoggedIn(request);
   return json({isLoggedIn});
}

export default function App() {
   const data = useLoaderData<typeof loader>();

   return (
      <html lang="en">
      <head>
         <meta charSet="utf-8"/>
         <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
         />
         <title>SportsHub</title>
         <Links/>
         <script dangerouslySetInnerHTML={{__html: createFacebookSDKScript()}}/>
      </head>
      <body>
      <ThemeProvider theme={theme}>
         <RootLayout isLoggedIn={data.isLoggedIn}>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  width: '100%',
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)) ,url("/images/sports-hub-background.png")`,
                  backgroundSize: {xs: 'auto 100%', sm: 'cover'},
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
               }}
            >
               <Outlet/>
            </Box>

         </RootLayout>
      </ThemeProvider>
      <Scripts/>
      <LiveReload/>
      </body>
      </html>
   );
}

export function links() {
   return [...headerStyles(), {rel: 'stylesheet', href: globalCss}];
}
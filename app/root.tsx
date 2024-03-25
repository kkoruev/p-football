import {Links, LiveReload, Outlet, Scripts, useLoaderData} from '@remix-run/react'

import theme from "~/utils/theme";
import {ThemeProvider} from "@mui/material";

import globalCss from '~/styles/global.css';
import {links as headerStyles} from '~/components/header/header'
import RootLayout from "~/components/root/root.layout";
import {json} from "@remix-run/node";
import {getProfileSession} from "~/sessions/profile.session";

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
   const profileSession = await getProfileSession(request.headers.get("Cookie"));

   console.log(profileSession.get("name"));
   const isLoggedIn = profileSession.has("name");
   return json({isLoggedIn});
}

export default function App() {
   const data = useLoaderData<typeof loader>();

   return (
      <html lang="en">
      <head>
         <meta charSet="utf-8" />
         <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
         />
         <title>SportsHub</title>
         <Links />
         <script dangerouslySetInnerHTML={{ __html: createFacebookSDKScript() }} />
      </head>
      <body>
      <ThemeProvider theme={theme}>
         <RootLayout isLoggedIn={data.isLoggedIn}>
            <Outlet />
         </RootLayout>
      </ThemeProvider>
      <Scripts />
      <LiveReload />
      </body>
      </html>
   );
}

export function links() {
   return [...headerStyles(), {rel: 'stylesheet', href: globalCss}];
}
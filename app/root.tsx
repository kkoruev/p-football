import {Links, LiveReload, Outlet, Scripts} from '@remix-run/react'

import theme from "~/utils/theme";
import {ThemeProvider} from "@mui/material";

import globalCss from '~/styles/global.css';

function createFacebookSDKScript() {
   return `
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1344826609540424',
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

export default function App() {
   return (
      <html lang="en">
      <head>
         <meta charSet="utf-8" />
         <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
         />
         <title>Remix: So great, it's funny!</title>
         <Links />
         <script dangerouslySetInnerHTML={{ __html: createFacebookSDKScript() }} />
      </head>
      <body>
      <ThemeProvider theme={theme}>
         <Outlet />
      </ThemeProvider>
      <Scripts />
      <LiveReload />
      </body>
      </html>
   );
}

export function links() {
   return [{rel: 'stylesheet', href: globalCss}];
}
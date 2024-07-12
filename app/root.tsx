import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from '@remix-run/react'

import theme from "~/utils/theme";
import {Box, ThemeProvider} from "@mui/material";

import globalCss from '~/styles/global.css';
import {links as headerStyles} from '~/components/header/header'
import RootLayout from "~/components/root/root.layout";
import {json} from "@remix-run/node";
import {isUserLoggedIn} from "~/utils/session.util";
import { withEmotionCache } from '@emotion/react';
import React from 'react';
import ClientStyleContext from './src/ClientStyleContext';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';


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

const Document = withEmotionCache(({ children, title }: { children: React.ReactNode, title?: string }, emotionCache) => {
   const clientStyleData = React.useContext(ClientStyleContext);
 
   useEnhancedEffect(() => {
     emotionCache.sheet.container = document.head;
     const tags = emotionCache.sheet.tags;
     emotionCache.sheet.flush();
     tags.forEach((tag) => {
       (emotionCache.sheet as any)._insertTag(tag);
     });
     clientStyleData.reset();
   }, []);
 
   return (
     <html lang="en">
       <head>
         <meta charSet="utf-8" />
         <meta name="viewport" content="width=device-width,initial-scale=1" />
         <meta name="theme-color" content={theme.palette.primary.main} />
         {title ? <title>{title}</title> : null}
         <Meta />
         <Links />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
         <link
           rel="stylesheet"
           href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
         />
         <meta name="emotion-insertion-point" content="emotion-insertion-point" />
         <script dangerouslySetInnerHTML={{ __html: createFacebookSDKScript() }} />
       </head>
       <body>
         {children}
         <ScrollRestoration />
         <Scripts />
         <LiveReload />
       </body>
     </html>
   );
 });

 export default function App() {
   const data = useLoaderData<typeof loader>();
 
   return (
     <Document title="SportsHub">
       <RootLayout isLoggedIn={data.isLoggedIn}>
         <Outlet />
       </RootLayout>
     </Document>
   );
 }

export function links() {
   return [...headerStyles(), {rel: 'stylesheet', href: globalCss}];
}
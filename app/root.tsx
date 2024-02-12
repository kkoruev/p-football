import {Links, LiveReload, Outlet, Scripts} from '@remix-run/react'

import theme from "~/utils/theme";
import {ThemeProvider} from "@mui/material";

import globalCss from '~/styles/global.css';

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
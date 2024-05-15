import {createTheme} from "@mui/material";

// this is grey - #868686

const theme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#00033a'
      },
      secondary: {
         main: '#ff241f'
      },
      background: {
         default: '#f8f8f8',
      },
   }
});

export default theme;

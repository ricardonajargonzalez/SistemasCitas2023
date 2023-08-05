import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const purpleTheme = createTheme({
    palette : {
        primary : {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        error : { 
            main: 'rgb(245, 245, 245)' 
        }
    }
});

export const grayTheme = createTheme({
    
    palette : {
        primary : {
            main: '#009ee3' //colors azul
        },
        background: {
            main: 'rgba(145, 158, 171, 0.12)' //gris para background
        },
        error : { 
            main: 'rgb(245, 245, 245)'
        },
        color1:{
            main: '#009ee3'
        },
        white: {
            main: 'rgb(255, 255, 255)'
        },
        graye: {
          main: 'rgb(245, 245, 245)'
        }
    },
     components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#dddddd white",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#dddddd",
            minHeight: 24,
            border: "3px solid white",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#6b6b6b",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#6b6b6b",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6b6b6b",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#6b6b6b",
          },
        },
      },
    },
  },
});





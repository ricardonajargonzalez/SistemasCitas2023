import { MenuOutlined,Notifications } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";



export const NavBar = ({ drawerWidth = 240, mostrar = 0 }) => {
  return (
    <></>
    // <AppBar elevation={0}
    // sx={{ 
    //   width: {  sm:  mostrar == 0  ? `calc(100%)` : `calc(100% - ${ drawerWidth }px)`   },
    //   ml: { sm: `${ drawerWidth }px` },
    //   backgroundColor: 'primary.main',
    //   //backgroundColor: 'white.main',
    //  // backgroundColor: 'red',
    //  // height: '30px'
    // }}
    // >
    //     <Toolbar>
    //         <IconButton
    //         color="inherit"
    //         edge="start"
    //         sx={{
    //               mr:2, 
    //               display: { sm: 'none' },
    //               //backgroundColor: 'primary.main',
    //               color: 'primary.main',
    //               backgroundColor: 'primary.main',
    //            }}
    //         >
    //             <MenuOutlined sx={{color: '#ffff'}} />
    //         </IconButton>

    //         <Grid container direction='row' justifyContent='space-between' alignItems='center'>
    //           <Typography>App Citas</Typography>

    //            <IconButton  href="/auth">
    //              <Notifications sx={{  color: '#ffff' }} />
    //            </IconButton>
    //         </Grid>

    //     </Toolbar>
    // </AppBar>
  )
}

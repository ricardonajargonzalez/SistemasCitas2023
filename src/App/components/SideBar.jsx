
import { MenuOutlined, TurnedInNot } from "@mui/icons-material";
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

// const drawerWidth = 240;
const navItems = ['Inicio', 'Acerca de nosotros', 'Contacto'];

export const SideBar = ({ drawerWidth = 240, mostrar = 1 }) => {

    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            APPCITAS
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ); 



//   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar elevation={0} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // sx={{ mr: 2, display: { sm: 'none' } }}
          >
             <MenuOutlined sx={{color: '#ffff'}} />
          </IconButton>
          <Typography
            // variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            APPCITAS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button href="/Acerca" key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
        //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            color: '#ffffff',
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );  

  
  
//   <Box
//   component='nav'
//   sx={{
//        width:{ sm:  drawerWith },
//        flexShrink: { sm: 0 },
//        backgroundColor: 'primary.main'
//      }}
//   >
//       <Drawer
//       variant="permanent" //temporary
//       open={ true }
//       //onClose
//       sx={{ 
//           display : { xs: 'block' }, backgroundColor: 'green',
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWith }
//        }}
//       >
//           <Toolbar sx={{backgroundColor: 'primary.main'}}>
//               <Typography variant="h6" noWrap component='div'>
//                   SC
//               </Typography>
//           </Toolbar>

//           <Divider />

//           <List> 
//               {
//                   ['itemUno', 'itemDos', 'itemtres', 'itemcuatro', 'itemcinco', 'itemSeis'].map(
//                       text =>(
//                          <ListItem key={text} disablePadding>
//                               <ListItemButton>
//                                   <ListItemIcon>
//                                       <TurnedInNot />
//                                   </ListItemIcon>
//                                   <Grid container>
//                                       <ListItemText primary={ text } secondary="sdfsdfs" />
//                                   </Grid>
//                               </ListItemButton>
//                          </ListItem> 
//                       )
//                   )
//               }
//           </List>

//       </Drawer>
//   </Box>

}

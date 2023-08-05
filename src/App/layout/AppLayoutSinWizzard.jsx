import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components/";
import { SideBarAuth } from "../components/SideBarAuth";

const drawerWidth = 320;
const mostrar = 1;

export const AppLayoutSinWizzard = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        {/* <NavBar drawerWidth={ drawerWidth } mostrar = {mostrar} /> */}
        
       
       <SideBarAuth drawerWidth={ drawerWidth } mostrar = {mostrar} />
        <Box 
        component='main'
        sx={{ flexGrow: 1, p: 0, 
          backgroundColor: 'rgb(245, 245, 245)', 
          height:"100vh", 
        }}
        >
            <Toolbar />
            { children }
        </Box>
    </Box>
  )
}

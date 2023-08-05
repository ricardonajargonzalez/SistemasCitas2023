import { Box, Toolbar } from "@mui/material"
import { NavBar,SideBar } from "../components/";
import HorizontalNonLinearStepper from "../components/HorizontalNonLinearStepper";

const drawerWidth = 320;
const mostrar = 1;

export const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        {/* <NavBar drawerWidth={ drawerWidth } mostrar = {mostrar} /> */}
        
       
       <SideBar drawerWidth={ drawerWidth } mostrar = {mostrar} />
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
        <HorizontalNonLinearStepper sx={{ mt:8 }} />
    </Box>
  )
}

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { AppLayoutSinWizzard } from "../layout/AppLayoutSinWizzard";
import { AgendarServicios } from "../views/AgendarServicios";
import { CitasSelectedView } from "../views/CitasSelectedView";
import { NothingSelectedView } from "../views/index";
import { PagarAgenda } from "../views/PagarAgenda";
import { ResumenServicios } from "../views/ResumenServicios";
import { ServiciosPersonas } from "../views/ServiciosPersonas";




export const AppPageNormal = ({children}) => {
 
  const dispatch = useDispatch();
  const { pasoactivo } = useSelector( state=>state.stateWizard );

  useEffect(() => {
    //  console.log("app page inicio");
  },[])
  

 

  return (
    <AppLayoutSinWizzard>
        {children}
    </AppLayoutSinWizzard>
  )
}

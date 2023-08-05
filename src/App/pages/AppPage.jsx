import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { AgendarServicios } from "../views/AgendarServicios";
import { CitasSelectedView } from "../views/CitasSelectedView";
import { NothingSelectedView } from "../views/index";
import { PagarAgenda } from "../views/PagarAgenda";
import { ResumenServicios } from "../views/ResumenServicios";
import { ServiciosPersonas } from "../views/ServiciosPersonas";




export const AppPage = () => {
 
  const dispatch = useDispatch();
  const { pasoactivo } = useSelector( state=>state.stateWizard );

  useEffect(() => {
    //  console.log("app page inicio");
  },[])
  

 

  return (
    <AppLayout>
      { 
      pasoactivo == 0
        && <NothingSelectedView /> 
      } 
      {
      pasoactivo == 1
        && <CitasSelectedView />

      }
      {
      pasoactivo == 2
        && <ServiciosPersonas />

      }
      {
        pasoactivo ==3
        && <AgendarServicios />
      }
      {
        pasoactivo ==4
        && <ResumenServicios />
      }{
        pasoactivo ==5
        && <PagarAgenda />
      }
    </AppLayout>
  )
}

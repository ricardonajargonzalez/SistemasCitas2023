import { backEndApi } from "../../api/BackEndApi";
import { setDiasDescansoReducer, startDiasDescansoReducer } from "./empleadoSlice";


export const getDiasDescanso = (sucursalid,usuarioid) =>{


    return async(dispatch, getState)=>{
    //iniciamos carga de sucursales
        dispatch( startDiasDescansoReducer() );

        //llamado al backend - asyncrono
        const { data } = await backEndApi.get(`/diasdisponibles/${sucursalid}`,{ params: { usuarioid: usuarioid } });
        //  console.log("resultado descanso " + JSON.stringify(data.results));
        dispatch( setDiasDescansoReducer({ dias_descanso : data.results }) );
    }
}
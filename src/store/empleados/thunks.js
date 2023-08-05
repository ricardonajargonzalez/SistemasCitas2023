import { backEndApi } from "../../api/BackEndApi";
import { getEmpleadosReducer, startEmpleados } from "./empleadosSlice";




export const getEmpleados = (sucursalid) =>{

    return async (dispatch,getState) =>{

        //iniciales carga
        dispatch( startEmpleados() );

        //llamado al backend - asyncrono
        const { data } = await backEndApi.get(`/empleado/${sucursalid}`);
        
        // console.log( data.results);
        dispatch( getEmpleadosReducer({ empleados : data.results }) );
    }
}


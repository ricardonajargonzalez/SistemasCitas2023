import { backEndApi } from "../../api/BackEndApi";
import { reducegetServiciosPaquetes, startServiciosPaquetes } from "./serviciosPaquetesSlice";


export const getServiciosPaquetes = (idsucursal)=>{



    return async (dispatch, getState) =>{
        //iniciamos carga de sucursales
        dispatch( startServiciosPaquetes() );

        //llamado al backend - asyncrono
        const { data } = await backEndApi.get(`/servicio/${idsucursal}`);
        // console.log(data.results);
        dispatch( reducegetServiciosPaquetes({ servicios_paquetes : data.results }) );
    }
}
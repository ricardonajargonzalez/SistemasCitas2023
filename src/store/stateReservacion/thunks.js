// import { backEndApi } from "../../api/BackEndApi";


import { backEndApi } from "../../api/BackEndApi";
import { reduceBusquedaTemporales, reducer_INS_ReservacionTempActivas } from "./stateReservacionSlice";




export const insertReservacionTemporal = (fecha_ini_segundos,fecha_fin_segundos,horaistrmysql,horafstrmysql,serviciominutos,idstorage,empleadoid) =>{
    return async (dispatch, getstate) =>{
        //iniciamos carga de busqueda de temporales
        dispatch( reduceBusquedaTemporales() );

        console.log("inssert reduce temp");

        //llamado al backend - asyncrono
        const { data } = await backEndApi.post('/reservacion/temporal',{
            fechaini : fecha_ini_segundos,
            fechafin: fecha_fin_segundos,
            fechaservicioini: horaistrmysql,
            fechaserviciofin: horafstrmysql,
            serviciominutos: serviciominutos,
            idstorage: idstorage,
            empleadoid: empleadoid
        });
    }
}

export const getReservacionTemporal = (fecha,segundosunix_ini) =>{
    return async (dispatch, getstate) =>{
        //iniciamos carga de busqueda de temporales
        // dispatch( reduceBusquedaTemporales() );

        //llamado al backend - asyncrono
        const { data } = await backEndApi.post('/reservacion/tempactivos',{
            fecha : fecha,
            fecha_impresion_horarios_seg : segundosunix_ini
        });
         
        console.log("getReservacionTemporal");
        // console.log("getReservacionTemporal thunks fecha " + fecha + " fecha_impresion_horarios_seg " +segundosunix_ini +" result " + data.results);
        dispatch( reducer_INS_ReservacionTempActivas({ temporales : data.results }) );
    }
}

//recuperar solo las reservaciones del dia y solo reservaciones que no han pasado los 5 minutos
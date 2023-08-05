import { backEndApi } from "../../api/BackEndApi";
import { startSucursales,reducegetSucursales, selectedCoordinate } from "./sucursalSlice";




export const getSucursales = () =>{
    return async (dispatch, getstate) =>{
        //iniciamos carga de sucursales
        dispatch( startSucursales() );

        //llamado al backend - asyncrono
        const { data } = await backEndApi.get('/sucursal/');
        dispatch( reducegetSucursales({ sucursales : data.results }) );
        dispatch( selectedCoordinate(
           {
            longitud : data.results[0].longitude,
            latitud : data.results[0].latitude
           }) );
    }
}